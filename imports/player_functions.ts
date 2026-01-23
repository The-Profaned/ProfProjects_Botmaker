import { projectileFunctions } from "../imports/projectile_functions.js";
import { logger } from "../imports/logger.js";
import { State } from "./types";

// Player-related utility functions
export const playerFunctions = {
    // Check if player is currently in dialogue
    playerInDialogue: true,
    
    // If a projectile is about to hit the player, pray against it
    handleIncomingProjectiles: (state: State, maxDistance = 1): boolean => {
        const nearby = projectileFunctions.projectilesNearPlayer(state, maxDistance);
        if (!nearby?.length) {
            logger(state, "debug", "handleIncomingProjectiles", "No nearby projectiles.");
            return false;
        }
        let prayed = false;
        for (const proj of nearby) {
            prayed = projectileFunctions.prayProjectile(state, proj) || prayed;
        }
        logger(state, "debug", "handleIncomingProjectiles", prayed ? "Activated prayer for incoming projectile." : "No matching prayer for nearby projectiles."
        );
        return prayed;
    },
}