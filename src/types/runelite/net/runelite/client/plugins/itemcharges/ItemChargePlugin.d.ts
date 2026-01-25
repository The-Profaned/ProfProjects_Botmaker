/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Seth <Sethtroll3@gmail.com>
 * Copyright (c) 2018, Hydrox6 <ikada@protonmail.ch>
 * Copyright (c) 2019, Aleios <https://github.com/aleios>
 * Copyright (c) 2020, Unmoon <https://github.com/unmoon>
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
declare namespace net.runelite.client.plugins.itemcharges {
	export class ItemChargePlugin extends Plugin {
		// Limits destroy callback to once per tick
		getConfig(configManager: ConfigManager): ItemChargeConfig;
		private startUp(): void;
		private shutDown(): void;
		onGameStateChanged(e: net.runelite.api.events.GameStateChanged): void;
		// No VarbitChanged event fires on login if the explorer's ring is full (varbit value 0).
		// So, set the value to 0 when LOGGED_IN. This is before the VarbitChanged event would fire,
		// so if it shouldn't be 0 it will be updated later.
		onConfigChanged(event: ConfigChanged): void;
		onChatMessage(event: net.runelite.api.events.ChatMessage): void;
		// This chat message triggers before the used message so add 1 to the max charges to ensure proper sync
		// Determine if the player smelted with a Ring of Forging equipped.
		// This chat message triggers before the used message so add 1 to the max charges to ensure proper sync
		// Determine if the player mined with a Bracelet of Clay equipped.
		// Charge is not used if only 1 inventory slot is available when mining in Prifddinas
		onItemContainerChanged(event: net.runelite.api.events.ItemContainerChanged): void;
		private onScriptCallbackEvent(event: net.runelite.api.events.ScriptCallbackEvent): void;
		private onVarbitChanged(event: net.runelite.api.events.VarbitChanged): void;
		onWidgetLoaded(widgetLoaded: net.runelite.api.events.WidgetLoaded): void;
		private updateDodgyNecklaceCharges(value: number): void;
		private updateAmuletOfChemistryCharges(value: number): void;
		private updateAmuletOfBountyCharges(value: number): void;
		private updateBindingNecklaceCharges(value: number): void;
		private updateExplorerRingCharges(value: number): void;
		// Note: Varbit counts upwards. We count down from the maximum charges.
		private updateRingOfForgingCharges(value: number): void;
		private updateBraceletOfSlaughterCharges(value: number): void;
		private updateExpeditiousBraceletCharges(value: number): void;
		private updateBloodEssenceCharges(value: number): void;
		private updateBraceletOfClayCharges(value: number): void;
		private checkDestroyWidget(): void;
		private updateInfoboxes(): void;
		getItemCharges(key: string): number;
		// Migrate old non-profile configurations
		private setItemCharges(key: string, value: number): void;
		getColor(charges: number): java.awt.Color;
	}
}
