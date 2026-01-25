/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018 Hydrox6 <ikada@protonmail.ch>
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
declare namespace net.runelite.client.plugins.poison {
export class PoisonPlugin extends Plugin
{
	getConfig(configManager: ConfigManager): PoisonConfig;
	private startUp(): void;
	private shutDown(): void;
	onVarbitChanged(event: net.runelite.api.events.VarbitChanged): void;
	onConfigChanged(event: ConfigChanged): void;
	private static nextDamage(poisonValue: number): number;
			//Venom Damage starts at 6, and increments in twos;
			//The VarPlayer increments in values of 1, however.
			//Venom Damage caps at 20, but the VarPlayer keeps increasing
	private getSplat(id: number, damage: number): BufferedImage;
		//Get a copy of the hitsplat to get a clean one each time
		// Align the text in the centre of the hitsplat
	private static getFormattedTime(endTime: Instant): string;
	createTooltip(): string;
	private checkHealthIcon(): void;
		// Only update sprites when the heart icon actually changes
	private resetHealthIcon(): void;
}
}