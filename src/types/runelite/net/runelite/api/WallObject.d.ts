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
	 * Represents one or two walls on a tile
	 */
	export class WallObject extends TileObject {
		/**
		 * A bitfield with the orientation of the first wall
		 * 1 = West
		 * 2 = North
		 * 4 = East
		 * 8 = South
		 * 16 = North-west
		 * 32 = North-east
		 * 64 = South-east
		 * 128 = South-west
		 */
		getOrientationA(): number;
		/**
		 * A bitfield with the orientation of the second wall
		 * 1 = West
		 * 2 = North
		 * 4 = East
		 * 8 = South
		 * 16 = North-west
		 * 32 = North-east
		 * 64 = South-east
		 * 128 = South-west
		 */
		getOrientationB(): number;
		/**
		 * A bitfield containing various flags:
		 * <pre>{@code
		 * object type id = bits & 0x20
		 * orientation (0-3) = bits >>> 6 & 3
		 * supports items = bits >>> 8 & 1
		 * }</pre>
		 */
		getConfig(): number;
		/**
		 * Gets the convex hull of the objects model.
		 *
		 * @return the convex hull
		 * @see net.runelite.api.model.Jarvis
		 */
		getConvexHull(): Shape;
		getConvexHull2(): Shape;
		getRenderable1(): Renderable;
		getRenderable2(): Renderable;
	}
}
