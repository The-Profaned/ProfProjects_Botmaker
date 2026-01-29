// imports
import { npcFunctions } from './npc-functions.js';
import { prayerFunctions, prayers } from './prayer-functions.js';
import { projectileFunctions } from './projectile-functions.js';
import { logger } from './logger.js';
import { State } from './types.js';
import { Projectile } from './projectile-functions.js';
import { tileFunctions } from './tile-functions.js';

// Import or define the Projectile type

// Player-related utility functions
export const playerFunctions = {
	// Check if player is currently in dialogue
	playerInDialogue: true,

	// Initialize projectile and NPC animation tracking
	initializeProjectileTracking: (state: State): void => {
		projectileFunctions.initializeProjectileTracking(state);
	},

	// Initialize NPC attack animation tracking
	initializeNpcAttackTracking: (state: State): void => {
		npcFunctions.initializeNpcAttackTracking(state);
	},

	// Disable all protection prayers
	disableProtectionPrayers: (state: State): void => {
		const protectionPrayers: (keyof typeof prayers)[] = [
			'protMelee',
			'protMage',
			'protRange',
		];
		for (const prayer of protectionPrayers) {
			if (prayerFunctions.checkPrayer(state, prayer)) {
				bot.prayer.togglePrayer(prayers[prayer], false);
				logger(
					state,
					'debug',
					'disableProtectionPrayers',
					`Toggled off ${prayer}`,
				);
			}
		}
	},

	// Generic prayer activation helper
	activatePrayerForThreat: (
		state: State,
		prayerKey: keyof typeof prayers | null,
		threatSource: string,
	): boolean => {
		if (!prayerKey) {
			logger(
				state,
				'debug',
				'activatePrayerForThreat',
				`No prayer mapping for threat source: ${threatSource}`,
			);
			return false;
		}

		if (prayerFunctions.checkPrayer(state, prayerKey)) {
			logger(
				state,
				'debug',
				'activatePrayerForThreat',
				`Already praying ${prayerKey} for ${threatSource}`,
			);
			return true;
		}

		const activated = prayerFunctions.togglePrayer(state, prayerKey);
		logger(
			state,
			'debug',
			'activatePrayerForThreat',
			`Activated ${prayerKey} for ${threatSource}`,
		);

		return activated;
	},

	// Activate prayer for closest projectile
	activatePrayerForProjectile: (
		state: State,
		projectile: Projectile,
	): boolean => {
		const prayerKey = projectileFunctions.getPrayerKeyForProjectile(
			projectile.id ?? -1,
		);
		const distance = projectile
			.getWorldLocation?.()
			.distanceTo(client.getLocalPlayer().getWorldLocation());
		return playerFunctions.activatePrayerForThreat(
			state,
			prayerKey,
			`projectile ${projectile.id} at distance ${distance}`,
		);
	},

	// Activate prayer for closest NPC attack animation (pre-emptive)
	activatePrayerForNpcAttack: (
		state: State,
		npcAttack: { npcIndex: number; animationId: number; distance: number },
	): boolean => {
		const prayerKey = npcFunctions.getPrayerKeyForAnimation(
			npcAttack.animationId,
		);
		return playerFunctions.activatePrayerForThreat(
			state,
			prayerKey,
			`NPC ${npcAttack.npcIndex} anim ${npcAttack.animationId} at distance ${npcAttack.distance}`,
		);
	},

	// Handle prayer activation for closest projectile + all projectiles in range
	handleIncomingProjectiles: (
		state: State & { currentPrayProjectileId?: number },
	): boolean => {
		const sortedProjectiles = projectileFunctions.getSortedProjectiles();

		// if no projectiles, disable prayers
		if (sortedProjectiles.length === 0) {
			logger(
				state,
				'debug',
				'handleIncomingProjectiles',
				'No tracked projectiles within range.',
			);
			playerFunctions.disableProtectionPrayers(state);
			state.currentPrayProjectileId = undefined;
			return false;
		}

		// Check if we're already praying for a projectile
		let targetProjectile = sortedProjectiles[0];

		if (state.currentPrayProjectileId === undefined) {
			// No projectile being prayed for yet, set the closest one
			state.currentPrayProjectileId = targetProjectile.id;
		} else {
			// Find the projectile we're currently praying for
			const currentProjectile = sortedProjectiles.find(
				(p) => p.id === state.currentPrayProjectileId,
			);

			// If current projectile still exists and hasn't hit, keep praying for it
			if (currentProjectile && !currentProjectile.hasHit) {
				targetProjectile = currentProjectile;
			} else {
				// Current projectile has hit, switch to next one
				state.currentPrayProjectileId = targetProjectile.id;
				logger(
					state,
					'debug',
					'handleIncomingProjectiles',
					`Previous projectile hit. Switching to projectile ${targetProjectile.id}.`,
				);
			}
		}

		logger(
			state,
			'debug',
			'handleIncomingProjectiles',
			`Projectile queue (${sortedProjectiles.length}): ${sortedProjectiles.map((p) => `${p.id}(${p.distance}t)`).join(', ')} | Praying for: ${targetProjectile.id}`,
		);

		return playerFunctions.activatePrayerForProjectile(
			state,
			targetProjectile,
		);
	},

	// Handle pre-emptive prayer activation for closest NPC attack animation
	handleNpcAttackAnimations: (state: State): boolean => {
		const sortedAttacks = projectileFunctions.getSortedNpcAttacksDist();

		if (sortedAttacks.length === 0) {
			logger(
				state,
				'debug',
				'handleNpcAttackAnimations',
				'No tracked NPC attack animations within range.',
			);
			return false;
		}

		logger(
			state,
			'debug',
			'handleNpcAttackAnimations',
			`NPC attack queue (${sortedAttacks.length}): ${sortedAttacks.map((a) => `${a.npcIndex}:${a.animationId}(${a.distance}t)`).join(', ')}`,
		);

		return playerFunctions.activatePrayerForNpcAttack(
			state,
			sortedAttacks[0],
		);
	},

	// Attack target NPC by ID
	attackTargetNpc: (state: State, npcId: number): boolean => {
		const npc = npcFunctions.getClosestNPC([npcId]);
		const player = client?.getLocalPlayer?.();
		const interacting = player.getInteracting?.();

		if (!npc) {
			logger(
				state,
				'debug',
				'attackTargetNpc',
				`No NPC found with ID ${npcId}`,
			);
			return false;
		}

		if (!player) {
			logger(state, 'debug', 'attackTargetNpc', 'Player not found');
			return false;
		}

		if (interacting && interacting === npc) {
			logger(
				state,
				'debug',
				'attackTargetNpc',
				`Already attacking NPC ${npcId}`,
			);
			return true;
		}

		bot.npcs.interact(npc.getName?.(), 'Attack');
		logger(
			state,
			'debug',
			'attackTargetNpc',
			`Attacking NPC ${npcId} at ${npc.getWorldLocation?.().getX()}, ${npc.getWorldLocation?.().getY()}, ${npc.getWorldLocation?.().getPlane()}`,
		);
		return true;
	},

	// Move player to specified safe tile coordinates
	moveToSafeTile: (
		state: State,
		moveToSafeTile: { x: number; y: number },
	): boolean => {
		const player = client?.getLocalPlayer?.();
		const playerLoc = player.getWorldLocation?.();

		if (!player) {
			logger(state, 'debug', 'moveToSafeTile', 'Player not found');
			return false;
		}

		if (!playerLoc) {
			logger(
				state,
				'debug',
				'moveToSafeTile',
				'Player location not found',
			);
			return false;
		}

		if (
			playerLoc.getX() === moveToSafeTile.x &&
			playerLoc.getY() === moveToSafeTile.y
		) {
			logger(
				state,
				'debug',
				'moveToSafeTile',
				`Already at safe tile (${moveToSafeTile.x}, ${moveToSafeTile.y})`,
			);
			return true;
		}

		bot.walking.walkToWorldPoint(moveToSafeTile.x, moveToSafeTile.y);
		logger(
			state,
			'debug',
			'moveToSafeTile',
			`Moving to safe tile (${moveToSafeTile.x}, ${moveToSafeTile.y})`,
		);
		return true;
	},

	// Get player's currently worn equipment
	getWornEquipment: (state: State): Record<string, number> => {
		const equipment: Record<string, number> = {};
		const equipmentItems = bot.equipment.getEquipment();

		// Equipment array indices match RuneLite equipment slots
		const equipmentSlots: Record<number, string> = {
			0: 'head',
			1: 'cape',
			2: 'neck',
			3: 'weapon',
			4: 'body',
			5: 'shield',
			7: 'legs',
			9: 'hands',
			10: 'feet',
			12: 'ring',
			13: 'ammo',
		};

		for (const [slotIndex, slotName] of Object.entries(equipmentSlots)) {
			const index = Number(slotIndex);
			const item = equipmentItems[index];
			if (item && item.id > 0) {
				equipment[slotName] = item.id;
			}
		}

		logger(
			state,
			'debug',
			'getWornEquipment',
			`Current equipment: ${JSON.stringify(equipment)}`,
		);
		return equipment;
	},

	// Verify if player has all required equipment worn
	hasRequiredEquipment: (
		state: State,
		requiredEquipment: Record<string, number>,
	): boolean => {
		const wornEquipment = playerFunctions.getWornEquipment(state);

		for (const [slot, itemId] of Object.entries(requiredEquipment)) {
			if (wornEquipment[slot] !== itemId) {
				logger(
					state,
					'debug',
					'hasRequiredEquipment',
					`Missing required item ${itemId} in slot ${slot}`,
				);
				return false;
			}
		}

		logger(
			state,
			'debug',
			'hasRequiredEquipment',
			'All required equipment verified',
		);
		return true;
	},

	// THIS IS ONLY FOR STATE CONTROL - THIS DOES NOT ATTACK THE NPC
	// Transitions to 'engage_combat' sub-state when in area or when no area bounds specified
	engageNPC: (
		state: State & { inCombatArea: boolean },
		areaBounds?: {
			minX: number;
			maxX: number;
			minY: number;
			maxY: number;
			plane?: number;
		},
	): boolean => {
		// If no area bounds specified, immediately transition to engage_combat
		if (!areaBounds) {
			state.inCombatArea = true;
			state.sub_State = 'engage_combat';
			logger(
				state,
				'debug',
				'engageNPC',
				'No area bounds. Transitioning to engage_combat.',
			);
			return true;
		}

		// Check if player is within specified area bounds
		const isInArea: boolean = (
			tileFunctions.isPlayerInArea as (
				state: State,
				minX: number,
				maxX: number,
				minY: number,
				maxY: number,
				plane?: number,
			) => boolean
		)(
			state,
			areaBounds.minX,
			areaBounds.maxX,
			areaBounds.minY,
			areaBounds.maxY,
			areaBounds.plane,
		);

		// Player entered combat area
		if (isInArea && !state.inCombatArea) {
			state.inCombatArea = true;
			state.sub_State = 'engage_combat';
			logger(
				state,
				'debug',
				'engageNPC',
				'Player in combat area. Transitioning to engage_combat.',
			);
			return true;
		}

		// Player left combat area
		if (!isInArea && state.inCombatArea) {
			state.inCombatArea = false;
			logger(state, 'debug', 'engageNPC', 'Player left combat area.');
			return false;
		}

		// Still outside area
		if (!isInArea && !state.inCombatArea) {
			logger(state, 'debug', 'engageNPC', 'Moving to combat area...');
			return false;
		}

		return false;
	},

	// Cast a spell from an array on a target NPC (uses first available spell name)
	castSpellOnNpc: (
		state: State,
		spellNames: string[],
		npcIds: number[],
	): boolean => {
		// Find closest NPC from the provided IDs
		const targetNpc = npcFunctions.getClosestNPC(npcIds);

		if (!targetNpc) {
			logger(
				state,
				'debug',
				'castSpellOnNpc',
				`No NPC found with IDs: ${npcIds.join(', ')}`,
			);
			return false;
		}

		if (spellNames.length === 0) {
			logger(
				state,
				'debug',
				'castSpellOnNpc',
				'No spell names provided.',
			);
			return false;
		}

		// Use the first available spell from the array
		const spellName: string = spellNames[0];

		(
			bot.magic.castOnNpc as (
				spellName: string,
				npc: net.runelite.api.NPC,
			) => void
		)(spellName, targetNpc);
		logger(
			state,
			'debug',
			'castSpellOnNpc',
			`Cast spell ${spellName} on NPC ${targetNpc.getName?.()}`,
		);

		return true;
	},
};
