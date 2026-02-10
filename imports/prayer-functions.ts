// imports
import { logger } from './logger.js';
import { State } from './types.js';

// Prayer shorthands
export const prayers = {
	protMelee: net.runelite.api.Prayer.PROTECT_FROM_MELEE,
	protMage: net.runelite.api.Prayer.PROTECT_FROM_MAGIC,
	protRange: net.runelite.api.Prayer.PROTECT_FROM_MISSILES,
	piety: net.runelite.api.Prayer.PIETY,
	eagleEye: net.runelite.api.Prayer.EAGLE_EYE,
	rigour: net.runelite.api.Prayer.RIGOUR,
	mysticMight: net.runelite.api.Prayer.MYSTIC_MIGHT,
	augury: net.runelite.api.Prayer.AUGURY,
	redemption: net.runelite.api.Prayer.REDEMPTION,
	smite: net.runelite.api.Prayer.SMITE,
};

// Prayer-related utility functions

// Check if specified prayer is currently active
export const checkPrayer = (
	state: State,
	prayerKey: keyof typeof prayers,
): boolean => {
	const prayer = prayers[prayerKey];
	if (!prayer) {
		logger(
			state,
			'debug',
			'checkPrayer',
			`Unknown prayer key: ${prayerKey}`,
		);
		return false;
	}
	const active = client.isPrayerActive(prayer);
	logger(
		state,
		'debug',
		'checkPrayer',
		`${prayerKey} is ${active ? 'active' : 'inactive'}`,
	);
	return active;
};

// Activate specified prayer
export const togglePrayer = (
	state: State,
	prayerKey: keyof typeof prayers,
): boolean => {
	const prayer = prayers[prayerKey];
	logger(state, 'debug', 'togglePrayer', `Activating prayer: ${prayerKey}`);
	if (!prayer) {
		logger(
			state,
			'debug',
			'togglePrayer',
			`Unknown prayer key: ${prayerKey}`,
		);
		return false;
	}
	if (client.isPrayerActive(prayer)) {
		logger(state, 'debug', 'togglePrayer', `${prayerKey} already active`);
		return true;
	}
	bot.prayer.togglePrayer(prayer, true);
	const nowActive = client.isPrayerActive(prayer);
	logger(
		state,
		'debug',
		'togglePrayer',
		`${prayerKey} activated ${nowActive ? 'successfully' : '(failed)'}`,
	);
	return nowActive;
};

// Get the currently active protection prayer
export const getActivePrayer = (state: State): keyof typeof prayers | null => {
	const protectionPrayers: Array<keyof typeof prayers> = [
		'protMage',
		'protRange',
		'protMelee',
	];

	for (const prayer of protectionPrayers) {
		if (checkPrayer(state, prayer)) {
			logger(
				state,
				'debug',
				'getActivePrayer',
				`Active prayer: ${prayer}`,
			);
			return prayer;
		}
	}

	logger(state, 'debug', 'getActivePrayer', 'No active protection prayer');
	return null;
};
