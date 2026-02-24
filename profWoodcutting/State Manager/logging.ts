import { LOG_COLOR } from '../../imports/logger.js';

const ENABLE_WOODCUTTING_LOGGING: boolean = true;
const ENABLE_STATE_LOGGING: boolean = true;
const ENABLE_OBJECT_LOGGING: boolean = true;
const ENABLE_BANK_LOGGING: boolean = true;
const ENABLE_SPECIAL_ATTACK_LOGGING: boolean = true;

let lastLoggedMessage: string = '';

const logMessage = (
	source: string,
	message: string,
	color: typeof LOG_COLOR.BLUE,
): void => {
	const fullMessage = `[${source}] ${message}`;
	if (fullMessage === lastLoggedMessage) return;
	lastLoggedMessage = fullMessage;
	log.printRGB(fullMessage, color.r, color.g, color.b);
};

export const logWoodcutting = (message: string): void => {
	if (!ENABLE_WOODCUTTING_LOGGING) return;
	logMessage('woodcutting', message, LOG_COLOR.BLUE);
};

export const logState = (message: string): void => {
	if (!ENABLE_STATE_LOGGING) return;
	logMessage('state', message, LOG_COLOR.GOLD);
};

export const logObject = (message: string): void => {
	if (!ENABLE_OBJECT_LOGGING) return;
	logMessage('animation', message, LOG_COLOR.CORAL);
};

export const logBank = (message: string): void => {
	if (!ENABLE_BANK_LOGGING) return;
	logMessage('bank', message, LOG_COLOR.EMERALD);
};

export const logSpecial = (message: string): void => {
	if (!ENABLE_SPECIAL_ATTACK_LOGGING) return;
	logMessage('special', message, LOG_COLOR.EMERALD);
};
