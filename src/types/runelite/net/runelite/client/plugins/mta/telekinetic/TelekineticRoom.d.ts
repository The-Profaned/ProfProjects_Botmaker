/// <reference path="../../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Jasper Ketelaar <Jasper0781@gmail.com>
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
declare namespace net.runelite.client.plugins.mta.telekinetic {
	export class TelekineticRoom extends MTARoom {
		resetRoom(): void;
		onWallObjectSpawned(
			event: net.runelite.api.events.WallObjectSpawned,
		): void;
		onGameStateChanged(
			event: net.runelite.api.events.GameStateChanged,
		): void;
		// Game objects are nulled when loading new scenes, thus never trigger their respective
		// ObjectDespawned events.
		onGroundObjectSpawned(
			event: net.runelite.api.events.GroundObjectSpawned,
		): void;
		onGameTick(event: net.runelite.api.events.GameTick): void;
		//Prevent unnecessary updating when the guardian has not moved
		onNpcSpawned(event: net.runelite.api.events.NpcSpawned): void;
		onNpcDespawned(event: net.runelite.api.events.NpcDespawned): void;
		inside(): boolean;
		under(graphics2D: Graphics2D): void;
		private optimal(): net.runelite.api.coords.WorldPoint;
		private static manhattan(
			point1: net.runelite.api.coords.WorldPoint,
			point2: net.runelite.api.coords.WorldPoint,
		): number;
		private nearest(
			area: net.runelite.api.coords.WorldArea,
			worldPoint: net.runelite.api.coords.WorldPoint,
		): net.runelite.api.coords.WorldPoint;
		private renderWorldPoint(
			graphics: Graphics2D,
			worldPoint: net.runelite.api.coords.WorldPoint,
		): void;
		private renderLocalPoint(
			graphics: Graphics2D,
			local: net.runelite.api.coords.LocalPoint,
		): void;
		private build(): Stack<Direction>;
		private getGuardianDestination(): net.runelite.api.coords.LocalPoint;
		private build(
			start: net.runelite.api.coords.WorldPoint,
		): Stack<Direction>;
		private build(
			edges: Record<WorldPoint, WorldPoint>,
			finish: net.runelite.api.coords.WorldPoint,
		): Stack<Direction>;
		private neighbours(
			point: net.runelite.api.coords.LocalPoint,
		): net.runelite.api.coords.LocalPoint[];
		private neighbour(
			point: net.runelite.api.coords.LocalPoint,
			direction: net.runelite.api.coords.Direction,
		): net.runelite.api.coords.LocalPoint;
		private getBounds(walls: WallObject[]): Rectangle;
		private getPosition(): net.runelite.api.coords.Direction;
		private getIndicatorLine(
			direction: net.runelite.api.coords.Direction,
		): net.runelite.api.coords.WorldArea;
	}
}
