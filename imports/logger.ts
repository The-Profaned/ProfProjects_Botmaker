import {State} from './types.js';

export const logger = (state: State, type: 'all' | 'debug', source: string, message: string, // Logs type + source of the message + the message itself
    ): void => {const logMessage = `[${source}] ${message}`;
        if (type === 'all') bot.printGameMessage(logMessage); // Always log 'all' messages to game chat
        if (type == 'all' || (type == 'debug' && state.debugEnabled)) bot.printLogMessage(logMessage); // Log 'debug' messages to log only if debug is enabled in state
    };