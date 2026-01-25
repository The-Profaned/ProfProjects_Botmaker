

declare namespace bot {
    /**
     * Interface for interacting with the Bot Maker's cache system
     * Allows storing and retrieving persistent data between bot sessions
     */
    interface bmCache {
        /**
         * Gets a boolean value from the BM cache
         * @param key The key to retrieve the value for
         * @param defaultValue The default value to return if the key doesn't exist
         * @returns The stored boolean value or the default value if not found
         */
        getBoolean: (key: string, defaultValue: boolean) => boolean;

        /**
         * Gets an integer value from the BM cache
         * @param key The key to retrieve the value for
         * @param defaultValue The default value to return if the key doesn't exist
         * @returns The stored integer value or the default value if not found
         */
        getInt: (key: string, defaultValue: number) => number;

        /**
         * Gets a string value from the BM cache
         * @param key The key to retrieve the value for
         * @param defaultValue The default value to return if the key doesn't exist
         * @returns The stored string value or the default value if not found
         */
        getString: (key: string, defaultValue: string) => string;

        /**
         * Saves a boolean value to the BM cache
         * @param key The key to store the value under
         * @param value The boolean value to store
         */
        saveBoolean: (key: string, value: boolean) => void;

        /**
         * Saves an integer value to the BM cache
         * @param key The key to store the value under
         * @param value The integer value to store
         */
        saveInt: (key: string, value: number) => void;

        /**
         * Saves a string value to the BM cache
         * @param key The key to store the value under
         * @param value The string value to store
         */
        saveString: (key: string, value: string) => void;
    }
}
