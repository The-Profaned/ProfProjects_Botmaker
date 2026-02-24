import {
	BANK_DEPOSIT_WIDGET_1,
	BANK_DEPOSIT_WIDGET_2,
	BANK_WIDGET_IDENTIFIER,
	BANK_WIDGET_OPCODE,
	BANK_WIDGET_PARAM,
} from '../constants.js';
import { logBank } from '../logging.js';
import { state, MainStates } from '../script-state.js';

export const DepositingItems = (): void => {
	if (!bot.bank.isOpen()) {
		if (state.bankOpenAttempts < 3) {
			logBank('Bank not open yet, retrying');
			state.mainState = MainStates.OPENING_BANK;
		} else {
			logBank('Failed to open bank, moving back to trees');
			state.mainState = MainStates.WOODCUTTING;
		}
		return;
	}

	logBank('Depositing logs using bank widgets...');
	bot.widgets.interactSpecifiedWidget(
		BANK_DEPOSIT_WIDGET_1,
		BANK_WIDGET_IDENTIFIER,
		BANK_WIDGET_OPCODE,
		BANK_WIDGET_PARAM,
	);
	bot.widgets.interactSpecifiedWidget(
		BANK_DEPOSIT_WIDGET_2,
		BANK_WIDGET_IDENTIFIER,
		BANK_WIDGET_OPCODE,
		BANK_WIDGET_PARAM,
	);

	state.mainState = MainStates.CLOSING_BANK;
};
