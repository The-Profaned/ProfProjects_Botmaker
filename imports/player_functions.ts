// imports
import { prayerFunctions, prayers } from "./prayer_functions.js";
import { projectileFunctions } from "../imports/projectile_functions.js";
import { logger } from "../imports/logger.js";
import { State } from "./types";

// Player-related utility functions
export const playerFunctions = {
    // Check if player is currently in dialogue
    playerInDialogue: true,
    
    // Track projectiles and their states
    trackedProjectiles: new Map<number, { id: number, distance: number, hasHit: boolean }>(),
    
    // Initialize event listeners for projectile tracking
    initializeProjectileTracking: (state: State): void => {
        bot.events.register("ProjectileMoved", (event: any) => {
            playerFunctions.updateProjectileDistance(state, event);
        }, 0);
        
        bot.events.register("ProjectileDisplaced", (event: any) => {
            playerFunctions.removeProjectile(state, event);
        }, 0);
    },
    
    // Update projectile distance or add to tracking
    updateProjectileDistance: (state: State, event: any): void => {
        const projectile = event.getProjectile?.();
        if (!projectile) return;
        
        const id = projectile.getId?.() ?? projectile.id;
        const distance = playerFunctions.calculateProjectileDistance(projectile);
        
        if (distance === null) return;
        
        const maxDistance = 3;
        if (distance <= maxDistance) {
            if (!playerFunctions.trackedProjectiles.has(id)) {
                playerFunctions.trackedProjectiles.set(id, { id, distance, hasHit: false });
                logger(state, "debug", "updateProjectileDistance", `Tracking new projectile ${id} at distance ${distance}`);
            } else {
                playerFunctions.trackedProjectiles.get(id)!.distance = distance;
            }
        } else if (playerFunctions.trackedProjectiles.has(id)) {
            playerFunctions.trackedProjectiles.delete(id);
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
        if (playerFunctions.trackedProjectiles.has(id)) {
            playerFunctions.trackedProjectiles.delete(id);
            logger(state, "debug", "removeProjectile", `Projectile ${id} has hit/despawned`);
        }
    },
    
    // Disable all protection prayers
    disableProtectionPrayers: (state: State): void => {
        const protectionPrayers: (keyof typeof prayers)[] = ["protMelee", "protMage", "protRange"];
        for (const prayer of protectionPrayers) {
            if (prayerFunctions.checkPrayer(state, prayer)) {
                bot.prayer.togglePrayer(prayers[prayer], false);
                logger(state, "debug", "disableProtectionPrayers", `Toggled off ${prayer}`);
            }
        }
    },
    
    // Get sorted projectiles by distance
    getSortedProjectiles: (): Array<{ id: number; distance: number; hasHit: boolean }> => {
        return Array.from(playerFunctions.trackedProjectiles.values())
            .sort((a, b) => a.distance - b.distance);
    },
    
    // Activate prayer for closest projectile
    activatePrayerForProjectile: (state: State, projectile: any): boolean => {
        const prayerKey = projectileFunctions.getPrayerKeyForProjectile(projectile.id);
        
        if (!prayerKey) {
            logger(state, "debug", "activatePrayerForProjectile", `No prayer mapping for projectile ${projectile.id}`);
            return false;
        }
        
        if (prayerFunctions.checkPrayer(state, prayerKey)) {
            logger(state, "debug", "activatePrayerForProjectile", `Already praying ${prayerKey} for projectile ${projectile.id}`);
            return true;
        }
        
        const activated = prayerFunctions.togglePrayer(state, prayerKey);
        logger(state, "debug", "activatePrayerForProjectile", 
            `Activated ${prayerKey} for projectile ${projectile.id} at distance ${projectile.distance}`);
        
        return activated;
    },
    
    // Handle prayer activation for closest projectile
    handleIncomingProjectiles: (state: State): boolean => {
        const sortedProjectiles = playerFunctions.getSortedProjectiles();
        
        if (sortedProjectiles.length === 0) {
            logger(state, "debug", "handleIncomingProjectiles", "No tracked projectiles within 3 tiles.");
            playerFunctions.disableProtectionPrayers(state);
            return false;
        }
        
        logger(state, "debug", "handleIncomingProjectiles", 
            `Projectile queue (${sortedProjectiles.length}): ${sortedProjectiles.map(p => `${p.id}(${p.distance}t)`).join(", ")}`);
        
        return playerFunctions.activatePrayerForProjectile(state, sortedProjectiles[0]);
    },
}