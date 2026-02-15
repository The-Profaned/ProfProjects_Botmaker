import { endScript, gameTick } from '../imports/general-function.js';
import { logger } from '../imports/logger.js';
import type { State } from '../imports/types.js';
import {
	followPath,
	getTotalChinsThrown,
	handleAggroReset,
	handleCombatLoop,
	initializeChinBurstUtils,
	initializeCombatCycle,
	isOnCombatTile,
	logCurrentAction,
	logStateChange,
	moveToStartAndEnter,
	resetAggroState,
	resetChinBurstRuntime,
	resetPathIndex,
	setCurrentAction,
} from './chinburst-functions.js';
import { initializeUI, profChinBurstUI } from './ui.js';

const state: State = {
	debugEnabled: true,
	debugFullState: false,
	failureCounts: {},
	failureOrigin: '',
	lastFailureKey: '',
	mainState: 'start_state',
	scriptInitalized: false,
	scriptName: 'profChinBurst',
	uiCompleted: true,
	timeout: 0,
	gameTick: 0,
	subState: '',
};

export function onStart(): void {
	state.uiCompleted = true;
	initializeUI(state);
	initializeChinBurstUtils(state, profChinBurstUI);
	resetChinBurstRuntime();
	profChinBurstUI.disableBotMakerOverlay();
	profChinBurstUI.start();
	profChinBurstUI.currentAction = 'Starting';
	logger(state, 'all', 'script', `${state.scriptName} started.`);
}

export function onEnd(): void {
	profChinBurstUI.stop();
	profChinBurstUI.enableBotMakerOverlay();
	logger(
		state,
		'all',
		'summary',
		`Total chins obliterated: ${getTotalChinsThrown()}. You are an evil person.`,
	);
	logger(state, 'all', 'script', `${state.scriptName} ended.`);
	endScript(state);
}

export function onGameTick(): void {
	try {
		if (state.uiCompleted) {
			if (!state.scriptInitalized) {
				log.printGameMessage('Script initialized.');
			}
			state.scriptInitalized = true;
		} else {
			return;
		}

		if (!gameTick(state)) return;
		stateManager();
		logCurrentAction();
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

function stateManager(): void {
	logStateChange();
	switch (state.mainState) {
		case 'start_state': {
			setCurrentAction('Moving to start');
			const player = client.getLocalPlayer();
			if (player) {
				const playerLoc = player.getWorldLocation();
				if (isOnCombatTile(playerLoc)) {
					state.mainState = 'combat';
					initializeCombatCycle();
					return;
				}
			}
			if (!moveToStartAndEnter()) {
				return;
			}
			state.mainState = 'walk_path';
			resetPathIndex();
			break;
		}
		case 'walk_path': {
			setCurrentAction('Following path');
			if (!followPath()) {
				return;
			}
			state.mainState = 'combat';
			initializeCombatCycle();
			break;
		}
		case 'combat': {
			setCurrentAction('Combat');
			if (!handleCombatLoop()) {
				return;
			}
			state.mainState = 'reset_aggro';
			resetAggroState();
			break;
		}
		case 'reset_aggro': {
			setCurrentAction('Reset aggro');
			if (!handleAggroReset()) {
				return;
			}
			state.mainState = 'combat';
			initializeCombatCycle();
			break;
		}
		default: {
			state.mainState = 'start_state';
			break;
		}
	}
}
