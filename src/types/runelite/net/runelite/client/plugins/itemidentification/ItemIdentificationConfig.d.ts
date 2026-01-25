/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2019, Hydrox6 <ikada@protonmail.ch>
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
declare namespace net.runelite.client.plugins.itemidentification {
	export class ItemIdentificationConfig extends Config {
		identificationType(): ItemIdentificationMode;
		textColor(): java.awt.Color;
		showHerbSeeds(): boolean;
		showAllotmentSeeds(): boolean;
		showFlowerSeeds(): boolean;
		showFruitTreeSeeds(): boolean;
		showTreeSeeds(): boolean;
		showSpecialSeeds(): boolean;
		showBerrySeeds(): boolean;
		showHopsSeeds(): boolean;
		showSacks(): boolean;
		showHerbs(): boolean;
		showLogs(): boolean;
		showPyreLogs(): boolean;
		showPlanks(): boolean;
		showSaplings(): boolean;
		showComposts(): boolean;
		showOres(): boolean;
		showBars(): boolean;
		showGems(): boolean;
		showPotions(): boolean;
		showImplingJars(): boolean;
		showTablets(): boolean;
		showTeleportScrolls(): boolean;
		showJewellery(): boolean;
		showEnchantedJewellery(): boolean;
	}
}
