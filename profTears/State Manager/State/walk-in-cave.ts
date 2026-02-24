import { logger } from '../../../imports/logger.js';
import { getTearsStateFlags, setTearsStateFlags } from '../../tear-utils.js';
import { state, MainStates } from '../script-state.js';
import { getTickContext } from '../script-utils.js';

export const WalkInCave = (): void => {
	const tickContext = getTickContext();
	if (!tickContext) return;

	if (bot.localPlayerMoving() || !bot.localPlayerIdle()) {
		return;
	}

	const flags = getTearsStateFlags();
	setTearsStateFlags({
		...flags,
		scriptInitialized: true,
	});

	logger(
		state,
		'debug',
		'init',
		'Player idle in cave, starting wall interactions',
	);
	state.mainState = MainStates.CLICK_BLUE_TEARS;
};
