/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018 Abex
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
declare namespace net.runelite.client.plugins.kourendlibrary {
export class KourendLibraryPlugin extends Plugin
{
	provideConfig(configManager: ConfigManager): KourendLibraryConfig;
	private startUp(): void;
	private shutDown(): void;
	onConfigChanged(ev: ConfigChanged): void;
	onMenuOptionClicked(menuOpt: net.runelite.api.events.MenuOptionClicked): void;
	onAnimationChanged(anim: net.runelite.api.events.AnimationChanged): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
		// has a color tag at start
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
	onGameTick(tick: net.runelite.api.events.GameTick): void;
	onItemContainerChanged(itemContainerChangedEvent: net.runelite.api.events.ItemContainerChanged): void;
	onNpcSpawned(event: net.runelite.api.events.NpcSpawned): void;
	onNpcDespawned(event: net.runelite.api.events.NpcDespawned): void;
	doesPlayerContainBook(book: Book): boolean;
	private updatePlayerBooks(): void;
	private updateBooksPanel(): void;
	private updateBookcaseHintArrow(): void;
		// Clear the hint arrow if the player has no book requested of them
		// or if the player is already holding the correct book
		// or if this plugin is configured not to show the target book hint arrow
			// Show a hint arrow pointing toward the target book if all book locations are known
			// and a hint arrow is not already being displayed
					// Each bookcase in a complete solved state will contain only one book. If that book is the book
					// the customer wants, mark the bookcase which contains it with a hint arrow.
	showVarlamoreEnvoy(): boolean;
	static isLibraryCustomer(npcId: number): boolean;
}
}