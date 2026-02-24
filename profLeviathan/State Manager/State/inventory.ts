import { InventorySubStates, state } from '../script-state.js';
import { logger } from '../../../imports/logger.js';

// Inventory State Manager
export function Inventory() {
	const inventoryState = state.inventoryState;

	// Only log when sub-state changes
	if (state.lastLoggedInventorySubState !== inventoryState.subState) {
		logger(state, 'debug', 'Inventory', `${inventoryState.subState}`);
		state.lastLoggedInventorySubState = inventoryState.subState;
	}

	switch (inventoryState.subState) {
		case InventorySubStates.INVENTORY: {
			break;
		}
		case InventorySubStates.ITEM: {
			break;
		}
		default: {
			inventoryState.subState = InventorySubStates.INVENTORY; // Default to INVENTORY sub-state
			break;
		}
	}
}
