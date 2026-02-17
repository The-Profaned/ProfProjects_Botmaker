import { logger } from '../../../imports/logger.js';
import { state } from '../state-manager.js';
import { bankManager } from './Banking/bank-manager.js';
import { inventoryManager } from './Banking/inventory-manager.js';
import { BankingSubStates } from '../state-manager.js';

// Banking State Manager
export function Banking() {
	const bankingState = state.bankingState;
	logger(state, 'debug', 'Banking', `${bankingState.subState}`);

	switch (bankingState.subState) {
		case BankingSubStates.BANK: {
			bankManager();
			break;
		}
		case BankingSubStates.INVENTORY: {
			inventoryManager();
			break;
		}
		default: {
			bankingState.subState = BankingSubStates.BANK;
			break;
		}
	}
}
