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
	 * Represents the model of a tile in the current scene.
	 */
	export class SceneTileModel {
		/**
		 * Gets the underlay color of the tile.
		 *
		 * @return the underlay color
		 */
		getModelUnderlay(): number;
		/**
		 * Gets the overlay color of the tile.
		 *
		 * @return the overlay color
		 */
		getModelOverlay(): number;
		/**
		 * Gets the shape mask type.
		 *
		 * @return the shape mask
		 */
		getShape(): number;
		/**
		 * Gets the rotation of the tile.
		 *
		 * @return the rotation
		 */
		getRotation(): number;
		getFaceX(): number[];
		getFaceY(): number[];
		getFaceZ(): number[];
		getVertexX(): number[];
		getVertexY(): number[];
		getVertexZ(): number[];
		getTriangleColorA(): number[];
		getTriangleColorB(): number[];
		getTriangleColorC(): number[];
		getTriangleTextureId(): number[];
		isFlat(): boolean;
		getBufferOffset(): number;
		setBufferOffset(bufferOffset: number): void;
		getUvBufferOffset(): number;
		setUvBufferOffset(bufferOffset: number): void;
		getBufferLen(): number;
		setBufferLen(bufferLen: number): void;
	}
}
