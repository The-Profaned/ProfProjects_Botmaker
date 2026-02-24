import {
	DEPOSIT_WIDGET_ID,
	DEPOSIT_WIDGET_IDENTIFIER,
	DEPOSIT_WIDGET_OPCODE,
	DEPOSIT_WIDGET_PARAM0,
	MAX_DEPOSIT_ACTION_ATTEMPTS,
} from '../constants.js';
import { logDeposit } from '../logging.js';
import { isInventoryFull } from '../mining-utils.js';
import { state, MainStates } from '../script-state.js';

const MAX_WIDGET_CLICK_ATTEMPTS_BEFORE_FALLBACK = 3;

export const DepositingItems = (): void => {
	if (!bot.bank.isOpen() && !state.depositWidgetReady) {
		state.depositOpenAttempts = 0;
		state.hasVerifiedDepositTile = false;
		state.isWaitingForDepositWidget = false;
		state.mainState = MainStates.OPENING_DEPOSIT_BOX;
		return;
	}

	if (!isInventoryFull()) {
		state.depositActionAttempts = 0;
		state.hasInteractedWithRock = false;
		state.hasVerifiedDepositTile = false;
		state.isWaitingForDepositWidget = false;
		state.depositWidgetReady = false;
		state.mainState = MainStates.TRAVEL_TO_ROCK;
		return;
	}

	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	bot.widgets.interactSpecifiedWidget(
		DEPOSIT_WIDGET_ID,
		DEPOSIT_WIDGET_IDENTIFIER,
		DEPOSIT_WIDGET_OPCODE,
		DEPOSIT_WIDGET_PARAM0,
	);
	logDeposit(`Clicked deposit widget with param0=${DEPOSIT_WIDGET_PARAM0}`);
	state.depositActionAttempts++;
	state.ticksUntilNextAction = 2;

	if (
		state.depositActionAttempts >= MAX_WIDGET_CLICK_ATTEMPTS_BEFORE_FALLBACK
	) {
		logDeposit('Widget click not activating. Trying depositAll fallback.');
		if (bot.bank.isOpen()) {
			bot.bank.depositAll();
		}
		state.depositActionAttempts = 0;
		state.ticksUntilNextAction = 2;
		return;
	}

	if (state.depositActionAttempts <= MAX_DEPOSIT_ACTION_ATTEMPTS) return;

	logDeposit('Deposit widget interaction timed out. Retrying deposit.');
	state.depositActionAttempts = 0;
	state.ticksUntilNextAction = 2;
};
