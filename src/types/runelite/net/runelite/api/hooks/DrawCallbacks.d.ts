/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.api.hooks {
	export class DrawCallbacks {
		/**
		 * GPU mode on.
		 */
		/**
		 * GPU hillskew support. Enables the {@link Model#getUnskewedModel()}
		 * API to get the unskewed model.
		 */
		/**
		 * Requests normals be computed for models. Enables the {@link Model#getVertexNormalsX()}
		 * {@link Model#getVertexNormalsY()} {@link Model#getVertexNormalsZ()} API.
		 */
		draw(
			projection: Projection,
			scene: Scene,
			renderable: Renderable,
			orientation: number,
			x: number,
			y: number,
			z: number,
			hash: number,
		): void;
		drawScenePaint(
			scene: Scene,
			paint: SceneTilePaint,
			plane: number,
			tileX: number,
			tileZ: number,
		): void;
		drawSceneTileModel(
			scene: Scene,
			model: SceneTileModel,
			tileX: number,
			tileZ: number,
		): void;
		/**
		 * Called when a frame should be drawn.
		 *
		 * @param overlayColor Color of full-viewport overlays, if any
		 */
		draw(overlayColor: number): void;
		/**
		 * Called before the scene is drawn
		 */
		drawScene(
			cameraX: number,
			cameraY: number,
			cameraZ: number,
			cameraPitch: number,
			cameraYaw: number,
			plane: number,
		): void;
		/**
		 * Called after the scene has been drawn
		 */
		postDrawScene(): void;
		animate(texture: Texture, diff: number): void;
		loadScene(scene: Scene): void;
		swapScene(scene: Scene): void;
		tileInFrustum(
			scene: Scene,
			pitchSin: number,
			pitchCos: number,
			yawSin: number,
			yawCos: number,
			cameraX: number,
			cameraY: number,
			cameraZ: number,
			plane: number,
			msx: number,
			msy: number,
		): boolean;
	}
}
