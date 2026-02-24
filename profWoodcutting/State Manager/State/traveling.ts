import { state, MainStates } from '../script-state.js';
import {
	CAMHPOR_BANK_WEBWALK_X,
	CAMHPOR_BANK_WEBWALK_Y,
	CAMPHOR_TREE_WEBWALK_X,
	CAMPHOR_TREE_WEBWALK_Y,
} from '../constants.js';
import { logState } from '../logging.js';

const getTravelDestination = (): net.runelite.api.coords.WorldPoint => {
	if (state.isTravelingToBank) {
		return new net.runelite.api.coords.WorldPoint(
			CAMHPOR_BANK_WEBWALK_X,
			CAMHPOR_BANK_WEBWALK_Y,
			0,
		);
	}

	return new net.runelite.api.coords.WorldPoint(
		CAMPHOR_TREE_WEBWALK_X,
		CAMPHOR_TREE_WEBWALK_Y,
		0,
	);
};

const hasReachedDestination = (
	player: net.runelite.api.Player,
	destination: net.runelite.api.coords.WorldPoint,
): boolean => {
	const playerLocation = player.getWorldLocation();
	if (!playerLocation) return false;
	return playerLocation.distanceTo(destination) <= 3;
};

export const Traveling = (): void => {
	const player = client.getLocalPlayer();
	if (!player) return;

	const destination = getTravelDestination();

	if (hasReachedDestination(player, destination)) {
		if (bot.walking.isWebWalking() || bot.localPlayerMoving()) {
			return;
		}

		if (state.isTravelingToBank) {
			logState('Reached bank travel destination, opening bank');
			state.mainState = MainStates.MOVING_TO_BANK;
			return;
		}

		logState('Reached tree travel destination, returning to woodcutting');
		state.mainState = MainStates.WOODCUTTING;
		return;
	}

	if (!bot.walking.isWebWalking() && !bot.localPlayerMoving()) {
		bot.walking.webWalkStart(destination);
		if (state.isTravelingToBank) {
			logState(
				`Webwalking to bank destination (${CAMHPOR_BANK_WEBWALK_X}, ${CAMHPOR_BANK_WEBWALK_Y})`,
			);
			return;
		}

		logState(
			`Webwalking to tree destination (${CAMPHOR_TREE_WEBWALK_X}, ${CAMPHOR_TREE_WEBWALK_Y})`,
		);
	}
};
