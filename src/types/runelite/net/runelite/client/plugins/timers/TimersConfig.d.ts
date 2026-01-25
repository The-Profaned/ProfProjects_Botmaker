/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Seth <Sethtroll3@gmail.com>
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
	export class TimersConfig extends Config {
		showHomeMinigameTeleports(): boolean;
		showAntiPoison(): boolean;
		showAntiFire(): boolean;
		showStamina(): boolean;
		showOverload(): boolean;
		showLiquidAdrenaline(): boolean;
		showMenaphiteRemedy(): boolean;
		showSilkDressing(): boolean;
		showBlessedCrystalScarab(): boolean;
		showPrayerEnhance(): boolean;
		showDivine(): boolean;
		showCannon(): boolean;
		showMagicImbue(): boolean;
		showCharge(): boolean;
		showImbuedHeart(): boolean;
		showVengeance(): boolean;
		showVengeanceActive(): boolean;
		showHealGroup(): boolean;
		showTeleblock(): boolean;
		showFreezes(): boolean;
		showGodWarsAltar(): boolean;
		showTzhaarTimers(): boolean;
		tzhaarStartTime(): Instant;
		tzhaarStartTime(tzhaarStartTime: Instant): void;
		tzhaarLastTime(): Instant;
		tzhaarLastTime(tzhaarLastTime: Instant): void;
		showStaffOfTheDead(): boolean;
		showAbyssalSireStun(): boolean;
		showDFSSpecial(): boolean;
		showArceuus(): boolean;
		showArceuusCooldown(): boolean;
		showPickpocketStun(): boolean;
		showFarmersAffinity(): boolean;
		showSpellbookSwap(): boolean;
	}
}
