import { itemIds } from './item-ids.js';
import { playerFunctions } from './player-functions.js';
import type { State } from './types.js';
import { logger } from './logger.js';

// Attack speed table: itemId => ticks between attacks
export const weaponAttackSpeeds: Record<number, number> = {
	// Example: weapon IDs with their attack speeds (in ticks)
	// 1 tick = 0.6 seconds
	// Common speeds: 1, 2, 3, 4, 5, 6 ticks
	[itemIds.tBow]: 5,
};

export const attackTimers = {
	// Get attack speed for a weapon by item ID
	getAttackSpeed: (weaponId: number): number | undefined => {
		return weaponAttackSpeeds[weaponId];
	},

	// Check if weapon has a known attack speed
	hasAttackSpeed: (weaponId: number): boolean => {
		return weaponId in weaponAttackSpeeds;
	},

	// Get all weapons with a specific attack speed
	getWeaponsBySpeed: (tickSpeed: number): number[] => {
		return Object.entries(weaponAttackSpeeds)
			.filter(([, speed]) => speed === tickSpeed)
			.map(([weaponId]) => Number(weaponId));
	},

	// Get equipped weapon attack speed from player's current gear
	getEquippedWeaponSpeed: (state: State): number => {
		const equippedGear = playerFunctions.getWornEquipment(state);
		const weaponId = equippedGear.weapon;

		if (!weaponId) {
			logger(
				state,
				'debug',
				'getEquippedWeaponSpeed',
				'No weapon equipped',
			);
			return 0;
		}

		const speed = attackTimers.getAttackSpeed(weaponId);
		if (speed !== undefined) {
			logger(
				state,
				'debug',
				'getEquippedWeaponSpeed',
				`Equipped weapon speed: ${speed} ticks`,
			);
			return speed;
		}

		logger(
			state,
			'debug',
			'getEquippedWeaponSpeed',
			`Unknown weapon attack speed for ID: ${weaponId}`,
		);
		return 0;
	},
};
