import { LootingSubStates, state } from '../script-state.js';
import { logger } from '../../../imports/logger.js';

// Looting State Manager
export function Looting() {
	const lootingState = state.lootingState;

	// Only log when sub-state changes
	if (state.lastLoggedLootingSubState !== lootingState.subState) {
		logger(state, 'debug', 'Looting', `${lootingState.subState}`);
		state.lastLoggedLootingSubState = lootingState.subState;
	}

	switch (lootingState.subState) {
		case LootingSubStates.INVENTORY: {
			break;
		}
		case LootingSubStates.LOOTING: {
			break;
		}
		default: {
			lootingState.subState = LootingSubStates.INVENTORY;
			break;
		}
	}
}
