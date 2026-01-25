/// <reference path="../../../runelite/index.d.ts" />

declare namespace bot {
    /**
     * Interface for interacting with NPCs (Non-Player Characters) in the game
     * Provides methods to find and interact with NPCs
     */
    interface npcs {
        /**
         * Gets the current animation ID of an NPC
         * @param npc The NPC to get the animation ID for
         * @returns The animation ID of the NPC
         */
        getAnimationID: (npc: net.runelite.api.NPC) => number;

        /**
         * Gets the attack speed of an NPC type
         * @param npcId The ID of the NPC type
         * @returns The attack speed in game ticks
         */
        getAttackSpeed: (npcId: number) => number;

        /**
         * Gets the closest NPC from an array of NPCs
         * @param npcs Array of NPCs to search
         * @returns The closest NPC or null if none found
         */
        getClosest: (npcs: Array<net.runelite.api.NPC>) => net.runelite.api.NPC | null;

        /**
         * Gets the closest NPC within a maximum distance
         * @param npcs Array of NPCs to search
         * @param maxDistance The maximum distance to search within
         * @returns The closest NPC within the specified distance or null if none found
         */
        getClosestWithin: (npcs: Array<net.runelite.api.NPC>, maxDistance: number) => net.runelite.api.NPC | null;

        /**
         * Gets the head icon of an NPC (such as prayer icons)
         * @param npc The NPC to get the head icon for
         * @returns The head icon of the NPC
         */
        getHeadIcon: (npc: net.runelite.api.NPC) => net.runelite.api.HeadIcon;

        /**
         * Gets all NPCs with the specified IDs
         * @param ids Array of NPC IDs to search for
         * @returns Array of matching NPC instances
         */
        getWithIds: (ids: number[]) => net.runelite.api.NPC[];

        /**
         * Gets all NPCs with the specified names
         * @param names Array of NPC names to search for
         * @returns Array of matching NPC instances
         */
        getWithNames: (names: string[]) => net.runelite.api.NPC[];

        /**
         * Interacts with an NPC by name and action
         * @param npcName The name of the NPC to interact with
         * @param action The interaction action to perform
         */
        interact: (npcName: string, action: string) => void;

        /**
         * Interacts with a supplied NPC instance
         * @param target The NPC instance to interact with
         * @param action The interaction action to perform
         */
        interactSupplied: (target: net.runelite.api.NPC, action: string) => void;

        /**
         * Checks if any NPCs with the specified IDs are within a certain distance
         * @param ids Array of NPC IDs to check
         * @param distance The maximum distance to check within
         * @returns True if any NPCs are within the specified distance, false otherwise
         */
        isNearIds: (ids: number[], distance: number) => boolean;

        /**
         * Checks if any NPCs with the specified names are within a certain distance
         * @param names Array of NPC names to check
         * @param distance The maximum distance to check within
         * @returns True if any NPCs are within the specified distance, false otherwise
         */
        isNearNames: (names: string[], distance: number) => boolean;
    }
}
