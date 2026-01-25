/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Tomas Slusny <slusnucky@gmail.com>
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
declare namespace net.runelite.client.plugins.objectindicators {
	export class ObjectIndicatorsPlugin extends Plugin {
		provideConfig(configManager: ConfigManager): ObjectIndicatorsConfig;
		private startUp(): void;
		private shutDown(): void;
		onWallObjectSpawned(event: net.runelite.api.events.WallObjectSpawned): void;
		onWallObjectDespawned(event: net.runelite.api.events.WallObjectDespawned): void;
		onGameObjectSpawned(event: net.runelite.api.events.GameObjectSpawned): void;
		onDecorativeObjectSpawned(event: net.runelite.api.events.DecorativeObjectSpawned): void;
		onGameObjectDespawned(event: net.runelite.api.events.GameObjectDespawned): void;
		onDecorativeObjectDespawned(event: net.runelite.api.events.DecorativeObjectDespawned): void;
		onGroundObjectSpawned(event: net.runelite.api.events.GroundObjectSpawned): void;
		onGroundObjectDespawned(event: net.runelite.api.events.GroundObjectDespawned): void;
		private reloadPoints(): void;
		// load points for region
		onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
		// Reload points with new map regions
		onMenuEntryAdded(event: net.runelite.api.events.MenuEntryAdded): void;
		private createTagBorderColorMenu(
			idx: number,
			target: string,
			object: TileObject,
			colorTileObject: java.awt.ColorTileObject,
		): number;
		// add a few default colors
		private createTagFillColorMenu(
			idx: number,
			target: string,
			object: TileObject,
			colorTileObject: java.awt.ColorTileObject,
		): number;
		// add a few default colors
		// default fill color depends on the highlight type. just use a=50 from hull fill.
		private createTagStyleMenu(idx: number, target: string, object: TileObject): number;
		private markObject(entry: MenuEntry): void;
		// object.getId() is always the base object id, getObjectComposition transforms it to
		// the correct object we see
		// Name is probably never "null" - however prevent adding it if it is, as it will
		// become ambiguous as objects with no name are assigned name "null"
		private updateObjectConfig(object: TileObject, c: Consumer<Record<string, any>>): void;
		// rebuild the ColorTileObject from the new config
		private checkObjectPoints(object: TileObject): void;
		// object is under a bridge, which can't be marked anyway
		// Multiloc names are instead checked in the overlay
		// was marked, but name has changed
		private findTileObject(z: number, x: number, y: number, id: number): TileObject;
		private objectIdEquals(tileObject: TileObject, id: number): boolean;
		// Menu action EXAMINE_OBJECT sends the transformed object id, not the base id, unlike
		// all of the GAME_OBJECT_OPTION actions, so check the id against the impostor ids
		/** mark or unmark an object
		 *
		 * @param objectComposition transformed composition of object based on vars
		 * @param name name of objectComposition
		 * @param object tile object, for multilocs object.getId() is the base id
		 */
		private markObject(objectComposition: ObjectComposition, name: string, object: TileObject): void;
		// use the default config values
		private static findObjectPredicate(
			objectComposition: ObjectComposition,
			object: TileObject,
			worldPoint: net.runelite.api.coords.WorldPoint,
		): any;
		// Find the ObjectPoint for the given composition, object, and world point. There are two cases:
		// 1) object is a multiloc, the name may have changed since marking - match from base id
		// 2) not a multiloc, but an object has spawned with an identical name and a different
		//    id as what was originally marked
		private savePoints(id: number, points: Set<ObjectPoint>): void;
		private loadPoints(id: number): Set<ObjectPoint>;
		// Prior to multiloc support the plugin would mark objects named "null", which breaks
		// in most cases due to the specific object being identified being ambiguous, so remove
		// them
		private getObjectComposition(id: number): ObjectComposition | null;
		private getUsedColors(getColor: any): Array<Color>;
	}
}
