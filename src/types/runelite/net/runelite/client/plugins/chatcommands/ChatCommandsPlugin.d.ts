/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017. l2-
 * Copyright (c) 2017, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins.chatcommands {
export class ChatCommandsPlugin extends Plugin
{
	startUp(): void;
	shutDown(): void;
	provideConfig(configManager: ConfigManager): ChatCommandsConfig;
	private setKc(boss: string, killcount: number): void;
	private unsetKc(boss: string): void;
	private getKc(boss: string): number;
	private setPb(boss: string, seconds: number): void;
	private unsetPb(boss: string): void;
	private getPb(boss: string): number;
	private loadPets(): void;
		// !pets requires off thread pets access, so we just store a copy
				// modicons array might be replaced in between when we assign it and the callback,
				// so fetch modicons again
	/**
	 * Sets the list of owned pets for the local player
	 *
	 * @param petList The total list of owned pets for the local player
	 */
	private setPetList(petList: Array<number>): void;
	/**
	 * Looks up the list of owned pets for the local player
	 */
	private getPetListOld(): Array<Pet>;
			// CHECKSTYLE:OFF
			// CHECKSTYLE:ON
	private getPetList(): Array<number>;
			// CHECKSTYLE:OFF
			// CHECKSTYLE:ON
	onChatMessage(chatMessage: net.runelite.api.events.ChatMessage): void;
				// The config service doesn't support keys with colons in them
				// Unset old TOB kc
				// Unset old story mode
			// We either already have the pb, or need to remember the boss for the upcoming pb
					// TOB team size isn't sent in the kill message, but can be computed from varbits
					// TOA team size isn't sent in the kill message, but can be computed from varbits
				// If a raid with a team size, only update the pb if it is lower than the existing pb
				// so that the pb is the overall lowest of any team size
	static timeStringToSeconds(timeString: string): number;
	static secondsToTimeString(seconds: number): string;
		// If the seconds is an integer, it is ambiguous if the pb is a precise
		// pb or not. So we always show it without the trailing .00.
	private matchPb(matcher: Matcher): void;
			// Most bosses send boss kill message, and then pb message, so we
			// use the remembered lastBossKill
			// Some bosses send the pb message, and then the kill message!
				// pattern has no team size
	onGameTick(event: net.runelite.api.events.GameTick): void;
		// Adventure log - Counters
				// Each line is a separate static child
								// 3 player -> 3 players
								// 1 player -> Solo
								// Solo -> Solo
								// 2 players -> 2 players
	onScriptPostFired(scriptPostFired: net.runelite.api.events.ScriptPostFired): void;
				// Make sure that the player is looking in the All Pets tab of the collection log
	onWidgetLoaded(widget: net.runelite.api.events.WidgetLoaded): void;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
	onVarbitChanged(varbitChanged: net.runelite.api.events.VarbitChanged): void;
	private killCountSubmit(chatInput: ChatInput, value: string): boolean;
	private killCountLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private duelArenaSubmit(chatInput: ChatInput, value: string): boolean;
	private duelArenaLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private questPointsLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private questPointsSubmit(chatInput: ChatInput, value: string): boolean;
	private personalBestLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private personalBestSubmit(chatInput: ChatInput, value: string): boolean;
	private gambleCountLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private gambleCountSubmit(chatInput: ChatInput, value: string): boolean;
	/**
	 * Looks up the pet list for the player who triggered !pets
	 *
	 * @param chatMessage The chat message containing the command.
	 * @param message     The chat message in string format
	 *                    <p>
	 */
	private petListLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
		// Append pets that the player owns
	/**
	 * Submits the pet list for the local player
	 *
	 * @param chatInput The chat message containing the command.
	 * @param value     The chat message
	 */
	private petListSubmit(chatInput: ChatInput, value: string): boolean;
	/**
	 * Looks up the item price and changes the original message to the
	 * response.
	 *
	 * @param chatMessage The chat message containing the command.
	 * @param message    The chat message
	 */
	private itemPriceLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	/**
	 * Looks up the player skill and changes the original message to the
	 * response.
	 *
	 * @param chatMessage The chat message containing the command.
	 * @param message    The chat message
	 */
	playerSkillLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private combatLevelLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private leaguePointsLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private bountyHunterHunterLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private bountyHunterRogueLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private lastManStandingLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private soulWarsZealLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private minigameLookup(chatMessage: net.runelite.api.events.ChatMessage, minigame: HiscoreSkill): void;
			// League points only exist on the league hiscores
	private clueLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	/**
	 * Gets correct lookup data for message
	 *
	 * @param chatMessage chat message
	 * @return hiscore lookup data
	 */
	private getCorrectLookupFor(chatMessage: net.runelite.api.events.ChatMessage): HiscoreLookup;
		// If we are sending the message then just use the local hiscore endpoint for the world
			// Public chat on a seasonal world is always seasonal or tournament hiscores, regardless of icon
		// Get ironman status from their icon in chat, this handles leagues too
	/**
	 * Compares the names of the items in the list with the original input.
	 * Returns the item if its name is equal to the original input or the
	 * shortest match if no exact match is found.
	 *
	 * @param items         List of items.
	 * @param originalInput String with the original input.
	 * @return Item which has a name equal to the original input.
	 */
	private retrieveFromList(items: Array<ItemPrice>, originalInput: string): ItemPrice;
		// Take a guess
	/**
	 * Looks up the ironman status of the local player. Does NOT work on other players.
	 *
	 * @return hiscore endpoint
	 */
	private getLocalHiscoreEndpointType(): HiscoreEndpoint;
			// leagues/dmmt or dmm
	/**
	 * Returns the ironman status based on the symbol in the name of the player.
	 *
	 * @param name player name
	 * @return hiscore endpoint
	 */
	private static getHiscoreEndpointByName(name: string): HiscoreEndpoint;
	/**
	 * Converts account type to hiscore endpoint
	 *
	 * @param accountType account type
	 * @return hiscore endpoint
	 */
	private static toEndPoint(accountType: number): HiscoreEndpoint;
/** TBD-1 */
// export class HiscoreLookup
	private static longBossName(boss: string): string;
			// gwd
			// dks
			// Chambers of Xeric
			// Chambers of Xeric Challenge Mode
			// Theatre of Blood
			// Theatre of Blood Entry Mode
			// Theatre of Blood Hard Mode
			// Tombs of Amascut
			// The Gauntlet
			// Corrupted Gauntlet
			// The Nightmare
			// Phosani's Nightmare
			// Hallowed Sepulchre
			// Prifddinas Agility Course
			// Shayzien Basic Agility Course
			// Shayzien Advanced Agility Course
			// Ape Atoll Agility
			// Draynor Village Rooftop Course
			// Al-Kharid Rooftop Course
			// Varrock Rooftop Course
			// Canifis Rooftop Course
			// Falador Rooftop Course
			// Seers' Village Rooftop Course
			// Pollnivneach Rooftop Course
			// Rellekka Rooftop Course
			// Ardougne Rooftop Course
			// Agility Pyramid
			// Barbarian Outpost
			// Brimhaven Agility Arena
			// Dorgesh-Kaan Agility Course
			// Gnome Stronghold Agility Course
			// Penguin Agility
			// Werewolf Agility
			// Skullball
			// Wilderness Agility Course
			// Jad challenge
			// Guardians of the Rift
			// Tempoross
			// Phantom Muspah
			// Desert Treasure 2 bosses
			// dt2 awakened variants
			// lunar chest variants
			// hunter rumour variants
	private static longSkillName(skill: string): string;
	private static findHiscoreSkill(search: string): HiscoreSkill;
			// longBossName the skill name to normalize from hiscore name
			// to our internal name (removing the colon)
	private tobTeamSize(): number;
	private toaTeamSize(): number;
	private findPet(name: string): number;
}
}