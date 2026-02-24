import { logger } from '../../imports/logger.js';
import { Travel } from './State/travel.js';
import { Combat } from './State/combat.js';
import { Looting } from './State/looting.js';
import { Inventory } from './State/inventory.js';
import { Banking } from './State/banking.js';
import { state, MainStates } from './script-state.js';

// Export all state-related types and the state manager function
export * from './script-state.js';

// Script Decision Manager
export function stateManager() {
	// Only log when main state changes
	if (state.lastLoggedMainState !== state.mainState) {
		logger(state, 'debug', 'stateManager', `${state.mainState}`);
		state.lastLoggedMainState = state.mainState;
	}

	switch (state.mainState) {
		case MainStates.TRAVEL: {
			Travel();
			break;
		}
		case MainStates.COMBAT: {
			Combat();
			break;
		}
		case MainStates.LOOTING: {
			Looting();
			break;
		}
		case MainStates.INVENTORY: {
			Inventory();
			break;
		}
		case MainStates.BANKING: {
			Banking();
			break;
		}
	}
}
