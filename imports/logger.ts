// imports
import { State } from './types.js';

// Logger function to log messages based on type and state settings
export type LogColor = {
	r: number;
	g: number;
	b: number;
};

// Predefined log colors
//./images/color pallate.png
export const LOG_COLOR_GRAY: LogColor = { r: 128, g: 128, b: 128 };
export const LOG_COLOR_PINK: LogColor = { r: 239, g: 71, b: 111 };
export const LOG_COLOR_CORAL: LogColor = { r: 247, g: 140, b: 107 };
export const LOG_COLOR_GOLD: LogColor = { r: 255, g: 209, b: 102 };
export const LOG_COLOR_EMERALD: LogColor = { r: 6, g: 214, b: 160 };
export const LOG_COLOR_BLUE: LogColor = { r: 17, g: 138, b: 178 };
export const LOG_COLOR_TEAL: LogColor = { r: 7, g: 59, b: 76 };

export const LOG_COLOR_DEFAULT: LogColor = LOG_COLOR_GRAY;

export const LOG_COLOR = {
	GRAY: LOG_COLOR_GRAY,
	PINK: LOG_COLOR_PINK,
	CORAL: LOG_COLOR_CORAL,
	GOLD: LOG_COLOR_GOLD,
	EMERALD: LOG_COLOR_EMERALD,
	BLUE: LOG_COLOR_BLUE,
	TEAL: LOG_COLOR_TEAL,
	DEFAULT: LOG_COLOR_DEFAULT,
} as const;

export const logger = (
	state: State | null | undefined,
	type: 'all' | 'debug',
	source: string,
	message: string, // Logs type + source of the message + the message itself
	color?: LogColor,
): void => {
	const logMessage = `[${source}] ${message}`;
	const printToLog = (): void => {
		const chosenColor = color ?? LOG_COLOR_DEFAULT;
		log.printRGB(logMessage, chosenColor.r, chosenColor.g, chosenColor.b);
	};
	if (type === 'all') log.printGameMessage(logMessage); // Always log 'all' messages to game chat
	if (!state) {
		if (type === 'all') {
			printToLog();
		}
		return;
	}
	if (type === 'all' || (type === 'debug' && state.debugEnabled)) {
		printToLog(); // Log 'debug' messages to log only if debug is enabled in state
	}
};
