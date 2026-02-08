/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// imports
import { animationPrayerMap, animationTypeMap } from './npc-ids.js';
import { prayers } from './prayer-functions.js';
import { logger } from './logger.js';
import { State } from './types.js';

export const npcFunctions = {
	// Track NPC attack animations
	trackedNpcAttacks: new Map<
		number,
		{ npcIndex: number; animationId: number; distance: number }
	>(),

	// Check if NPC with specific ID is currently rendered
	npcRendered: (npcId: number): boolean =>
		bot.npcs.getWithIds([npcId]).length > 0,

	// Check if NPC is alive
	isNpcAlive: (npc: net.runelite.api.NPC | undefined): boolean => {
		if (!npc) return false;
		return (npc.getHealthRatio?.() ?? 0) > 0;
	},

	// Return first NPC with specific NPC-ID
	getFirstNPC: (npcId: number): net.runelite.api.NPC | undefined =>
		bot.npcs.getWithIds([npcId])[0], // Return first NPC with specific NPC-ID

	// Get closest NPC with the specific ID
	getClosestNPC: (npcIds: number[]): net.runelite.api.NPC | undefined => {
		const npcs = bot.npcs.getWithIds(npcIds);
		if (!npcs?.length) return undefined;

		let closest: net.runelite.api.NPC | null = null;
		let minDistance = Number.POSITIVE_INFINITY;

		npcs.forEach((npc) => {
			const distance = client
				.getLocalPlayer()
				.getWorldLocation()
				.distanceTo(npc.getWorldLocation());

			if (distance < minDistance) {
				minDistance = distance;
				closest = npc;
			}
		});

		return closest || undefined;
	},

	// Initialize event listeners for NPC attack tracking
	initializeNpcAttackTracking: (state: State): void => {
		bot.events.register(
			'AnimationChanged',
			(event: any) => {
				npcFunctions.updateNpcAttackAnimation(state, event);
			},
			0,
		);

		bot.events.register(
			'NpcDespawned',
			(event: any) => {
				npcFunctions.removeNpcAttack(state, event);
			},
			0,
		);
	},

	// Update NPC attack animation or add to tracking
	updateNpcAttackAnimation: (state: State, event: any): void => {
		const actor = event.getActor?.();
		const npc = actor;
		const animationId = event.getAnimationId?.() ?? npc.getAnimation?.();
		const prayerKey = animationPrayerMap[animationId];
		const player = client?.getLocalPlayer?.();
		const playerLoc = player?.getWorldLocation?.();
		const npcLoc = npc?.getWorldLocation?.();
		const distance = npcLoc.distanceTo(playerLoc);
		const maxDistance = 10;

		if (!actor?.isNpc?.()) return;
		if (!animationId) return;
		if (!prayerKey) {
			npcFunctions.trackedNpcAttacks.delete(npc.getIndex?.() ?? -1);
			return;
		}

		if (!playerLoc || !npcLoc) return;
		const npcIndex = npc.getIndex?.() ?? -1;
		if (distance <= maxDistance) {
			npcFunctions.trackedNpcAttacks.set(npcIndex, {
				npcIndex,
				animationId,
				distance,
			});
			logger(
				state,
				'debug',
				'updateNpcAttackAnimation',
				`Tracking npc ${npcIndex} anim=${animationId} at distance ${distance}`,
			);
		} else if (npcFunctions.trackedNpcAttacks.has(npcIndex)) {
			npcFunctions.trackedNpcAttacks.delete(npcIndex);
			logger(
				state,
				'debug',
				'updateNpcAttackAnimation',
				`Npc ${npcIndex} out of range`,
			);
		}
	},

	// Remove NPC from tracking on despawn
	removeNpcAttack: (state: State, event: any): void => {
		const npc = event.getNpc?.();
		if (!npc) return;
		const npcIndex = npc.getIndex?.() ?? -1;
		if (npcFunctions.trackedNpcAttacks.has(npcIndex)) {
			npcFunctions.trackedNpcAttacks.delete(npcIndex);
			logger(
				state,
				'debug',
				'removeNpcAttack',
				`Npc ${npcIndex} despawned/removed`,
			);
		}
	},

	// Generic lookup for animation ID in a map
	getAnimationMapValue: <T>(
		animationId: number,
		map: Record<number, T>,
	): T | null => {
		return map[animationId] ?? null;
	},

	// Get prayer key for given NPC animation ID
	getPrayerKeyForAnimation: (
		animationId: number,
	): keyof typeof prayers | null => {
		return npcFunctions.getAnimationMapValue(
			animationId,
			animationPrayerMap,
		);
	},

	// Get type key for given NPC animation ID
	getTypeKeyForAnimation: (
		animationId: number,
	): 'magic' | 'ranged' | 'melee' | 'other' | null => {
		return npcFunctions.getAnimationMapValue(animationId, animationTypeMap);
	},

	// Check NPC orientation in relation to player
	// Returns the direction the NPC is facing and whether it's facing the player
	// Useful for predicting special attacks that target ground locations
	npcOrientationToPlayer: (
		npc: net.runelite.api.NPC | undefined,
	): {
		npcOrientation: number | null;
		angleToPlayer: number;
		isFacingPlayer: boolean;
		facingDirection:
			| 'NORTH'
			| 'NORTHEAST'
			| 'EAST'
			| 'SOUTHEAST'
			| 'SOUTH'
			| 'SOUTHWEST'
			| 'WEST'
			| 'NORTHWEST'
			| 'UNKNOWN';
	} => {
		if (!npc) {
			return {
				npcOrientation: null,
				angleToPlayer: 0,
				isFacingPlayer: false,
				facingDirection: 'UNKNOWN',
			};
		}

		const player = client.getLocalPlayer();
		if (!player) {
			return {
				npcOrientation: null,
				angleToPlayer: 0,
				isFacingPlayer: false,
				facingDirection: 'UNKNOWN',
			};
		}

		const playerLoc = player.getWorldLocation();
		const npcLoc = npc.getWorldLocation();

		// Get NPC's current orientation (0-2047 in OSRS, where 0 = East)
		const npcOrientation =
			(npc as net.runelite.api.Actor).getOrientation?.() ?? null;

		// Calculate angle from NPC to player
		const deltaX = playerLoc.getX() - npcLoc.getX();
		const deltaY = playerLoc.getY() - npcLoc.getY();
		const angleToPlayerRad = Math.atan2(deltaY, deltaX);
		const angleToPlayerDeg = (angleToPlayerRad * 180) / Math.PI;

		// Normalize to 0-360
		const normalizedAngleToPlayer = (angleToPlayerDeg + 360) % 360;

		// Determine 8-directional facing (based on orientation if available)
		let npcFacingDirection:
			| 'NORTH'
			| 'NORTHEAST'
			| 'EAST'
			| 'SOUTHEAST'
			| 'SOUTH'
			| 'SOUTHWEST'
			| 'WEST'
			| 'NORTHWEST'
			| 'UNKNOWN' = 'UNKNOWN';

		if (npcOrientation !== null) {
			// OSRS orientation: 0 = East, 512 = North, 1024 = West, 1536 = South
			// Range 0-2047 (256 values per direction for 8 directions)
			const normalizedOrientation = npcOrientation % 2048;

			if (normalizedOrientation >= 1920 || normalizedOrientation < 128) {
				npcFacingDirection = 'EAST';
			} else if (
				normalizedOrientation >= 128 &&
				normalizedOrientation < 384
			) {
				npcFacingDirection = 'NORTHEAST';
			} else if (
				normalizedOrientation >= 384 &&
				normalizedOrientation < 640
			) {
				npcFacingDirection = 'NORTH';
			} else if (
				normalizedOrientation >= 640 &&
				normalizedOrientation < 896
			) {
				npcFacingDirection = 'NORTHWEST';
			} else if (
				normalizedOrientation >= 896 &&
				normalizedOrientation < 1152
			) {
				npcFacingDirection = 'WEST';
			} else if (
				normalizedOrientation >= 1152 &&
				normalizedOrientation < 1408
			) {
				npcFacingDirection = 'SOUTHWEST';
			} else if (
				normalizedOrientation >= 1408 &&
				normalizedOrientation < 1664
			) {
				npcFacingDirection = 'SOUTH';
			} else if (
				normalizedOrientation >= 1664 &&
				normalizedOrientation < 1920
			) {
				npcFacingDirection = 'SOUTHEAST';
			}
		}

		// Check if NPC is facing player (within ~45 degree cone)
		let isFacingPlayer = false;

		if (npcOrientation !== null) {
			const normalizedOrientation = npcOrientation % 2048;
			// Convert orientation to degrees (2048 = 360 degrees)
			const npcFacingDeg = (normalizedOrientation / 2048) * 360;

			// Calculate angle difference
			let angleDiff = Math.abs(npcFacingDeg - normalizedAngleToPlayer);
			if (angleDiff > 180) {
				angleDiff = 360 - angleDiff;
			}

			// NPC is facing player if angle difference is less than 45 degrees
			isFacingPlayer = angleDiff < 45;
		}

		return {
			npcOrientation,
			angleToPlayer: normalizedAngleToPlayer,
			isFacingPlayer,
			facingDirection: npcFacingDirection,
		};
	},
};
