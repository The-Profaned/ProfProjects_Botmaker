import { ANCHOR_ROPE_OBJECT_ID } from '../constants.js';
import { logTravel } from '../logging.js';
import { findClosestAnchorRope, isAtBankReturnTile } from '../glass-utils.js';
import { MainStates, state } from '../script-state.js';

export const ReturnToBank = (): void => {
	if (isAtBankReturnTile()) {
		logTravel('Reached bank return tile. Switching to BANKING state.');
		state.mainState = MainStates.BANKING;
		state.hasTriggeredGlassblow = false;
		return;
	}

	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	const anchorRope = findClosestAnchorRope();
	if (!anchorRope) {
		logTravel(
			`Anchor rope object ${ANCHOR_ROPE_OBJECT_ID} not found nearby.`,
		);
		return;
	}

	if (bot.localPlayerMoving()) return;
	logTravel('Anchor rope found. Climbing back to bank.');
	bot.objects.interactSuppliedObject(anchorRope, 'Climb');
	state.ticksUntilNextAction = 2;
};
