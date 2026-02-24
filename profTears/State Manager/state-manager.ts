import { state, MainStates } from './script-state.js';
import { StartState } from './State/start-state.js';
import { TalkToJuna } from './State/talk-to-juna.js';
import { NavigateToJuna } from './State/navigate-to-juna.js';
import { WalkInCave } from './State/walk-in-cave.js';
import { ClickBlueTears } from './State/click-blue-tears.js';
import { NavigateToCave } from './State/navigate-to-cave.js';

export * from './script-state.js';

export const stateManager = (): void => {
	switch (state.mainState) {
		case MainStates.START_STATE: {
			StartState();
			break;
		}
		case MainStates.TALK_TO_JUNA: {
			TalkToJuna();
			break;
		}
		case MainStates.NAVIGATE_TO_JUNA: {
			NavigateToJuna();
			break;
		}
		case MainStates.WALK_IN_CAVE: {
			WalkInCave();
			break;
		}
		case MainStates.CLICK_BLUE_TEARS: {
			ClickBlueTears();
			break;
		}
		case MainStates.NAVIGATE_TO_CAVE: {
			NavigateToCave();
			break;
		}
		default: {
			state.mainState = MainStates.START_STATE;
			break;
		}
	}
};
