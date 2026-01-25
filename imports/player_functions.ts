// imports
import { npcFunctions } from "./npc_functions.js";
import { prayerFunctions, prayers } from "./prayer_functions.js";
import { projectileFunctions } from "./projectile_functions.js";
import { logger } from "./logger.js";
import { State } from "./types.js";

// Player-related utility functions
export const playerFunctions = {
    // Check if player is currently in dialogue
    playerInDialogue: true,
    
    // Initialize projectile and NPC animation tracking
    initializeProjectileTracking: (state: State): void => {
        projectileFunctions.initializeProjectileTracking(state);
    },

    // Initialize NPC attack animation tracking
    initializeNpcAttackTracking: (state: State): void => {
        npcFunctions.initializeNpcAttackTracking(state);
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

        const activated = prayerFunctions.togglePrayer(state, prayerKey);

        if (prayerFunctions.checkPrayer(state, prayerKey)) {
            logger(state, "debug", "activatePrayerForProjectile", `Already praying ${prayerKey} for projectile ${projectile.id}`);
            return true;
        }

        logger(state, "debug", "activatePrayerForProjectile", 
            `Activated ${prayerKey} for projectile ${projectile.id} at distance ${projectile.distance}`);

        return activated;
    },

    // Activate prayer for closest NPC attack animation (pre-emptive)
    activatePrayerForNpcAttack: (state: State, npcAttack: { npcIndex: number; animationId: number; distance: number }): boolean => {
        const prayerKey = npcFunctions.getPrayerKeyForAnimation(npcAttack.animationId);

        if (!prayerKey) {
            logger(state, "debug", "activatePrayerForNpcAttack", `No prayer mapping for NPC anim ${npcAttack.animationId}`);
            return false;
        }
        
        const activated = prayerFunctions.togglePrayer(state, prayerKey);

        if (prayerFunctions.checkPrayer(state, prayerKey)) {
            logger(state, "debug", "activatePrayerForNpcAttack", `Already praying ${prayerKey} for NPC ${npcAttack.npcIndex}`);
            return true;
        }

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
        const sortedAttacks = projectileFunctions.getSortedNpcAttacksDist();

        if (sortedAttacks.length === 0) {
            logger(state, "debug", "handleNpcAttackAnimations", "No tracked NPC attack animations within range.");
            return false;
        }

        logger(state, "debug", "handleNpcAttackAnimations", `NPC attack queue (${sortedAttacks.length}): ${sortedAttacks.map(a => `${a.npcIndex}:${a.animationId}(${a.distance}t)`).join(", ")}`
        );

        return playerFunctions.activatePrayerForNpcAttack(state, sortedAttacks[0]);
    },

    // Attack target NPC by ID
    attackTargetNpc: (state: State, npcId: number): boolean => {
        const npc = npcFunctions.getClosestNPC([npcId]);
        const player = client?.getLocalPlayer?.();
        const interacting = player.getInteracting?.();

        if (!npc) {
            logger(state, "debug", "attackTargetNpc", `No NPC found with ID ${npcId}`);
            return false;
        }

        if (!player) {
            logger(state, "debug", "attackTargetNpc", "Player not found");
            return false;
        }

        if (interacting && interacting === npc) {
            logger(state, "debug", "attackTargetNpc", `Already attacking NPC ${npcId}`);
            return true;
        }

        bot.npcs.interact(npc.getName?.(), "Attack");
        logger(state, "debug", "attackTargetNpc", `Attacking NPC ${npcId} at ${npc.getWorldLocation()}`);
        return true;
    },

    // Move player to specified safe tile coordinates
    moveToSafeTile: (state: State, moveToSafeTile: {x: number, y: number}): boolean => {
        const player = client?.getLocalPlayer?.();
        const playerLoc = player.getWorldLocation?.();

        if (!player) {
            logger(state, "debug", "moveToSafeTile", "Player not found");
            return false;
        }

        if (!playerLoc) {
            logger(state, "debug", "moveToSafeTile", "Player location not found");
            return false;
        }

        if (playerLoc.getX() === moveToSafeTile.x && playerLoc.getY() === moveToSafeTile.y) {
            logger(state, "debug", "moveToSafeTile", `Already at safe tile (${moveToSafeTile.x}, ${moveToSafeTile.y})`);
            return true;
        }
        
        bot.walking.walkToWorldPoint(moveToSafeTile.x, moveToSafeTile.y);
        logger(state, "debug", "moveToSafeTile", `Moving to safe tile (${moveToSafeTile.x}, ${moveToSafeTile.y})`);
        return true;
    },
};