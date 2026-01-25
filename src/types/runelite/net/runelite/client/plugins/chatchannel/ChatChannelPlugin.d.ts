/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Devin French <https://github.com/devinfrench>
 * Copyright (c) 2019, Adam <Adam@sigterm.info>
 * Copyright (c) 2018, trimbe <github.com/trimbe>
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
declare namespace net.runelite.client.plugins.chatchannel {
	export class ChatChannelPlugin extends Plugin {
		/**
		 * queue of temporary messages added to the client
		 */
		getConfig(configManager: ConfigManager): ChatChannelConfig;
		startUp(): void;
		shutDown(): void;
		onConfigChanged(configChanged: ConfigChanged): void;
		onFriendsChatMemberJoined(event: net.runelite.api.events.FriendsChatMemberJoined): void;
		// members getting initialized isn't relevant
		// attempt to filter out world hopping joins
		onFriendsChatMemberLeft(event: net.runelite.api.events.FriendsChatMemberLeft): void;
		onClanMemberJoined(clanMemberJoined: net.runelite.api.events.ClanMemberJoined): void;
		onClanMemberLeft(clanMemberLeft: net.runelite.api.events.ClanMemberLeft): void;
		private clanChannelToChatType(clanChannel: net.runelite.api.clan.ClanChannel): MemberActivity.ChatType;
		private clanChannelJoinLeaveEnabled(chatType: MemberActivity.ChatType): boolean;
		private queueJoin(member: ChatPlayer, chatType: MemberActivity.ChatType): void;
		private queueLeave(member: ChatPlayer, chatType: MemberActivity.ChatType): void;
		onGameTick(gameTick: net.runelite.api.events.GameTick): void;
		private timeoutMessages(): void;
		// If this message has been reused since, it will get a different id
		// Everything else in the deque is newer
		addActivityMessages(): void;
		// everything after this is older
		private addActivityMessage(member: FriendsChatMember, activityType: ActivityType): void;
		// Use configured friends chat info colors if set, otherwise default to the jagex text and fc name colors
		private addClanActivityMessage(
			member: net.runelite.api.clan.ClanChannelMember,
			activityType: ActivityType,
			chatType: MemberActivity.ChatType,
		): void;
		// Clan ranks are always included in chat messages, so we'll just always include it in join messages.
		// Use configured clan chat info colors if set, otherwise default to the jagex text and fc name colors
		onVarClientStrChanged(strChanged: net.runelite.api.events.VarClientStrChanged): void;
		onGameStateChanged(state: net.runelite.api.events.GameStateChanged): void;
		onFriendsChatChanged(event: net.runelite.api.events.FriendsChatChanged): void;
		onScriptCallbackEvent(scriptCallbackEvent: net.runelite.api.events.ScriptCallbackEvent): void;
		// Set a flag so the script doesn't instantly kick them
		// Get name of player we are trying to kick
		// Show a chatbox panel confirming the kick
		onScriptPostFired(event: net.runelite.api.events.ScriptPostFired): void;
		private getRank(playerName: string): FriendsChatRank;
		private rebuildFriendsChat(): void;
		private loadFriendsChats(): void;
		private updateRecentChat(s: string): void;
		private confirmKickPlayer(kickPlayerName: string): void;
		private colorIgnoredPlayers(ignoreColor: java.awt.Color): void;
		// Iterate every 3 widgets, since the order of widgets is name, world, icon
		private rebuildClanTitle(): void;
		private updateClanTitle(widget: number, channel: net.runelite.api.clan.ClanChannel): void;
	}
}
