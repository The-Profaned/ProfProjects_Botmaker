/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Infinitay <https://github.com/Infinitay>
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
declare namespace net.runelite.client.plugins.kingdomofmiscellania {
export class KingdomPlugin extends Plugin
{
	private shutDown(): void;
	getConfig(configManager: ConfigManager): KingdomConfig;
	onVarbitChanged(event: net.runelite.api.events.VarbitChanged): void;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
	onGameTick(gameTick: net.runelite.api.events.GameTick): void;
	private processInfobox(): void;
	private createNotification(): void;
	private addKingdomInfobox(): void;
	private removeKingdomInfobox(): void;
	private estimateCoffer(lastChanged: Instant, lastCoffer: number): number;
	private estimateApproval(lastChanged: Instant, lastApproval: number): number;
	private static getNumbersOfDaysPassed(lastChanged: Instant): number;
	private isInKingdom(): boolean;
	private isThroneOfMiscellaniaCompleted(): boolean;
	private isRoyalTroubleCompleted(): boolean;
	static getApprovalPercent(approval: number): number;
	private sendChatMessage(chatMessage: string): void;
	private getLastChanged(): Instant;
	private setLastChanged(lastChanged: Instant): void;
	getCoffer(): number;
	private setCoffer(coffer: number): void;
	getApproval(): number;
	private setApproval(approval: number): void;
}
}