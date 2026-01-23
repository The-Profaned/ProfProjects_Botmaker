//imports
import {logger} from './logger.js';
import {State} from './types.js';

export const debugFunction = {
    stateDebugger: (state: State, prefix = ''): void => {
        for (const [key, value] of Object.entries(object)) {
            const type = typeof value;
            if (type === 'string' || type === 'number' || type === 'boolean') {
                logger(state, 'debug', 'stateDebugger', `${prefix}${key}: ${String(value)}`);
            } else if (Array.isArray(value)) {
                logger(state, 'debug', 'stateDebugger', `${prefix}${key} Length: ${value.length}`);
            } else if (type == 'object' && value !== null) {
                recurse(value as Record<string, unknown>, `${prefix}${key}.`)
            }           
        };
        recurse(state, prefix);
    }
};