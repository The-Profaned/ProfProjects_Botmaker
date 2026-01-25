/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
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
declare namespace net.runelite.api {
	/**
	 * Represents a message in the chatbox.
	 */
	export class MessageNode extends Node {
		/**
		 * Get the id for this message node
		 *
		 * @return
		 */
		getId(): number;
		/**
		 * Gets the type of message.
		 *
		 * @return the message type
		 */
		getType(): ChatMessageType;
		/**
		 * Gets the name of the player that sent the message.
		 *
		 * @return the player name
		 */
		getName(): string;
		/**
		 * Sets the name of the player that sent the message.
		 *
		 * @param name the new player name
		 */
		setName(name: string): void;
		/**
		 * Gets the sender of the message. (ie. friends chat name)
		 *
		 * @return the message sender
		 */
		getSender(): string;
		/**
		 * Sets the sender of the message.
		 *
		 * @param sender the new message sender
		 */
		setSender(sender: string): void;
		/**
		 * Gets the message contents.
		 *
		 * @return the message contents
		 */
		getValue(): string;
		/**
		 * Sets the message contents.
		 *
		 * @param value the new message contents
		 */
		setValue(value: string): void;
		/**
		 * Gets the overriden message format.
		 *
		 * @return the message format
		 */
		getRuneLiteFormatMessage(): string;
		/**
		 * Sets the overriden message format.
		 * <p>
		 * If this value is not null, the message contents as returned by
		 * {@link #getValue()} will be replaced with the format set here
		 * when a message is processed.
		 *
		 * @param runeLiteFormatMessage the new message format
		 */
		setRuneLiteFormatMessage(runeLiteFormatMessage: string): void;
		/**
		 * Get the timestamp for the message, in seconds from the unix epoch.
		 *
		 * @return
		 */
		getTimestamp(): number;
		/**
		 * Set the timestamp of the message
		 *
		 * @param timestamp
		 */
		setTimestamp(timestamp: number): void;
	}
}
