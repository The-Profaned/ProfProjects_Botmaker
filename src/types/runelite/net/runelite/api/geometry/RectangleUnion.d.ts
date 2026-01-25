/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2019 Abex
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
declare namespace net.runelite.api.geometry {
export class RectangleUnion
{
/** TBD-1 */
// export class Rectangle
	/**
	 * Returns a polygon representing the union of all of the passed rectangles.
	 * the passed List will be modified
	 */
	private static union(lefts: Array<Rectangle>): Shapes<SimplePolygon> | null;
		// https://stackoverflow.com/a/35362615/2977136
		// Sort all of the rectangles so they are ordered by their left edge
		// Again, but for the right edge
		// this should be relatively fast if the rectangles are similar sizes because timsort deals with partially
		// presorted data well
		// ranges of our scan line with how many rectangles it is occluding
		// Walk a beam left to right, colliding with any vertical edges of rectangles
			// get the next edge, preferring + edges
			// Find or create the y1 edge
				// create the y2 edge if the next edge is past
/** TBD-1 */
// export class ChangingState
/** TBD-1 */
// export class Segment
/** TBD-1 */
// export class Segments
/** TBD-1 */
// export class Chunk extends SimplePolygon
}
}