/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2016-2017, Seth <Sethtroll3@gmail.com>
 * Copyright (c) 2018, Lotto <https://github.com/devLotto>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.client.plugins.cluescrolls {
export class ClueScrollPlugin extends Plugin
{
	// Some objects will only update to their "active" state when changing to their plane after varbit changes,
	// which take one extra tick to fire after the plane change. These fields are used to track those changes and delay
	// scans of the current plane's tiles accordingly.
	getConfig(configManager: ConfigManager): ClueScrollConfig;
	configure(binder: Binder): void;
	private startUp(): void;
	private shutDown(): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
	onMenuOptionClicked(event: net.runelite.api.events.MenuOptionClicked): void;
	onItemContainerChanged(event: net.runelite.api.events.ItemContainerChanged): void;
		// Add runes from rune pouch to inventoryItems
		// Check if item was removed from inventory
			// Check if clue was removed from inventory
		// if three step clue check for clue scroll pieces
	private getRunepouchContents(): Array<Item>;
	onNpcSpawned(event: net.runelite.api.events.NpcSpawned): void;
	onNpcDespawned(event: net.runelite.api.events.NpcDespawned): void;
				// Always set hint arrow to first seen NPC
	onDecorativeObjectDespawned(event: net.runelite.api.events.DecorativeObjectDespawned): void;
	onDecorativeObjectSpawned(event: net.runelite.api.events.DecorativeObjectSpawned): void;
	onGameObjectDespawned(event: net.runelite.api.events.GameObjectDespawned): void;
	onGameObjectSpawned(event: net.runelite.api.events.GameObjectSpawned): void;
	onGroundObjectDespawned(event: net.runelite.api.events.GroundObjectDespawned): void;
	onGroundObjectSpawned(event: net.runelite.api.events.GroundObjectSpawned): void;
	onWallObjectDespawned(event: net.runelite.api.events.WallObjectDespawned): void;
	onWallObjectSpawned(event: net.runelite.api.events.WallObjectSpawned): void;
	private tileObjectDespawnedHandler(despawned: TileObject): void;
	private tileObjectSpawnedHandler(spawned: TileObject): void;
	onConfigChanged(event: ConfigChanged): void;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
	onGameTick(event: net.runelite.api.events.GameTick): void;
				// Only set the location hint arrow if we do not already have more accurate location
		// Delay one tick when changing planes before scanning for new named objects on the new plane
		// Load the current plane's tiles if a tick has elapsed since the player has changed planes
		// or upon reaching a logged in state after hopping worlds
		// Reset clue when receiving a new beginner or master clue
		// These clues use a single item ID, so we cannot detect step changes based on the item ID changing
	onWidgetLoaded(event: net.runelite.api.events.WidgetLoaded): void;
	onCommandExecuted(commandExecuted: net.runelite.api.events.CommandExecuted): void;
	getClueScrollImage(): BufferedImage;
	getEmoteImage(): BufferedImage;
	getSpadeImage(): BufferedImage;
	getMapArrow(): BufferedImage;
	resetClue(withItemId: boolean): void;
	private findClueScroll(rawText: string): ClueScroll;
		// Remove line breaks and also the rare occasion where there are double line breaks
		// three step cryptic clues need unedited text to check which steps are already done
	/**
	 * Example input: "00 degrees 00 minutes north 07 degrees 13 minutes west"
	 * Note: some clues use "1 degree" instead of "01 degrees"
	 */
	private coordinatesToWorldPoint(text: string): CoordinateClue;
		// Convert from overworld to real
		// Use mirror point as mirrorLocation if there is one
	/**
	 * This conversion is explained on
	 * https://oldschool.runescape.wiki/w/Treasure_Trails/Guide/Coordinates
	 */
	private coordinatesToWorldPoint(degX: number, minX: number, degY: number, minY: number): net.runelite.api.coords.WorldPoint;
		// Center of the Observatory
	private addMapPoints(...points: WorldPoint): void;
	private highlightObjectsForLocation(location: net.runelite.api.coords.WorldPoint, ...objectIds: int): void;
					// Check impostors
	private checkClueNPCs(clue: ClueScroll, ...npcs: NPC): void;
			// Always set hint arrow to first seen NPC
	/**
	 * Scans all of the current plane's loaded tiles for {@link TileObject}s and passes any found objects to
	 * {@link ClueScrollPlugin#checkClueNamedObject(ClueScroll, TileObject)} for storing in the cache of discovered
	 * named objects.
	 *
	 * @param clue The active clue scroll
	 */
	private checkClueNamedObjects(clue: ClueScroll): void;
		// Search loaded tiles for objects
	/**
	 * Checks passed objects against the active clue's object names and regions. If the clue is a
	 * {@link NamedObjectClueScroll} and the object matches its allowable object names and is within its regions, the
	 * object will be stored in the cache of discovered named objects.
	 *
	 * @param clue   The active clue scroll
	 * @param object The spawned or scanned object
	 */
	private checkClueNamedObject(clue: ClueScroll, object: TileObject): void;
	private updateClue(clue: ClueScroll): void;
		// If we have a clue, save that knowledge
		// so the clue window doesn't have to be open.
	highlightWidget(graphics: Graphics2D, toHighlight: net.runelite.api.widgets.Widget, container: net.runelite.api.widgets.Widget, padding: Rectangle, text: string): void;
		// Visible area of widget
	scrollToWidget(list: number, scrollbar: number, ...toHighlight: Widget ): void;
	private testClueTag(itemId: number): boolean;
	// from [proc,poh_costumes_countmembers] and [proc,poh_costumes_countalternates]
	private testTreasureChestTag(itemId: number): boolean;
	private testMagicWardrobe(itemId: number): boolean;
	private testArmourCase(itemId: number): boolean;
	private testCapeRack(itemId: number): boolean;
	private testToyBox(itemId: number): boolean;
	private testPohCostume(itemId: number, ...enums: int): boolean;
					// check members in the group
					// single member group
	private checkAlternates(alt: EnumComposition, alts: EnumComposition, targetItemId: number, checkItemId: number): boolean;
	private updateOverlayMenuEntries(): void;
	private setNoteConsumer(key: number): Consumer<MenuEntry>;
	setClueNote(key: number, note: string): void;
	unsetClueNote(key: number): void;
	getClueNote(key: number): string;
}
}