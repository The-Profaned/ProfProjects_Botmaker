/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins.menuentryswapper {
	export class MenuEntrySwapperConfig extends Config {
		ArdougneCloakMode: {
			WEAR: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			MONASTERY: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			FARM: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
		};
		KaramjaGlovesMode: {
			WEAR: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			GEM_MINE: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			DURADEL: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
		};
		MorytaniaLegsMode: {
			WEAR: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			ECTOFUNTUS: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			BURGH_DE_ROTT: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
		};
		RadasBlessingMode: {
			EQUIP: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			KOUREND_WOODLAND: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			MOUNT_KARUULM: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
		};
		DesertAmuletMode: {
			WEAR: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			NARDAH: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			KALPHITE_CAVE: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
		};
		leftClickCustomization(): boolean;
		shiftClickCustomization(): boolean;
		objectCustomization(): boolean;
		objectShiftClickWalkHere(): boolean;
		npcCustomization(): boolean;
		npcShiftClickWalkHere(): boolean;
		swapAdmire(): boolean;
		swapAssignment(): boolean;
		swapBank(): boolean;
		swapBirdhouseEmpty(): boolean;
		swapBones(): boolean;
		swapHerbs(): boolean;
		swapChase(): boolean;
		swapExchange(): boolean;
		swapFairyRing(): FairyRingMode;
		swapHarpoon(): boolean;
		swapBait(): boolean;
		swapHelp(): boolean;
		swapHomePortal(): HouseMode;
		swapPay(): boolean;
		swapJewelleryBox(): boolean;
		swapPortalNexus(): boolean;
		swapPrivate(): boolean;
		swapPick(): boolean;
		swapQuick(): boolean;
		swapBoxTrap(): boolean;
		swapTeleportItem(): boolean;
		teleportSubmenus(): boolean;
		swapTeleToPoh(): boolean;
		swapKaramjaGlovesMode(): KaramjaGlovesMode;
		swapArdougneCloakMode(): ArdougneCloakMode;
		swapRadasBlessingMode(): RadasBlessingMode;
		swapMorytaniaLegsMode(): MorytaniaLegsMode;
		swapDesertAmuletMode(): DesertAmuletMode;
		swapAbyssTeleport(): boolean;
		swapTrade(): boolean;
		swapTravel(): boolean;
		swapGEItemCollect(): GEItemCollectMode;
		swapGEAbort(): boolean;
		bankWithdrawShiftClick(): ShiftWithdrawMode;
		bankDepositShiftClick(): ShiftDepositMode;
		shopBuy(): BuyMode;
		shopSell(): SellMode;
		swapEssenceMineTeleport(): boolean;
		swapTan(): boolean;
		swapDepositItems(): boolean;
		StairsMode: {
			CLIMB: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			CLIMB_UP: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
			CLIMB_DOWN: {
				/** CAUTION - NOT PERFECTLY TYPED YET */
				getId(): number;
				toString(): string;
			};
		};
		swapStairsLeftClick(): StairsMode;
		swapStairsShiftClick(): StairsMode;
		swapTemporossLeave(): boolean;
		removeDeadNpcMenus(): boolean;
		groundItemShiftClickWalkHere(): boolean;
	}
}
