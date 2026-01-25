

declare namespace bot {
    /**
     * Interface for managing numeric counters within the bot
     * Useful for tracking statistics and progress during bot operation
     */
    interface counters {
        /**
         * Gets the value of a counter
         * @param name The name of the counter to retrieve
         * @returns The current value of the counter
         */
        getCounter: (name: string) => number;

        /**
         * Sets the value of a counter
         * @param name The name of the counter to set
         * @param value The value to set the counter to
         */
        setCounter: (name: string, value: number) => void;
    }
}
