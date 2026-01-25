/// <reference path="../../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Jasper Ketelaar <Jasper0781@gmail.com>
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
declare namespace net.runelite.client.plugins.mta.alchemy {
	export class AlchemyRoom extends MTARoom {
		onGameTick(event: net.runelite.api.events.GameTick): void;
		// Reset items to unknown
		onGameObjectSpawned(event: net.runelite.api.events.GameObjectSpawned): void;
		// Closed and opened versions of each
		onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
		onChatMessage(wrapper: net.runelite.api.events.ChatMessage): void;
		private reset(): void;
		inside(): boolean;
		private getBest(): AlchemyItem;
		private getClicked(): Cupboard;
		private fill(cupboard: Cupboard, alchemyItem: AlchemyItem): void;
		under(graphics: Graphics2D): void;
		private getSuggestion(): Cupboard;
		// check if a cupboard has the best item in it
		renderItemOverlay(graphics: Graphics2D, itemId: number, widgetItem: net.runelite.api.widgets.WidgetItem): void;
		private drawItem(graphics: Graphics2D, item: net.runelite.api.widgets.WidgetItem, border: java.awt.Color): void;
	}
}
