import { DEPOSIT_BOX_ACTION, MAX_DEPOSIT_OPEN_ATTEMPTS } from '../constants.js';
import { logDeposit } from '../logging.js';
import { findClosestDepositBox, isInventoryFull } from '../mining-utils.js';
import { state, MainStates } from '../script-state.js';

const DEPOSIT_INTERACT_TILE = {
	x: 3307,
	y: 12443,
	plane: 0,
};

const isPlayerOnDepositInteractTile = (
	player: net.runelite.api.Player,
): boolean => {
	const location = player.getWorldLocation();
	if (!location) return false;

	return (
		location.getX() === DEPOSIT_INTERACT_TILE.x &&
		location.getY() === DEPOSIT_INTERACT_TILE.y &&
		location.getPlane() === DEPOSIT_INTERACT_TILE.plane
	);
};

export const OpeningDepositBox = (): void => {
	if (!isInventoryFull()) {
		state.hasVerifiedDepositTile = false;
		state.isWaitingForDepositWidget = false;
		state.depositWidgetReady = false;
		state.mainState = MainStates.TRAVEL_TO_ROCK;
		return;
	}

	if (state.depositWidgetReady) {
		state.mainState = MainStates.DEPOSITING_ITEMS;
		return;
	}

	if (state.isWaitingForDepositWidget) {
		if (state.ticksUntilNextAction > 0) {
			state.ticksUntilNextAction--;
			return;
		}

		state.isWaitingForDepositWidget = false;
		state.depositWidgetReady = true;
		state.mainState = MainStates.DEPOSITING_ITEMS;
		return;
	}

	state.hasVerifiedDepositTile = false;

	const depositBox = findClosestDepositBox();
	if (!depositBox) {
		logDeposit('Deposit box object not found.');
		state.isWaitingForDepositWidget = false;
		state.depositWidgetReady = false;
		return;
	}

	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;

	if (!isPlayerOnDepositInteractTile(player)) {
		if (bot.localPlayerMoving()) return;
		bot.walking.walkToWorldPoint(
			DEPOSIT_INTERACT_TILE.x,
			DEPOSIT_INTERACT_TILE.y,
		);
		return;
	}

	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	bot.objects.interactSuppliedObject(depositBox, DEPOSIT_BOX_ACTION);
	state.depositOpenAttempts++;
	state.ticksUntilNextAction = 2;
	state.isWaitingForDepositWidget = true;

	if (state.depositOpenAttempts <= MAX_DEPOSIT_OPEN_ATTEMPTS) return;

	logDeposit('Deposit box did not open after attempts. Returning to mining.');
	state.depositOpenAttempts = 0;
	state.isWaitingForDepositWidget = false;
	state.depositWidgetReady = false;
	state.mainState = MainStates.TRAVEL_TO_ROCK;
};
