/// <reference path="../../../runelite/index.d.ts" />

declare namespace bot {
    /**
     * Interface for interacting with in-game graphics objects
     * Graphics objects include visual effects like spell impacts and animations
     */
    interface graphicsObjects {
        /**
         * Gets all graphics objects with the specified IDs
         * @param ids Array of graphics object IDs to search for
         * @returns Array of matching GraphicsObject instances
         */
        getWithIds: (ids: number[]) => net.runelite.api.GraphicsObject[];
    }
}
