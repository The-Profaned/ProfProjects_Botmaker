/// <reference path="../../../runelite/index.d.ts" />

declare namespace bot {
    /**
     * Interface for interacting with the player's inventory
     * Provides methods to check inventory contents and use items
     */
    interface inventory {
        /**
         * Checks if the inventory contains all items with the specified IDs
         * @param ids Array of item IDs to check for
         * @returns True if all specified items are in the inventory, false otherwise
         */
        containsAllIds: (ids: number[]) => boolean;

        /**
         * Checks if the inventory contains all items with the specified names
         * @param names Array of item names to check for
         * @returns True if all specified items are in the inventory, false otherwise
         */
        containsAllNames: (names: string[]) => boolean;

        /**
         * Checks if the inventory contains any items with the specified IDs
         * @param ids Array of item IDs to check for
         * @returns True if any of the specified items are in the inventory, false otherwise
         */
        containsAnyIds: (ids: number[]) => boolean;

        /**
         * Checks if the inventory contains any items with the specified names
         * @param names Array of item names to check for
         * @returns True if any of the specified items are in the inventory, false otherwise
         */
        containsAnyNames: (names: string[]) => boolean;

        /**
         * Checks if the inventory contains an item with the specified ID
         * @param id The item ID to check for
         * @returns True if the item is in the inventory, false otherwise
         */
        containsId: (id: number) => boolean;

        /**
         * Checks if the inventory contains an item with the specified name
         * @param name The item name to check for
         * @returns True if the item is in the inventory, false otherwise
         */
        containsName: (name: string) => boolean;

        /**
         * Gets the number of empty slots in the inventory
         * @returns The number of empty inventory slots
         */
        getEmptySlots: () => number;

        /**
         * Gets the quantities of all items with the specified IDs
         * @param itemIds Array of item IDs to get quantities for
         * @returns Array of quantities corresponding to the input IDs
         */
        getQuantityOfAllIds: (itemIds: number[]) => number[];

        /**
         * Gets the quantities of all items with the specified names
         * @param itemNames Array of item names to get quantities for
         * @returns Array of quantities corresponding to the input names
         */
        getQuantityOfAllNames: (itemNames: string[]) => number[];

        /**
         * Gets the quantity of an item with the specified ID
         * @param itemId The item ID to get the quantity for
         * @returns The quantity of the item in the inventory
         */
        getQuantityOfId: (itemId: number) => number;

        /**
         * Gets the quantity of an item with the specified name
         * @param itemName The item name to get the quantity for
         * @returns The quantity of the item in the inventory
         */
        getQuantityOfName: (itemName: string) => number;

        /**
         * Interacts with an inventory item at the specified index
         * @param index The index of the item to interact with
         * @param options Array of interaction options
         */
        interactAtIndex: (index: number, options: string[]) => void;

        /**
         * Interacts with inventory items by their IDs
         * @param itemIds Array of item IDs to interact with
         * @param options Array of interaction options
         */
        interactWithIds: (itemIds: number[], options: string[]) => void;

        /**
         * Interacts with inventory items by their names
         * @param itemNames Array of item names to interact with
         * @param options Array of interaction options
         */
        interactWithNames: (itemNames: string[], options: string[]) => void;

        /**
         * Uses one inventory item on another by their IDs
         * @param itemId1 The ID of the item to use
         * @param itemId2 The ID of the item to use it on
         */
        itemOnItemWithIds: (itemId1: number, itemId2: number) => void;

        /**
         * Uses on inventory item on the last item in the inventory by its ID
         * @param itemId1 The ID of the item to use
         * @param lastItemId2 The ID of the last item in the inventory
         */
        itemOnLastItemWithIds: (itemId1: number, lastItemId2: number) => void;

        /**
         * Uses an inventory item on an NPC by the item's ID
         * @param itemId The ID of the item to use
         * @param npc The NPC to use the item on
         */
        itemOnNpcWithIds: (itemId: number, npc: net.runelite.api.NPC) => void;

        /**
         * Uses an inventory item on a tile object by the item's ID
         * @param itemId The ID of the item to use
         * @param tileObject The tile object to use the item on
         */
        itemOnObjectWithIds: (itemId: number, tileObject: net.runelite.api.TileObject) => void;

        /**
         * Uses an inventory item on a player by the item's ID
         * @param itemId The ID of the item to use
         * @param player The player to use the item on
         */
        itemOnPlayerWithIds: (itemId: number, player: net.runelite.api.Player) => void;

        /**
         * Uses an inventory item on a player by the item's name
         * @param itemNames Array of item names to use
         * @param playerNames Array of player names to use the item on
         */
        itemOnPlayerWithNames: (itemNames: string[], playerNames: string[]) => void;

        /**
         * Checks if the inventory is full
         * @returns True if the inventory is full, false otherwise
         */
        isFull: () => boolean;

        /**
         * Gets all widgets in the inventory
         * @returns An array of all inventory widgets
         */
        getAllWidgets(): net.runelite.api.widgets.Widget[];
    }
}
