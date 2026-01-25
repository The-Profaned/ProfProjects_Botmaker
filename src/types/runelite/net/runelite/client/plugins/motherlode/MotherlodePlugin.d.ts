/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Seth <Sethtroll3@gmail.com>
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
 * Copyright (c) 2018, Lars <lars.oernlo@gmail.com>
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
declare namespace net.runelite.client.plugins.motherlode {
export class MotherlodePlugin extends Plugin
{
	getConfig(configManager: ConfigManager): MotherlodeConfig;
	private startUp(): void;
	private shutDown(): void;
	reset(): void;
	onVarbitChanged(event: net.runelite.api.events.VarbitChanged): void;
				// Take a snapshot of the inventory before the new ore is added.
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
	private broadcastLootItem(itemId: number): void;
	checkMining(): void;
		// reset recentPayDirtMined if you haven't mined anything recently
	private onScriptPostFired(event: net.runelite.api.events.ScriptPostFired): void;
	private recolorSackOverlay(): void;
	onWallObjectSpawned(event: net.runelite.api.events.WallObjectSpawned): void;
	onWallObjectDespawned(event: net.runelite.api.events.WallObjectDespawned): void;
	onGameObjectSpawned(event: net.runelite.api.events.GameObjectSpawned): void;
	onGameObjectDespawned(event: net.runelite.api.events.GameObjectDespawned): void;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
			// on region changes the tiles get set to null
			// Prevent code from running while logged out.
	onItemContainerChanged(event: net.runelite.api.events.ItemContainerChanged): void;
		// Build set of current inventory
		// Take the difference
		// Advertise the loot
	private checkInMlm(): boolean;
		// Verify that all regions exist in MOTHERLODE_MAP_REGIONS
	private refreshSackValues(): void;
	/**
	 * Checks if the given point is "upstairs" in the mlm.
	 * The upper floor is actually on z=0.
	 *
	 * @param localPoint
	 * @return
	 */
	isUpstairs(localPoint: net.runelite.api.coords.LocalPoint): boolean;
	private addGameObject(gameObject: GameObject): void;
	private removeGameObject(gameObject: GameObject): void;
}
}