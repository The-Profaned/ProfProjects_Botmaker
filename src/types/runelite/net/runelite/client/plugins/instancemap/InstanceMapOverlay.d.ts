/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
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
declare namespace net.runelite.client.plugins.instancemap {
	export class InstanceMapOverlay extends Overlay {
		/**
		 * The size of tiles on the map. The way the client renders requires
		 * this value to be 4. Changing this will break the method for rendering
		 * complex tiles
		 */
		/**
		 * The size of the player's position marker on the map
		 */
		/**
		 * The plane to render on the instance map. When the map is opened this
		 * defaults to the current plane. The ascend and descend buttons raise
		 * and lower this This is used to render parts of an instance below or
		 * above the local player's current plane.
		 */
		/**
		 * Saved image of the scene, no reason to draw the whole thing every
		 * frame.
		 */
		isMapShown(): boolean;
		/**
		 * Setter for showing the map. When the map is set to show, the map is
		 * re-rendered
		 *
		 * @param show Whether or not the map should be shown.
		 */
		setShowMap(show: boolean): void;
		//When we open the map show the current plane
		/**
		 * Increases the viewed plane. The maximum viewedPlane is 3
		 */
		onAscend(): void;
		/**
		 * Decreases the viewed plane. The minimum viewedPlane is 0
		 */
		onDescend(): void;
		render(graphics: Graphics2D): java.awt.Dimension;
		// avoid locking on fast path by creating a local ref
		// larger instance map doesn't fit on fixed mode, so reduce to 104x104
		/**
		 * Draws the players position as a dot on the map.
		 *
		 * @param graphics graphics to be drawn to
		 */
		private drawPlayerDot(
			graphics: Graphics2D,
			player: Player,
			dotColor: java.awt.Color,
			outlineColor: java.awt.Color,
			expandedChunks: number,
		): void;
		/**
		 * Handles game state changes and re-draws the map
		 *
		 * @param event The game state change event
		 */
		onGameStateChange(event: net.runelite.api.events.GameStateChanged): void;
		private static minimapToBufferedImage(spritePixels: SpritePixels, expandedChunks: number): BufferedImage;
		private getCloseButtonImage(): BufferedImage | null;
		private getCloseButtonHoveredImage(): BufferedImage | null;
	}
}
