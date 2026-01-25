/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Hydrox6 <ikada@protonmail.ch>
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
declare namespace net.runelite.client.config {
	export class ChatColorConfig extends Config {
		opaquePublicChat(): java.awt.Color;
		opaquePublicChatHighlight(): java.awt.Color;
		opaquePrivateMessageSent(): java.awt.Color;
		opaquePrivateMessageSentHighlight(): java.awt.Color;
		opaquePrivateMessageReceived(): java.awt.Color;
		opaquePrivateMessageReceivedHighlight(): java.awt.Color;
		//region opaque friends chat
		opaqueFriendsChatInfo(): java.awt.Color;
		opaqueFriendsChatInfoHighlight(): java.awt.Color;
		opaqueFriendsChatMessage(): java.awt.Color;
		opaqueFriendsChatMessageHighlight(): java.awt.Color;
		//endregion
		//region opaque clan chat
		opaqueClanChatInfo(): java.awt.Color;
		opaqueClanChatInfoHighlight(): java.awt.Color;
		opaqueClanChatMessage(): java.awt.Color;
		opaqueClanChatMessageHighlight(): java.awt.Color;
		opaqueClanChatGuestInfo(): java.awt.Color;
		opaqueClanChatGuestInfoHighlight(): java.awt.Color;
		opaqueClanChatGuestMessage(): java.awt.Color;
		opaqueClanChatGuestMessageHighlight(): java.awt.Color;
		//endregion
		opaqueAutochatMessage(): java.awt.Color;
		opaqueAutochatMessageHighlight(): java.awt.Color;
		opaqueTradeChatMessage(): java.awt.Color;
		opaqueTradeChatMessageHighlight(): java.awt.Color;
		opaqueServerMessage(): java.awt.Color;
		opaqueServerMessageHighlight(): java.awt.Color;
		opaqueGameMessage(): java.awt.Color;
		opaqueGameMessageHighlight(): java.awt.Color;
		opaqueExamine(): java.awt.Color;
		opaqueExamineHighlight(): java.awt.Color;
		opaqueFiltered(): java.awt.Color;
		opaqueFilteredHighlight(): java.awt.Color;
		opaqueUsername(): java.awt.Color;
		opaquePrivateUsernames(): java.awt.Color;
		opaqueFriendsChatChannelName(): java.awt.Color;
		opaqueClanChannelName(): java.awt.Color;
		opaqueClanGuestChatChannelName(): java.awt.Color;
		opaqueFriendsChatUsernames(): java.awt.Color;
		opaqueClanChatUsernames(): java.awt.Color;
		opaqueClanChatGuestUsernames(): java.awt.Color;
		opaquePublicFriendUsernames(): java.awt.Color;
		opaquePlayerUsername(): java.awt.Color;
		transparentPublicChat(): java.awt.Color;
		transparentPublicChatHighlight(): java.awt.Color;
		transparentPrivateMessageSent(): java.awt.Color;
		transparentPrivateMessageSentHighlight(): java.awt.Color;
		transparentPrivateMessageReceived(): java.awt.Color;
		transparentPrivateMessageReceivedHighlight(): java.awt.Color;
		//region transparent friends chat
		transparentFriendsChatInfo(): java.awt.Color;
		transparentFriendsChatInfoHighlight(): java.awt.Color;
		transparentFriendsChatMessage(): java.awt.Color;
		transparentFriendsChatMessageHighlight(): java.awt.Color;
		//endregion
		//region transparent clan chat
		transparentClanChatInfo(): java.awt.Color;
		transparentClanChatInfoHighlight(): java.awt.Color;
		transparentClanChatMessage(): java.awt.Color;
		transparentClanChatMessageHighlight(): java.awt.Color;
		transparentClanChatGuestInfo(): java.awt.Color;
		transparentClanChatGuestInfoHighlight(): java.awt.Color;
		transparentClanChatGuestMessage(): java.awt.Color;
		transparentClanChatGuestMessageHighlight(): java.awt.Color;
		//endregion
		transparentAutochatMessage(): java.awt.Color;
		transparentAutochatMessageHighlight(): java.awt.Color;
		transparentTradeChatMessage(): java.awt.Color;
		transparentTradeChatMessageHighlight(): java.awt.Color;
		transparentServerMessage(): java.awt.Color;
		transparentServerMessageHighlight(): java.awt.Color;
		transparentGameMessage(): java.awt.Color;
		transparentGameMessageHighlight(): java.awt.Color;
		transparentExamine(): java.awt.Color;
		transparentExamineHighlight(): java.awt.Color;
		transparentFiltered(): java.awt.Color;
		transparentFilteredHighlight(): java.awt.Color;
		transparentUsername(): java.awt.Color;
		transparentPrivateUsernames(): java.awt.Color;
		transparentFriendsChatChannelName(): java.awt.Color;
		transparentClanChannelName(): java.awt.Color;
		transparentClanChannelGuestName(): java.awt.Color;
		transparentFriendsChatUsernames(): java.awt.Color;
		transparentClanChatUsernames(): java.awt.Color;
		transparentClanChatGuestUsernames(): java.awt.Color;
		transparentPublicFriendUsernames(): java.awt.Color;
		transparentPlayerUsername(): java.awt.Color;
	}
}
