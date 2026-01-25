// imports
import { projectilePrayerMap, projectileTypeMap } from "./npc_Ids.js";
import { prayerFunctions, prayers } from "./prayer_functions.js";
import { logger } from "./logger.js";
import { State } from "./types.js";

// Player-related projectile utility functions
export const projectileFunctions = {
  // Track projectiles with enhanced data
  trackedProjectiles: new Map<number, { id: number, distance: number, hasHit: boolean,targetX?: number, targetY?: number, ticksUntilHit?: number, startCycle?: number, endCycle?: number
  }>(),

  // Initialize event listeners for projectile tracking
  initializeProjectileTracking: (state: State): void => {
    bot.events.register( "ProjectileMoved", (event: any) => {
        projectileFunctions.updateProjectileDistance(state, event);
      },
      0
    );

    bot.events.register( "ProjectileDisplaced", (event: any) => {
        projectileFunctions.removeProjectile(state, event);
      },
      0
    );
  },

  // Enhanced projectile distance update with target tracking
  updateProjectileDistance: (state: State, event: any): void => {
    const projectile = event.getProjectile?.();
    if (!projectile) return;
    
    const id = projectile.getId?.() ?? projectile.id;
    const distance = projectileFunctions.calculateProjectileDistance(projectile);
    const maxDistance = 10;

    if (distance === null) return;

    // Get target location and timing
    const targetX = projectile.getX?.();
    const targetY = projectile.getY?.();
    const remainingCycles = projectile.getRemainingCycles?.();
    const ticksUntilHit = remainingCycles ? Math.ceil(remainingCycles / 30) : undefined;
    const startCycle = projectile.getStartCycle?.();
    const endCycle = projectile.getEndCycle?.();

    if (distance <= maxDistance) {
      if (!projectileFunctions.trackedProjectiles.has(id)) {
        projectileFunctions.trackedProjectiles.set(id, { id, distance, hasHit: false, targetX, targetY, ticksUntilHit, startCycle, endCycle});
        logger(state, "debug", "updateProjectileDistance", 
          `Tracking projectile ${id} at distance ${distance}, hits in ${ticksUntilHit} ticks at (${targetX}, ${targetY})`);
      } else {
        const tracked = projectileFunctions.trackedProjectiles.get(id)!;
        tracked.distance = distance;
        tracked.ticksUntilHit = ticksUntilHit;
      }
    } else if (projectileFunctions.trackedProjectiles.has(id)) {
      projectileFunctions.trackedProjectiles.delete(id);
      logger(state, "debug", "updateProjectileDistance", `Projectile ${id} out of range`);
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
      projectileFunctions.trackedProjectiles.delete(id);
      logger(state, "debug", "removeProjectile", `Projectile ${id} has hit/despawned`);
    }
  },

  // Get sorted projectiles by distance
  getSortedProjectiles: (): Array<{ id: number; distance: number; hasHit: boolean; targetX?: number; targetY?: number; ticksUntilHit?: number;
  }> => {
    return Array.from(projectileFunctions.trackedProjectiles.values())
      .filter(p => !p.hasHit)
      .sort((a, b) => a.distance - b.distance);
  },

  // Get projectiles near the player within a specified distance defaulting to 3 tiles
  projectilesNearPlayer: (state: State, maxDistance = 3) => {
    logger(state, "debug", "projectilesNearPlayer", `Scanning projectiles within ${maxDistance} tiles.`);
    const projectiles = client.getProjectiles ? client.getProjectiles().toArray() : [];
    const player = client?.getLocalPlayer?.();
    const playerLoc = player?.getWorldLocation?.();

    if (!playerLoc?.distanceTo) return projectiles;
    const nearby = projectiles.filter((p: any) => {
      const loc = p?.getWorldLocation?.();
      return loc?.distanceTo ? loc.distanceTo(playerLoc) <= maxDistance : true;
    });
    logger(state, "debug", "projectilesNearPlayer", `Found ${nearby.length} nearby projectiles.`);
    return nearby;
  },

  // Determine the type of a given projectile
  projectileType: (state: State, projectile: any): "magic" | "ranged" | "melee" | "other" | "unknown" => {
    const id = projectile?.getId?.() ?? projectile?.id;
    const type = projectileTypeMap[id] ?? "unknown";
    logger(state, "debug", "projectileType", `Projectile id=${id} classified as ${type}.`);
    return type;
  },

  // Activate prayer based on projectile type
  prayProjectile: (state: State, projectile: any): boolean => {
    const id = projectile?.getId?.() ?? projectile?.id;
    const prayerKey = projectilePrayerMap[id];
    if (!prayerKey) {
      logger(state, "debug", "prayProjectile", `No prayer mapping for projectile id=${id}.`);
      return false;
    }
    logger(state, "debug", "prayProjectile", `Toggling prayer for projectile id=${id}: ${prayerKey}`);
    return prayerFunctions.togglePrayer(state, prayerKey);
  },

  // Get the prayer key for a projectile ID
  getPrayerKeyForProjectile: (projectileId: number): keyof typeof prayers | null => {
    return projectilePrayerMap[projectileId] ?? null;
  },

    // Get the prayer key for an NPC attack animation ID
  getTypeKeyForProjectile: (projectileId: number): "magic" | "ranged" | "melee" | "other" | undefined => {
    return projectileTypeMap[projectileId] ?? null;
  },

  // Get sorted NPC attacks by distance (stubbed method)
  getSortedNpcAttacksDist: (): Array<{ npcIndex: number; animationId: number; distance: number }> => {
    // TODO: Implement actual logic to return sorted NPC attacks
    return [];
  },

  // Check if projectile will hit player's current location
  willHitPlayer: (projectile: any): boolean => {
    const player = client?.getLocalPlayer?.();
    const playerLoc = player?.getWorldLocation?.();
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
  getProjectilesTargetingPlayer: (): Array<{ id: number; ticksUntilHit: number }> => {
    return Array.from(projectileFunctions.trackedProjectiles.values())
      .filter(p => {
        const player = client?.getLocalPlayer?.();
        const playerLoc = player?.getWorldLocation?.();
        return p.targetX === playerLoc?.getX() && p.targetY === playerLoc?.getY();
      })
      .map(p => ({ id: p.id, ticksUntilHit: p.ticksUntilHit ?? 0 }))
      .sort((a, b) => a.ticksUntilHit - b.ticksUntilHit);
  },
};