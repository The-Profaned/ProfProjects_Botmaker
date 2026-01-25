/// <reference path="../../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2019 Hydrox6 <ikada@protonmail.ch>
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
declare namespace net.runelite.client.plugins.cluescrolls.clues {
export class SkillChallengeClue extends ClueScroll implements NpcClueScroll, NamedObjectClueScroll
{
static ChallengeType =
{
CHARLIE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
SHERLOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
String = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
String = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
}
		// Charlie Tasks
		// Elite Sherlock Tasks
		// Master Sherlock Tasks
	// Charlie Tasks
	// Non-cryptic Sherlock Tasks
	// Non-cryptic Sherlock Tasks
	// Non-cryptic Sherlock Tasks
	// Sherlock Tasks
	// Sherlock Tasks
	// Sherlock Tasks
	makeOverlayHint(panelComponent: PanelComponent, plugin: ClueScrollPlugin): void;
	makeWorldOverlayHint(graphics: Graphics2D, plugin: ClueScrollPlugin): void;
		// Mark NPC
		// Mark objects
	private static getRequirements(plugin: ClueScrollPlugin, requireEquipped: boolean, ...requirements: ItemRequirement ): Array<LineComponent>;
		// If equipment is null, the player is wearing nothing
		// If inventory is null, the player has nothing in their inventory
	static forText(text: string, rawText: string): SkillChallengeClue;
	getNpcs(plugin: ClueScrollPlugin): string[];
	getConfigKeys(): number[];
}
}