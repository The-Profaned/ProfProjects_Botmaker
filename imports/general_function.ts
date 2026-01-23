//imports
import {debugFunctions} from './debug_functions.js';
import { logger } from './logger.js';
import {timeoutManager} from './timeout_manager.js';
import { State } from './types.js';

export const generalFunctions = {

    gameTick: (state: State): boolean => {
        try { logger(state, 'debug', 'onGameTick', `Script game tick ${state.gameTick} ----------------`);
            state.gameTick++;
            if (state.debugEnabled && state.debugFullState) debugFunctions.stateDebugger(state);
            if (state.timeout > 0) { state.timeout--;
                return false;
            }
            timeoutManager.tick();
            if (timeoutManager.isWaiting()) return false;
        } catch (error) {
            const fatalMessage = (error as Error).toString();
            logger(state, 'all', 'Script', fatalMessage);
            generalFunctions.handleFailure(state, 'gameTick', fatalMessage);
            return false;
        }
    },

    onFailures: (state: State, failureLocation: string, failureMessage: string, failureResetState?: string) => { // Handle failures with counting and possible script termination
        const failureKey = `${failureLocation} - ${failureMessage}`;
        logger(state, 'debug', 'onFailures', failureMessage);
        state.failureCounts[failureKey] = state.lastFailureKey === failureKey ? (state.failureCounts[failureKey] || 1) + 1: 1;
        state.lastFailureKey = failureKey;
        state.failureOrigin = failureKey;

        if (state.failureCounts[failureKey] >= 3) {
            logger(state, 'all', 'Script', `Fatal error: "${failureKey}" occured 3x in a row.`);
            bot.terminate();
            return;
        }
        if (failResetState) state.mainState = failureResetState;
    },

    endScript: (state: State): void => { // Gracefully termination of the script + ends walking + unregisters all events
        bot.breakHandler.setBreakHandlerStatus(false);
        bot.printGameMessage('Termination of ${state.scriptName}.');
        bot.walking.webWalkcancel();
        bot.events.unregisterAll();
    }
};