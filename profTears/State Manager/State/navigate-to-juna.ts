import { logger } from '../../../imports/logger.js';
import {
	getCycleStatus,
	isCycleVerified,
	talkToJuna,
	trackWallCycle,
} from '../../tear-utils.js';
import { JUNA_LOCATION, TOG_LOCATION } from '../constants.js';
import { state, MainStates } from '../script-state.js';
import { getTickContext } from '../script-utils.js';

export const NavigateToJuna = (): void => {
	const tickContext = getTickContext();
	if (!tickContext) return;

	trackWallCycle();

	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;

	const playerLoc = player.getWorldLocation();
	const distance = Math.max(
		Math.abs(playerLoc.getX() - JUNA_LOCATION.getX()),
		Math.abs(playerLoc.getY() - JUNA_LOCATION.getY()),
	);

	if (distance <= 2) {
		if (!isCycleVerified()) {
			const cycleStatus = getCycleStatus();
			if (cycleStatus.observedSpawns >= 12) {
				logger(
					state,
					'all',
					'cycle',
					'Please log into the appropriate Tears of Guthix World.',
				);
				bot.terminate();
				return;
			}
			return;
		}

		logger(
			state,
			'debug',
			'navigate_to_juna',
			'Close to Juna and cycle verified, attempting to talk',
		);
		talkToJuna();
		state.junaInteractionTick = tickContext.currentTick;
		state.mainState = MainStates.TALK_TO_JUNA;
		return;
	}

	if (!bot.localPlayerMoving() && !bot.walking.isWebWalking()) {
		logger(
			state,
			'debug',
			'navigate_to_juna',
			`Walking to Juna (distance: ${distance}), target: (${TOG_LOCATION.getX()}, ${TOG_LOCATION.getY()})`,
		);
		bot.walking.walkToTrueWorldPoint(
			TOG_LOCATION.getX(),
			TOG_LOCATION.getY(),
		);
	}
};
