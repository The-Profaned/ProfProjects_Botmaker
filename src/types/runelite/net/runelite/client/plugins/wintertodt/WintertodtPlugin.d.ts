/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, terminatusx <jbfleischman@gmail.com>
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
 * Copyright (c) 2020, loldudester <HannahRyanster@gmail.com>
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
declare namespace net.runelite.client.plugins.wintertodt {
export class WintertodtPlugin extends Plugin
{
	getConfig(configManager: ConfigManager): WintertodtConfig;
	private startUp(): void;
	private shutDown(): void;
	private reset(): void;
	private isInWintertodtRegion(): boolean;
	onGameTick(gameTick: net.runelite.api.events.GameTick): void;
	onVarbitChanged(varbitChanged: net.runelite.api.events.VarbitChanged): void;
			// Sometimes wt var updates are sent to players even after leaving wt.
			// So only notify if in wt or after just having left.
	private checkActionTimeout(): void;
	onChatMessage(chatMessage: net.runelite.api.events.ChatMessage): void;
				// Recolor message for damage notification
				// all actions except woodcutting and idle are interrupted from damage
	private notifyInterrupted(interruptType: WintertodtInterruptType, wasActivityInterrupted: boolean): void;
	onAnimationChanged(event: net.runelite.api.events.AnimationChanged): void;
	onItemContainerChanged(event: net.runelite.api.events.ItemContainerChanged): void;
		//If we're currently fletching but there are no more logs, go ahead and abort fletching immediately
		//Otherwise, if we're currently feeding the brazier but we've run out of both logs and kindling, abort the feeding activity
	private setActivity(action: WintertodtActivity): void;
	private static getPoints(id: number): number;
	private static getPotentialPoints(id: number): number;
}
}