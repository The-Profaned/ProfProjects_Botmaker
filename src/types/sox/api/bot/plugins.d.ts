/// <reference path="../../../runelite/index.d.ts" />

declare namespace bot {
    /**
     * Interface for the Quest Helper plugin
     * Provides methods to assist with quest completion and navigation
     */
    interface questHelper {
        /**
         * Gets the name of the current quest being assisted
         * @returns The name of the current quest
         */
        getCurrentQuestName: () => string;

        /**
         * Gets the next item(s) needed for the quest
         * @returns An array containing information about the next required item(s)
         */
        getNextItem: () => any[];

        /**
         * Gets the next item-on-item interaction needed for the quest
         * @returns Information about the next item-on-item interaction
         * @todo ItemOnItem type definition
         */
        getNextItemOnItem: () => any;

        /**
         * Gets the next NPC to interact with for the quest
         * @returns The next NPC object to interact with
         */
        getNextNpc: () => net.runelite.api.NPC;

        /**
         * Gets the next object to interact with for the quest
         * @returns The next TileObject to interact with
         */
        getNextTileObject: () => net.runelite.api.TileObject;

        /**
         * Gets the next widget to interact with for the quest
         * @returns The next Widget to interact with
         */
        getNextWidget: () => net.runelite.api.widgets.Widget;

        /**
         * Gets the next world point to navigate to for the quest
         * @returns The next WorldPoint to navigate to
         */
        getNextWorldPoint: () => net.runelite.api.coords.WorldPoint;

        /**
         * Gets the overlay text shown by the quest helper
         * @returns The current overlay text
         */
        getOverlayText: () => string;

        /**
         * Checks if the current quest has been started
         * @returns True if the quest has been started, false otherwise
         */
        isQuestStarted: () => boolean;

        /**
         * Performs the next step in the quest
         * @returns True if the next step was performed successfully, false otherwise
         */
        performNextStep: () => boolean;
    }

    /**
     * Interface for accessing RuneLite plugins
     * Provides access to plugin functionality like Quest Helper
     */
    interface plugins {
        /**
         * Access to the Quest Helper plugin functionality
         */
        questHelper: questHelper;
    }
}
