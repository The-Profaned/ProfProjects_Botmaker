/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Seth <Sethtroll3@gmail.com>
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
declare namespace net.runelite.client.plugins.woodcutting {
export class WoodcuttingPlugin extends Plugin
{
	// Forestry
	getConfig(configManager: ConfigManager): WoodcuttingConfig;
	private startUp(): void;
	private shutDown(): void;
	onGameTick(gameTick: net.runelite.api.events.GameTick): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
			// Clear the clue tier that has previously spawned
	onItemSpawned(itemSpawned: net.runelite.api.events.ItemSpawned): void;
			// This will be set only if one of the clue nests has spawned. It will then be reset the next game tick.
	onGameObjectSpawned(event: net.runelite.api.events.GameObjectSpawned): void;
			/* redwood trees */
	onGameObjectDespawned(event: net.runelite.api.events.GameObjectDespawned): void;
			/* redwood trees */
	onScriptPreFired(scriptPreFired: net.runelite.api.events.ScriptPreFired): void;
				// depleted redwood
				// farming guild redwood
	private findObject(point: net.runelite.api.coords.WorldPoint): GameObject;
			// the id passed to the script is the stump, not the tree, but it is prior to the tree
			// despawning, so we can't match by id. Probably this is good enough.
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
				// fallthrough
	onAnimationChanged(event: net.runelite.api.events.AnimationChanged): void;
	onNpcSpawned(event: net.runelite.api.events.NpcSpawned): void;
	onNpcDespawned(event: net.runelite.api.events.NpcDespawned): void;
	onInteractingChanged(event: net.runelite.api.events.InteractingChanged): void;
	private static isFloweringBush(npcId: number): boolean;
	solveCircles(): NPC;
}
}