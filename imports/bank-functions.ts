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

	// Open the bank if it is not already open
	openBank: (state: State): boolean => bankFunctions.toggleBank(state, true),

	// Close the bank if it is open
	closeBank: (state: State): boolean =>
		bankFunctions.toggleBank(state, false),

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

	// Ensure the bank is open, otherwise set fallback state
	requireOpenBank: (state: State, fallbackState: string): boolean =>
		bankFunctions.requireBankState(state, true, fallbackState),

	// Ensure the bank is closed, otherwise set fallback state
	requireClosedBank: (state: State, fallbackState: string): boolean =>
		bankFunctions.requireBankState(state, false, fallbackState),

	// Check if item quantity in bank is below specified amount
	lowQuantityInBank: (itemId: number, quanitty: number): boolean =>
		bot.bank.getQuantityOfId(itemId) < quanitty,

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
					`Withdrawing item ID ${item.id} with wuantity ${item.quantity}`,
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
			if (bot.bank.getQuantityOfId(itemId))
				logger(
					state,
					'debug',
					'bankFunctions.withdrawFirstExistingItem',
					`Withdrawing item ID ${itemId} with quantity ${quantity}`,
				);
			bot.bank.withdrawQuantityWithId(itemId, quantity);
			if (
				!inventoryFunctions.itemInventoryTimeout.present(
					state,
					itemId,
					failResetState,
				)
			)
				return false;
		}
		return true;
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
