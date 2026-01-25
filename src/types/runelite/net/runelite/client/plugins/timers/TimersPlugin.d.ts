/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Seth <Sethtroll3@gmail.com>
 * Copyright (c) 2018, Jordan Atwood <jordan.atwood423@gmail.com>
 * Copyright (c) 2019, winterdaze
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
declare namespace net.runelite.client.plugins.timers {
export class TimersPlugin extends Plugin
{
	getConfig(configManager: ConfigManager): TimersConfig;
	startUp(): void;
	private shutDown(): void;
	onVarbitChanged(event: net.runelite.api.events.VarbitChanged): void;
			// staminaEffectActive is checked to match https://github.com/Joshua-F/cs2-scripts/blob/741271f0c3395048c1bad4af7881a13734516adf/scripts/%5Bproc%2Cbuff_bar_get_value%5D.cs2#L25
	onConfigChanged(event: ConfigChanged): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
				// by default the thrall lasts 1 tick per magic level
				// ca tiers being completed boosts this
					// The first wave message of the inferno comes six seconds after the ingame timer starts counting
				// Advance start time by how long it has been paused
	private isInFightCaves(): boolean;
	private isInInferno(): boolean;
	private createTzhaarTimer(): void;
	private removeTzhaarTimer(): void;
	private checkTeleport(varPlayer: number): void;
				// Other var changes are not handled as teleports
	onGameTick(event: net.runelite.api.events.GameTick): void;
			// assume movement means unfrozen
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
				// fall through
				// pause tzhaar timer if logged out without pausing
	onGraphicChanged(event: net.runelite.api.events.GraphicChanged): void;
			// downgrade freeze based on graphic, if at the same tick as the freeze message
	/**
	 * Remove SOTD timer when equipment is changed.
	 */
	onItemContainerChanged(itemContainerChanged: net.runelite.api.events.ItemContainerChanged): void;
			// remove sotd timer if the staff has been unwielded
	onNpcDespawned(npcDespawned: net.runelite.api.events.NpcDespawned): void;
	onActorDeath(actorDeath: net.runelite.api.events.ActorDeath): void;
	private createGameTimer(timer: GameTimer): TimerTimer;
	private createGameTimer(timer: GameTimer, duration: Duration): TimerTimer;
	removeGameTimer(timer: GameTimer): void;
	private createGameIndicator(gameIndicator: GameIndicator): IndicatorIndicator;
	private removeGameIndicator(indicator: GameIndicator): void;
	private updateVarTimer(gameTimer: GameTimer, varValue: number, tickDuration: IntUnaryOperator): void;
	private updateVarTimer(gameTimer: GameTimer, varValue: number, removeTimerCheck: any, tickDuration: IntUnaryOperator): void;
		// Reset the timer when its duration increases in order to allow it to turn red at the correct time even when refreshed early
	private removeVarTimer(gameTimer: GameTimer): void;
}
}