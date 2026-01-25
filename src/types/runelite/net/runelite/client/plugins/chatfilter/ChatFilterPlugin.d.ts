/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Magic fTail
 * Copyright (c) 2019, osrs-music-map <osrs-music-map@users.noreply.github.com>
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
declare namespace net.runelite.client.plugins.chatfilter {
export class ChatFilterPlugin extends Plugin
{
/** TBD-1 */
// export class Duplicate
/** TBD-1 */
// export class FilterCacheMap extends LinkedHashMap<Integer, String>
	provideConfig(configManager: ConfigManager): ChatFilterConfig;
	private startUp(): void;
	private shutDown(): void;
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
			// Login drops references to all messages and also resets the global message id counter.
			// Invalidate the message id so it doesn't collide later when rebuilding the chatfilter.
	onScriptCallbackEvent(event: net.runelite.api.events.ScriptCallbackEvent): void;
		// Only filter public chat and private messages
			// If messageId is -1 then this is a replayed message, which we can't easily collapse since we don't know
			// the most recent message. This is only for public chat since it is the only thing both replayed and also
			// collapsed. Just allow uncollapsed playback.
			// Block the message
			// Replace the message
	onOverheadTextChanged(event: net.runelite.api.events.OverheadTextChanged): void;
 // run after ChatMessageManager
	onChatMessage(chatMessage: net.runelite.api.events.ChatMessage): void;
			// remove and re-insert into map to move to end of list
	canFilterPlayer(playerName: string): boolean;
	private isFriendsChatMember(name: string): boolean;
	private isClanChatMember(name: string): boolean;
	censorMessage(username: string, message: string): string;
	private censorMessage(messageNode: MessageNode, username: string, message: string): string;
	updateFilteredPatterns(): void;
	private stripAccents(input: string): string;
	private static compilePattern(pattern: string): Pattern;
	onConfigChanged(event: ConfigChanged): void;
		//Refresh chat after config change to reflect current rules
	isNameFiltered(playerName: string): boolean;
}
}