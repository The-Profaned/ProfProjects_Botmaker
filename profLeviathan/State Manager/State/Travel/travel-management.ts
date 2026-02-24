import { MainStates, state, TravelSubStates } from '../../script-state.js';
import { logger } from '../../../../imports/logger.js';
import {
	checkPrayer,
	prayers,
	togglePrayer,
} from '../../../../imports/prayer-functions.js';

export function travelManagement() {
	enterArena();
}

// all travel related functions go here --- eg. travleing on boat to levi/handholds/etc.

const leviHandHolds = [47592, 47593];
let lastLoggedHandholdState = '';
let hasActivatedEntryRangedPrayer = false;

const activateBestRangedPrayerOnEntry = (): void => {
	if (hasActivatedEntryRangedPrayer) return;

	const rangedPrayerPriority: Array<'rigour' | 'eagleEye'> = [
		'rigour',
		'eagleEye',
	];

	for (const prayerKey of rangedPrayerPriority) {
		if (checkPrayer(state, prayerKey)) {
			hasActivatedEntryRangedPrayer = true;
			logger(
				state,
				'debug',
				'Travel',
				`${prayerKey} already active on combat entry.`,
			);
			return;
		}

		const activated = togglePrayer(state, prayerKey);
		if (activated || client.isPrayerActive(prayers[prayerKey])) {
			hasActivatedEntryRangedPrayer = true;
			logger(
				state,
				'debug',
				'Travel',
				`Activated ${prayerKey} on combat entry.`,
			);
			return;
		}
	}

	logger(
		state,
		'debug',
		'Travel',
		'Could not activate entry ranged prayer (none available or prayer unavailable).',
	);
};

function enterArena() {
	// If handhold already used, wait for it to disappear before entering combat
	if (state.handHoldUsed) {
		if (bot.objects.isNearIds(leviHandHolds, 10)) {
			// Handhold still present, wait for animation to complete
			if (lastLoggedHandholdState !== 'waiting') {
				logger(
					state,
					'debug',
					'Travel',
					'Waiting for handhold to disappear...',
				);
				lastLoggedHandholdState = 'waiting';
			}
			return;
		}
		// Handhold has disappeared, transition to combat
		if (lastLoggedHandholdState !== 'entering') {
			logger(state, 'debug', 'Travel', 'Entered arena, starting combat!');
			lastLoggedHandholdState = 'entering';
		}
		activateBestRangedPrayerOnEntry();
		state.mainState = MainStates.COMBAT;
		return;
	}

	// Handhold not yet used, check if we're near it
	if (!bot.objects.isNearIds(leviHandHolds, 10)) {
		state.travelState.subState = TravelSubStates.PATHING;
		return;
	}

	// Click the handhold once
	logger(
		state,
		'debug',
		'Travel',
		'Interacting with hand holds, Preparing to murder Leviathan',
	);
	bot.objects.interactObject('Handhold', 'Climb');
	state.handHoldUsed = true;
}
