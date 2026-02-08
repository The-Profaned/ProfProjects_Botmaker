// imports
import { generalFunctions } from './general-function.js';
import { inventoryFunctions } from './inventory-functions.js';
import { logger } from './logger.js';
import { timeoutManager } from './timeout-manager.js';
import { State } from './types.js';

// Bank-related utility functions
export const bankFunctions = {
	// Toggle bank open/closed state with timeout handling
	toggleBank: (state: State, shouldBeOpen: boolean): boolean => {
		const isOpen = bot.bank.isOpen();
		if (isOpen === shouldBeOpen) return true;

		const action = shouldBeOpen ? 'Opening' : 'Closing';
		logger(
			state,
			'debug',
			'bankFunctions.toggleBank',
			`${action} the bank`,
		);

		shouldBeOpen ? bot.bank.open() : bot.bank.close();
		timeoutManager.add({
			state,
			conditionFunction: () => bot.bank.isOpen() === shouldBeOpen,
			initialTimeout: 1,
			maxWait: 10,
			onFail: () =>
				generalFunctions.handleFailure(
					state,
					'bankFunctions.toggleBank',
					`Bank is ${shouldBeOpen ? 'still closed' : 'still open'} after 10 ticks.`,
				),
		});
		return false;
	},

	// Ensure the bank is in the required state, otherwise set fallback state
	requireBankState: (
		state: State,
		shouldBeOpen: boolean,
		fallbackState: string,
	): boolean => {
		if (bot.bank.isOpen() !== shouldBeOpen) {
			state.mainState = fallbackState;
			return false;
		}
		return true;
	},

	// Check if item quantity in bank is below specified amount
	lowQuantityInBank: (itemId: number, quantity: number): boolean =>
		bot.bank.getQuantityOfId(itemId) < quantity,

	// Check if any of the specified items have low quantity in bank
	anyQuantityLowInBank: (
		items: { id: number; quantity: number }[],
	): boolean =>
		items.some((item) =>
			bankFunctions.lowQuantityInBank(item.id, item.quantity),
		),

	// Deposit items with timeout handling
	depositItemsTimeout: {
		all: (state: State, failResetState?: string) =>
			depositItemsTimeoutBase(state, undefined, failResetState),
		some: (state: State, itemId: number, failResetState?: string) =>
			depositItemsTimeoutBase(state, itemId, failResetState),
	},

	// Withdraw missing items from bank
	withdrawMissingItems: (
		state: State,
		items: { id: number; quantity: number | 'all' }[],
		failResetState?: string,
	): boolean => {
		for (const item of items) {
			if (!bot.inventory.containsId(item.id)) {
				logger(
					state,
					'debug',
					'bankFunctions.withdrawMissingItems',
					`Withdrawing item ID ${item.id} with quantity ${item.quantity}`,
				);
				item.quantity == 'all'
					? bot.bank.withdrawAllWithId(item.id)
					: bot.bank.withdrawQuantityWithId(item.id, item.quantity);
				if (
					!inventoryFunctions.itemInventoryTimeout.present(
						state,
						item.id,
						failResetState,
					)
				)
					return false;
			}
		}
		return true;
	},

	// Withdraw the first existing item from a list of item IDs
	withdrawFirstExistingItem: (
		state: State,
		itemIds: number[],
		quantity: number,
		failResetState?: string,
	): boolean => {
		for (const itemId of itemIds) {
			const bankQuantity = bot.bank.getQuantityOfId(itemId);
			if (bankQuantity === 0) continue;

			logger(
				state,
				'debug',
				'bankFunctions.withdrawFirstExistingItem',
				`Withdrawing item ID ${itemId} with quantity ${quantity}`,
			);
			bot.bank.withdrawQuantityWithId(itemId, quantity);
			return inventoryFunctions.itemInventoryTimeout.present(
				state,
				itemId,
				failResetState,
			);
		}
		// No items found
		logger(
			state,
			'debug',
			'bankFunctions.withdrawFirstExistingItem',
			`No items found in bank with IDs: ${itemIds.join(', ')}`,
		);
		return false;
	},

	// Quickly Banks items based on initial inventory state, with timeout handling
	quickBanking: (
		state: State,
		initialInventory: Record<number, { itemId: number; quantity: number }>,
		progress: QuickBankingProgress,
		failResetState?: string,
	): boolean => {
		if (!progress.initialized) {
			const deposited: boolean = bankFunctions.depositItemsTimeout.all(
				state,
				failResetState,
			);
			if (!deposited) return false;

			const requiredItems: { id: number; quantity: number }[] = [];
			progress.slots = [];

			for (let slot: number = 0; slot < 28; slot++) {
				const item = initialInventory[slot];
				if (!item) continue;

				requiredItems.push({
					id: item.itemId,
					quantity: item.quantity,
				});
				progress.slots.push(slot);
			}

			if (bankFunctions.anyQuantityLowInBank(requiredItems)) {
				logger(
					state,
					'all',
					'bankFunctions.quickBanking',
					'No more required items, resupply before you start again',
				);
				bot.terminate();
				return false;
			}

			progress.index = 0;
			progress.initialized = true;
		}

		// Wait for banking dialog to close before continuing
		if (bot.bank.isBanking()) {
			logger(
				state,
				'debug',
				'bankFunctions.quickBanking',
				'Waiting for banking dialog to close',
			);
			return false;
		}

		let itemsProcessed: number = 0;
		const allowedThisTick: number = 3;

		// Bank withdraw loop
		while (
			progress.index < progress.slots.length &&
			itemsProcessed < allowedThisTick
		) {
			const slot: number = progress.slots[progress.index];
			const item = initialInventory[slot];

			progress.index++;

			if (!item) continue;

			const quantity: number = item.quantity;
			const isStandardQuantity: boolean =
				quantity === 1 || quantity === 5 || quantity === 10;

			// If quantity isn't 1/5/10, initiate withdraw and let isBanking() handle the dialog
			if (!isStandardQuantity) {
				bot.bank.withdrawQuantityWithId(item.itemId, quantity);
				return false;
			}

			bot.bank.withdrawQuantityWithId(item.itemId, quantity);

			const itemPresent: boolean =
				inventoryFunctions.itemInventoryTimeout.present(
					state,
					item.itemId,
					failResetState,
				);

			if (!itemPresent) {
				logger(
					state,
					'all',
					'bankFunctions.quickBanking',
					'No more required items, resupply before you start again',
				);
				bot.terminate();
				return false;
			}

			itemsProcessed++;
		}

		if (progress.index >= progress.slots.length) {
			progress.initialized = false;
			progress.index = 0;
			progress.slots = [];
			return true;
		}

		return false;
	},

	// Webwalk to nearest bank, open it, and retry every 5 ticks until open
	processBankOpen: (state: State, onOpen: () => void): void => {
		if (state.bankWalkInitiated === undefined) {
			state.bankWalkInitiated = false;
		}
		if (state.isAtBankLocation === undefined) {
			state.isAtBankLocation = false;
		}
		if (state.bankOpenAttemptTick === undefined) {
			state.bankOpenAttemptTick = -1;
		}

		if (bot.bank.isOpen()) {
			state.bankWalkInitiated = false;
			state.isAtBankLocation = false;
			state.bankOpenAttemptTick = -1;
			onOpen();
			return;
		}
		if (bot.walking.isWebWalking()) {
			state.isAtBankLocation = false;
			state.bankOpenAttemptTick = -1;
			return;
		}
		if (!state.bankWalkInitiated) {
			bot.walking.webWalkToNearestBank();
			state.bankWalkInitiated = true;
			state.isAtBankLocation = false;
			state.bankOpenAttemptTick = -1;
			return;
		}
		if (!state.isAtBankLocation) {
			state.isAtBankLocation = true;
			state.bankOpenAttemptTick = state.gameTick;
			bot.bank.open();
			return;
		}
		if (
			state.bankOpenAttemptTick === -1 ||
			state.gameTick - state.bankOpenAttemptTick >= 5
		) {
			state.bankOpenAttemptTick = state.gameTick;
			bot.bank.open();
		}
	},
};

// Base function to deposit items with timeout handling
const depositItemsTimeoutBase = (
	state: State,
	itemId?: number,
	failResetState?: string,
): boolean => {
	const currentEmptySlots = bot.inventory.getEmptySlots();
	if (currentEmptySlots == 28) return true;
	if (!itemId || (itemId && bot.inventory.containsId(itemId))) {
		logger(
			state,
			'debug',
			'bankFunctions.depositItemsTimeout',
			`Depositing ${itemId ? `item ID ${itemId}` : 'all items'}`,
		);
		itemId ? bot.bank.depositAllWithId(itemId) : bot.bank.depositAll();
		timeoutManager.add({
			state,
			conditionFunction: () =>
				currentEmptySlots < bot.inventory.getEmptySlots(),
			initialTimeout: 1,
			maxWait: 10,
			onFail: () =>
				generalFunctions.handleFailure(
					state,
					'bankFunctions.depositItemsTimeout',
					`Failed to deposit ${itemId ? `item ID ${itemId}` : 'all items'} after 10 ticks.`,
					failResetState,
				),
		});
		return false;
	}
	return true;
};

export type QuickBankingProgress = {
	initialized: boolean;
	slots: number[];
	index: number;
};
