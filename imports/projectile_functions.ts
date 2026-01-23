import { prayerFunctions, prayers } from "./prayer_functions.js";
import { logger } from "../imports/logger.js";
import { State } from "./types.js";

// Map projectile IDs to prayer keys (add your IDs here)
const projectilePrayerMap: Record<number, keyof typeof prayers> = {
  // example: 335: "protMage",
  // example: 331: "protRange",
};

// Map projectile IDs to simple type labels
const projectileTypeMap: Record<number, "magic" | "ranged" | "melee" | "other"> = {
  // example: 335: "magic",
  // example: 331: "ranged",
};

// Map NPC animation IDs to prayer keys (add your IDs here)
const animationPrayerMap: Record<number, keyof typeof prayers> = {
  // example: 7617: "protRange",
  // example: 7618: "protMage",
};

// Map NPC animation IDs to attack type labels
const animationTypeMap: Record<number, "magic" | "ranged" | "melee" | "other"> = {
  // example: 7617: "ranged",
  // example: 7618: "magic",
};

export const projectileFunctions = {
  // Track projectiles and their states
  trackedProjectiles: new Map<number, { id: number, distance: number, hasHit: boolean }>(),

  // Track NPC attack animations
  trackedNpcAttacks: new Map<number, { npcIndex: number; animationId: number; distance: number }>(),

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

    // NPC animation-based pre-emptive prayer
    bot.events.register("AnimationChanged", (event: any) => {
        projectileFunctions.updateNpcAttackAnimation(state, event);
      },
      0
    );

    bot.events.register( "NpcDespawned", (event: any) => {
        projectileFunctions.removeNpcAttack(state, event);
      },
      0
    );
  },

  // Update projectile distance or add to tracking
  updateProjectileDistance: (state: State, event: any): void => {
    const projectile = event.getProjectile?.();
    if (!projectile) return;

    const id = projectile.getId?.() ?? projectile.id;
    const distance = projectileFunctions.calculateProjectileDistance(projectile);

    if (distance === null) return;

    const maxDistance = 3;
    if (distance <= maxDistance) {
      if (!projectileFunctions.trackedProjectiles.has(id)) {
        projectileFunctions.trackedProjectiles.set(id, { id, distance, hasHit: false });
        logger(state, "debug", "updateProjectileDistance", `Tracking new projectile ${id} at distance ${distance}`);
      } else {
        projectileFunctions.trackedProjectiles.get(id)!.distance = distance;
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
  getSortedProjectiles: (): Array<{ id: number; distance: number; hasHit: boolean }> => {
    return Array.from(projectileFunctions.trackedProjectiles.values()).sort((a, b) => a.distance - b.distance);
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

  // --- NPC animation pre-emptive tracking ---

  updateNpcAttackAnimation: (state: State, event: any): void => {
    const actor = event.getActor?.();
    if (!actor?.isNpc?.()) return;

    const npc = actor;
    const animationId = event.getAnimationId?.() ?? npc.getAnimation?.();
    if (!animationId) return;

    const prayerKey = animationPrayerMap[animationId];
    if (!prayerKey) {
      // Not an attack animation we care about; clear any existing tracked attack for this npc
      projectileFunctions.trackedNpcAttacks.delete(npc.getIndex?.() ?? -1);
      return;
    }

    const player = client?.getLocalPlayer?.();
    const playerLoc = player?.getWorldLocation?.();
    const npcLoc = npc?.getWorldLocation?.();
    if (!playerLoc || !npcLoc) return;

    const distance = npcLoc.distanceTo(playerLoc);
    const maxDistance = 10; // allow pre-empt within 10 tiles (adjust if needed)

    const npcIndex = npc.getIndex?.() ?? -1;
    if (distance <= maxDistance) {
      projectileFunctions.trackedNpcAttacks.set(npcIndex, { npcIndex, animationId, distance });
      logger( state, "debug", "updateNpcAttackAnimation", `Tracking npc ${npcIndex} anim=${animationId} at distance ${distance}`
      );
    } else if (projectileFunctions.trackedNpcAttacks.has(npcIndex)) {
      projectileFunctions.trackedNpcAttacks.delete(npcIndex);
      logger(state, "debug", "updateNpcAttackAnimation", `Npc ${npcIndex} out of range`);
    }
  },

  removeNpcAttack: (state: State, event: any): void => {
    const npc = event.getNpc?.();
    if (!npc) return;
    const npcIndex = npc.getIndex?.() ?? -1;
    if (projectileFunctions.trackedNpcAttacks.has(npcIndex)) {
      projectileFunctions.trackedNpcAttacks.delete(npcIndex);
      logger(state, "debug", "removeNpcAttack", `Npc ${npcIndex} despawned/removed`);
    }
  },

  getSortedNpcAttacks: (): Array<{ npcIndex: number; animationId: number; distance: number }> => {
    return Array.from(projectileFunctions.trackedNpcAttacks.values()).sort((a, b) => a.distance - b.distance);
  },

  getPrayerKeyForAnimation: (animationId: number): keyof typeof prayers | null => {
    return animationPrayerMap[animationId] ?? null;
  },
};