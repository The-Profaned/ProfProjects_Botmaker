/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Seth <Sethtroll3@gmail.com>
 * Copyright (c) 2018, Levi <me@levischuck.com>
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
declare namespace net.runelite.client.plugins.fishing {
export class FishingPlugin extends Plugin
{
	provideConfig(configManager: ConfigManager): FishingConfig;
	private startUp(): void;
	private shutDown(): void;
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
	reset(): void;
	onItemContainerChanged(event: net.runelite.api.events.ItemContainerChanged): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
	onInteractingChanged(event: net.runelite.api.events.InteractingChanged): void;
	private canPlayerFish(itemContainer: ItemContainer): boolean;
	onGameTick(event: net.runelite.api.events.GameTick): void;
		// Reset fishing session
				// create the minnow spot if it doesn't already exist
				// or if it was moved, reset it
	onNpcSpawned(event: net.runelite.api.events.NpcSpawned): void;
	onNpcDespawned(npcDespawned: net.runelite.api.events.NpcDespawned): void;
	onWidgetLoaded(event: net.runelite.api.events.WidgetLoaded): void;
	/**
	 * Updates the trawler contribution value
	 */
	private updateTrawlerContribution(): void;
	/**
	 * Changes the Fishing Trawler timer widget from minutes to minutes and seconds
	 */
	private updateTrawlerTimer(): void;
	private inverseSortSpotDistanceFromPlayer(): void;
				// Negate to have the furthest first
				// Order by position
				// And then by id
}
}