

declare namespace bot {
    /**
     * Represents the interface for interacting with the bank system.
     */
    interface bank {
        /**
         * Closes the bank interface.
         */
        close: () => void;

        /**
         * Consumes (removes) items from the bank by their IDs.
         * @param ids - The array of item IDs to consume.
         * @returns True if the operation was successful, otherwise false.
         */
        consumeIds: (ids: number[]) => boolean;

        /**
         * Consumes (removes) items from the bank by their names.
         * @param names - The array of item names to consume.
         * @returns True if the operation was successful, otherwise false.
         */
        consumeNames: (names: string[]) => boolean;

        /**
         * Deposits all items from the inventory into the bank.
         */
        depositAll: () => void;

        /**
         * Deposits all items with the specified ID from the inventory into the bank.
         * @param id - The item ID to deposit.
         */
        depositAllWithId: (id: number) => void;

        /**
         * Deposits all items with the specified name from the inventory into the bank.
         * @param name - The item name to deposit.
         */
        depositAllWithName: (name: string) => void;

        /**
         * Deposits a single item with the specified ID from the inventory into the bank.
         * @param id - The item ID to deposit.
         */
        depositWithId: (id: number) => void;

        /**
         * Deposits a single item with the specified name from the inventory into the bank.
         * @param name - The item name to deposit.
         */
        depositWithName: (name: string) => void;

        /**
         * Gets the current noted mode status.
         * @returns True if noted mode is enabled, otherwise false.
         */
        getNotedMode: () => boolean;

        /**
         * Gets the quantities of all specified item IDs in the bank.
         * @param itemIds - The array of item IDs to check.
         * @returns An array of quantities corresponding to the provided item IDs.
         */
        getQuantityOfAllIds: (itemIds: number[]) => number[];

        /**
         * Gets the quantities of all specified item names in the bank.
         * @param itemNames - The array of item names to check.
         * @returns An array of quantities corresponding to the provided item names.
         */
        getQuantityOfAllNames: (itemNames: string[]) => number[];

        /**
         * Gets the quantity of a specific item ID in the bank.
         * @param itemId - The item ID to check.
         * @returns The quantity of the specified item.
         */
        getQuantityOfId: (itemId: number) => number;

        /**
         * Gets the quantity of a specific item name in the bank.
         * @param itemName - The item name to check.
         * @returns The quantity of the specified item.
         */
        getQuantityOfName: (itemName: string) => number;

        /**
         * Checks if the player is currently banking.
         * @returns True if banking, otherwise false.
         */
        isBanking: () => boolean;

        /**
         * Checks if the bank interface is currently open.
         * @returns True if the bank is open, otherwise false.
         */
        isOpen: () => boolean;

        /**
         * Opens the bank interface.
         */
        open: () => void;

        /**
         * Sets the noted mode for withdrawing items.
         * @param value - True to enable noted mode, false to disable.
         */
        setNotedMode: (value: boolean) => void;

        /**
         * Withdraws all items with the specified ID from the bank.
         * @param id - The item ID to withdraw.
         */
        withdrawAllWithId: (id: number) => void;

        /**
         * Withdraws all items with the specified name from the bank.
         * @param name - The item name to withdraw.
         */
        withdrawAllWithName: (name: string) => void;

        /**
         * Withdraws a specific quantity of an item with the specified ID from the bank.
         * @param id - The item ID to withdraw.
         * @param quantity - The quantity to withdraw.
         */
        withdrawQuantityWithId: (id: number, quantity: number) => void;

        /**
         * Withdraws a single item with the specified ID from the bank.
         * @param id - The item ID to withdraw.
         */
        withdrawWithId: (id: number) => void;

        /**
         * Withdraws a single item with the specified name from the bank.
         * @param name - The item name to withdraw.
         */
        withdrawWithName: (name: string) => void;
    }
}
