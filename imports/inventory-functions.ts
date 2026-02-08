/* eslint-disable @typescript-eslint/restrict-template-expressions */
// imports
import { generalFunctions } from './general-function.js';
import { logger } from './logger.js';
import { timeoutManager } from './timeout-manager.js';
import { State } from './types.js';

// inventory functions
export const inventoryFunctions = {
	// drops item from inventory and waits for it to be absent
	dropItem: (
		state: State,
		itemId: number,
		failResetState?: string,
	): boolean => {
		if (bot.inventory.containsId(itemId)) {
			bot.inventory.interactWithIds([itemId], ['Drop']);
			inventoryFunctions.itemInventoryTimeout.absent(
				state,
				itemId,
				failResetState,
			);
			return false;
		}
		return true;
	},

	// gets existing items from list and selects one
	getExistingItemId: (
		itemIds: number[],
		selector: 'first' | 'random' = 'first',
	): number | undefined => {
		if (!bot.inventory.containsAnyIds(itemIds)) return undefined;
		const existingItemIds = itemIds.filter((id) =>
			bot.inventory.containsId(id),
		);
		if (existingItemIds.length === 0) return undefined;
		return selector === 'random'
			? existingItemIds[
					Math.floor(Math.random() * existingItemIds.length)
				]
			: existingItemIds[0];
	},

	// gets first existing item from list (backwards compatibility)
	getFirstExistingItemId: (itemIds: number[]): number | undefined =>
		inventoryFunctions.getExistingItemId(itemIds, 'first'),

	// gets random existing item from list (backwards compatibility)
	getRandomExistingItemId: (itemIds: number[]): number | undefined =>
		inventoryFunctions.getExistingItemId(itemIds, 'random'),

	// checks if inventory has specific quantities of items
	checkQuantities: (
		state: State,
		items: { itemId: number; quantity: number }[],
	): boolean => {
		logger(
			state,
			'debug',
			`checkQuantities`,
			'Checking inventory item quantities.',
		);
		for (const item of items) {
			if (bot.inventory.getQuantityOfId(item.itemId) !== item.quantity)
				return false;
		}
		return true;
	},

	// waits for item to be present or absent in inventory with timeout
	itemInventoryTimeout: {
		present: (
			state: State,
			itemId: number,
			failResetState?: string,
		): boolean =>
			itemInventoryTimeoutCore(state, itemId, failResetState, true),
		absent: (
			state: State,
			itemId: number,
			failResetState?: string,
		): boolean =>
			itemInventoryTimeoutCore(state, itemId, failResetState, false),
	},

	// gear swapping function with ID and name support
	swapGear: (
		state: State,
		itemIds: number[],
		itemNames: string[],
		targetSlot: number,
		failResetState?: string,
	): boolean => {
		// Try to find item by ID first
		if (bot.inventory.containsAnyIds(itemIds)) {
			const sourceSlot = bot.inventory.interactWithIds(itemIds, [
				'Equip',
			]);
			if (sourceSlot !== undefined) {
				// Check only for undefined
				logger(
					state,
					'debug',
					'swapGear',
					`Swapping item ID ${itemIds.join(', ')} from slot ${sourceSlot} to slot ${targetSlot}`,
				);
				return true;
			}
		}

		// Fallback to item names if IDs not found
		if (itemNames && itemNames.length > 0) {
			const sourceSlot = bot.inventory.interactWithNames(itemNames, [
				'Equip',
			]);
			if (sourceSlot !== undefined) {
				logger(
					state,
					'debug',
					'swapGear',
					`Swapping item by name "${itemNames}" from slot ${sourceSlot} to slot ${targetSlot}`,
				);
				return true;
			}
		}

		logger(
			state,
			'debug',
			'swapGear',
			`No items found with IDs ${itemIds} or names ${itemNames}`,
		);
		if (failResetState) {
			generalFunctions.handleFailure(
				state,
				'swapGear',
				`Item not found for swapping`,
				failResetState,
			);
		}
		return false;
	},

	cacheInventory: (
		state: State,
	): Record<number, { itemId: number; quantity: number }> => {
		const cachedInventory: Record<
			number,
			{ itemId: number; quantity: number }
		> = {};

		// Get inventory container from client (93 is the INVENTORY container ID)
		const inventoryContainer = client.getItemContainer(93);

		if (inventoryContainer) {
			const items = inventoryContainer.getItems();
			for (const [slot, item] of items.entries()) {
				if (item && item.getId() > 0) {
					cachedInventory[slot] = {
						itemId: item.getId(),
						quantity: item.getQuantity(),
					};
				}
			}
		}

		// Log the complete inventory snapshot
		logger(
			state,
			'debug',
			'cacheInventory',
			`Cached inventory state: ${JSON.stringify(cachedInventory, null, 2)}`,
		);

		// Also log in a more readable format
		let inventoryLog: string = 'Inventory Cache:\n';
		for (let slot: number = 0; slot < 28; slot++) {
			inventoryLog += cachedInventory[slot]
				? `Slot ${slot}: Item ID ${cachedInventory[slot].itemId} x${cachedInventory[slot].quantity}\n`
				: `Slot ${slot}: Empty\n`;
		}
		logger(state, 'debug', 'cacheInventory', inventoryLog);

		return cachedInventory;
	},
};

// core function for item inventory timeout
function itemInventoryTimeoutCore(
	state: State,
	itemId: number,
	failResetState?: string,
	waitForPresence: boolean = true,
): boolean {
	const inInventory = bot.inventory.containsId(itemId);
	const shouldPass = waitForPresence ? inInventory : !inInventory;
	if (!shouldPass) {
		logger(
			state,
			'debug',
			'inventoryFunctions.itemInventoryTimeout',
			`Item ID ${itemId} ${waitForPresence ? 'not in' : 'still in'} inventory.`,
		);
		timeoutManager.add({
			state,
			conditionFunction: () =>
				waitForPresence
					? bot.inventory.containsId(itemId)
					: !bot.inventory.containsId(itemId),
			initialTimeout: 1,
			maxWait: 10,
			onFail: () =>
				generalFunctions.handleFailure(
					state,
					'inventoryFunctions.itemInventoryTimeout',
					`Item ID ${itemId} ${waitForPresence ? 'not in' : 'still in'} inventory after 10 ticks.`,
					failResetState,
				),
		});
		return false;
	}
	logger(
		state,
		'debug',
		'inventoryFunctions.itemInventoryTimeout',
		`Item ID ${itemId} is ${waitForPresence ? 'in' : 'not in'} inventory.`,
	);
	return true;
}
