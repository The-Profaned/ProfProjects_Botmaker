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
	 * Represents an item inside an {@link ItemLayer}.
	 */
	export class TileItem extends Renderable {
		static OWNERSHIP_NONE: number;
		static OWNERSHIP_SELF: number;
		static OWNERSHIP_OTHER: number;
		static OWNERSHIP_GROUP: number;
		/**
		 * @return the ID of the item
		 * @see ItemID
		 */
		getId(): number;
		getQuantity(): number;
		/**
		 * Get the time, in server ticks, when the item becomes visible to other players
		 * @see Client#getTickCount()
		 * @return
		 */
		getVisibleTime(): number;
		/**
		 * Get the time, in server ticks, when the item despawns
		 * @see Client#getTickCount()
		 * @return
		 */
		getDespawnTime(): number;
		/**
		 * Get the item ownership
		 * @return
		 */
		getOwnership(): number;
		/**
		 * Test whether the item is private
		 * @return
		 */
		isPrivate(): boolean;
	}
}
