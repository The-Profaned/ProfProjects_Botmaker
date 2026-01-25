/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, TheLonelyDev <https://github.com/TheLonelyDev>
 * Copyright (c) 2018, Jeremy Plsek <https://github.com/jplsek>
 * Copyright (c) 2019, Hydrox6 <ikada@protonmail.ch>
 * Copyright (c) 2024, PhraZier <https://github.com/phrazier>
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
declare namespace net.runelite.client.plugins.bank {
export class BankPlugin extends Plugin
{
	getConfig(configManager: ConfigManager): BankConfig;
	private startUp(): void;
	private shutDown(): void;
	onMenuShouldLeftClick(event: net.runelite.api.events.MenuShouldLeftClick): void;
	onMenuEntryAdded(event: net.runelite.api.events.MenuEntryAdded): void;
	onScriptCallbackEvent(event: net.runelite.api.events.ScriptCallbackEvent): void;
					// return true
					// Block the key press this tick in keypress_permit so it doesn't enter the chatbox
	onWidgetLoaded(event: net.runelite.api.events.WidgetLoaded): void;
					// this is also re-used by the clear all bank fillers popup
	onScriptPostFired(event: net.runelite.api.events.ScriptPostFired): void;
			// vanilla only lays out the bank every 40 client ticks, so if the search input has changed,
			// and the bank wasn't laid out this tick, lay it out early
	onItemContainerChanged(event: net.runelite.api.events.ItemContainerChanged): void;
	private createValueText(gePrice: number, haPrice: number): string;
	private updateSeedVaultTotal(): void;
	private getSeedVaultItems(): Item[];
	valueSearch(itemId: number, str: string): boolean;
		// Count bank items and remember it for determining item quantity
	private getBankItemSet(): Multiset<Integer>;
	calculate(items: Item[]): ContainerPrices | null;
	private getHaPrice(itemId: number): number;
	private getWidgetContainerPrices(componentId: number, inventoryID: InventoryID): ContainerPrices;
			// In the bank, the first components are the bank items, followed by tabs etc. There are always 816 components regardless
			// of bank size, but we only need to check up to the bank size.
}
}