/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2024 LlemonDuck
 * Copyright (c) 2024, Jayden Bailey <jayden@weirdgloop.org>
 * Copyright (c) 2024, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins.wiki {
export class WikiDpsManager
{
	startUp(): void;
	shutDown(): void;
	onScriptPreFired(scriptPreFired: net.runelite.api.events.ScriptPreFired): void;
static Screen =
{
EQUIPMENT_BONUSES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
BANK_EQUIPMENT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
		/**
		 * parent widget of the interface, install target
		 */
int = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
		/**
		 * the "Set Bonus" button widget layer
		 */
int = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
		/**
		 * the "Stat Bonus" button widget layer, which replaces "Set Bonus" after it is clicked
		 */
int = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
		/**
		 * OriginalX for Set Bonus and Stat Bonus, prior to us moving them around (for shutdown)
		 **/
int = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
}
	private tryAddButton(onClick: Runnable): void;
	/**
	 * Shifts over the Set Bonus / Stat Bonus buttons
	 * and adds new widgets to make a visually equal button with a different name.
	 */
	addButton(screen: Screen, onClick: Runnable): void;
		// Since the Set Bonus button uses absolute positioning,
		// we must also use absolute for all the children below,
		// which means it's necessary to offset the values by simulating corresponding pos/size modes.
		// now shift the Set Bonus and Stat Bonus buttons over a bit to make room
		// the background uses ABSOLUTE_CENTER and MINUS sizing
		// borders and corners all use absolute positioning which is easy
		// text label uses ABSOLUTE_CENTER positioning and MINUS sizing,
		// but matches size of parent so effectively no-op
		// we'll give the text layer the listeners since it covers the whole area
		// register a click listener
		// recompute locations / sizes on parent
	removeButton(): void;
	private createEquipmentObject(itemContainer: ItemContainer, slot: EquipmentInventorySlot): JsonObject | null;
	private buildShortlinkData(): JsonObject;
		// Build the player's loadout data
/** TBD-1 */
// export class ShortlinkResponse
	private static launch(): void;
}
}