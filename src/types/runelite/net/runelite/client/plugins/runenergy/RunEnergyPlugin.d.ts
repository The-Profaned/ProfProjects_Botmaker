/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Sean Dewar <https://github.com/seandewar>
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
declare namespace net.runelite.client.plugins.runenergy {
	export class RunEnergyPlugin extends Plugin {
		static GracefulEquipmentSlot =
			{
				HEAD = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				BODY = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				LEGS = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				GLOVES = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				BOOTS = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				// Agility skill capes and the non-cosmetic Max capes also count for the Graceful set effect
				CAPE = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				int = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				int = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				Set = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
				GracefulEquipmentSlot = {
					/** CAUTION - NOT PERFECTLY TYPED YET */
					getId(): number { return 0; },
					toString(): string { return ""; }
				},
			}
		// Full set grants an extra 10% boost to recovery rate
		// number of charges for roe passive effect
		getConfig(configManager: ConfigManager): RunEnergyConfig;
		private startUp(): void;
		private shutDown(): void;
		getRingOfEnduranceCharges(): number;
		setRingOfEnduranceCharges(charges: number): void;
		isRingOfEnduranceEquipped(): boolean;
		onGameTick(event: net.runelite.api.events.GameTick): void;
		onScriptPostFired(scriptPostFired: net.runelite.api.events.ScriptPostFired): void;
		onConfigChanged(event: ConfigChanged): void;
		onChatMessage(event: net.runelite.api.events.ChatMessage): void;
		// subtract the used charge
		onScriptCallbackEvent(event: net.runelite.api.events.ScriptCallbackEvent): void;
		// ROE uncharge uses the same script as destroy
		private setRunOrbText(text: string): void;
		private resetRunOrbText(): void;
		getEstimatedRunTimeRemaining(inSeconds: boolean): string;
		// Calculate the amount of energy lost every tick.
		// Negative weight has the same depletion effect as 0 kg. >64kg counts as 64kg.
		// 100% energy is 10000 energy units
		// Math.ceil is correct here - only need 1 energy unit to run
		// Return the text
		private getGracefulRecoveryBoost(): number;
		getEstimatedRecoverTimeRemaining(): number;
		// Calculate the amount of energy recovered every second
		// Calculate the number of seconds left
		private checkDestroyWidget(): void;
	}
}