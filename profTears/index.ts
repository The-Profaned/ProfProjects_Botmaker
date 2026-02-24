import { logger } from '../imports/logger.js';
import { endScript, gameTick } from '../imports/general-function.js';
import { initializeTearsUtils, resetTearsState } from './tear-utils.js';
import { stateManager } from './State Manager/state-manager.js';
import { state, MainStates } from './State Manager/script-state.js';

// On Start of Script
export function onStart(): void {
	try {
		initializeTearsUtils(state);
		resetTearsState();
		// No UI for this script, mark complete to allow tick processing.
		state.uiCompleted = true;
		state.scriptInitalized = false;
		state.mainState = MainStates.START_STATE;
		state.subState = '';
		state.gameTick = 0;
		state.scriptEnding = false;
		state.minigameEntered = false;
		state.pendingUnequipItemIds = [];
		state.junaInteractionTick = -1;
		logger(state, 'all', 'script', `${state.scriptName} started.`);
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

// On Game Tick
export function onGameTick(): void {
	bot.breakHandler.setBreakHandlerStatus(false);
	try {
		if (state.uiCompleted) {
			if (!state.scriptInitalized) notifyScriptInitialized();
			state.scriptInitalized = true;
		} else {
			return;
		}
		if (!gameTick(state)) return;

		// Enable break handler only when not banking, idle, not webwalking, and in main state
		if (
			!bot.bank.isBanking() &&
			bot.localPlayerIdle() &&
			!bot.walking.isWebWalking() &&
			state.mainState === MainStates.START_STATE
		)
			bot.breakHandler.setBreakHandlerStatus(true);
		bot.widgets.handleDialogue([]);
		stateManager();
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

// Script Initialized Notification
function notifyScriptInitialized(): void {
	log.printGameMessage('Script initialized.');
}

// On End of Script
export function onEnd(): void {
	logger(state, 'all', 'script', `${state.scriptName} ended.`);
	endScript(state);
}
