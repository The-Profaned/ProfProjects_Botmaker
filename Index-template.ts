// Imports
import { logger } from './imports/logger.js';
import { createUi } from './imports/ui_functions.js';
import { generalFunctions } from './imports/general_function.js';

// variables for script state
const state = {
  debugEnabled: false,
  debugFullState: false,
  failureCounts: {},
  failureOrigin: '',
  lastFailureKey: '',
  mainState: 'start_state',
  scriptInitialized: false,
  scriptName: 'Script Name',
  uiCompleted: false,
  timeout: 0,
  gameTick: 0,
  sub_State: '',
};

// On Start of Script
export const onStart = () => {
  try { 
    createUi(state);
    logger(state, 'all', 'script', `${state.scriptName} started.`);
  } catch (error) {
    logger(state, 'all', 'Script', (error as Error).toString());
    bot.terminate();
  }
};

// On Game Tick
export const onGameTick = () => {
  bot.breakHandler.setBreakHandlerStatus(false);
  try {
    if (state.uiCompleted) {
      if (!state.scriptInitialized) scriptInitialized();
      state.scriptInitialized = true;
    } else {
      return;
    }
    if (!generalFunctions.gameTick(state)) return;

    // Enable break handler only when not banking, idle, not webwalking, and in main state
    if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState == 'start_state') bot.breakHandler.setBreakHandlerStatus(true);
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', (error as Error).toString());
    bot.terminate();
  }
};

const scriptInitialized = () => bot.printGameMessage('Script initialized.');

export const onEnd = () => generalFunctions.endScript(state);

const stateManager = () => {
  logger(state, 'debug', 'stateManager', `${state.mainState}`);
  switch(state.mainState) {
    
    case 'start_state': {
      break;
    }
    case 'next_state': {
      break;
    }
    default: {
      state.mainState = 'start_state';
        break;
    }
  }
};