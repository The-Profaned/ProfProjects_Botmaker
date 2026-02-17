import { logger } from '../../../imports/logger.js';
import { state } from '../state-manager.js';
import { boatManager } from './Boat/boat-manager.js';
import { deckhandManager } from './Boat/deckhand-manager.js';
import { facilityManager } from './Boat/facility-manager.js';
import { lootManager } from './Boat/loot-manager.js';
import { BoatSubStates } from '../state-manager.js';

// Boat State Manager
export function Boat() {
	const boatState = state.boatState;
	logger(state, 'debug', 'Boat', `${boatState.subState}`);

	switch (boatState.subState) {
		case BoatSubStates.BOAT: {
			boatManager();
			break;
		}
		case BoatSubStates.DECKHAND: {
			deckhandManager();
			break;
		}
		case BoatSubStates.FACILITY: {
			facilityManager();
			break;
		}
		case BoatSubStates.LOOT: {
			lootManager();
			break;
		}
		default: {
			boatState.subState = BoatSubStates.BOAT;
			break;
		}
	}
}
