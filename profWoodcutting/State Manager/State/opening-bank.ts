import { logBank } from '../logging.js';
import { state, MainStates } from '../script-state.js';

export const OpeningBank = (): void => {
	if (bot.bank.isOpen()) {
		logBank('Bank opened successfully');
		state.mainState = MainStates.DEPOSITING_ITEMS;
		return;
	}

	state.bankOpenAttempts++;
	if (state.bankOpenAttempts > 5) {
		logBank(
			'Bank failed to open after multiple attempts, returning to trees',
		);
		state.mainState = MainStates.WOODCUTTING;
		state.bankOpenAttempts = 0;
		return;
	}

	logBank(`Waiting for bank to open (attempt ${state.bankOpenAttempts})`);
};
