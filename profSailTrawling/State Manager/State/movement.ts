import { state } from '../state-manager.js';
import { logger } from '../../../imports/logger.js';
import { movementManager } from './Movement/movement-manager.js';
import { pathingManager } from './Movement/pathing-manager.js';
import { MovementSubStates } from '../state-manager.js';

// Movement State Manager
export function Movement() {
	const movementState = state.movementState;
	logger(state, 'debug', 'Movement', `${movementState.subState}`);

	switch (movementState.subState) {
		case MovementSubStates.MOVEMENT: {
			movementManager();
			break;
		}
		case MovementSubStates.PATHING: {
			pathingManager();
			break;
		}
		default: {
			movementState.subState = MovementSubStates.MOVEMENT;
			break;
		}
	}
}
