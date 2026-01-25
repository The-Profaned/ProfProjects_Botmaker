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
declare namespace net.runelite.client.plugins.itemstats {
export class ItemStatPlugin extends Plugin
{
	getConfig(configManager: ConfigManager): ItemStatConfig;
	configure(binder: Binder): void;
	private startUp(): void;
	private shutDown(): void;
	onConfigChanged(event: ConfigChanged): void;
	onGameTick(event: net.runelite.api.events.GameTick): void;
	onVarbitChanged(event: net.runelite.api.events.VarbitChanged): void;
	onScriptPostFired(event: net.runelite.api.events.ScriptPostFired): void;
	private createItemInformation(id: number): void;
		// HEADER
		// ICON AND TITLE
		// STATS HEADER
		// STYLE BONUSES
			// Style label
			// Attack bonus
			// Defence bonus
		// MISC BONUSES
			// Stat label
			// Stat bonus
		// COINS
	private static createText(parent: net.runelite.api.widgets.Widget, text: string, fontId: number, textColor: number, x: number, y: number, width: number, height: number): net.runelite.api.widgets.Widget;
	private static createSeparator(parent: net.runelite.api.widgets.Widget, y: number): void;
	private resetGEInventory(): void;
	private getCurrentGP(): number;
	private getInventoryContainer(): net.runelite.api.widgets.Widget;
}
}