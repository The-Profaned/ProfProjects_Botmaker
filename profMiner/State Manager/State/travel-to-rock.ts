import { logMining } from '../logging.js';
import {
	getActiveRockConfig,
	toWorldPoint,
	isInventoryFull,
} from '../mining-utils.js';
import { state, MainStates } from '../script-state.js';

export const TravelToRock = (): void => {
	if (isInventoryFull()) {
		state.depositOpenAttempts = 0;
		state.depositActionAttempts = 0;
		state.mainState = MainStates.OPENING_DEPOSIT_BOX;
		return;
	}

	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;

	const activeRockConfig = getActiveRockConfig(state);
	const anchor = toWorldPoint(activeRockConfig.anchor);
	const playerLocation = player.getWorldLocation();

	if (playerLocation.distanceTo(anchor) <= 1) {
		state.mainState = MainStates.MINING;
		return;
	}

	if (bot.localPlayerMoving()) return;

	bot.walking.walkToWorldPoint(anchor.getX(), anchor.getY());
	logMining(
		`Walking to ${activeRockConfig.name} anchor (${activeRockConfig.anchor.x}, ${activeRockConfig.anchor.y}, ${activeRockConfig.anchor.plane})`,
	);
};
