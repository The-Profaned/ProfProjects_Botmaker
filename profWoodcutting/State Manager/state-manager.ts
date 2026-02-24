import { state, MainStates } from './script-state.js';
import { logState } from './logging.js';
import { Woodcutting } from './State/woodcutting.js';
import { Traveling } from './State/traveling.js';
import { MovingToBank } from './State/moving-to-bank.js';
import { OpeningBank } from './State/opening-bank.js';
import { DepositingItems } from './State/depositing-items.js';
import { ClosingBank } from './State/closing-bank.js';

export * from './script-state.js';

export const stateManager = (): void => {
	if (state.lastLoggedMainState !== state.mainState) {
		logState(`State changed to: ${state.mainState}`);
		state.lastLoggedMainState = state.mainState;
	}

	switch (state.mainState) {
		case MainStates.WOODCUTTING: {
			Woodcutting();
			break;
		}
		case MainStates.TRAVELING: {
			Traveling();
			break;
		}
		case MainStates.MOVING_TO_BANK: {
			MovingToBank();
			break;
		}
		case MainStates.OPENING_BANK: {
			OpeningBank();
			break;
		}
		case MainStates.DEPOSITING_ITEMS: {
			DepositingItems();
			break;
		}
		case MainStates.CLOSING_BANK: {
			ClosingBank();
			break;
		}
	}
};
