

declare namespace bot {
    /**
     * Interface for interacting with other players in the game
     * Provides methods to interact with and check for other players
     */
    interface players {
        /**
         * Attacks a player by name
         * @param names Array of player names to attack
         */
        attackPlayer: (names: string[]) => void;

        /**
         * Follows a player by name
         * @param names Array of player names to follow
         */
        followPlayer: (names: string[]) => void;

        /**
         * Checks if a player is within a specified radius
         * @param radius The radius to check within
         * @param names Array of player names to check for
         * @returns True if any matching players are within the radius, false otherwise
         */
        isNearPlayer: (radius: number, names: string[]) => boolean;

        /**
         * Initiates a trade with a player by name
         * @param names Array of player names to trade with
         */
        tradePlayer: (names: string[]) => void;
    }
}
