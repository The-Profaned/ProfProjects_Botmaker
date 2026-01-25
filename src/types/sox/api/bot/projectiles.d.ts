/// <reference path="../../../runelite/index.d.ts" />

declare namespace bot {
    /**
     * Interface for interacting with projectiles in the game
     * Provides methods to retrieve information about active projectiles
     */
    interface projectiles {
        /**
         * Gets all projectiles that match the specified IDs
         * @param ids Array of projectile IDs to match
         * @returns Array of matching Projectile objects
         */
        getProjectilesWithIds: (ids: number[]) => net.runelite.api.Projectile[];
    }
}
