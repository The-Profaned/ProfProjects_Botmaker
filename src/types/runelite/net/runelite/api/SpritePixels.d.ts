/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Tyler <https://github.com/tylerthardy>
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
	 * Represents data about the pixels of a sprite image.
	 */
	export class SpritePixels {
		/**
		 * Draws the pixels at the given coordinates on the canvas.
		 *
		 * @param x the x-axis coordinate
		 * @param y the y-axis coordinate
		 */
		drawAt(x: number, y: number): void;
		/**
		 * Gets the width of the sprite image in pixels.
		 *
		 * @return the width
		 */
		getWidth(): number;
		/**
		 * Gets the height of the sprite image in pixels.
		 *
		 * @return the height
		 */
		getHeight(): number;
		/**
		 * Gets the max width of the sprite image in pixels.
		 *
		 * @return the width
		 */
		getMaxWidth(): number;
		/**
		 * Gets the max height of the sprite image in pixels.
		 *
		 * @return the height
		 */
		getMaxHeight(): number;
		/**
		 * Gets the x offset of the sprite image in pixels.
		 *
		 * @return the offset
		 */
		getOffsetX(): number;
		/**
		 * Gets the y offset of the sprite image in pixels.
		 *
		 * @return the offset
		 */
		getOffsetY(): number;
		/**
		 * Sets the max width of the sprite image in pixels.
		 *
		 * @param maxWidth the width
		 */
		setMaxWidth(maxWidth: number): void;
		/**
		 * Sets the max height of the sprite image in pixels.
		 *
		 * @param maxHeight the height
		 */
		setMaxHeight(maxHeight: number): void;
		/**
		 * Sets the x offset of the sprite image in pixels.
		 *
		 * @param offsetX the offset
		 */
		setOffsetX(offsetX: number): void;
		/**
		 * Sets the y offset of the sprite image in pixels.
		 *
		 * @param offsetY the offset
		 */
		setOffsetY(offsetY: number): void;
		/**
		 * Gets an array of all pixels data in the sprite.
		 *
		 * @return the pixel data
		 */
		getPixels(): number[];
		/**
		 * Converts the sprite into a BufferedImage.
		 *
		 * @return the resulting BufferedImage
		 */
		toBufferedImage(): BufferedImage;
		/**
		 * Writes the contents of the sprite to the given BufferedImage.
		 *
		 * @param img the passsed buffered image
		 * @throws IllegalArgumentException if the width or height do not match
		 */
		toBufferedImage(img: BufferedImage): void;
		/**
		 * Writes the contents of the SpritePixels with chosen outline to the BufferedImage
		 *
		 * @param color target color
		 */
		toBufferedOutline(color: java.awt.Color): BufferedImage;
		/**
		 * Writes the contents of the SpritePixels with chosen outline to the BufferedImage
		 *
		 * @param img target image
		 * @param color target color
		 */
		toBufferedOutline(img: BufferedImage, color: number): void;
	}
}
