

declare namespace bot {
    /**
     * Interface for interacting with the player's equipped items
     * Provides methods to check and manage equipment
     */
    type Item = {
        id: number;
        quantity: number;
    };

    interface equipment {
        /**
         * Checks if the player has all the specified items equipped by their IDs
         * @param ids Array of item IDs to check for
         * @returns True if all specified items are equipped, false otherwise
         */
        containsAllIds: (ids: number[]) => boolean;

        /**
         * Checks if the player has all the specified items equipped by their names
         * @param names Array of item names to check for
         * @returns True if all specified items are equipped, false otherwise
         */
        containsAllNames: (names: string[]) => boolean;

        /**
         * Checks if the player has any of the specified items equipped by their IDs
         * @param ids Array of item IDs to check for
         * @returns True if any of the specified items are equipped, false otherwise
         */
        containsAnyIds: (ids: number[]) => boolean;

        /**
         * Checks if the player has any of the specified items equipped by their names
         * @param names Array of item names to check for
         * @returns True if any of the specified items are equipped, false otherwise
         */
        containsAnyNames: (names: string[]) => boolean;

        /**
         * Checks if the player has a specific item equipped by its ID
         * @param id The item ID to check for
         * @returns True if the item is equipped, false otherwise
         */
        containsId: (id: number) => boolean;

        /**
         * Checks if the player has a specific item equipped by its name
         * @param name The item name to check for
         * @returns True if the item is equipped, false otherwise
         */
        containsName: (name: string) => boolean;

        /**
         * Gets an array of all currently equipped items
         * @returns Array of equipped items
         */
        getEquipment: () => Item[];
    }
}
