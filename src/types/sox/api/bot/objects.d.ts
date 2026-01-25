/// <reference path="../../../runelite/index.d.ts" />

declare namespace bot {
    /**
     * Interface for interacting with game objects in the world
     * Provides methods to find and interact with various objects
     */
    interface objects {
        /**
         * Gets the closest object from an array of tile objects
         * @param tileObjects Array of tile objects to search through
         * @returns The closest tile object to the player
         */
        getClosest: (tileObjects: net.runelite.api.TileObject[]) => net.runelite.api.TileObject;

        /**
         * Gets the closest object within a maximum distance
         * @param tileObjects Array of tile objects to search through
         * @param maxDistance The maximum distance to search within
         * @returns The closest tile object within the specified distance
         */
        getClosestWithin: (tileObjects: net.runelite.api.TileObject[], maxDistance: number) => net.runelite.api.TileObject;

        /**
         * Gets the composition data for a tile object
         * @param objectId The ID of the object to get composition for
         * @returns The object composition data
         */
        getTileObjectComposition: (objectId: number) => net.runelite.api.ObjectComposition;

        /**
         * Gets all tile objects with the specified IDs
         * @param ids Array of object IDs to search for
         * @returns Array of matching tile objects
         */
        getTileObjectsWithIds: (ids: number[]) => net.runelite.api.TileObject[];

        /**
         * Gets all tile objects with the specified names
         * @param names Array of object names to search for
         * @returns Array of matching tile objects
         */
        getTileObjectsWithNames: (names: string[]) => net.runelite.api.TileObject[];

        /**
         * Gets all tile objects with the specified interaction options
         * @param options Array of interaction options to search for
         * @returns Array of matching tile objects
         */
        getTileObjectsWithOptions: (options: string[]) => net.runelite.api.TileObject[];

        /**
         * Interacts with an object by name
         * @param objectName The name of the object to interact with
         * @param action The interaction action to perform
         */
        interactObject: (objectName: string, action: string) => void;

        /**
         * Interacts with multiple objects by name
         * @param objectNames Array of object names to interact with
         * @param actions Array of interaction actions to perform
         */
        interactObjects: (objectNames: string[], actions: string[]) => void;

        /**
         * Interacts with a supplied object instance
         * @param target The tile object instance to interact with
         * @param action The interaction action to perform
         */
        interactSuppliedObject: (target: net.runelite.api.TileObject, action: string) => void;

        /**
         * Checks if objects with the specified IDs are near the player
         * @param ids Array of object IDs to check for
         * @param distance The maximum distance to check within
         * @returns True if any matching objects are within the distance, false otherwise
         */
        isNearIds: (ids: number[], distance: number) => boolean;

        /**
         * Checks if objects with the specified names are near the player
         * @param names Array of object names to check for
         * @param distance The maximum distance to check within
         * @returns True if any matching objects are within the distance, false otherwise
         */
        isNearNames: (names: string[], distance: number) => boolean;
    }
}
