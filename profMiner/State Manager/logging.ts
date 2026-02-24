import { LOG_COLOR } from '../../imports/logger.js';

const ENABLE_MINER_LOGGING: boolean = true;
const ENABLE_STATE_LOGGING: boolean = true;
const ENABLE_MINING_LOGGING: boolean = true;
const ENABLE_DEPOSIT_LOGGING: boolean = true;

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

export const logMiner = (message: string): void => {
	if (!ENABLE_MINER_LOGGING) return;
	logMessage('miner', message, LOG_COLOR.BLUE);
};

export const logState = (message: string): void => {
	if (!ENABLE_STATE_LOGGING) return;
	logMessage('state', message, LOG_COLOR.GOLD);
};

export const logMining = (message: string): void => {
	if (!ENABLE_MINING_LOGGING) return;
	logMessage('mining', message, LOG_COLOR.CORAL);
};

export const logDeposit = (message: string): void => {
	if (!ENABLE_DEPOSIT_LOGGING) return;
	logMessage('deposit', message, LOG_COLOR.EMERALD);
};
