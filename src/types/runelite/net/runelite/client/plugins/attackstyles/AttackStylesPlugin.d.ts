/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, honeyhoney <https://github.com/honeyhoney>
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
declare namespace net.runelite.client.plugins.attackstyles {
export class AttackStylesPlugin extends Plugin
{
	// Weapon type, component, hidden
	provideConfig(configManager: ConfigManager): AttackStylesConfig;
	private startUp(): void;
	private shutDown(): void;
	getAttackStyle(): AttackStyle | null;
	isWarnedSkillSelected(): boolean;
	onScriptPostFired(scriptPostFired: net.runelite.api.events.ScriptPostFired): void;
	/**
	 * Hide or unhide widgets depending on widgetsToHide
	 */
	private processWidgets(): void;
	onVarbitChanged(event: net.runelite.api.events.VarbitChanged): void;
			// this is required because the widgets need to be hidden prior to interface tick, which is soon after this,
			// and before the client tick event.
	onConfigChanged(event: ConfigChanged): void;
	onGameTick(gameTick: net.runelite.api.events.GameTick): void;
	private resetWarnings(): void;
	private updateAttackStyle(equippedWeaponType: number, attackStyleIndex: number, castingMode: number): void;
			// from script4525
			// Even though the client has 5 attack styles for Staffs, only attack styles 0-4 are used, with an additional
			// casting mode set for defensive casting
	private getWeaponTypeStyles(weaponType: number): AttackStyle[];
		// from script4525
				// "Other" is used for no style
			// "Defensive" is used for Defensive and also Defensive casting
	private updateWarnedSkills(enabled: boolean, skill: Skill): void;
	// update the 'warned skill selected' flag and also rebuild the hide widgets table
	private updateWarning(): void;
	private updateWidgetsToHide(enabled: boolean): void;
		// Iterate over attack styles
			// Remove appropriate combat option
					// Magic staves defensive casting mode
	private static hideWidget(widget: net.runelite.api.widgets.Widget, hidden: boolean): void;
	getWarnedSkills(): Set<Skill>;
	getHiddenWidgets(): Table<Integer, Integer, Boolean>;
}
}