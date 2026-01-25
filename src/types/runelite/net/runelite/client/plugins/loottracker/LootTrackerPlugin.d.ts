/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Psikoi <https://github.com/psikoi>
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
declare namespace net.runelite.client.plugins.loottracker {
	export class LootTrackerPlugin extends Plugin {
		// Activity/Event loot handling
		// Herbiboar loot handling
		// Seed Pack loot handling
		// Hespori loot handling
		// Chest loot handling
		// Used by Stone Chest, Isle of Souls chest, Dark Chest
		// Chests opened with keys from slayer tasks
		// Shade chest loot handling
		// Hallow Sepulchre Coffin handling
		// Last man standing map regions
		// Birdhouses
		/*
		 * This map is used when a pickpocket target has a different name in the chat message than their in-game name.
		 * Note that if the two NPCs can be found in the same place, there is a chance of race conditions
		 * occurring when changing targets mid-pickpocket, in which case a different solution may need to be considered.
		 */
		// Soul Wars
		// Tempoross
		// Guardians of the Rift
		// Mahogany Homes
		// Implings
		// Raids
		private static stack(
			items: Collection<ItemStack>,
		): Collection<ItemStack>;
		provideConfig(configManager: ConfigManager): LootTrackerConfig;
		onSessionOpen(sessionOpen: SessionOpen): void;
		onSessionClose(sessionClose: SessionClose): void;
		// session close is fired after the config has been synced and the
		// session has been invalidated, so it is too late to submit loot
		// if there is any.
		onConfigSync(configSync: ConfigSync): void;
		onRuneScapeProfileChanged(e: RuneScapeProfileChanged): void;
		private switchProfile(profileKey: string): void;
		// Current queued loot is for the previous profile, so save it first with the current profile key
		// fast drop
		// convertToLootTrackerRecord requires item compositions to be available to get the item name,
		// so it can't be run while the client is starting
		// convertToLootTrackerRecord must be called on client thread
		private static sortedInsert(list: Array<T>, value: T, c: any): void;
		onConfigChanged(event: ConfigChanged): void;
		private startUp(): void;
		private shutDown(): void;
		onClientShutdown(event: ClientShutdown): void;
		onGameStateChanged(
			event: net.runelite.api.events.GameStateChanged,
		): void;
		addLoot(
			name: string,
			combatLevel: number,
			type: LootRecordType,
			metadata: Record<string, any>,
			items: Collection<ItemStack>,
		): void;
		addLoot(
			name: string,
			combatLevel: number,
			type: LootRecordType,
			metadata: Record<string, any>,
			items: Collection<ItemStack>,
			amount: number,
		): void;
		private getLootWorldId(): number;
		// For the wiki to determine drop rates based on dmm brackets / identify leagues drops
		onNpcDespawned(
			npcDespawned: net.runelite.api.events.NpcDespawned,
		): void;
		// Whisperer death:
		//   loot spawn at z=0, which you can't see since you are in the shadow realm on z=3
		//   npc despawn on z=3
		//   player teleport from z=3 to z=0
		//   server sends zone clear packet
		//   server spawns in the loot, along with any other items already on the ground
		//
		// We take advantage of that the items left on z=0 when you move into the shadow realm are not
		// cleared until the zoneclear packet. So if you record them at the time the whisperer despawns,
		// you can subtract it from the spawned items at the end of the tick.
		// collect all items on z=0
		// the entire arena is in an instance, which appears to be never region aligned,
		// however the template is, so use the region id from it.
		// the player location can't be used because on death the player might have already been teleported.
		// the loot spawns next tick, which is typically in 30 cycles, but
		// network latency can cause it to happen a little later instead.
		// use 59 to be safe.
		onPostClientTick(
			postClientTick: net.runelite.api.events.PostClientTick,
		): void;
		// loot is not spawned yet
		// convert to item stack
		private buildNpcMetadata(npc: NPC): Record<string, any>;
		onNpcLootReceived(npcLootReceived: NpcLootReceived): void;
		onPluginLootReceived(event: PluginLootReceived): void;
		onPlayerLootReceived(playerLootReceived: PlayerLootReceived): void;
		// Ignore Last Man Standing and Soul Wars player loots
		onWidgetLoaded(
			widgetLoaded: net.runelite.api.events.WidgetLoaded,
		): void;
		// Convert container items to array of ItemStack
		onChatMessage(event: net.runelite.api.events.ChatMessage): void;
		// Get the target's name as listed in the chat box
		// Occasional edge case where the pickpocket message doesn't list the correct name of the NPC (e.g. H.A.M. Members)
		// Check if message is for a clue scroll reward
		// Clue Scrolls use same InventoryID as Barrows
		// Player didn't have the key they needed.
		// Check if message is a birdhouse type
		onItemContainerChanged(
			event: net.runelite.api.events.ItemContainerChanged,
		): void;
		// when the wilderness chest empties, clear chest loot flag for the next key
		onMenuOptionClicked(
			event: net.runelite.api.events.MenuOptionClicked,
		): void;
		// There are some pickpocket targets who show up in the chat box with a different name (e.g. H.A.M. members -> man/woman)
		// We use the value selected from the right-click menu as a fallback for the event lookup in those cases.
		//Hunters loot sacks are stackable and multiple can be opened in one tick.
		//This provides an accurate count of how many were opened for each event
		private static isNPCOp(menuAction: MenuAction): boolean;
		private static isObjectOp(menuAction: MenuAction): boolean;
		private submitLoot(): CompletableFuture<Void> | null;
		private combine(records: Array<LootRecord>): Collection<ConfigLoot>;
		private saveLoot(records: Array<LootRecord>): void;
		private resetEvent(): void;
		/** TBD-2 */
		// export class InvChangeCallback
		// }
		private collectInvItems(
			type: LootRecordType,
			event: string,
		): InvChangeCallback;
		private collectInvItems(
			type: LootRecordType,
			event: string,
			metadata: Record<string, any>,
		): InvChangeCallback;
		private collectInvAndGroundItems(
			type: LootRecordType,
			event: string,
		): InvChangeCallback;
		private collectInvAndGroundItems(
			type: LootRecordType,
			event: string,
			metadata: Record<string, any>,
		): InvChangeCallback;
		private onInvChange(cb: InvChangeCallback): void;
		private onInvChange(inv: InventoryID, cb: InvChangeCallback): void;
		private processHerbiboarHerbSackLoot(timestamp: number): boolean;
		inTobChestRegion(): boolean;
		toggleItem(name: string, ignore: boolean): void;
		// the config changed will update the panel
		isIgnored(name: string): boolean;
		toggleEvent(name: string, ignore: boolean): void;
		// the config changed will update the panel
		isEventIgnored(name: string): boolean;
		private buildLootTrackerItem(
			itemId: number,
			quantity: number,
		): LootTrackerItem;
		private buildEntries(
			itemStacks: Collection<ItemStack>,
		): LootTrackerItem[];
		private static toGameItems(
			items: Collection<ItemStack>,
		): Collection<GameItem>;
		private convertToLootTrackerRecord(
			configLoot: ConfigLoot,
		): LootTrackerRecord;
		/**
		 * Is player currently within the provided map regions
		 */
		private isPlayerWithinMapRegion(
			definedMapRegions: Set<Integer>,
		): boolean;
		private lootReceivedChatMessage(
			items: Collection<ItemStack>,
			name: string,
		): void;
		getLootConfig(type: LootRecordType, name: string): ConfigLoot;
		setLootConfig(
			type: LootRecordType,
			name: string,
			loot: ConfigLoot,
		): void;
		removeLootConfig(type: LootRecordType, name: string): void;
		removeAllLoot(): void;
	}
}
