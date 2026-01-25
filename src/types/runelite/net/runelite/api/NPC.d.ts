/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2016-2017, Adam <Adam@sigterm.info>
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
	 * Represents a non-player character in the game.
	 */
	export class NPC extends net.runelite.api.Actor {
		/**
		 * Gets the ID of the NPC.
		 *
		 * @return the ID of the NPC
		 * @see NpcID
		 */
		getId(): number;
		getName(): string;
		getCombatLevel(): number;
		/**
		 * Gets the index position of this NPC in the clients cached
		 * NPC array.
		 *
		 * @return the NPC index
		 * @see Client#getCachedNPCs()
		 */
		getIndex(): number;
		/**
		 * Gets the composition of this NPC.
		 *
		 * @return the composition
		 */
		getComposition(): NPCComposition;
		/**
		 * Get the composition for this NPC and transform it if required
		 *
		 * @return the transformed NPC
		 */
		getTransformedComposition(): NPCComposition | null;
		getModelOverrides(): NpcOverrides | null;
		getChatheadOverrides(): NpcOverrides | null;

			/**
	 * Get the array of overhead icon archive ids.
	 * Used in conjunction with {@link #getOverheadSpriteIds()}
	 * to determine which icons are being rendered overhead.
	 *
	 * @return A sparse array of archive ids. Values of -1 are not used.
	 * @see #getOverheadSpriteIds()
	 */
	getOverheadArchiveIds(): number[] | null;

	/**
	 * Get the array of overhead icon sprite indexes.
	 * Used in conjunction with {@link #getOverheadArchiveIds()}
	 * to determine which icons are being rendered overhead.
	 *
	 * @return A sparse array of archive ids. Values of -1 are not used.
	 * @see #getOverheadArchiveIds()
	 */
	getOverheadSpriteIds(): number[] | null;
	}
}
