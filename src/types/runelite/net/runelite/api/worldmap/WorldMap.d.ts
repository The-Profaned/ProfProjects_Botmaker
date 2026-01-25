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
declare namespace net.runelite.api.worldmap {
	/**
	 * Represents the World Map
	 */
	export class WorldMap {
		/**
		 * Gets the current position of the local player on the world map.
		 *
		 * @return the world map position
		 */
		getWorldMapPosition(): Point;
		/**
		 * Gets the current zoom level of the world map.
		 *
		 * @return the world map zoon
		 */
		getWorldMapZoom(): number;
		/**
		 * Sets the target position of the world map.
		 *
		 * @param worldPoint the new target position
		 */
		setWorldMapPositionTarget(
			worldPoint: net.runelite.api.coords.WorldPoint,
		): void;
		/**
		 * Gets the world map renderer.
		 *
		 * @return the world map renderer
		 */
		getWorldMapRenderer(): WorldMapRenderer;
		/**
		 * Initializes the world map with the provided data.
		 *
		 * @param worldMapData the new map data
		 */
		initializeWorldMap(worldMapData: WorldMapData): void;
		/**
		 * The data represented by the render.
		 *
		 * @return the map data
		 */
		getWorldMapData(): WorldMapData;
	}
}
