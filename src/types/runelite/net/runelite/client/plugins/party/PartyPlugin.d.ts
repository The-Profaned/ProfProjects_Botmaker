/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2019, Tomas Slusny <slusnucky@gmail.com>
 * Copyright (c) 2021, Jonathan Rousseau <https://github.com/JoRouss>
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
declare namespace net.runelite.client.plugins.party {
	export class PartyPlugin extends Plugin {
		configure(binder: Binder): void;
		private startUp(): void;
		// Delay sync so the eventbus can register prior to the sync response
		private shutDown(): void;
		provideConfig(configManager: ConfigManager): PartyConfig;
		onFocusChanged(focusChanged: net.runelite.api.events.FocusChanged): void;
		leaveParty(): void;
		onConfigChanged(event: ConfigChanged): void;
		// rebuild the panel in the event the "Recolor names" option changes
		onMenuOptionClicked(event: net.runelite.api.events.MenuOptionClicked): void;
		onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
		onTilePing(event: TilePing): void;
		scheduledTick(): void;
		private shareLocation(): void;
		private checkIdle(): void;
		onGameTick(event: net.runelite.api.events.GameTick): void;
		requestSync(): void;
		// Request sync
		onStatusUpdate(event: StatusUpdate): void;
		onLocationUpdate(event: LocationUpdate): void;
		onUserJoin(event: UserJoin): void;
		// this has a side effect of creating the party data
		onUserSync(event: UserSync): void;
		private checkStateChanged(forceSend: boolean): void;
		// non-null values for next-tick comparison
		onUserPart(event: UserPart): void;
		onPartyChanged(event: PartyChanged): void;
		// Reset party
		onCommandExecuted(commandExecuted: net.runelite.api.events.CommandExecuted): void;
		onPartyMemberAvatar(event: PartyMemberAvatar): void;
		getPartyData(uuid: number): PartyData | null;
		// This happens when you are not in party but you still receive message.
		// Can happen if you just left party and you received message before message went through
		// in ws service
		// When first joining a party, other members can join before getting a join for self
		private getLocalMemberColor(): java.awt.Color;
		private static messageFreq(partySize: number): number;
		// introduce a tick delay for each member >6
	}
}
