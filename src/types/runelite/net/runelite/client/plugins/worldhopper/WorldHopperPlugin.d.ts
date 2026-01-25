/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Adam <Adam@sigterm.info>
 * Copyright (c) 2018, Lotto <https://github.com/devLotto>
 * Copyright (c) 2019, gregg1494 <https://github.com/gregg1494>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.client.plugins.worldhopper {
export class WorldHopperPlugin extends Plugin
{
	getConfig(configManager: ConfigManager): WorldHopperConfig;
	private startUp(): void;
		// The plugin has its own executor for pings, as it blocks for a long time
		// populate initial world list
		// Run the first-run ping
		// Give some initial delay - this won't run until after pingInitialWorlds finishes anyway
	private shutDown(): void;
	onConfigChanged(event: ConfigChanged): void;
	onCommandExecuted(commandExecuted: net.runelite.api.events.CommandExecuted): void;
	private setFavoriteConfig(world: number): void;
	private isFavoriteConfig(world: number): boolean;
	private clearFavoriteConfig(world: number): void;
	isFavorite(world: World): boolean;
	getCurrentWorld(): number;
	addToFavorites(world: World): void;
	removeFromFavorites(world: World): void;
	onVarbitChanged(varbitChanged: net.runelite.api.events.VarbitChanged): void;
	onMenuEntryAdded(event: net.runelite.api.events.MenuEntryAdded): void;
			// Don't add entry if user is offline
				// Disable Hop-to a PVP world from a regular world
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
		// If the player has disabled the side bar plugin panel, do not update the UI
	onWorldListLoad(worldListLoad: net.runelite.api.events.WorldListLoad): void;
	refresh(): void;
	onWorldsFetch(worldsFetch: WorldsFetch): void;
	/**
	 * This method ONLY updates the list's UI, not the actual world list and data it displays.
	 */
	private updateList(): void;
	private hop(previous: boolean): void;
		// Make it so you always hop out of PVP and high risk worlds
		// Don't regard these worlds as a type that must be hopped between
			/*
			 */
			// Check world region if filter is enabled
			// Treat LMS world like casual world
			// Avoid switching to near-max population worlds, as it will refuse to allow the hop if the world is full
				// offline world
			// Break out if we've found a good world to hop to
	private hop(worldId: number): void;
		// Don't try to hop if the world doesn't exist
	hopTo(world: World): void;
		// this is called from the panel, on edt
	private hop(world: World): void;
			// on the login screen we can just change the world by ourselves
	onGameTick(event: net.runelite.api.events.GameTick): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
	private resetQuickHopper(): void;
	private getChatPlayerFromName(name: string): ChatPlayer;
		// Search friends chat members first, because we can always get their world;
		// friends worlds may be hidden if they have private off. (#5679)
	/**
	 * Ping all worlds. This takes a long time and is only run on first run.
	 */
	private pingInitialWorlds(): void;
	/**
	 * Ping the next world
	 */
	private pingNextWorld(): void;
			// Wrap back around
		// If we are displaying the ping overlay, there is a separate scheduled task for the current world
	/**
	 * Ping the current world for the ping overlay
	 */
	private pingCurrentWorld(): void;
		// There is no reason to ping the current world if not logged in, as the overlay doesn't draw
	getStoredPing(world: World): number;
	private ping(world: World): number;
}
}