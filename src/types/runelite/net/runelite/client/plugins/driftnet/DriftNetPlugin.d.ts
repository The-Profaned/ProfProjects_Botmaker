/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2020, dekvall <https://github.com/dekvall>
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
declare namespace net.runelite.client.plugins.driftnet {
export class DriftNetPlugin extends Plugin
{
	provideConfig(configManager: ConfigManager): DriftNetConfig;
	private startUp(): void;
	private shutDown(): void;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
	private reset(): void;
	onVarbitChanged(event: net.runelite.api.events.VarbitChanged): void;
	private updateDriftNetVarbits(): void;
	onInteractingChanged(event: net.runelite.api.events.InteractingChanged): void;
	private isFishNextToNet(fish: NPC, nets: Collection<DriftNet>): boolean;
	private isTagExpired(tick: number): boolean;
	onGameTick(tick: net.runelite.api.events.GameTick): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
				// If the fish is on an adjacent tile, the interaction change happens after
				// the chat message is sent, so we arm it
	private tagFish(fish: Actor): void;
	onNpcSpawned(event: net.runelite.api.events.NpcSpawned): void;
	onNpcDespawned(event: net.runelite.api.events.NpcDespawned): void;
	onGameObjectSpawned(event: net.runelite.api.events.GameObjectSpawned): void;
	onGameObjectDespawned(event: net.runelite.api.events.GameObjectDespawned): void;
	onItemContainerChanged(event: net.runelite.api.events.ItemContainerChanged): void;
	private checkArea(): boolean;
}
}