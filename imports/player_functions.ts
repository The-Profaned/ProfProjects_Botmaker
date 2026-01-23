// imports
import { prayerFunctions, prayers } from "./prayer_functions.js";
import { projectileFunctions } from "../imports/projectile_functions.js";
import { logger } from "../imports/logger.js";
import { State } from "./types.js";

// Player-related utility functions
export const playerFunctions = {
    // Check if player is currently in dialogue
    playerInDialogue: true,
    
    // Initialize projectile and NPC animation tracking
    initializeProjectileTracking: (state: State): void => {
        projectileFunctions.initializeProjectileTracking(state);
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

    // Activate prayer for closest NPC attack animation (pre-emptive)
    activatePrayerForNpcAttack: (state: State, npcAttack: { npcIndex: number; animationId: number; distance: number }): boolean => {
        const prayerKey = projectileFunctions.getPrayerKeyForAnimation(npcAttack.animationId);

        if (!prayerKey) {
            logger(state, "debug", "activatePrayerForNpcAttack", `No prayer mapping for NPC anim ${npcAttack.animationId}`);
            return false;
        }

        if (prayerFunctions.checkPrayer(state, prayerKey)) {
            logger(state, "debug", "activatePrayerForNpcAttack", `Already praying ${prayerKey} for NPC ${npcAttack.npcIndex}`);
            return true;
        }

        const activated = prayerFunctions.togglePrayer(state, prayerKey);
        logger(state, "debug", "activatePrayerForNpcAttack",`Activated ${prayerKey} for NPC ${npcAttack.npcIndex} anim ${npcAttack.animationId} at distance ${npcAttack.distance}`
        );

        return activated;
    },
    
    // Handle prayer activation for closest projectile
    handleIncomingProjectiles: (state: State): boolean => {
        const sortedProjectiles = projectileFunctions.getSortedProjectiles();
        
        if (sortedProjectiles.length === 0) {
            logger(state, "debug", "handleIncomingProjectiles", "No tracked projectiles within 3 tiles.");
            playerFunctions.disableProtectionPrayers(state);
            return false;
        }
        
        logger(state, "debug", "handleIncomingProjectiles", 
            `Projectile queue (${sortedProjectiles.length}): ${sortedProjectiles.map(p => `${p.id}(${p.distance}t)`).join(", ")}`);
        
        return playerFunctions.activatePrayerForProjectile(state, sortedProjectiles[0]);
    },

    // Handle pre-emptive prayer activation for closest NPC attack animation
    handleNpcAttackAnimations: (state: State): boolean => {
        const sortedAttacks = projectileFunctions.getSortedNpcAttacks();

        if (sortedAttacks.length === 0) {
            logger(state, "debug", "handleNpcAttackAnimations", "No tracked NPC attack animations within range.");
            return false;
        }

        logger(state, "debug", "handleNpcAttackAnimations", `NPC attack queue (${sortedAttacks.length}): ${sortedAttacks.map(a => `${a.npcIndex}:${a.animationId}(${a.distance}t)`).join(", ")}`
        );

        return playerFunctions.activatePrayerForNpcAttack(state, sortedAttacks[0]);
    },
};