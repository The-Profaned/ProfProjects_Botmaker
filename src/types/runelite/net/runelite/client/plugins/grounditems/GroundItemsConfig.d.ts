/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Aria <aria@ar1as.space>
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
declare namespace net.runelite.client.plugins.grounditems {
	export class GroundItemsConfig extends Config {
		getHighlightItems(): string;
		setHighlightedItem(key: string): void;
		getHiddenItems(): string;
		setHiddenItems(key: string): void;
		showHighlightedOnly(): boolean;
		dontHideUntradeables(): boolean;
		showMenuItemQuantities(): boolean;
		recolorMenuHiddenItems(): boolean;
		deprioritizeHiddenItems(): boolean;
		highlightTiles(): boolean;
		notifyHighlightedDrops(): boolean;
		notifyTier(): HighlightTier;
		priceDisplayMode(): PriceDisplayMode;
		itemHighlightMode(): ItemHighlightMode;
		menuHighlightMode(): MenuHighlightMode;
		valueCalculationMode(): ValueCalculationMode;
		getHideUnderValue(): number;
		defaultColor(): java.awt.Color;
		highlightedColor(): java.awt.Color;
		hiddenColor(): java.awt.Color;
		lowValueColor(): java.awt.Color;
		lowValuePrice(): number;
		mediumValueColor(): java.awt.Color;
		mediumValuePrice(): number;
		highValueColor(): java.awt.Color;
		highValuePrice(): number;
		insaneValueColor(): java.awt.Color;
		insaneValuePrice(): number;
		onlyShowOwnItems(): boolean;
		doubleTapDelay(): number;
		collapseEntries(): boolean;
		groundItemTimers(): DespawnTimerMode;
		textOutline(): boolean;
		showLootbeamForHighlighted(): boolean;
		showLootbeamTier(): HighlightTier;
		lootbeamStyle(): Lootbeam.Style;
		hotkey(): Keybind;
	}
}
