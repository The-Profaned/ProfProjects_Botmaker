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
	 * A three-dimensional point representing the coordinate of a Tile.
	 * <p>
	 * WorldPoints are immutable. Methods that modify the properties create a new
	 * instance.
	 */
	export class WorldPoint {
		constructor(x: number, y: number, plane: number);

		equals(worldPoint: WorldPoint): boolean;
		/**
		 * X-axis coordinate.
		 */
		getX(): number;
		/**
		 * Y-axis coordinate.
		 */
		getY(): number;
		/**
		 * The plane level of the Tile, also referred as z-axis coordinate.
		 */
		getPlane(): number;
		/**
		 * Offsets the x-axis coordinate by the passed value.
		 *
		 * @param dx the offset
		 * @return new instance
		 */
		dx(dx: number): WorldPoint;
		/**
		 * Offsets the y-axis coordinate by the passed value.
		 *
		 * @param dy the offset
		 * @return new instance
		 */
		dy(dy: number): WorldPoint;
		/**
		 * Offsets the plane by the passed value.
		 *
		 * @param dz the offset
		 * @return new instance
		 */
		dz(dz: number): WorldPoint;
		/**
		 * Checks whether a tile is located in the current scene.
		 *
		 * @param scene the scene
		 * @param x the tiles x coordinate
		 * @param y the tiles y coordinate
		 * @return true if the tile is in the scene, false otherwise
		 */
		static isInScene(scene: Scene, x: number, y: number): boolean;
		/**
		 * Checks whether a tile is located in the current scene.
		 *
		 * @param client the client
		 * @param x the tiles x coordinate
		 * @param y the tiles y coordinate
		 * @return true if the tile is in the scene, false otherwise
		 */
		/** @deprecated */
		static isInScene(client: Client, x: number, y: number): boolean;
		/**
		 * Checks whether a tile is located in the current scene.
		 *
		 * @param wv the client
		 * @param x the tiles x coordinate
		 * @param y the tiles y coordinate
		 * @return true if the tile is in the scene, false otherwise
		 */
		static isInScene(wv: WorldView, x: number, y: number): boolean;
		/**
		 * Checks whether this tile is located in the current scene.
		 *
		 * @param client the client
		 * @return true if this tile is in the scene, false otherwise
		 */
		/** @deprecated */
		isInScene(client: Client): boolean;
		/**
		 * Gets the coordinate of the tile that contains the passed local point.
		 *
		 * @param client the client
		 * @param local the local coordinate
		 * @return the tile coordinate containing the local point
		 */
		static fromLocal(client: Client, local: LocalPoint): WorldPoint;
		/**
		 * Gets the coordinate of the tile that contains the passed local point.
		 *
		 * @param wv the scene
		 * @param x the local x-axis coordinate
		 * @param y the local x-axis coordinate
		 * @param plane the plane
		 * @return the tile coordinate containing the local point
		 */
		static fromLocal(wv: WorldView, x: number, y: number, plane: number): WorldPoint;
		/**
		 * Gets the coordinate of the tile that contains the passed local point.
		 *
		 * @param scene the scene
		 * @param x the local x-axis coordinate
		 * @param y the local x-axis coordinate
		 * @param plane the plane
		 * @return the tile coordinate containing the local point
		 */
		static fromLocal(scene: Scene, x: number, y: number, plane: number): WorldPoint;
		/**
		 * Gets the coordinate of the tile that contains the passed local point.
		 *
		 * @param client the client
		 * @param x the local x-axis coordinate
		 * @param y the local x-axis coordinate
		 * @param plane the plane
		 * @return the tile coordinate containing the local point
		 */
		/** @deprecated */
		static fromLocal(client: Client, x: number, y: number, plane: number): WorldPoint;
		/**
		 * Gets the coordinate of the tile that contains the passed local point,
		 * accounting for instances.
		 *
		 * @param client the client
		 * @param localPoint the local coordinate
		 * @return the tile coordinate containing the local point
		 */
		static fromLocalInstance(client: Client, localPoint: LocalPoint): WorldPoint;
		/**
		 * Gets the coordinate of the tile that contains the passed local point,
		 * accounting for instances.
		 *
		 * @param client the client
		 * @param localPoint the local coordinate
		 * @param plane the plane the localpoint is on
		 * @return the tile coordinate containing the local point
		 */
		static fromLocalInstance(client: Client, localPoint: LocalPoint, plane: number): WorldPoint;
		/**
		 * Gets the coordinate of the tile that contains the passed local point,
		 * accounting for instances.
		 *
		 * @param scene      the scene
		 * @param localPoint the local coordinate
		 * @param plane      the plane for the returned point, if it is not an instance
		 * @return the tile coordinate containing the local point
		 */
		static fromLocalInstance(scene: Scene, localPoint: LocalPoint, plane: number): WorldPoint;
		private static fromLocalInstance(
			instanceTemplateChunks: number[][][],
			localPoint: LocalPoint,
			plane: number,
		): WorldPoint;
		// get position in the scene
		// get chunk from scene
		// get the template chunk for the chunk
		// calculate world point of the template
		// create and rotate point back to 0, to match with template
		/**
		 * Get occurrences of a tile on the scene, accounting for instances. There may be
		 * more than one if the same template chunk occurs more than once on the scene.
		 */
		/** @deprecated */
		static toLocalInstance(client: Client, worldPoint: WorldPoint): Collection<WorldPoint>;
		/**
		 * Get occurrences of a tile on the scene, accounting for instances. There may be
		 * more than one if the same template chunk occurs more than once on the scene.
		 */
		static toLocalInstance(wv: WorldView, worldPoint: WorldPoint): Collection<WorldPoint>;
		/**
		 * Get occurrences of a tile on the scene, accounting for instances. There may be
		 * more than one if the same template chunk occurs more than once on the scene.
		 */
		static toLocalInstance(scene: Scene, worldPoint: WorldPoint): Collection<WorldPoint>;
		private static toLocalInstance(
			instanceTemplateChunks: number[][][],
			baseX: number,
			baseY: number,
			worldPoint: WorldPoint,
		): Collection<WorldPoint>;
		// find instance chunks using the template point. there might be more than one.
		/**
		 * Rotate the coordinates in the chunk according to chunk rotation
		 *
		 * @param point point
		 * @param rotation rotation
		 * @return world point
		 */
		private static rotate(point: WorldPoint, rotation: number): WorldPoint;
		/**
		 * Gets the shortest distance from this point to a WorldArea.
		 *
		 * @param other the world area
		 * @return the shortest distance
		 */
		distanceTo(other: WorldArea): number;
		/**
		 * Gets the distance between this point and another.
		 * <p>
		 * If the other point is not on the same plane, this method will return
		 * {@link Integer#MAX_VALUE}. If ignoring the plane is wanted, use the
		 * {@link #distanceTo2D(WorldPoint)} method.
		 *
		 * @param other other point
		 * @return the distance
		 */
		distanceTo(other: WorldPoint): number;
		/**
		 * Find the distance from this point to another point.
		 * <p>
		 * This method disregards the plane value of the two tiles and returns
		 * the simple distance between the X-Z coordinate pairs.
		 *
		 * @param other other point
		 * @return the distance
		 */
		distanceTo2D(other: WorldPoint): number;
		/** @deprecated */
		static fromScene(client: Client, x: number, y: number, plane: number): WorldPoint;
		/**
		 * Converts the passed scene coordinates to a world space
		 */
		static fromScene(wv: WorldView, x: number, y: number, plane: number): WorldPoint;
		/**
		 * Converts the passed scene coordinates to a world space
		 */
		static fromScene(scene: Scene, x: number, y: number, plane: number): WorldPoint;
		/**
		 * Gets the ID of the region containing this tile.
		 *
		 * @return the region ID
		 */
		getRegionID(): number;
		/**
		 * Converts the passed region ID and coordinates to a world coordinate
		 */
		static fromRegion(regionId: number, regionX: number, regionY: number, plane: number): WorldPoint;
		/**
		 * Gets the X-axis coordinate of the region coordinate
		 */
		getRegionX(): number;
		/**
		 * Gets the Y-axis coordinate of the region coordinate
		 */
		getRegionY(): number;
		private static getRegionOffset(position: number): number;
		/**
		 * Translate a coordinate either between overworld and real, or real and overworld
		 *
		 * @param worldPoint
		 * @param toOverworld whether to convert to overworld coordinates, or to real coordinates
		 * @return
		 */
		static getMirrorPoint(worldPoint: WorldPoint, toOverworld: boolean): WorldPoint;
		// Test against what we are converting from
		/**
		 * Checks whether this tile is located within any of the given areas.
		 *
		 * @param worldAreas areas to check within
		 * @return {@code true} if any area contains this point, {@code false} otherwise.
		 */
		isInArea(...worldAreas: WorldArea): boolean;
		/**
		 * Checks whether this tile is located within any of the given areas, disregarding any plane differences.
		 *
		 * @param worldAreas areas to check within
		 * @return {@code true} if any area contains this point, {@code false} otherwise.
		 */
		isInArea2D(...worldAreas: WorldArea): boolean;
		/**
		 * Retrieves an area consisting of only this point.
		 *
		 * @return A {@link WorldArea} of width and height 1, encompassing only this point.
		 */
		toWorldArea(): WorldArea;
		/**
		 * Create a WorldPoint from a packed Jagex coordinate
		 */
		static fromCoord(c: number): WorldPoint;
	}
}
