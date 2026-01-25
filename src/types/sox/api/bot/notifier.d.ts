

declare namespace bot {
    /**
     * Interface for sending notifications
     * Used to alert the user about important events
     */
    interface notifier {
        /**
         * Sends a notification message to the user
         * This can trigger desktop notifications or other alerting mechanisms
         * @param message The notification message to send
         */
        sendMessage: (message: string) => void;
    }
}
