/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2019, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins.mining {
export class MiningPlugin extends Plugin
{
	getConfig(configManager: ConfigManager): MiningConfig;
	private startUp(): void;
	private shutDown(): void;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
	onAnimationChanged(event: net.runelite.api.events.AnimationChanged): void;
			// Can't use chat messages to start mining session on Dense Essence as they don't have a chat message when mined,
			// so we track the session here instead.
	onGameTick(gameTick: net.runelite.api.events.GameTick): void;
	/**
	 * Clears expired respawns and removes the hint arrow from expired Daeyalt essence rocks.
	 */
	private clearExpiredRespawns(): void;
	resetSession(): void;
	onGameObjectDespawned(event: net.runelite.api.events.GameObjectDespawned): void;
	private clearHintArrowAt(worldPoint: net.runelite.api.coords.WorldPoint): void;
	onGameObjectSpawned(event: net.runelite.api.events.GameObjectSpawned): void;
		// Inverse timer to track daeyalt essence active duration
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
	onScriptPreFired(scriptPreFired: net.runelite.api.events.ScriptPreFired): void;
				// Amethyst
				// Barronite
	private addRockRespawn(rock: Rock, point: net.runelite.api.coords.WorldPoint, ticks: number): void;
}
}