/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2019, Adam <Adam@sigterm.info>
 * Copyright (c) 2017, Robbie <https://github.com/rbbi>
 * Copyright (c) 2018, SomeoneWithAnInternetConnection
 * Copyright (c) 2020, Dennis <me@dennis.dev>
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
declare namespace net.runelite.client.plugins.grandexchange {
export class GrandExchangePlugin extends Plugin
{
	/**
	 * Logic from {@link org.apache.commons.text.similarity.FuzzyScore}
	 */
	static findFuzzyIndices(term: string, query: string): Array<number>;
		// fuzzy logic is case insensitive. We normalize the Strings to lower
		// case right from the start. Turning characters to lower case
		// via Character.toLowerCase(char) is unfortunately insufficient
		// as it does not accept a locale.
		// the position in the term which will be scanned next for potential
		// query character matches
					// we can leave the nested loop. Every character in the
					// query can match at most one character in the term.
	private getOffer(slot: number): SavedOffer;
	private setOffer(slot: number, offer: SavedOffer): void;
	private deleteOffer(slot: number): void;
	private saveTrade(trade: Trade): void;
		//CHECKSTYLE:OFF
		//CHECKSTYLE:ON
	provideConfig(configManager: ConfigManager): GrandExchangeConfig;
	private startUp(): void;
	private shutDown(): void;
	search(itemName: string): void;
	onSessionOpen(sessionOpen: SessionOpen): void;
	onSessionClose(sessionClose: SessionClose): void;
	onConfigChanged(event: ConfigChanged): void;
	onGrandExchangeOfferChanged(offerEvent: net.runelite.api.events.GrandExchangeOfferChanged): void;
			// Trades are cleared by the client during LOGIN_SCREEN/HOPPING/LOGGING_IN, ignore those so we don't
			// clear the offer config.
	submitTrade(slot: number, offer: GrandExchangeOffer): void;
			// new offer
			// desync
			// no change
	private saveTrade(trade: GrandExchangeTrade): void;
		// Completed trades are either fully completed (qty == total) or partially complete
		// (qty > 0) and cancelled.
	private getGeWorldType(): WorldType;
	private updatePanel(slot: number, offer: GrandExchangeOffer): void;
	private updateConfig(slot: number, offer: GrandExchangeOffer): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
	onMenuEntryAdded(event: net.runelite.api.events.MenuEntryAdded): void;
		// At the moment, if the user disables quick lookup, the input listener gets disabled. Thus, isHotKeyPressed()
		// should always return false when quick lookup is disabled.
		// Replace the default option with "Search ..." when holding alt
				// Don't show for view tabs and such
	onFocusChanged(focusChanged: net.runelite.api.events.FocusChanged): void;
	onScriptPostFired(event: net.runelite.api.events.ScriptPostFired): void;
	private highlightSearchMatches(): void;
		// run after the bank tags plugin, and potentially anything
		// else which wants to consume the event and override
		// the search behavior
	onGrandExchangeSearched(event: net.runelite.api.events.GrandExchangeSearched): void;
			// We do this so that for example the items "Anti-venom ..." are still at the top
			// when searching "anti venom"
	onScriptCallbackEvent(event: net.runelite.api.events.ScriptCallbackEvent): void;
	private setGeTitle(): void;
		// Append to title
	private setLimitResetTime(itemId: number): void;
	private getLimitResetTime(itemId: number): Instant;
	private updateLimitTimer(offer: GrandExchangeOffer): void;
	private setExamineText(examine: string, fee: string, buy: boolean): string;
			// If we have item buy limit, append it
		// Sell offers include an additional fee text which doesn't fit, so we truncate the examine text
	private static shortenExamine(examine: string): string;
	openGeLink(name: string, itemId: number): void;
	private getMachineUuid(): string;
}
}