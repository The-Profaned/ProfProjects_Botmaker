import type { State } from '../../imports/types.js';

export enum MainStates {
	START_STATE = 'start_state',
	INITIAL_TRAPS = 'initial_traps',
	AWAITING_ACTIVITY = 'awaiting_activity',
	CRITICAL_TRAP_HANDLING = 'critical_trap_handling',
	RESETTING_TRAPS = 'resetting_traps',
	MAINTAINING_TRAPS = 'maintaining_traps',
}

export type ProfChinsState = State & {
	failureCounts: Record<string, number>;
	failureOrigin: string;
	lastFailureKey: string;
	mainState: MainStates;
	scriptInitialized: boolean;
	scriptName: string;
	uiCompleted: boolean;
	timeout: number;
	gameTick: number;
	subState: string;
};

export const state: ProfChinsState = {
	debugEnabled: true,
	debugFullState: false,
	failureCounts: {},
	failureOrigin: '',
	lastFailureKey: '',
	mainState: MainStates.START_STATE,
	scriptInitialized: false,
	scriptName: 'profChins',
	uiCompleted: false,
	timeout: 0,
	gameTick: 0,
	subState: '',
};
