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

	// Initialize projectile tracking (no longer uses events, called from onGameTick)
	initializeProjectileTracking: (state: State): void => {
		// Initialization is now a no-op; tracking is polled directly in updateProjectileDistance
		logger(
			state,
			'debug',
			'initializeProjectileTracking',
			'Projectile tracking initialized (polling-based).',
		);
	},

	// Poll projectiles directly once per tick instead of using events
	// Only tracks projectiles defined in projectilePrayerMap or projectileTypeMap
	updateProjectileDistance: (state: State): void => {
		// Get only tracked projectile IDs from npc-ids.ts
		const trackedProjectileIds = Object.keys(projectilePrayerMap)
			.concat(Object.keys(projectileTypeMap))
			.map(Number);

		if (trackedProjectileIds.length === 0) return;

		// Use bot API to fetch only relevant projectiles
		const projectiles =
			(bot.projectiles?.getProjectilesWithIds?.(
				trackedProjectileIds,
			) as any[]) ?? [];
		const player = client?.getLocalPlayer?.();
		const playerLoc = player?.getWorldLocation?.();

		if (!playerLoc) return;

		const maxDistance = 10;
		const currentProjectileIds = new Set<number>();

		// Update/track projectiles within range
		for (const projectileRaw of projectiles) {
			const projectile: Projectile = projectileRaw as Projectile;
			let id: number | undefined;
			if (typeof projectile.getId === 'function') {
				id = projectile.getId();
			} else if (typeof projectile.id === 'number') {
				id = projectile.id;
			}
			const projLoc = projectile.getWorldLocation?.();

			if (!projLoc?.distanceTo || typeof id !== 'number') continue;

			const distance = projLoc.distanceTo(playerLoc);

			if (distance <= maxDistance) {
				currentProjectileIds.add(id);

				const targetX: number | undefined = projectile.getX?.();
				const targetY = projectile.getY?.();
				const remainingCycles = projectile.getRemainingCycles?.();
				const ticksUntilHit = remainingCycles
					? Math.ceil(remainingCycles / 30)
					: undefined;
				const startCycle = projectile.getStartCycle?.();
				const endCycle = projectile.getEndCycle?.();

				if (projectileFunctions.trackedProjectiles.has(id)) {
					const tracked =
						projectileFunctions.trackedProjectiles.get(id)!;
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
			}
		}

		// Remove projectiles that are no longer in range
		for (const id of projectileFunctions.trackedProjectiles.keys()) {
			if (!currentProjectileIds.has(id)) {
				projectileFunctions.recordProjectileHit(state, id);
				projectileFunctions.trackedProjectiles.delete(id);
				logger(
					state,
					'debug',
					'updateProjectileDistance',
					`Projectile ${id} out of range`,
				);
			}
		}
	},

	// Get sorted projectiles by distance
	getSortedProjectiles: (
		state: State,
	): Array<{
		id: number;
		distance: number;
		hasHit: boolean;
		targetX?: number;
		targetY?: number;
		ticksUntilHit?: number;
	}> => {
		const sorted = Array.from(
			projectileFunctions.trackedProjectiles.values(),
		)
			.filter((p) => !p.hasHit)
			.sort((a, b) => a.distance - b.distance);

		if (sorted.length > 0) {
			logger(
				state,
				'debug',
				'getSortedProjectiles',
				`Found ${sorted.length} active projectiles. Closest: ID ${sorted[0].id} at distance ${sorted[0].distance} tiles, ETA ${sorted[0].ticksUntilHit} ticks.`,
			);
		}

		return sorted;
	},

	// Determine the type of a given projectile
	projectileType: (
		state: State,
		projectile: Projectile,
	): 'magic' | 'ranged' | 'melee' | 'other' | 'unknown' => {
		let id: number | undefined;
		if (typeof projectile.getId === 'function') {
			id = projectile.getId();
		} else if (typeof projectile.id === 'number') {
			id = projectile.id;
		}
		const type =
			typeof id === 'number' && projectileTypeMap[id]
				? projectileTypeMap[id]
				: 'unknown';

		logger(
			state,
			'debug',
			'projectileType',
			`Projectile id=${id} classified as ${type}.`,
		);
		return type;
	},

	// Activate prayer based on projectile ID
	prayProjectile: (state: State, projectile: Projectile): boolean => {
		let id: number | undefined;
		if (typeof projectile.getId === 'function') {
			id = projectile.getId();
		} else if (typeof projectile.id === 'number') {
			id = projectile.id;
		}
		const prayerKey =
			typeof id === 'number' && projectilePrayerMap[id]
				? projectilePrayerMap[id]
				: undefined;

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
	willHitPlayer: (projectile: Projectile): boolean => {
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
