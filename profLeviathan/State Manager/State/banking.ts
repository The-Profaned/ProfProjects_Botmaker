import { BankingSubStates, state } from '../script-state.js';
import { logger } from '../../../imports/logger.js';

// Banking State Manager
export function Banking() {
	const bankingState = state.bankingState;

	// Only log when sub-state changes
	if (state.lastLoggedBankingSubState !== bankingState.subState) {
		logger(state, 'debug', 'Banking', `${bankingState.subState}`);
		state.lastLoggedBankingSubState = bankingState.subState;
	}

	switch (bankingState.subState) {
		case BankingSubStates.BANK: {
			break;
		}
		case BankingSubStates.INVENTORY: {
			break;
		}
		default: {
			bankingState.subState = BankingSubStates.BANK;
			break;
		}
	}
}
