import { logState } from './logging.js';
import { state, MainStates } from './script-state.js';
import { TravelToRock } from './State/travel-to-rock.js';
import { Mining } from './State/mining.js';
import { OpeningDepositBox } from './State/opening-deposit-box.js';
import { DepositingItems } from './State/depositing-items.js';

export * from './script-state.js';

export const stateManager = (): void => {
	if (state.lastLoggedMainState !== state.mainState) {
		logState(`State changed to: ${state.mainState}`);
		state.lastLoggedMainState = state.mainState;
	}

	switch (state.mainState) {
		case MainStates.TRAVEL_TO_ROCK: {
			TravelToRock();
			break;
		}
		case MainStates.MINING: {
			Mining();
			break;
		}
		case MainStates.OPENING_DEPOSIT_BOX: {
			OpeningDepositBox();
			break;
		}
		case MainStates.DEPOSITING_ITEMS: {
			DepositingItems();
			break;
		}
	}
};
