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
		bot.npcs.getWithIds([npcId]).some((npc) => npc.getId() === npcId),

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
		// Get closest NPC with the specific ID
		const npcs = bot.npcs.getWithIds(npcIds);
		if (!npcs?.length) return undefined;
		let closest: net.runelite.api.NPC | null = null;
		let min = Number.POSITIVE_INFINITY;
		npcs.forEach((npc) => {
			const distribution = client
				.getLocalPlayer()
				.getWorldLocation()
				.distanceTo(npc.getWorldLocation());
			if (distribution < min) ((min = distribution), (closest = npc));
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
};
