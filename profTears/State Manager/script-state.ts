import type { State } from '../../imports/types.js';

export enum MainStates {
	START_STATE = 'start_state',
	TALK_TO_JUNA = 'talk_to_juna',
	NAVIGATE_TO_JUNA = 'navigate_to_juna',
	WALK_IN_CAVE = 'walk_in_cave',
	CLICK_BLUE_TEARS = 'click_blue_tears',
	NAVIGATE_TO_CAVE = 'navigate_to_cave',
}

export type NavigateToCaveSubState = '' | 'get_to_bank' | 'find_teleport';

export type TearsScriptState = State & {
	mainState: MainStates;
	subState: NavigateToCaveSubState;
	scriptEnding: boolean;
	minigameEntered: boolean;
	pendingUnequipItemIds: number[];
	junaInteractionTick: number;
};

export const state: TearsScriptState = {
	debugEnabled: true,
	debugFullState: false,
	failureCounts: {},
	failureOrigin: '',
	lastFailureKey: '',
	mainState: MainStates.START_STATE,
	scriptInitalized: false,
	scriptName: 'profTears',
	subState: '',
	uiCompleted: true,
	timeout: 0,
	gameTick: 0,
	scriptEnding: false,
	minigameEntered: false,
	pendingUnequipItemIds: [],
	junaInteractionTick: -1,
};
