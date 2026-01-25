

declare namespace bot {
    /**
     * Interface for managing the bot's break handling functionality
     * Controls whether the bot will take automated breaks
     */
    interface breakHandler {
        /**
         * Sets the status of the break handler
         * @param status True to enable the break handler, false to disable it
         */
        setBreakHandlerStatus(status: boolean): void;
    }
}
