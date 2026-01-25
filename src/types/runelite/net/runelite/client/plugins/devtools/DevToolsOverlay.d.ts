/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Kronos <https://github.com/KronosDesign>
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
declare namespace net.runelite.client.plugins.devtools {
	export class DevToolsOverlay extends Overlay {
		render(graphics: Graphics2D): java.awt.Dimension;
		private renderRoofs(graphics: Graphics2D): void;
		private renderPlayers(graphics: Graphics2D): void;
		private renderNpcs(graphics: Graphics2D): void;
		private renderTileObjects(graphics: Graphics2D): void;
		private renderTileTooltip(graphics: Graphics2D, tile: Tile): void;
		private renderMovementInfo(graphics: Graphics2D, tile: Tile): void;
		private renderGroundItems(graphics: Graphics2D, tile: Tile, player: Player): void;
		private renderGameObjects(graphics: Graphics2D, tile: Tile, player: Player): void;
		private renderTileObject(graphics: Graphics2D, tileObject: TileObject, player: Player, color: java.awt.Color): void;
		private renderDecorObject(graphics: Graphics2D, tile: Tile, player: Player): void;
		private renderProjectiles(graphics: Graphics2D): void;
		private renderGraphicsObjects(graphics: Graphics2D): void;
	}
}
