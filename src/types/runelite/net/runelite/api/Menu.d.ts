/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
declare namespace net.runelite.api {
  /**
   * The client minimenu.
   */
  export class Menu {
    /**
     * Create a new menu entry
     * @param idx the index to create the menu entry at. Accepts negative indexes eg. -1 inserts at the end.
     * @return the newly created menu entry
     */
    createMenuEntry(idx: number): MenuEntry;

    /**
     * Gets the current mini menu entries.
     *
     * @return array of menu entries
     */
    getMenuEntries(): MenuEntry[];

    /**
     * Sets the array of menu entries.
     *
     * This method should typically be used in the context of the MenuOpened
     * event, since setting the menu entries will be overwritten the next frame
     *
     * @param entries new array of open menu entries
     */
    setMenuEntries(entries: MenuEntry[]): void;

    /**
     * Remove a menu entry
     * @param entry the menu entry
     */
    removeMenuEntry(entry: MenuEntry): void;

    /**
     * Get the menu x location. Only valid if the menu is open.
     *
     * @return the menu x location
     */
    getMenuX(): number;

    /**
     * Get the menu y location. Only valid if the menu is open.
     *
     * @return the menu y location
     */
    getMenuY(): number;

    /**
     * Get the menu width. Only valid if the menu is open.
     *
     * @return the menu width
     */
    getMenuWidth(): number;

    /**
     * Get the menu height. Only valid if the menu is open.
     *
     * @return the menu height
     */
    getMenuHeight(): number;
  }
}
