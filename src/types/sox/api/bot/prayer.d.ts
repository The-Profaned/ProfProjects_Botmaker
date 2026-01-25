/// <reference path="../../../runelite/index.d.ts" />

declare namespace bot {
    /**
     * Interface for interacting with the prayer system
     * Provides methods to toggle prayers on and off
     */
    interface prayer {
        /**
         * Toggles a prayer on or off
         * @param prayer The Prayer enum value to toggle
         * @param bypassMouseClicks Whether to bypass using mouse clicks and toggle directly (true) or use mouse clicks (false)
         */
        togglePrayer: (prayer: net.runelite.api.Prayer, bypassMouseClicks: boolean) => void;
    }
}
