/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
 * Copyright (c) 2020, Alexsuperfly <alexsuperfly@users.noreply.github.com>
 * Copyright (c) 2020, Psikoi <https://github.com/psikoi>
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
declare namespace net.runelite.client.plugins.xpupdater {
export class XpUpdaterPlugin extends Plugin
{
	/**
	 * Amount of EXP that must be gained for an update to be submitted.
	 */
	getConfig(configManager: ConfigManager): XpUpdaterConfig;
	private startUp(): void;
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
			// Don't submit update unless xp threshold is reached
	onGameTick(gameTick: net.runelite.api.events.GameTick): void;
	private update(accountHash: number, username: string): void;
	private updateCml(username: string, worldTypes: EnumSet<WorldType>): void;
	private updateRunetracker(username: string, worldTypes: EnumSet<WorldType>): void;
	private updateTempleosrs(accountHash: number, username: string, worldTypes: EnumSet<WorldType>): void;
	private updateWom(accountHash: number, username: string, worldTypes: EnumSet<WorldType>): void;
	private sendRequest(platform: string, request: Request): void;
}
}