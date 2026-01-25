/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.api {
	/**
	 * An enumeration of prayers.
	 */
	export class Prayer {
		/**
		 * Thick Skin (Level 1, Defence).
		 */
		static THICK_SKIN: Prayer;
		/**
		 * Burst of Strength (Level 4, Strength).
		 */
		static BURST_OF_STRENGTH: Prayer;
		/**
		 * Clarity of Thought (Level 7, Attack).
		 */
		static CLARITY_OF_THOUGHT: Prayer;
		/**
		 * Sharp Eye (Level 8, Ranging).
		 */
		static SHARP_EYE: Prayer;
		/**
		 * Mystic Will (Level 9, Magic).
		 */
		static MYSTIC_WILL: Prayer;
		/**
		 * Rock Skin (Level 10, Defence).
		 */
		static ROCK_SKIN: Prayer;
		/**
		 * Superhuman Strength (Level 13, Strength).
		 */
		static SUPERHUMAN_STRENGTH: Prayer;
		/**
		 * Improved Reflexes (Level 16, Attack).
		 */
		static IMPROVED_REFLEXES: Prayer;
		/**
		 * Rapid Restore (Level 19, Stats).
		 */
		static RAPID_RESTORE: Prayer;
		/**
		 * Rapid Heal (Level 22, Hitpoints).
		 */
		static RAPID_HEAL: Prayer;
		/**
		 * Protect Item (Level 25).
		 */
		static PROTECT_ITEM: Prayer;
		/**
		 * Hawk Eye (Level 26, Ranging).
		 */
		static HAWK_EYE: Prayer;
		/**
		 * Mystic Lore (Level 27, Magic).
		 */
		static MYSTIC_LORE: Prayer;
		/**
		 * Steel Skin (Level 28, Defence).
		 */
		static STEEL_SKIN: Prayer;
		/**
		 * Ultimate Strength (Level 31, Strength).
		 */
		static ULTIMATE_STRENGTH: Prayer;
		/**
		 * Incredible Reflexes (Level 34, Attack).
		 */
		static INCREDIBLE_REFLEXES: Prayer;
		/**
		 * Protect from Magic (Level 37).
		 */
		static PROTECT_FROM_MAGIC: Prayer;
		/**
		 * Protect from Missiles (Level 40).
		 */
		static PROTECT_FROM_MISSILES: Prayer;
		/**
		 * Protect from Melee (Level 43).
		 */
		static PROTECT_FROM_MELEE: Prayer;
		/**
		 * Eagle Eye (Level 44, Ranging).
		 */
		static EAGLE_EYE: Prayer;
		/**
		 * Mystic Might (Level 45, Magic).
		 */
		static MYSTIC_MIGHT: Prayer;
		/**
		 * Retribution (Level 46).
		 */
		static RETRIBUTION: Prayer;
		/**
		 * Redemption (Level 49).
		 */
		static REDEMPTION: Prayer;
		/**
		 * Smite (Level 52).
		 */
		static SMITE: Prayer;
		/**
		 * Chivalry (Level 60, Defence/Strength/Attack).
		 */
		static CHIVALRY: Prayer;
		/**
		 * Piety (Level 70, Defence/Strength/Attack).
		 */
		static PIETY: Prayer;
		/**
		 * Preserve (Level 55).
		 */
		static PRESERVE: Prayer;
		/**
		 * Rigour (Level 74, Ranging/Damage/Defence).
		 */
		static RIGOUR: Prayer;
		/**
		 * Augury (Level 77, Magic/Magic Def./Defence).
		 */
		static AUGURY: Prayer;

		/**
		 * Ruinous Powers Rejuvenation (Level 60).
		 */
		static RP_REJUVENATION: Prayer;
		/**
		 * Ruinous Powers Ancient Strength (Level 61).
		 */
		static RP_ANCIENT_STRENGTH: Prayer;
		/**
		 * Ruinous Powers Ancient Sight (Level 62).
		 */
		static RP_ANCIENT_SIGHT: Prayer;
		/**
		 * Ruinous Powers Ancient Will (Level 63).
		 */
		static RP_ANCIENT_WILL: Prayer;
		/**
		 * Ruinous Powers Protect Item (Level 65).
		 */
		static RP_PROTECT_ITEM: Prayer;
		/**
		 * Ruinous Powers Ruinous Grace (Level 66).
		 */
		static RP_RUINOUS_GRACE: Prayer;
		/**
		 * Ruinous Powers Dampen Magic (Level 67).
		 */
		static RP_DAMPEN_MAGIC: Prayer;
		/**
		 * Ruinous Powers Dampen Ranged (Level 69).
		 */
		static RP_DAMPEN_RANGED: Prayer;
		/**
		 * Ruinous Powers Dampen Melee (Level 71).
		 */
		static RP_DAMPEN_MELEE: Prayer;
		/**
		 * Ruinous Powers Trinitas (Level 72).
		 */
		static RP_TRINITAS: Prayer;
		/**
		 * Ruinous Powers Berserker (Level 74).
		 */
		static RP_BERSERKER: Prayer;
		/**
		 * Ruinous Powers Purge (Level 75).
		 */
		static RP_PURGE: Prayer;
		/**
		 * Ruinous Powers Metabolise (Level 77).
		 */
		static RP_METABOLISE: Prayer;
		/**
		 * Ruinous Powers Rebuke (Level 78).
		 */
		static RP_REBUKE: Prayer;
		/**
		 * Ruinous Powers Vindication (Level 80).
		 */
		static RP_VINDICATION: Prayer;
		/**
		 * Ruinous Powers Decimate (Level 82).
		 */
		static RP_DECIMATE: Prayer;
		/**
		 * Ruinous Powers Annihilate (Level 84).
		 */
		static RP_ANNIHILATE: Prayer;
		/**
		 * Ruinous Powers Vaporise (Level 86).
		 */
		static RP_VAPORISE: Prayer;
		/**
		 * Ruinous Powers Fumus' Vow (Level 87).
		 */
		static RP_FUMUS_VOW: Prayer;
		/**
		 * Ruinous Powers Umbra's Vow (Level 88).
		 */
		static RP_UMBRA_VOW: Prayer;
		/**
		 * Ruinous Powers Cruor's Vow (Level 89).
		 */
		static RP_CRUORS_VOW: Prayer;
		/**
		 * Ruinous Powers Glacies' Vow (Level 90).
		 */
		static RP_GLACIES_VOW: Prayer;
		/**
		 * Ruinous Powers Wrath (Level 91).
		 */
		static RP_WRATH: Prayer;
		/**
		 * Ruinous Powers Intensify (Level 92).
		 */
		static RP_INTENSIFY: Prayer;

		toString(): string;

		/**
		 * Gets the varbit that stores whether the prayer is active or not.
		 *
		 * @return the prayer active varbit
		 */
		getVarbit(): number;
	}
}
