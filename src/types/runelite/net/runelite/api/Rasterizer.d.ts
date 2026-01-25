/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2022 Abex
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
	 * Jagex 2D and 3D drawing utilities.
	 * Similar to AWT's {@link java.awt.Graphics2D}
	 *
	 * @see JagexColor
	 */
	export class Rasterizer {
		/**
		 * Gets the back buffer of the rasterizer
		 *
		 * ARGB or RGB depending on {@link Client#isGpu()}
		 */
		getPixels(): number[];
		/**
		 * Width of {@link #getPixels()}
		 */
		getWidth(): number;
		/**
		 * Height of {@link #getPixels()}
		 */
		getHeight(): number;
		/**
		 * Draws a filled rectangle onto the rasterizer buffer at full opacity
		 */
		fillRectangle(
			x: number,
			y: number,
			w: number,
			h: number,
			rgb: number,
		): void;
		/**
		 * Draws a filled triangle onto the rasterizer buffer at rasterizer opacity
		 */
		rasterFlat(
			y0: number,
			y1: number,
			y2: number,
			x0: number,
			x1: number,
			x2: number,
			rgb: number,
		): void;
		/**
		 * Sets if {@link #rasterGouraud} uses a faster shading algorithm
		 */
		setRasterGouraudLowRes(lowRes: boolean): void;
		/**
		 * Draws a gouraud shaded filled triangle onto the rasterizer buffer at rasterizer opacity
		 */
		rasterGouraud(
			y0: number,
			y1: number,
			y2: number,
			x0: number,
			x1: number,
			x2: number,
			hsl0: number,
			hsl1: number,
			hsl2: number,
		): void;
		setDrawRegion(x0: number, y0: number, x1: number, x2: number): void;
		resetRasterClipping(): void;
	}
}
