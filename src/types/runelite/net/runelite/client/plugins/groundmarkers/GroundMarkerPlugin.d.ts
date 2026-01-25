/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, TheLonelyDev <https://github.com/TheLonelyDev>
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
declare namespace net.runelite.client.plugins.groundmarkers {
	export class GroundMarkerPlugin extends Plugin {
		savePoints(regionId: number, points: Collection<GroundMarkerPoint>): void;
		getPoints(regionId: number): Collection<GroundMarkerPoint>;
		// CHECKSTYLE:OFF
		// CHECKSTYLE:ON
		provideConfig(configManager: ConfigManager): GroundMarkerConfig;
		loadPoints(): void;
		// load points for region
		/**
		 * Translate a collection of ground marker points to color tile markers, accounting for instances
		 *
		 * @param points {@link GroundMarkerPoint}s to be converted to {@link ColorTileMarker}s
		 * @return A collection of color tile markers, converted from the passed ground marker points, accounting for local
		 *         instance points. See {@link WorldPoint#toLocalInstance(Client, WorldPoint)}
		 */
		private translateToColorTileMarker(points: Collection<GroundMarkerPoint>): Collection<ColorTileMarker>;
		startUp(): void;
		shutDown(): void;
		onProfileChanged(profileChanged: ProfileChanged): void;
		onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
		// map region has just been updated
		onMenuEntryAdded(event: net.runelite.api.events.MenuEntryAdded): void;
		onConfigChanged(event: ConfigChanged): void;
		private markTile(localPoint: net.runelite.api.coords.LocalPoint): void;
		private labelTile(existing: GroundMarkerPoint): void;
		private colorTile(existing: GroundMarkerPoint, newColor: java.awt.Color): void;
	}
}
