/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Lotto <https://github.com/devLotto>
 * Copyright (c) 2018, Raqes <j.raqes@gmail.com>
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
declare namespace net.runelite.client.plugins.interfacestyles {
export class InterfaceStylesPlugin extends Plugin
{
	provideConfig(configManager: ConfigManager): InterfaceStylesConfig;
	private startUp(): void;
	private shutDown(): void;
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
	private queueUpdateAllOverrides(): void;
			// Cross sprites and widget sprite cache are not setup until login screen
	onConfigChanged(config: ConfigChanged): void;
	// Use a higher priority so that player menu entries added by other sources are added to the player's submenu
	onMenuOpened(event: net.runelite.api.events.MenuOpened): void;
	private condensePlayerOptions(): void;
					// This works by making the top most player menu the submenu, then adding a new
					// menu with a copy of what this one was.
	onScriptCallbackEvent(event: net.runelite.api.events.ScriptCallbackEvent): void;
	onPostClientTick(event: net.runelite.api.events.PostClientTick): void;
	onPostHealthBar(postHealthBar: net.runelite.api.events.PostHealthBar): void;
		// Check if this is the health bar we are replacing
			// Increase padding to show some more green at very low hp percentages
	private updateAllOverrides(): void;
	onBeforeMenuRender(event: net.runelite.api.events.BeforeMenuRender): void;
	private overrideSprites(): void;
	private restoreSprites(): void;
	private overrideWidgetSprites(): void;
	private restoreWidgetSprites(): void;
	private getFileSpritePixels(file: string): SpritePixels;
	private adjustWidgetDimensions(): void;
	private overrideHealthBars(): void;
			// Reset health bar caches to apply the override
	private restoreHealthBars(): void;
	private overrideCrossSprites(): void;
			// If we've already replaced them,
			// we don't need to replace them again
	private restoreCrossSprites(): void;
	private restoreWidgetDimensions(): void;
	private removeGameframe(): void;
}
}