// Imports
import { logger } from '../imports/logger.js';
import { createUi } from '../imports/ui-functions.js';
import { endScript, gameTick } from '../imports/general-function.js';
import { stateManager, state, MainStates } from './State Manager/state-manager.js';

// Re-export state for backward compatibility
export { state } from './State Manager/state-manager.js';

// On Start of Script
export function onStart() {
	try {
		createUi(state);
		logger(state, 'all', 'script', `${state.scriptName} started.`);
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

// On Game Tick
export function onGameTick() {
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
			state.mainState == MainStates.MOVEMENT
		)
			bot.breakHandler.setBreakHandlerStatus(true);
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
export function onEnd() {
	logger(state, 'all', 'script', `${state.scriptName} ended.`);
	endScript(state);
}
