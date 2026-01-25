/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018 Abex
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
declare namespace net.runelite.api.coords {
	/**
	 * A two-dimensional point in the local coordinate space.
	 * <p>
	 * Local points are immutable, however since the local coordinate space moves,
	 * it is not safe to keep a LocalPoint after a loading zone.
	 * <p>
	 * The unit of a LocalPoint is 1/128th of a tile.
	 */
	export class LocalPoint {
		getX(): number;
		getY(): number;
		getWorldView(): number;

		constructor(x: number, y: number, worldView: WorldView);
		/** @deprecated */
		static fromWorld(client: Client, world: WorldPoint): LocalPoint | null;
		/**
		 * Gets the local coordinate at the center of the passed tile.
		 *
		 * @return coordinate if the tile is in the world view, otherwise null
		 */
		static fromWorld(wv: WorldView, world: WorldPoint): LocalPoint | null;
		/** @deprecated */
		static fromWorld(
			client: Client,
			x: number,
			y: number,
		): LocalPoint | null;
		/**
		 * Gets the local coordinate at the center of the passed tile.
		 *
		 * @param wv     the scene
		 * @param x      x-axis coordinate of the tile
		 * @param y      y-axis coordinate of the tile
		 * @return coordinate if the tile is in the current scene, otherwise null
		 */
		static fromWorld(
			wv: WorldView,
			x: number,
			y: number,
		): LocalPoint | null;
		/**
		 * Gets the local coordinate at the center of the passed tile.
		 *
		 * @param scene  the scene
		 * @param x      x-axis coordinate of the tile
		 * @param y      y-axis coordinate of the tile
		 * @return coordinate if the tile is in the current scene, otherwise null
		 */
		static fromWorld(scene: Scene, x: number, y: number): LocalPoint | null;
		/**
		 * Gets the distance between this point and another.
		 *
		 * @param other other point
		 * @return the distance
		 */
		distanceTo(other: LocalPoint): number;
		/**
		 * Test if this point is in the basic 104x104 tile scene.
		 * @return
		 */
		isInScene(): boolean;
		/**
		 * Gets the coordinate at the center of the passed tile.
		 *
		 * @param x      x-axis coordinate of the tile in Scene coords
		 * @param y      y-axis coordinate of the tile in Scene coords
		 * @return true coordinate of the tile
		 */
		/** @deprecated */
		static fromScene(x: number, y: number): LocalPoint;
		/**
		 * Gets the coordinate at the center of the passed tile.
		 *
		 * @param x      x-axis coordinate of the tile in Scene coords
		 * @param y      y-axis coordinate of the tile in Scene coords
		 * @param scene  scene containing the tile
		 * @return true coordinate of the tile
		 */
		static fromScene(x: number, y: number, scene: Scene): LocalPoint;
		/**
		 * Gets the coordinate at the center of the passed tile.
		 *
		 * @param x      x-axis coordinate of the tile in Scene coords
		 * @param y      y-axis coordinate of the tile in Scene coords
		 * @param wv     wv containing the tile
		 * @return true coordinate of the tile
		 */
		static fromScene(x: number, y: number, wv: WorldView): LocalPoint;
		/**
		 * Gets the x-axis coordinate in scene space (tiles).
		 *
		 * @return x-axis coordinate
		 */
		getSceneX(): number;
		/**
		 * Gets the y-axis coordinate in scene space (tiles).
		 *
		 * @return y-axis coordinate
		 */
		getSceneY(): number;
		dx(dx: number): LocalPoint;
		dy(dy: number): LocalPoint;
		plus(dx: number, dy: number): LocalPoint;
	}
}
