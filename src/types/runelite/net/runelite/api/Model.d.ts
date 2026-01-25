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
 * Represents the model of an object.
 */
export class Model extends Mesh<Model>, Renderable
{
	getFaceColors1(): number[];
	getFaceColors2(): number[];
	getFaceColors3(): number[];
	getSceneId(): number;
	setSceneId(sceneId: number): void;
	getBufferOffset(): number;
	setBufferOffset(bufferOffset: number): void;
	getUvBufferOffset(): number;
	setUvBufferOffset(bufferOffset: number): void;
	getBottomY(): number;
	calculateBoundsCylinder(): void;
	getFaceRenderPriorities(): number[];
	getRadius(): number;
	getDiameter(): number;
	/**
	 * @see #getAABB(int)
	 */
/** @deprecated */
	calculateExtreme(orientation: number): void;
	getAABB(orientation: number): AABB;
	getXYZMag(): number;
	useBoundingBox(): boolean;
	getVertexNormalsX(): number[];
	getVertexNormalsY(): number[];
	getVertexNormalsZ(): number[];
	getOverrideAmount(): number;
	getOverrideHue(): number;
	getOverrideSaturation(): number;
	getOverrideLuminance(): number;
	getTextureFaces(): number[];
	getTexIndices1(): number[];
	getTexIndices2(): number[];
	getTexIndices3(): number[];
	getUnskewedModel(): Model;
	drawFrustum(zero: number, xRotate: number, yRotate: number, zRotate: number, xCamera: number, yCamera: number, zCamera: number): void;
	drawOrtho(zero: number, xRotate: number, yRotate: number, zRotate: number, xCamera: number, yCamera: number, zCamera: number, zoom: number): void;
}
}