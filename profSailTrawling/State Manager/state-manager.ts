import { State } from '../../imports/types.js';
import { logger } from '../../imports/logger.js';

// variables for script state
const state: State = {
	debugEnabled: true,
	debugFullState: false,
	failureCounts: {},
	failureOrigin: '',
	lastFailureKey: '',
	mainState: 'start_state',
	scriptInitalized: false,
	scriptName: 'profSailTrawling',
	uiCompleted: false,
	timeout: 0,
	gameTick: 0,
	subState: '',
};

// Script Decision Manager
export function stateManager() {
	logger(state, 'debug', 'stateManager', `${state.mainState}`);
	switch (state.mainState) {
		case 'start_state': {
			break;
		}
		case 'next_state': {
			break;
		}
		default: {
			state.mainState = 'start_state';
			break;
		}
	}
}
