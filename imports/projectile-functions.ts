/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// imports
import { projectilePrayerMap, projectileTypeMap } from './npc-ids.js';
import { prayerFunctions, prayers } from './prayer-functions.js';
import { logger } from './logger.js';
import { State } from './types.js';

// Projectile interface definition
export interface Projectile {
	getId?: () => number;
	id?: number;
	getWorldLocation?: () => { distanceTo: (loc: any) => number };
	getX?: () => number;
	getY?: () => number;
	getRemainingCycles?: () => number;
	getStartCycle?: () => number;
	getEndCycle?: () => number;
	getFloor?: () => number;
	// ...other methods/properties
}

// Player-related projectile utility functions
export const projectileFunctions = {
	// Track projectiles with enhanced data
	trackedProjectiles: new Map<
		number,
		{
			id: number;
			distance: number;
			hasHit: boolean;
			targetX?: number;
			targetY?: number;
			ticksUntilHit?: number;
			startCycle?: number;
			endCycle?: number;
		}
	>(),

	// Track projectile hit times for rate analysis (last 60 ticks)
	projectileHitTimes: new Map<number, number[]>(),

	// Initialize event listeners for projectile tracking
	initializeProjectileTracking: (state: State): void => {
		bot.events.register(
			'ProjectileMoved',
			(event: any) => {
				projectileFunctions.updateProjectileDistance(state, event);
			},
			0,
		);

		bot.events.register(
			'ProjectileDisplaced',
			(event: any) => {
				projectileFunctions.removeProjectile(state, event);
			},
			0,
		);
	},

	// Enhanced projectile distance update with target tracking
	updateProjectileDistance: (state: State, event: any): void => {
		const projectile = event.getProjectile?.() as Projectile;
		if (!projectile) return;

		const id = projectile.getId?.() ?? projectile.id;
		const distance =
			projectileFunctions.calculateProjectileDistance(projectile);
		const maxDistance = 10;

		if (distance === null) return;

		// Get target location and timing
		const targetX = projectile.getX?.();
		const targetY = projectile.getY?.();
		const remainingCycles = projectile.getRemainingCycles?.();
		const ticksUntilHit = remainingCycles
			? Math.ceil(remainingCycles / 30)
			: undefined;
		const startCycle = projectile.getStartCycle?.();
		const endCycle = projectile.getEndCycle?.();

		if (typeof id === 'number' && distance <= maxDistance) {
			if (projectileFunctions.trackedProjectiles.has(id)) {
				const tracked = projectileFunctions.trackedProjectiles.get(id)!;
				tracked.distance = distance;
				tracked.ticksUntilHit = ticksUntilHit;
			} else {
				projectileFunctions.trackedProjectiles.set(id, {
					id,
					distance,
					hasHit: false,
					targetX,
					targetY,
					ticksUntilHit,
					startCycle,
					endCycle,
				});
				logger(
					state,
					'debug',
					'updateProjectileDistance',
					`Tracking projectile ${id} at distance ${distance}, hits in ${ticksUntilHit} ticks at (${targetX}, ${targetY})`,
				);
			}
		} else if (
			typeof id === 'number' &&
			projectileFunctions.trackedProjectiles.has(id)
		) {
			projectileFunctions.trackedProjectiles.delete(id);
			logger(
				state,
				'debug',
				'updateProjectileDistance',
				`Projectile ${id} out of range`,
			);
		}
	},

	// Calculate distance from projectile to player
	calculateProjectileDistance: (projectile: any): number | null => {
		const player = client?.getLocalPlayer?.();
		const playerLoc = player?.getWorldLocation?.();
		const projLoc = projectile?.getWorldLocation?.();

		if (!playerLoc || !projLoc) return null;
		return projLoc.distanceTo(playerLoc);
	},

	// Remove projectile from tracking
	removeProjectile: (state: State, event: any): void => {
		const projectile = event.getProjectile?.();
		if (!projectile) return;

		const id = projectile.getId?.() ?? projectile.id;
		if (projectileFunctions.trackedProjectiles.has(id)) {
			// Record hit before removing
			projectileFunctions.recordProjectileHit(state, id);
			projectileFunctions.trackedProjectiles.delete(id);
			logger(
				state,
				'debug',
				'removeProjectile',
				`Projectile ${id} has hit/despawned`,
			);
		}
	},

	// Get sorted projectiles by distance
	getSortedProjectiles: (): Array<{
		id: number;
		distance: number;
		hasHit: boolean;
		targetX?: number;
		targetY?: number;
		ticksUntilHit?: number;
	}> => {
		return Array.from(projectileFunctions.trackedProjectiles.values())
			.filter((p) => !p.hasHit)
			.sort((a, b) => a.distance - b.distance);
	},

	// Get projectiles near the player within a specified distance defaulting to 3 tiles
	projectilesNearPlayer: (state: State, maxDistance = 3) => {
		logger(
			state,
			'debug',
			'projectilesNearPlayer',
			`Scanning projectiles within ${maxDistance} tiles.`,
		);
		const projectiles = client.getProjectiles
			? client.getProjectiles().toArray()
			: [];
		const player = client?.getLocalPlayer?.();
		const playerLoc = player?.getWorldLocation?.();

		if (!playerLoc?.distanceTo) return projectiles;
		const nearby = projectiles.filter((p: any) => {
			const loc = p?.getWorldLocation?.();
			return loc?.distanceTo
				? loc.distanceTo(playerLoc) <= maxDistance
				: true;
		});
		logger(
			state,
			'debug',
			'projectilesNearPlayer',
			`Found ${nearby.length} nearby projectiles.`,
		);
		return nearby;
	},

	// Determine the type of a given projectile
	projectileType: (
		state: State,
		projectile: any,
	): 'magic' | 'ranged' | 'melee' | 'other' | 'unknown' => {
		const id = projectile?.getId?.() ?? projectile?.id;
		let type: 'magic' | 'ranged' | 'melee' | 'other' | 'unknown' =
			'unknown';
		if (id && typeof id === 'string' && id in projectileTypeMap) {
			type = projectileTypeMap[id as keyof typeof projectileTypeMap];
		}
		logger(
			state,
			'debug',
			'projectileType',
			`Projectile id=${id} classified as ${type}.`,
		);
		return type;
	},

	// Activate prayer based on projectile type
	prayProjectile: (state: State, projectile: any): boolean => {
		const id = projectile?.getId?.() ?? projectile?.id;
		let prayerKey:
			| (typeof projectilePrayerMap)[keyof typeof projectilePrayerMap]
			| undefined;
		if (id && typeof id === 'string' && id in projectilePrayerMap) {
			prayerKey =
				projectilePrayerMap[id as keyof typeof projectilePrayerMap];
		}
		if (!prayerKey) {
			logger(
				state,
				'debug',
				'prayProjectile',
				`No prayer mapping for projectile id=${id}.`,
			);
			return false;
		}
		logger(
			state,
			'debug',
			'prayProjectile',
			`Toggling prayer for projectile id=${id}: ${prayerKey}`,
		);
		return prayerFunctions.togglePrayer(state, prayerKey);
	},

	// Generic lookup for projectile ID in a map
	getProjectileMapValue: <T>(
		projectileId: number,
		map: Record<number | string, T>,
	): T | null => {
		return map[projectileId] ?? null;
	},

	// Get the prayer key for a projectile ID
	getPrayerKeyForProjectile: (
		projectileId: number,
	): keyof typeof prayers | null => {
		return projectileFunctions.getProjectileMapValue(
			projectileId,
			projectilePrayerMap,
		);
	},

	// Get the prayer key for an NPC attack animation ID
	getTypeKeyForProjectile: (
		projectileId: number,
	): 'magic' | 'ranged' | 'melee' | 'other' | null => {
		return projectileFunctions.getProjectileMapValue(
			projectileId,
			projectileTypeMap,
		);
	},

	// Get sorted NPC attacks by distance (stubbed method)
	getSortedNpcAttacksDist: (): Array<{
		npcIndex: number;
		animationId: number;
		distance: number;
	}> => {
		// TODO: Implement actual logic to return sorted NPC attacks
		return [];
	},

	// Get player location safely
	getPlayerLocation: (): net.runelite.api.coords.WorldPoint | undefined => {
		return client?.getLocalPlayer?.()?.getWorldLocation?.();
	},

	// Check if projectile will hit player's current location
	willHitPlayer: (projectile: any): boolean => {
		const playerLoc = projectileFunctions.getPlayerLocation();
		if (!playerLoc) return false;

		const targetX = projectile.getX?.();
		const targetY = projectile.getY?.();
		const plane = projectile.getFloor?.();

		return (
			targetX === playerLoc.getX() &&
			targetY === playerLoc.getY() &&
			plane === playerLoc.getPlane()
		);
	},

	// Get projectiles that will hit player
	getProjectilesTargetingPlayer: (): Array<{
		id: number;
		ticksUntilHit: number;
	}> => {
		const playerLoc = projectileFunctions.getPlayerLocation();
		return Array.from(projectileFunctions.trackedProjectiles.values())
			.filter((p) => {
				return (
					p.targetX === playerLoc?.getX() &&
					p.targetY === playerLoc?.getY()
				);
			})
			.map((p) => ({ id: p.id, ticksUntilHit: p.ticksUntilHit ?? 0 }))
			.sort((a, b) => a.ticksUntilHit - b.ticksUntilHit);
	},

	// Record a projectile hit at current tick
	recordProjectileHit: (state: State, projectileId: number): void => {
		if (!projectileFunctions.projectileHitTimes.has(projectileId)) {
			projectileFunctions.projectileHitTimes.set(projectileId, []);
		}
		const hitTimes =
			projectileFunctions.projectileHitTimes.get(projectileId)!;
		hitTimes.push(state.gameTick);

		// Keep only last 20 ticks of data
		if (hitTimes.length > 20) {
			hitTimes.shift();
		}
	},

	// Get projectile hit rate analysis
	getProjectileHitRate: (
		state: State,
		projectileId: number,
		windowSize: number = 30,
	): {
		projectilesPerTick: number;
		totalHits: number;
		hitIntervals: number[];
		hitsEveryTick: boolean;
	} => {
		const hitTimes =
			projectileFunctions.projectileHitTimes.get(projectileId) || [];
		const recentHits = hitTimes.filter(
			(tick) => state.gameTick - tick < windowSize,
		);

		// Calculate intervals between hits
		const intervals: number[] = [];
		for (let index = 1; index < recentHits.length; index++) {
			intervals.push(recentHits[index] - recentHits[index - 1]);
		}

		// Check if hitting every single tick (interval of 1)
		const hitsEveryTick =
			intervals.length > 0 &&
			intervals.every((interval) => interval === 1);

		// Calculate projectiles per tick in window
		const projectilesPerTick =
			recentHits.length > 0 ? recentHits.length / windowSize : 0;

		return {
			projectilesPerTick: Number.parseFloat(
				projectilesPerTick.toFixed(2),
			),
			totalHits: recentHits.length,
			hitIntervals: intervals,
			hitsEveryTick,
		};
	},

	// Get analysis for all tracked projectiles
	getAllProjectileHitRates: (
		state: State,
		windowSize: number = 30,
	): Record<
		number,
		{
			projectilesPerTick: number;
			totalHits: number;
			hitIntervals: number[];
			hitsEveryTick: boolean;
		}
	> => {
		const rates: Record<
			number,
			{
				projectilesPerTick: number;
				totalHits: number;
				hitIntervals: number[];
				hitsEveryTick: boolean;
			}
		> = {};

		for (const projectileId of projectileFunctions.projectileHitTimes.keys()) {
			rates[projectileId] = projectileFunctions.getProjectileHitRate(
				state,
				projectileId,
				windowSize,
			);
		}

		return rates;
	},

	// Log projectile hit rate analysis (for debugging)
	logProjectileHitRates: (state: State, windowSize: number = 30): void => {
		const rates = projectileFunctions.getAllProjectileHitRates(
			state,
			windowSize,
		);

		for (const [projectileId, rate] of Object.entries(rates)) {
			const rateString = rate.hitsEveryTick
				? `EVERY TICK (${rate.projectilesPerTick.toFixed(2)}/tick)`
				: `${rate.projectilesPerTick.toFixed(2)}/tick, intervals: [${rate.hitIntervals.join(', ')}]`;

			logger(
				state,
				'debug',
				'getProjectileHitRate',
				`Projectile ${projectileId}: ${rateString} (${rate.totalHits} hits in last ${windowSize} ticks)`,
			);
		}
	},
};
