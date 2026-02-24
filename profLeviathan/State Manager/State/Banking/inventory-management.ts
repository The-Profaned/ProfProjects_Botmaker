import type { LeviathanState } from '../../script-state.js';
import { getWornEquipment } from '../../../../imports/player-functions.js';
import { logger } from '../../../../imports/logger.js';

/**
 * Cache all worn gear and inventory items on startup
 */
export const initializeInventoryCache = (state: LeviathanState): void => {
	// Guard: Check if already initialized
	if (state.bankingState.cacheInitialized) {
		return;
	}

	// Guard: Check if state and bankingState exist
	if (!state || !state.bankingState) {
		logger(
			state,
			'debug',
			'initializeInventoryCache',
			'State or bankingState is null/undefined',
		);
		return;
	}

	// Initialize arrays
	state.bankingState.cachedWornGear = {};
	state.bankingState.cachedInventoryItems = [];

	// Cache worn equipment
	try {
		const wornGear = getWornEquipment(state);
		if (wornGear) {
			state.bankingState.cachedWornGear = wornGear;
		}
	} catch (error) {
		logger(
			state,
			'debug',
			'initializeInventoryCache',
			`Failed to cache worn equipment: ${error instanceof Error ? error.message : String(error)}`,
		);
	}

	// Cache inventory items
	try {
		const inventoryContainer = client.getItemContainer(93);
		if (!inventoryContainer) {
			logger(
				state,
				'debug',
				'initializeInventoryCache',
				'Inventory container not found',
			);
			return;
		}

		const items = inventoryContainer.getItems();
		if (!items) {
			logger(
				state,
				'debug',
				'initializeInventoryCache',
				'Items not found in inventory container',
			);
			return;
		}

		for (const [, item] of items.entries()) {
			// Guard: Check item validity
			if (!item) {
				continue;
			}

			try {
				const itemId = item.getId?.();
				if (!itemId || itemId <= 0) {
					continue;
				}

				const quantity = item.getQuantity?.();
				if (!quantity || quantity <= 0) {
					continue;
				}

				state.bankingState.cachedInventoryItems.push({
					itemId,
					quantity,
				});
			} catch (itemError) {
				logger(
					state,
					'debug',
					'initializeInventoryCache',
					`Failed to cache item: ${itemError instanceof Error ? itemError.message : String(itemError)}`,
				);
				continue;
			}
		}
	} catch (error) {
		logger(
			state,
			'debug',
			'initializeInventoryCache',
			`Failed to cache inventory: ${error instanceof Error ? error.message : String(error)}`,
		);
	}

	state.bankingState.cacheInitialized = true;

	logger(
		state,
		'debug',
		'initializeInventoryCache',
		`Cached worn gear: ${JSON.stringify(state.bankingState.cachedWornGear)}, Cached inventory: ${JSON.stringify(state.bankingState.cachedInventoryItems)}`,
	);
};

/**
 * Get the line count for the formatted inventory display
 */
export const getCachedInventoryDisplayLineCount = (
	state: LeviathanState,
): number => {
	const display = formatCachedInventoryForDisplay(state);
	return display.split('\n').length;
};

/**
 * Format the cached inventory data for display with compressed quantities (side-by-side layout)
 */
export const formatCachedInventoryForDisplay = (
	state: LeviathanState,
): string => {
	const columnWidth = 25;

	// Build worn gear lines
	const wornGearLines: string[] = ['Worn Gear:'];
	const wornGear = state.bankingState.cachedWornGear;
	if (Object.keys(wornGear).length === 0) {
		wornGearLines.push('  (none)');
	} else {
		for (const [slotName, itemId] of Object.entries(wornGear)) {
			wornGearLines.push(`  ${slotName}: ${itemId}`);
		}
	}

	// Build inventory lines
	const inventoryLines: string[] = ['Inventory:'];
	const inventoryItems = state.bankingState.cachedInventoryItems;
	if (inventoryItems.length === 0) {
		inventoryLines.push('  (empty)');
	} else {
		// Aggregate items by ID, summing quantities
		const aggregatedItems: Record<number, number> = {};
		for (const item of inventoryItems) {
			if (aggregatedItems[item.itemId]) {
				aggregatedItems[item.itemId] += item.quantity;
			} else {
				aggregatedItems[item.itemId] = item.quantity;
			}
		}

		// Display aggregated items
		for (const [itemId, totalQuantity] of Object.entries(aggregatedItems)) {
			inventoryLines.push(`  ${itemId} x${totalQuantity}`);
		}
	}

	// Merge lines side by side
	const maxLines = Math.max(wornGearLines.length, inventoryLines.length);
	let display = '';

	for (let index = 0; index < maxLines; index++) {
		const leftLine = wornGearLines[index] ?? '';
		const rightLine = inventoryLines[index] ?? '';

		// Pad left line to column width, then add right line
		const paddedLeft = leftLine.padEnd(columnWidth);
		display += paddedLeft + rightLine + '\n';
	}

	return display;
};
