/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Adam <Adam@sigterm.info>
 * Copyright (c) 2018, Raqes <j.raqes@gmail.com>
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
declare namespace net.runelite.client.plugins.prayer {
export class PrayerPlugin extends Plugin
{
	provideConfig(configManager: ConfigManager): PrayerConfig;
	private startUp(): void;
	private shutDown(): void;
	resetConfiguration(): void;
	private onConfigChanged(event: ConfigChanged): void;
	onItemContainerChanged(event: net.runelite.api.events.ItemContainerChanged): void;
	onGameTick(tick: net.runelite.api.events.GameTick): void;
	private totalPrayerBonus(items: Item[]): number;
	private updatePotionBonus(inventory: ItemContainer, equip: ItemContainer): void;
		// Some items providing the holy wrench bonus can also be worn
		// Prayer potion: floor(7 + 25% of base level) - 27% with holy wrench
		// Super restore: floor(8 + 25% of base level) - 27% with holy wrench
		// Sanfew serum: floor(4 + 30% of base level) - 32% with holy wrench
	getTickProgress(): number;
	private isAnyPrayerActive(): boolean;
	private removeIndicators(): void;
	private removeOverheadsIndicators(): void;
	private setPrayerOrbText(text: string): void;
	private static getDrainEffect(client: Client): number;
	getEstimatedTimeRemaining(formatForOrb: boolean): string;
		// Calculate how many seconds each prayer points last so the prayer bonus can be applied
		// https://oldschool.runescape.wiki/w/Prayer#Prayer_drain_mechanics
		// Calculate the number of seconds left
}
}