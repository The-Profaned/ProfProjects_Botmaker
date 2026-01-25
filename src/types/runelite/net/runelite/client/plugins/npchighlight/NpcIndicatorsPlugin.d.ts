/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, James Swindle <wilingua@gmail.com>
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins.npchighlight {
	export class NpcIndicatorsPlugin extends Plugin {
		// Option added to NPC menu
		/**
		 * NPCs to highlight
		 */
		/**
		 * Dead NPCs that should be displayed with a respawn indicator if the config is on.
		 */
		/**
		 * The time when the last game tick event ran.
		 */
		/**
		 * Tagged NPCs that have died at some point, which are memorized to
		 * remember when and where they will respawn
		 */
		/**
		 * Highlight strings from the configuration
		 */
		/**
		 * NPC ids marked with the Tag option
		 */
		/**
		 * Tagged NPCs that spawned this tick, which need to be verified that
		 * they actually spawned and didn't just walk into view range.
		 */
		/**
		 * Tagged NPCs that despawned this tick, which need to be verified that
		 * they actually spawned and didn't just walk into view range.
		 */
		/**
		 * World locations of graphics object which indicate that an
		 * NPC teleported that were played this tick.
		 */
		/**
		 * The players location on the last game tick.
		 */
		/**
		 * When hopping worlds, NPCs can spawn without them actually respawning,
		 * so we would not want to mark it as a real spawn in those cases.
		 */
		provideConfig(configManager: ConfigManager): NpcIndicatorsConfig;
		private startUp(): void;
		private shutDown(): void;
		onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
		onConfigChanged(configChanged: ConfigChanged): void;
		onMenuEntryAdded(event: net.runelite.api.events.MenuEntryAdded): void;
		// Add tag and tag-all options
		// Only add Untag-All option to npcs not highlighted by a wildcard entry, because untag-all will not remove wildcards
		// Add tag options only if the npc is currently tagged
		private createTagColorMenu(idx: number, target: string, npc: NPC): number;
		// add a few default colors
		private createTagStyleMenu(idx: number, target: string, npc: NPC): number;
		private tag(entry: MenuEntry): void;
		// this trips a config change which triggers the overlay rebuild
		onNpcSpawned(npcSpawned: net.runelite.api.events.NpcSpawned): void;
		onNpcDespawned(npcDespawned: net.runelite.api.events.NpcDespawned): void;
		onNpcChanged(event: net.runelite.api.events.NpcChanged): void;
		onGraphicsObjectCreated(event: net.runelite.api.events.GraphicsObjectCreated): void;
		onGameTick(event: net.runelite.api.events.GameTick): void;
		private static isInViewRange(
			wp1: net.runelite.api.coords.WorldPoint,
			wp2: net.runelite.api.coords.WorldPoint,
		): boolean;
		private static getWorldLocationBehind(npc: NPC): net.runelite.api.coords.WorldPoint;
		private memorizeNpc(npc: NPC): void;
		private removeOldHighlightedRespawns(): void;
		getHighlights(): Array<string>;
		rebuild(): void;
		// NPCs are still in the client after logging out,
		// but we don't want to highlight those.
		// NPC is not highlighted
		private highlightMatchesNPCName(npcName: string): boolean;
		private validateSpawnedNpcs(): void;
		// NPC teleported away, so we don't want to add the respawn timer
		// NPC teleported here, so we don't want to update the respawn timer
		// By killing a monster and leaving the area before seeing it again, an erroneously lengthy
		// respawn time can be recorded. Thus, if the respawn time is already set and is greater than
		// the observed time, assume that the lower observed respawn time is correct.
		// An NPC can move in the same tick as it spawns, so we also have
		// to consider whatever tile is behind the npc
		private highlightedNpc(npc: NPC): HighlightedNpc;
		// if set, value from config overrides global config
		private render(n: NPC): boolean;
		private setNpcHighlightColor(npcId: number, color: java.awt.Color): void;
		private unsetNpcHighlightColor(npcId: number): void;
		private getNpcHighlightColor(npcId: number): java.awt.Color;
		private setNpcTagStyle(npcId: number, style: string): void;
		private unsetNpcTagStyle(npcId: number): void;
		private getNpcTagStyle(npcId: number): string;
		/**
		 * get some of the in-use colors from nearby npcs to prepopulate the menu
		 */
		private getUsedColors(): Array<Color>;
	}
}
