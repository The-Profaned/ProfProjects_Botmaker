import { logger } from '../../../imports/logger.js';
import { getTearsStateFlags, trackWallCycle } from '../../tear-utils.js';
import { state, MainStates } from '../script-state.js';
import { getTickContext } from '../script-utils.js';

export const TalkToJuna = (): void => {
	logger(state, 'debug', 'talk_to_juna', 'Processing talk_to_juna state');

	const tickContext = getTickContext();
	if (!tickContext) {
		logger(state, 'debug', 'talk_to_juna', 'No tickContext available');
		return;
	}

	trackWallCycle();

	const flags = getTearsStateFlags();
	if (flags.junaDialogCompleted) {
		const ticksSinceTalk: number =
			tickContext.currentTick - state.junaInteractionTick;
		if (ticksSinceTalk < 5) {
			logger(
				state,
				'debug',
				'talk_to_juna',
				`Waiting for dialog completion (${ticksSinceTalk}/5 ticks)`,
			);
			return;
		}

		logger(
			state,
			'debug',
			'talk_to_juna',
			'Dialog complete, transitioning to walk_in_cave',
		);
		state.mainState = MainStates.WALK_IN_CAVE;
		return;
	}

	logger(state, 'debug', 'talk_to_juna', 'Starting walk to Juna');
	state.mainState = MainStates.NAVIGATE_TO_JUNA;
};
