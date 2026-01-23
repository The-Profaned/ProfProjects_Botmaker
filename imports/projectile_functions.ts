import { prayerFunctions, prayers } from "./prayer_functions.js";
import { logger } from "./logger.js";
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

export const projectileFunctions = {
 
    // Get projectiles near the player within a specified distance
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
};