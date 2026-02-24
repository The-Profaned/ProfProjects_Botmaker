type RGB = {
	r: number;
	g: number;
	b: number;
};

const LOG_COLOR = {
	SCRIPT: { r: 17, g: 138, b: 178 } as RGB,
	STATE: { r: 255, g: 209, b: 102 } as RGB,
	BANK: { r: 6, g: 214, b: 160 } as RGB,
	TRAVEL: { r: 247, g: 140, b: 107 } as RGB,
};

let lastLoggedMessage: string = '';

const logMessage = (source: string, message: string, color: RGB): void => {
	const fullMessage = `[${source}] ${message}`;
	if (fullMessage === lastLoggedMessage) return;
	lastLoggedMessage = fullMessage;
	log.printRGB(fullMessage, color.r, color.g, color.b);
};

export const logGlass = (message: string): void => {
	logMessage('glass', message, LOG_COLOR.SCRIPT);
};

export const logState = (message: string): void => {
	logMessage('state', message, LOG_COLOR.STATE);
};

export const logBank = (message: string): void => {
	logMessage('bank', message, LOG_COLOR.BANK);
};

export const logTravel = (message: string): void => {
	logMessage('travel', message, LOG_COLOR.TRAVEL);
};
