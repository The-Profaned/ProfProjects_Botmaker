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
/**
 * A simple list of vertices that can be append or prepended to
 */
export class SimplePolygon implements Shape
{
	pushLeft(xCoord: number, yCoord: number): void;
	popLeft(): void;
	private expandLeft(grow: number): void;
	pushRight(xCoord: number, yCoord: number): void;
	popRight(): void;
	private expandRight(grow: number): void;
	getX(index: number): number;
	getY(index: number): number;
	size(): number;
	toRuneLitePointList(): Array<Ponumber>;
	copyTo(xDest: number[], yDest: number[], offset: number): void;
	appendTo(other: SimplePolygon): void;
	reverse(): void;
	/**
	 * Clips the polygon with the passed convex polygon
	 */
	intersectWithConvex(convex: SimplePolygon): void;
		// Sutherland-Hodgman
	getBounds(): Rectangle;
	getBounds2D(): Rectangle2D;
	contains(cx: number, cy: number): boolean;
	private crossings(cx: number, cy: number, swap: boolean): number;
	contains(p: Point2D): boolean;
	intersects(x0: number, y0: number, w: number, h: number): boolean;
		// this is horribly inefficient, but I don't think it will be called anywhere
	intersects(r: Rectangle2D): boolean;
	contains(x: number, y: number, w: number, h: number): boolean;
	contains(r: Rectangle2D): boolean;
	getPathIterator(at: AffineTransform): PathIterator;
	getPathIterator(at: AffineTransform, flatness: number): PathIterator;
/** TBD-1 */
// export class SimpleIterator implements PathIterator
/** TBD-1 */
// export class TransformIterator extends SimpleIterator
}
}