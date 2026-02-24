import type { State } from '../../imports/types.js';

export enum MainStates {
	WOODCUTTING = 'WOODCUTTING',
	TRAVELING = 'TRAVELING',
	BANKING = 'BANKING',
	MOVING_TO_BANK = 'MOVING_TO_BANK',
	OPENING_BANK = 'OPENING_BANK',
	DEPOSITING_ITEMS = 'DEPOSITING_ITEMS',
	CLOSING_BANK = 'CLOSING_BANK',
}

export type WoodcuttingScriptState = State & {
	mainState: MainStates;
	isCurrentlyAnimating: boolean;
	hasInteractedWithTree: boolean;
	ticksUntilNextAction: number;
	bankOpenAttempts: number;
	lastSpecialAttackEnergy: number;
	ticksUntilNextSpecial: number;
	hasUsedSpecialThisSession: boolean;
	justUsedSpecialAttack: boolean;
	activeTreeObjectId: number;
	activeLogsItemId: number;
	treeTypeName: string;
	lastLoggedMainState: MainStates | null;
	isTravelingToBank: boolean;
	previousMainState: MainStates;
	hasClimbedRocks: boolean;
	hasCrossedSteppingStone: boolean;
	activeClimbRocksObjectId: number;
	travelingStep: number;
	idleTicks: number;
	idleResetThreshold: number;
	uiCompleted?: boolean;
	initialStateCheckDone: boolean;
};

export const state: WoodcuttingScriptState = {
	debugEnabled: true,
	debugFullState: false,
	gameTick: 0,
	mainState: MainStates.WOODCUTTING,
	subState: '',
	scriptName: 'profWoodcutting',
	timeout: 0,
	isCurrentlyAnimating: false,
	hasInteractedWithTree: false,
	ticksUntilNextAction: 0,
	bankOpenAttempts: 0,
	lastSpecialAttackEnergy: 0,
	ticksUntilNextSpecial: 0,
	hasUsedSpecialThisSession: false,
	justUsedSpecialAttack: false,
	activeTreeObjectId: 10834,
	activeLogsItemId: 1513,
	treeTypeName: 'Magic',
	lastLoggedMainState: null,
	isTravelingToBank: false,
	previousMainState: MainStates.WOODCUTTING,
	hasClimbedRocks: false,
	hasCrossedSteppingStone: false,
	activeClimbRocksObjectId: 0,
	travelingStep: 0,
	idleTicks: 0,
	idleResetThreshold: 10,
	initialStateCheckDone: false,
};
