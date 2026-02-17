import { logger } from '../../../imports/logger.js';
import { state } from '../state-manager.js';
import { fishManager } from './Fishing/fish-manager.js';
import { trawlingManager } from './Fishing/trawling-manager.js';
import { FishingSubStates } from '../state-manager.js';

// Fishing State Manager
export function Fishing() {
	const fishingState = state.fishingState;
	logger(state, 'debug', 'Fishing', `${fishingState.subState}`);

	switch (fishingState.subState) {
		case FishingSubStates.FISHING: {
			fishManager();
			break;
		}
		case FishingSubStates.TRAWLING: {
			trawlingManager();
			break;
		}
		default: {
			fishingState.subState = FishingSubStates.FISHING;
			break;
		}
	}
}
