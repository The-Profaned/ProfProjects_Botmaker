/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Tomas Slusny <slusnucky@gmail.com>
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
declare namespace net.runelite.client.plugins.playerindicators {
	export class PlayerIndicatorsConfig extends Config {
		HighlightSetting: {
			DISABLED: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			ENABLED: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			PVP: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
		};
		highlightOwnPlayer(): HighlightSetting;
		getOwnPlayerColor(): java.awt.Color;
		highlightPartyMembers(): HighlightSetting;
		getPartyMemberColor(): java.awt.Color;
		highlightFriends(): HighlightSetting;
		getFriendColor(): java.awt.Color;
		highlightFriendsChat(): HighlightSetting;
		getFriendsChatMemberColor(): java.awt.Color;
		highlightTeamMembers(): HighlightSetting;
		getTeamMemberColor(): java.awt.Color;
		highlightClanMembers(): HighlightSetting;
		getClanMemberColor(): java.awt.Color;
		highlightOthers(): HighlightSetting;
		getOthersColor(): java.awt.Color;
		drawTiles(): boolean;
		playerNamePosition(): PlayerNameLocation;
		drawMinimapNames(): boolean;
		colorPlayerMenu(): boolean;
		showFriendsChatRanks(): boolean;
		showClanChatRanks(): boolean;
	}
}
