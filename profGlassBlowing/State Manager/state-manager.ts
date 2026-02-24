import { logState } from './logging.js';
import { state, MainStates } from './script-state.js';
import { Banking } from './State/banking.js';
import { TravelToRowboat } from './State/travel-to-rowboat.js';
import { Glassblowing } from './State/glassblowing.js';
import { LootingSeaweedSpore } from './State/looting-seaweed-spore.js';
import { SporesOnly } from './State/spores-only.js';
import { ReturnToBank } from './State/return-to-bank.js';

export * from './script-state.js';

export const stateManager = (): void => {
	if (state.lastLoggedMainState !== state.mainState) {
		logState(`State changed to: ${state.mainState}`);
		state.lastLoggedMainState = state.mainState;
	}

	switch (state.mainState) {
		case MainStates.BANKING: {
			Banking();
			break;
		}
		case MainStates.TRAVEL_TO_ROWBOAT: {
			TravelToRowboat();
			break;
		}
		case MainStates.GLASSBLOWING: {
			Glassblowing();
			break;
		}
		case MainStates.LOOTING_SEAWEED_SPORE: {
			LootingSeaweedSpore();
			break;
		}
		case MainStates.SPORES_ONLY: {
			SporesOnly();
			break;
		}
		case MainStates.RETURN_TO_BANK: {
			ReturnToBank();
			break;
		}
	}
};
