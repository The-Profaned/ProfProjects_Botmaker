/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Seth <Sethtroll3@gmail.com>
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
declare namespace net.runelite.api {
	/**
	 * Enumeration of message types that can be received in the chat.
	 */
	export class ChatMessageType {
		/**
		 * A normal game message.
		 */
		static GAMEMESSAGE: ChatMessageType;
		/**
		 * A message in the public chat from a moderator
		 */
		static MODCHAT: ChatMessageType;
		/**
		 * A message in the public chat.
		 */
		static PUBLICCHAT: ChatMessageType;
		/**
		 * A private message from another player.
		 */
		static PRIVATECHAT: ChatMessageType;
		/**
		 * A message that the game engine sends.
		 */
		static ENGINE: ChatMessageType;
		/**
		 * A message received when a friend logs in or out.
		 */
		static LOGINLOGOUTNOTIFICATION: ChatMessageType;
		/**
		 * A private message sent to another player.
		 */
		static PRIVATECHATOUT: ChatMessageType;
		/**
		 * A private message received from a moderator.
		 */
		static MODPRIVATECHAT: ChatMessageType;
		/**
		 * A message received in friends chat.
		 */
		static FRIENDSCHAT: ChatMessageType;
		/**
		 * A message received with information about the current friends chat.
		 */
		static FRIENDSCHATNOTIFICATION: ChatMessageType;
		/**
		 * A trade request being sent.
		 */
		static TRADE_SENT: ChatMessageType;
		/**
		 * A game broadcast.
		 */
		static BROADCAST: ChatMessageType;
		/**
		 * An abuse report submitted.
		 */
		static SNAPSHOTFEEDBACK: ChatMessageType;
		/**
		 * Examine item description.
		 */
		static ITEM_EXAMINE: ChatMessageType;
		/**
		 * Examine NPC description.
		 */
		static NPC_EXAMINE: ChatMessageType;
		/**
		 * Examine object description.
		 */
		static OBJECT_EXAMINE: ChatMessageType;
		/**
		 * Adding player to friend list.
		 */
		static FRIENDNOTIFICATION: ChatMessageType;
		/**
		 * Adding player to ignore list.
		 */
		static IGNORENOTIFICATION: ChatMessageType;
		/**
		 * A chat message in a clan chat.
		 */
		static CLAN_CHAT: ChatMessageType;
		/**
		 * A system message in a clan chat.
		 */
		static CLAN_MESSAGE: ChatMessageType;
		/**
		 * A chat message in the guest clan chat.
		 */
		static CLAN_GUEST_CHAT: ChatMessageType;
		/**
		 * A system message in the guest clan chat.
		 */
		static CLAN_GUEST_MESSAGE: ChatMessageType;
		/**
		 * An autotyper message from a player.
		 */
		static AUTOTYPER: ChatMessageType;
		/**
		 * An autotyper message from a mod.
		 */
		static MODAUTOTYPER: ChatMessageType;
		/**
		 * A game message. (ie. when a setting is changed)
		 */
		static CONSOLE: ChatMessageType;
		/**
		 * A message received when somebody sends a trade offer.
		 */
		static TRADEREQ: ChatMessageType;
		/**
		 * A message received when completing a trade or a duel
		 */
		static TRADE: ChatMessageType;
		/**
		 * A message received when somebody sends a duel offer.
		 */
		static CHALREQ_TRADE: ChatMessageType;
		/**
		 * A message received when someone sends a friends chat challenge offer.
		 */
		static CHALREQ_FRIENDSCHAT: ChatMessageType;
		/**
		 * A message that was filtered.
		 */
		static SPAM: ChatMessageType;
		/**
		 * A message that is relating to the player.
		 */
		static PLAYERRELATED: ChatMessageType;
		/**
		 * A message that times out after 10 seconds.
		 */
		static TENSECTIMEOUT: ChatMessageType;
		/**
		 * The "Welcome to RuneScape" message
		 */
		static WELCOME: ChatMessageType;
		/**
		 * Clan creation invitation.
		 */
		static CLAN_CREATION_INVITATION: ChatMessageType;
		/**
		 * Challenge offer for the clan tab
		 */
		static CHALREQ_CLANCHAT: ChatMessageType;

		static CLAN_GIM_FORM_GROUP: ChatMessageType;
		static CLAN_GIM_GROUP_WITH: ChatMessageType;
		static CLAN_GIM_CHAT: ChatMessageType;
		static CLAN_GIM_MESSAGE: ChatMessageType;
		/**
		 * Chat type for npc and player dialog
		 */
		static DIALOG: ChatMessageType;
		/**
		 * Chat type for dialog with a graphic/object
		 */
		static MESBOX: ChatMessageType;
		/**
		 * An unknown message type.
		 */
		static UNKNOWN: ChatMessageType;

		getType(): number;

		/**
		 * Utility method that maps the type value to its respective
		 * {@link ChatMessageType} value.
		 *
		 * @param type the raw type
		 * @return appropriate message type, or {@link #UNKNOWN}
		 */
		static of(type: number): ChatMessageType;

		toString(): string;
	}
}
