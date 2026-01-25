/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
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
declare namespace net.runelite.api.model {
/**
 * Provides utility methods for computing the convex hull of a list of
 * <em>n</em> points.
 * <p>
 * The implementation uses the Jarvis march algorithm and runs in O(nh)
 * time in the worst case, where n is the number of points and h the
 * number of points on the convex hull.
 */
export class Jarvis
{
	/**
	 * Computes and returns the convex hull of the passed points.
	 * <p>
	 * The size of the list must be at least 3, otherwise this method will
	 * return null.
	 *
	 * @param points list of points
	 * @return list containing the points part of the convex hull
	 */
/** @deprecated */
	static convexHull(points: Array<Ponumber>): Array<Ponumber>;
	/**
	 * Computes and returns the convex hull of the passed points.
	 * <p>
	 * The size of the list must be at least 3, otherwise this method will
	 * return null.
	 *
	 * @return a shape the points part of the convex hull
	 */
	static convexHull(xs: number[], ys: number[]): net.runelite.api.geometry.SimplePolygon;
		// remove any invalid entries
		// find the left most point
		// current point we are on
			// the next point - all points are to the right of the
			// line between current and next
	private static square(x: number): number;
	private static findLeftMost(xs: number[], ys: number[], length: number): number;
	private static crossProduct(px: number, py: number, qx: number, qy: number, rx: number, ry: number): number;
}
}