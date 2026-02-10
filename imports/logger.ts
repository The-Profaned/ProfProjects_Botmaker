// imports
import { State } from './types.js';

// Logger function to log messages based on type and state settings
export const logger = (
	state: State | null | undefined,
	type: 'all' | 'debug',
	source: string,
	message: string, // Logs type + source of the message + the message itself
): void => {
	const logMessage = `[${source}] ${message}`;
	if (type === 'all') log.printGameMessage(logMessage); // Always log 'all' messages to game chat
	if (!state) {
		if (type === 'all') {
			log.print(logMessage);
		}
		return;
	}
	if (type === 'all' || (type === 'debug' && state.debugEnabled)) {
		log.print(logMessage); // Log 'debug' messages to log only if debug is enabled in state
	}
};
