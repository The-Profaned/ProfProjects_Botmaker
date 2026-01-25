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
	 * Represents a tile in the game.
	 */
	export class Tile {
		/**
		 * Gets the decoration on the tile.
		 *
		 * @return the tile decoration
		 */
		getDecorativeObject(): DecorativeObject;
		/**
		 * Gets all game objects on the tile.
		 *
		 * @return the game objects
		 */
		getGameObjects(): GameObject[];
		/**
		 * Gets the items held on this tile.
		 *
		 * @return the item
		 */
		getItemLayer(): ItemLayer;
		/**
		 * Gets the object on the ground layer of the tile.
		 *
		 * @return the ground object
		 */
		getGroundObject(): GroundObject;
		/**
		 * Sets the object on the ground layer of the tile.
		 *
		 * @param groundObject the ground object
		 */
		setGroundObject(groundObject: GroundObject): void;
		/**
		 * Gets the wall of the tile.
		 *
		 * @return the wall object
		 */
		getWallObject(): WallObject;
		/**
		 * Gets the scene paint of the tile.
		 *
		 * @return the paint
		 */
		getSceneTilePaint(): SceneTilePaint;
		/**
		 * Gets the model of the tile in the scene.
		 *
		 * @return the tile model
		 */
		getSceneTileModel(): SceneTileModel;
		/**
		 * Gets the location coordinate of the tile in the world.
		 *
		 * @return the world location
		 */
		getWorldLocation(): net.runelite.api.coords.WorldPoint;
		/**
		 * Gets the location coordinate of the tile in scene coords
		 *
		 * @return the scene location
		 */
		getSceneLocation(): Point;
		/**
		 * Gets the local coordinate of the tile.
		 *
		 * @return the local location
		 */
		getLocalLocation(): net.runelite.api.coords.LocalPoint;
		/**
		 * Gets the plane that this tile is on.
		 *
		 * @return the plane
		 */
		getPlane(): number;
		/**
		 * Get the plane this tile is rendered on, which is where the tile heights are from.
		 *
		 * @return
		 */
		getRenderLevel(): number;
		/**
		 * Get all the ground items for this tile
		 *
		 * @return the ground items
		 */
		getGroundItems(): Array<TileItem>;
		/**
		 * Return the tile under this one, if this tile is a bridge
		 *
		 * @return
		 */
		getBridge(): Tile;
	}
}
