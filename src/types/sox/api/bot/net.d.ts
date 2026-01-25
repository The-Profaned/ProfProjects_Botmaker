

declare namespace bot {
    /**
     * Interface for network communication between bots
     * Allows sending messages to other bots or players
     */
    interface net {
        /**
         * Sends a message to specified targets via the network
         * @param targetIds Array of target IDs to send the message to
         * @param message The message content to send
         * @param includeSelf Whether to include the sender in the recipients
         */
        sendMessage: (targetIds: string[], message: string, includeSelf: boolean) => void;

        /**
         * Sends a message to local players
         * @param message The message content to send
         * @param includeSelf Whether to include the sender in the recipients
         */
        sendMessageToLocalPlayers: (message: string, includeSelf: boolean) => void;
    }
}
