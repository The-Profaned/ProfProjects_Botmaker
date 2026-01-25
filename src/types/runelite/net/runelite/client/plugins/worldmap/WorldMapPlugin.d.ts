/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Morgan Lewis <https://github.com/MESLewis>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.client.plugins.worldmap {
export class WorldMapPlugin extends Plugin
{
		// Original size of world map icons
		//A size of 17 gives us a buffer when triggering tooltips
		// Quest icons are a bit bigger than regular icons
		// A size of 25 aligns the quest icons when converting the world map point to pixel coordinates
		// The new quest icons must be offset by 5, for a size of 25, to align when drawing on top of the original icon
	provideConfig(configManager: ConfigManager): WorldMapConfig;
	private startUp(): void;
	private shutDown(): void;
	onConfigChanged(event: ConfigChanged): void;
	onStatChanged(statChanged: net.runelite.api.events.StatChanged): void;
	onScriptPostFired(scriptPostFired: net.runelite.api.events.ScriptPostFired): void;
			// this is called whenever the map is opened or the map is changed
	onClientTick(clientTick: net.runelite.api.events.ClientTick): void;
		// the world map renderer, which contains the regions with the icons, doesn't load
		// its data until it is rendered
			// this relies on the code in Hooks to reinitialize the map after is closed to avoid
			// running after the map is closed
		// WorldMapRenderer only loads icons that are visible, so lazy load the quest start locations by checking
		// what icons are loaded each tick.
								// rfd subquests all have the same map element
							// our quest ids are actually dbrow ids
	private updateAgilityIcons(): void;
	private updateAgilityCourseIcons(): void;
	private updateRareTreeIcons(): void;
	private updateShownIcons(): void;
	private updateQuestStartPointIcons(): void;
		// quest points are lazy loaded in the client tick event
	private createQuestStartPoint(quest: Quest, worldMapIcon: net.runelite.api.worldmap.WorldMapIcon): MapPoint;
	private static isType(type: MapPoint.Type): any;
}
}