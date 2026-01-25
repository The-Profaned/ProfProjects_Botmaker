/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Lotto <https://github.com/devLotto>
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
declare namespace net.runelite.client.plugins.screenshot {
export class ScreenshotPlugin extends Plugin
{
static KillType =
{
BARROWS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
COX = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
COX_CM = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
MOONS_OF_PERIL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
TOB = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
TOB_SM = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
TOB_HM = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
TOA_ENTRY_MODE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
TOA = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
TOA_EXPERT_MODE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
}
	getConfig(configManager: ConfigManager): ScreenshotConfig;
	private startUp(): void;
	private shutDown(): void;
	onGameTick(event: net.runelite.api.events.GameTick): void;
	onActorDeath(actorDeath: net.runelite.api.events.ActorDeath): void;
	onPlayerLootReceived(playerLootReceived: PlayerLootReceived): void;
	onScriptCallbackEvent(e: net.runelite.api.events.ScriptCallbackEvent): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
	onWidgetLoaded(event: net.runelite.api.events.WidgetLoaded): void;
				// level up widget gets loaded prior to the text being set, so wait until the next tick
	onScriptPreFired(scriptPreFired: net.runelite.api.events.ScriptPreFired): void;
	private manualScreenshot(): void;
	/**
	 * Parses skill name and level from levelup component.
	 *
	 * @return Shortened string in the format "Skill(99)"
	 */
	parseLevelUpWidget(levelUpLevel: number): string;
	/**
	 * Parses the passed quest completion dialog text into a shortened string for filename usage.
	 *
	 * @return Shortened string in the format "Quest(The Corsair Curse)"
	 */
	static parseQuestCompletedWidget(text: string): string;
		// "You have completed The Corsair Curse!"
		// "'One Small Favour' completed!"
	/**
	 * Parses the Barbarian Assault high gamble reward dialog text into a shortened string for filename usage.
	 *
	 * @return Shortened string in the format "High Gamble(100)"
	 */
	static parseBAHighGambleWidget(text: string): string;
	/**
	 * Parses a combat achievement success chat message into a filename-safe string.
	 *
	 * @param text A received chat message which may or may not be from completing a combat achievement.
	 * @return A formatted string of the achieved combat task name, or the empty string if the passed message
	 *         is not a combat achievement completion message.
	 */
	static parseCombatAchievementWidget(text: string): string;
	/**
	 * Saves a screenshot of the client window to the screenshot folder as a PNG,
	 * and optionally uploads it to an image-hosting service.
	 *
	 * @param fileName Filename to use, without file extension.
	 * @param subDir   Subdirectory to store the captured screenshot in.
	 */
	takeScreenshot(fileName: string, subDir: string): void;
			// Prevent the screenshot from being captured
			// This callback is on the game thread, move to executor thread
	private saveScreenshot(fileName: string, subDir: string, image: Image): void;
			// just simply copy the image
	private isInsideGauntlet(): boolean;
	getClueNumber(): number;
	getClueType(): string;
	getKillType(): KillType;
	getKillCountNumber(): number;
}
}