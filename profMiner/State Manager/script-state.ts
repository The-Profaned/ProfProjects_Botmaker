import type { State } from '../../imports/types.js';
import { RockType, SELECTED_ROCK_TYPE } from './constants.js';

export enum MainStates {
	TRAVEL_TO_ROCK = 'TRAVEL_TO_ROCK',
	MINING = 'MINING',
	OPENING_DEPOSIT_BOX = 'OPENING_DEPOSIT_BOX',
	DEPOSITING_ITEMS = 'DEPOSITING_ITEMS',
}

export type MinerScriptState = State & {
	mainState: MainStates;
	isCurrentlyAnimating: boolean;
	hasInteractedWithRock: boolean;
	ticksUntilNextAction: number;
	depositOpenAttempts: number;
	depositActionAttempts: number;
	hasVerifiedDepositTile: boolean;
	isWaitingForDepositWidget: boolean;
	depositWidgetReady: boolean;
	selectedRockType: RockType;
	activeRockType: RockType;
	lastLoggedMainState: MainStates | null;
};

export const state: MinerScriptState = {
	debugEnabled: true,
	debugFullState: false,
	gameTick: 0,
	mainState: MainStates.TRAVEL_TO_ROCK,
	subState: '',
	scriptName: 'profMiner',
	timeout: 0,
	isCurrentlyAnimating: false,
	hasInteractedWithRock: false,
	ticksUntilNextAction: 0,
	depositOpenAttempts: 0,
	depositActionAttempts: 0,
	hasVerifiedDepositTile: false,
	isWaitingForDepositWidget: false,
	depositWidgetReady: false,
	selectedRockType: SELECTED_ROCK_TYPE,
	activeRockType: SELECTED_ROCK_TYPE,
	lastLoggedMainState: null,
};
