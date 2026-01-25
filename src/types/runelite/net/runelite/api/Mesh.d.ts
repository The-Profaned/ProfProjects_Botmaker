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
	 * A {@link Model} or {@link ModelData}
	 */
	export class Mesh<T extends Mesh<T>> {
		getVerticesCount(): number;
		getVerticesX(): number[];
		getVerticesY(): number[];
		getVerticesZ(): number[];
		getFaceCount(): number;
		getFaceIndices1(): number[];
		getFaceIndices2(): number[];
		getFaceIndices3(): number[];
		getFaceTransparencies(): number[];
		getFaceTextures(): number[];
		/**
		 * Rotates this model 90 degrees around the vertical axis.
		 * {@link ModelData#cloneVertices()} should be called before calling this method
		 */
		rotateY90Ccw(): T;
		/**
		 * Rotates this model 180 degrees around the vertical axis.
		 * {@link ModelData#cloneVertices()} should be called before calling this method
		 */
		rotateY180Ccw(): T;
		/**
		 * Rotates this model 270 degrees around the vertical axis.
		 * {@link ModelData#cloneVertices()} should be called before calling this method
		 */
		rotateY270Ccw(): T;
		/**
		 * Offsets this model by the passed amount (1/128ths of a tile).
		 * {@link ModelData#cloneVertices()} should be called before calling this method
		 */
		translate(x: number, y: number, z: number): T;
		/**
		 * Resizes this model by the passed amount (1/128ths).
		 * {@link ModelData#cloneVertices()} should be called before calling this method
		 */
		scale(x: number, y: number, z: number): T;
	}
}
