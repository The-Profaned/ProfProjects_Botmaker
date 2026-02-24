import { logger } from '../../../imports/logger.js';
import { state, MainStates } from '../script-state.js';
import { MINIGAME_START_BOUNDS } from '../constants.js';
import {
	getTickContext,
	isPlayerInBounds,
	unequipWeaponOffhand,
} from '../script-utils.js';

export const StartState = (): void => {
	logger(state, 'debug', 'start_state', 'Processing start_state');

	const tickContext = getTickContext();
	if (!tickContext) {
		logger(state, 'debug', 'start_state', 'No tickContext available');
		return;
	}

	const isInStartBounds: boolean = isPlayerInBounds(MINIGAME_START_BOUNDS);
	logger(
		state,
		'debug',
		'start_state',
		`Player in start bounds: ${isInStartBounds}`,
	);

	if (!isInStartBounds) {
		logger(
			state,
			'debug',
			'start_state',
			'Not in bounds, transitioning to navigate_to_cave',
		);
		state.mainState = MainStates.NAVIGATE_TO_CAVE;
		return;
	}

	logger(
		state,
		'debug',
		'start_state',
		'In bounds, attempting to unequip weapon/offhand',
	);
	const unequipped: boolean = unequipWeaponOffhand();
	logger(state, 'debug', 'start_state', `Unequip result: ${unequipped}`);

	if (!unequipped) {
		logger(
			state,
			'debug',
			'start_state',
			'Failed to unequip, waiting for next tick',
		);
		return;
	}

	logger(
		state,
		'debug',
		'start_state',
		'Unequipped successfully, transitioning to talk_to_juna',
	);
	state.mainState = MainStates.TALK_TO_JUNA;
};
