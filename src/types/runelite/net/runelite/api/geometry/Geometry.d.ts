/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Woox <https://github.com/wooxsolo>
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
export class Geometry
{
	/**
	 * Find the point where two lines intersect.
	 *
	 * @param x1 X coordinate of the first endpoint of the first line.
	 * @param y1 Y coordinate of the first endpoint of the first line.
	 * @param x2 X coordinate of the second endpoint of the first line.
	 * @param y2 Y coordinate of the second endpoint of the first line.
	 * @param x3 X coordinate of the first endpoint of the second line.
	 * @param y3 Y coordinate of the first endpoint of the second line.
	 * @param x4 X coordinate of the second endpoint of the second line.
	 * @param y4 Y coordinate of the second endpoint of the second line.
	 * @return The intersection point of the lines, or null if the lines don't intersect.
	 */
	static lineIntersectionPoint(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): Point2D.Float;
		// https://stackoverflow.com/a/1968345
		// No intersection
	/**
	 * Find the intersection points between a Shape and a line.
	 *
	 * @param shape The shape.
	 * @param x1 X coordinate of the first endpoint of the line.
	 * @param y1 Y coordinate of the first endpoint of the line.
	 * @param x2 X coordinate of the second endpoint of the line.
	 * @param y2 Y coordinate of the second endpoint of the line.
	 * @return A list with the intersection points.
	 */
	static intersectionPoints(shape: Shape, x1: number, y1: number, x2: number, y2: number): Array<Ponumber2D.Float>;
	/**
	 * Transforms the points in a path according to a method.
	 *
	 * @param it The iterator of the path to change the points on.
	 * @param method The method to use to transform the points. Takes a float[2] array with x and y coordinates as parameter.
	 * @return The transformed path.
	 */
	static transformPath(it: PathIterator, method: Consumer<number[]>): GeneralPath;
	/**
	 * Transforms the points in a path according to a method.
	 *
	 * @param path The path to change the points on.
	 * @param method The method to use to transform the points. Takes a float[2] array with x and y coordinates as parameter.
	 * @return The transformed path.
	 */
	static transformPath(path: GeneralPath, method: Consumer<number[]>): GeneralPath;
	/**
	 * Splits a line into smaller segments and appends the segments to a path.
	 *
	 * @param path The path to append lines to.
	 * @param segmentLength The desired length to use for the segmented lines.
	 * @param x1 X coordinate of the first endpoint of the line.
	 * @param y1 Y coordinate of the first endpoint of the line.
	 * @param x2 X coordinate of the second endpoint of the line.
	 * @param y2 Y coordinate of the second endpoint of the line.
	 */
	private static appendSegmentLines(path: GeneralPath, segmentLength: number, x1: number, y1: number, x2: number, y2: number): void;
	/**
	 * Splits a path into smaller segments.
	 * For example, calling this on a path with a line of length 6, with desired
	 * segment length of 2, would split the path into 3 consecutive lines of length 2.
	 *
	 * @param it The iterator of the path to modify.
	 * @param segmentLength The desired length to use for the segments.
	 * @return The modified path.
	 */
	static splitIntoSegments(it: PathIterator, segmentLength: number): GeneralPath;
	/**
	 * Splits a path into smaller segments.
	 * For example, calling this on a path with a line of length 6, with desired
	 * segment length of 2, would split the path into 3 consecutive lines of length 2.
	 *
	 * @param path The path to modify.
	 * @param segmentLength The desired length to use for the segments.
	 * @return The modified path.
	 */
	static splitIntoSegments(path: GeneralPath, segmentLength: number): GeneralPath;
	/**
	 * Removes lines from a path according to a method.
	 *
	 * @param it The iterator of the path to filter.
	 * @param method The method to use to decide which lines to remove. Takes two float[2] arrays with x and y coordinates of the endpoints of the line. Lines for which the predicate returns false are removed.
	 * @return The filtered path.
	 */
	static filterPath(it: PathIterator, method: any): GeneralPath;
	/**
	 * Removes lines from a path according to a method.
	 *
	 * @param path The path to filter.
	 * @param method The method to use to decide which lines to remove. Takes two float[2] arrays with x and y coordinates of the endpoints of the line. Lines for which the predicate returns false are removed.
	 * @return The filtered path.
	 */
	static filterPath(path: GeneralPath, method: any): GeneralPath;
	/**
	 * Removes lines from a path that lie outside the clipping area and cuts
	 * lines intersecting with the clipping area so the resulting lines
	 * lie within the clipping area.
	 *
	 * @param it The iterator of the path to clip.
	 * @param shape The clipping area to clip with.
	 * @return The clipped path.
	 */
	static clipPath(it: PathIterator, shape: Shape): GeneralPath;
	/**
	 * Removes lines from a path that lie outside the clipping area and cuts
	 * lines intersecting with the clipping area so the resulting lines
	 * lie within the clipping area.
	 *
	 * @param path The path to clip.
	 * @param shape The clipping area to clip with.
	 * @return The clipped path.
	 */
	static clipPath(path: GeneralPath, shape: Shape): GeneralPath;
}
}