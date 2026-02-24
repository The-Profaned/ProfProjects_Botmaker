import type { State } from '../../imports/types.js';
import { GlassMakeMode, SELECTED_MODE } from './constants.js';

export enum MainStates {
	BANKING = 'BANKING',
	TRAVEL_TO_ROWBOAT = 'TRAVEL_TO_ROWBOAT',
	GLASSBLOWING = 'GLASSBLOWING',
	LOOTING_SEAWEED_SPORE = 'LOOTING_SEAWEED_SPORE',
	SPORES_ONLY = 'SPORES_ONLY',
	RETURN_TO_BANK = 'RETURN_TO_BANK',
}

export type GlassMakeState = State & {
	mainState: MainStates;
	selectedMode: GlassMakeMode;
	startStateResolved: boolean;
	depositedThisBankOpen: boolean;
	bankCloseRequested: boolean;
	ticksUntilNextAction: number;
	hasClickedRowboat: boolean;
	hasTriggeredGlassblow: boolean;
	waitingForGlassDialog: boolean;
	glassDialogWaitTicks: number;
	lastLoggedMainState: MainStates | null;
};

export const state: GlassMakeState = {
	debugEnabled: true,
	debugFullState: false,
	gameTick: 0,
	mainState: MainStates.BANKING,
	subState: '',
	scriptName: 'profGlassBlowing',
	timeout: 0,
	selectedMode: SELECTED_MODE,
	startStateResolved: false,
	depositedThisBankOpen: false,
	bankCloseRequested: false,
	ticksUntilNextAction: 0,
	hasClickedRowboat: false,
	hasTriggeredGlassblow: false,
	waitingForGlassDialog: false,
	glassDialogWaitTicks: 0,
	lastLoggedMainState: null,
};
