// imports
import { projectilePrayerMap, projectileTypeMap } from './npc-ids.js';
import { prayers } from './prayer-functions.js';

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

// Tracked projectile with time to hit
export interface TrackedProjectile {
	id: number;
	ticksUntilHit: number;
	targetX: number;
	targetY: number;
}

// Map of projectiles tracked by unique key (id + targetX,targetY to differentiate multiple projectiles)
const trackedProjectiles = new Map<string, TrackedProjectile>();

/**
 * Get player location
 */
const getPlayerLocation = (): net.runelite.api.coords.WorldPoint | null => {
	return client?.getLocalPlayer?.()?.getWorldLocation?.() ?? null;
};

/**
 * Update projectile tracking based on current game state
 * Call this once per tick from onGameTick
 */
export const updateProjectileTracking = (trackedIds: number[]): void => {
	const playerLoc = getPlayerLocation();
	if (!playerLoc) {
		// No player location, clear all tracked projectiles
		trackedProjectiles.clear();
		return;
	}

	// Get current projectiles from client - Deque requires iterator for Rhino
	const projectileDeque = client?.getProjectiles?.();
	if (!projectileDeque) {
		trackedProjectiles.clear();
		return;
	}

	// Filter for tracked IDs and update map
	const currentKeys = new Set<string>();

	const iterator = projectileDeque.iterator();
	while (iterator.hasNext()) {
		const projectile: Projectile = iterator.next() as Projectile;

		let projId: number | undefined;
		if (typeof projectile.getId === 'function') {
			projId = projectile.getId();
		} else if (typeof projectile.id === 'number') {
			projId = projectile.id;
		}

		// Skip if not a tracked ID or ID is invalid
		if (!projId || !trackedIds.includes(projId)) {
			continue;
		}

		const targetX = projectile.getX?.();
		const targetY = projectile.getY?.();

		const remainingCycles = projectile.getRemainingCycles?.();
		const ticksUntilHit =
			typeof remainingCycles === 'number'
				? Math.max(1, Math.ceil(remainingCycles / 30))
				: 1;

		const key = `${projId}_${targetX}_${targetY}`;
		currentKeys.add(key);

		// Track any projectile with matching ID on same plane (not requiring exact tile match)
		trackedProjectiles.set(key, {
			id: projId,
			ticksUntilHit,
			targetX: targetX ?? 0,
			targetY: targetY ?? 0,
		});
	}

	// Remove projectiles that are no longer in the current list
	for (const key of trackedProjectiles.keys()) {
		if (!currentKeys.has(key)) {
			trackedProjectiles.delete(key);
		}
	}
};

/**
 * Debug function to see all projectiles in the deque and which match tracked IDs
 */
export const debugProjectiles = (trackedIds: number[]): string => {
	const projectileDeque = client?.getProjectiles?.();
	if (!projectileDeque) {
		return 'No projectiles deque available';
	}

	const projectileList: string[] = [];
	const iterator = projectileDeque.iterator();
	let allCount = 0;

	while (iterator.hasNext()) {
		const projectile: Projectile = iterator.next() as Projectile;
		allCount++;

		let projId: number | undefined;
		if (typeof projectile.getId === 'function') {
			projId = projectile.getId();
		} else if (typeof projectile.id === 'number') {
			projId = projectile.id;
		}

		const targetX = projectile.getX?.();
		const targetY = projectile.getY?.();
		const isTracked = projId && trackedIds.includes(projId) ? 'MATCH' : '';

		projectileList.push(
			`ID: ${projId} | Target: (${targetX}, ${targetY}) ${isTracked}`,
		);
	}

	return `Total projectiles: ${allCount} | Tracked IDs: ${trackedIds.join(', ')} | List: ${projectileList.join(' | ')}`;
};

/**
 * Get all tracked projectiles sorted by ticks until hit (shortest first)
 */
export const getSortedProjectiles = (): TrackedProjectile[] => {
	return Array.from(trackedProjectiles.values()).sort(
		(a, b) => a.ticksUntilHit - b.ticksUntilHit,
	);
};

/**
 * Get total count of projectiles targeting player
 */
export const getProjectileCount = (): number => {
	return trackedProjectiles.size;
};

/**
 * Check if any projectiles are targeting player
 */
export const hasIncomingProjectiles = (): boolean => {
	return trackedProjectiles.size > 0;
};

/**
 * Get closest projectile (hits soonest)
 */
export const getClosestProjectile = (): TrackedProjectile | null => {
	const sorted = getSortedProjectiles();
	return sorted.length > 0 ? sorted[0] : null;
};

/**
 * Clear all tracked projectiles
 */
export const clearProjectileTracking = (): void => {
	trackedProjectiles.clear();
};

// Generic lookup for projectile ID in a map
export const getProjectileMapValue = <T>(
	projectileId: number,
	map: Record<number | string, T>,
): T | null => map[projectileId] ?? null;

// Get the prayer key for a projectile ID
export const getPrayerKeyForProjectile = (
	projectileId: number,
): keyof typeof prayers | null =>
	getProjectileMapValue(projectileId, projectilePrayerMap);

// Get the attack type for a projectile ID
export const getTypeKeyForProjectile = (
	projectileId: number,
): 'magic' | 'ranged' | 'melee' | 'other' | null =>
	getProjectileMapValue(projectileId, projectileTypeMap);
