import { state, TravelSubStates } from '../script-state.js';
import { logger } from '../../../imports/logger.js';
import { travelManagement } from './Travel/travel-management.js';
import { pathingManagement } from './Travel/pathing-managment.js';

// Travel State Manager
export function Travel() {
	const travelState = state.travelState;

	// Only log when sub-state changes
	if (state.lastLoggedTravelSubState !== travelState.subState) {
		logger(state, 'debug', 'Travel', `${travelState.subState}`);
		state.lastLoggedTravelSubState = travelState.subState;
	}

	switch (travelState.subState) {
		case TravelSubStates.TRAVEL: {
			travelManagement();
			break;
		}
		case TravelSubStates.PATHING: {
			pathingManagement();
			break;
		}
		default: {
			travelState.subState = TravelSubStates.TRAVEL; // Default to TRAVEL sub-state
			break;
		}
	}
}
