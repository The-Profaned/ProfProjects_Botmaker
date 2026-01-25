/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Devin French <https://github.com/devinfrench>
 * Copyright (c) 2021, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins.team {
export class TeamPlugin extends Plugin
{
	// Team number -> Number of players
	// Player -> Team number
	provideConfig(configManager: ConfigManager): TeamConfig;
	private startUp(): void;
	private shutDown(): void;
	onConfigChanged(configChanged: ConfigChanged): void;
	onGameStateChanged(state: net.runelite.api.events.GameStateChanged): void;
	onPlayerSpawned(event: net.runelite.api.events.PlayerSpawned): void;
	onPlayerDespawned(playerDespawned: net.runelite.api.events.PlayerDespawned): void;
	onPlayerChanged(playerChanged: net.runelite.api.events.PlayerChanged): void;
	private updateTeam(player: Player): void;
	private sortTeams(): void;
		// Sort teams by value in descending order and then by key in ascending order, limited to 5 entries
	onFriendsChatChanged(event: net.runelite.api.events.FriendsChatChanged): void;
	onClanChannelChanged(event: net.runelite.api.events.ClanChannelChanged): void;
	onFriendsChatMemberJoined(event: net.runelite.api.events.FriendsChatMemberJoined): void;
	onFriendsChatMemberLeft(event: net.runelite.api.events.FriendsChatMemberLeft): void;
	onClanMemberJoined(clanMemberJoined: net.runelite.api.events.ClanMemberJoined): void;
	onClanMemberLeft(clanMemberLeft: net.runelite.api.events.ClanMemberLeft): void;
	private addFriendsChatCounter(): void;
	private removeFriendsChatCounter(): void;
	private addClanChatCounter(): void;
	private removeClanChatCounter(): void;
}
}