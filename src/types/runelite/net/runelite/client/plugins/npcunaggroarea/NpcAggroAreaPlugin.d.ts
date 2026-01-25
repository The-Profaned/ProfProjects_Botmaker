/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Woox <https://github.com/wooxsolo>
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
declare namespace net.runelite.client.plugins.npcunaggroarea {
export class NpcAggroAreaPlugin extends Plugin
{
	/*
How it works: The game remembers 2 tiles. When the player goes >10 steps
away from both tiles, the oldest one is moved to under the player and the
NPC aggression timer resets.
So to first figure out where the 2 tiles are, we wait until the player teleports
a long enough distance. At that point it's very likely that the player
moved out of the radius of both tiles, which resets one of them. The other
should reset shortly after as the player starts moving around.
	*/
	provideConfig(configManager: ConfigManager): NpcAggroAreaConfig;
	private startUp(): void;
	private shutDown(): void;
	private generateSafeArea(): Area;
	private transformWorldToLocal(coords: number[]): void;
	private calculateLinesToDisplay(): void;
	private removeTimer(): void;
	private createTimer(duration: Duration): void;
	private resetTimer(): void;
	private static isInWilderness(location: net.runelite.api.coords.WorldPoint): boolean;
	private isNpcMatch(npc: NPC): boolean;
		// Most NPCs stop aggroing when the player has more than double
		// its combat level.
	private checkAreaNpcs(...npcs: NPC): void;
	private recheckActive(): void;
 // run after slayer plugin so targets has time to populate
	onNpcSpawned(event: net.runelite.api.events.NpcSpawned): void;
	onGameTick(event: net.runelite.api.events.GameTick): void;
				// We don't know where the previous area was, so if the player e.g.
				// entered a dungeon and then goes back out, he/she may enter the previous
				// area which is unknown and would make the plugin inaccurate
			// Player went back to their previous unknown area before the 2nd
			// center point was found, which means we don't know where it is again.
	onConfigChanged(event: ConfigChanged): void;
	shouldDisplayTimer(): boolean;
	private loadConfig(): void;
	private resetConfig(): void;
	private saveConfig(): void;
	private onLogin(): void;
		// If the player isn't at the location he/she logged out at,
		// the safe unaggro area probably changed, and should be disposed.
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
}
}