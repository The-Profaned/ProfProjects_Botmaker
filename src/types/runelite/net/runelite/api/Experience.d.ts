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
 * A utility class used for calculating experience related values.
 * <p>
 * Skill levels calculated and handled by this class are within (inclusive)
 * the range 1-126 rather than 1-99 to account for virtual levels obtained
 * when reaching the 200M experience limit.
 */
export class Experience
{
	/**
	 * Maximum effective skill level at 13,034,431 experience.
	 */
	/**
	 * The maximum virtual skill level for any skill (200M experience).
	 */
	/**
	 * The maximum possible combat level.
	 */
	/**
	 * The total experience required for each skill level.
	 */
	/**
	 * Gets the total experience required to obtain the passed skill
	 * level.
	 *
	 * @param level the skill level
	 * @return the required experience for the level
	 * @throws IllegalArgumentException if skill level is invalid
	 */
	static getXpForLevel(level: number): number;
		// XP_FOR_LEVEL[0] is XP for level 1
	/**
	 * Gets the skill level for the passed total experience.
	 *
	 * @param xp the passed experience (non-negative)
	 * @return the skill level
	 */
	static getLevelForXp(xp: number): number;
	private static getMeleeRangeOrMagicCombatLevelContribution(attackLevel: number, strengthLevel: number, magicLevel: number, rangeLevel: number): number;
	/**
	 * Calculates a non-virtual high-precision combat level without integer
	 * rounding.
	 * <p>
	 * Combat levels range between 1.15 and ~126.1.
	 *
	 * @param attackLevel the attack level
	 * @param strengthLevel the strength level
	 * @param defenceLevel the defence level
	 * @param hitpointsLevel the hitpoints level
	 * @param magicLevel the magic level
	 * @param rangeLevel the range level
	 * @param prayerLevel the prayer level
	 * @return the non-virtual combat level
	 */
	static getCombatLevelPrecise(attackLevel: number, strengthLevel: number, defenceLevel: number, hitpointsLevel: number, magicLevel: number, rangeLevel: number, prayerLevel: number): number;
	/**
	 * Calculates a regular combat level.
	 *
	 * @param attackLevel the attack level
	 * @param strengthLevel the strength level
	 * @param defenceLevel the defence level
	 * @param hitpointsLevel the hitpoints level
	 * @param magicLevel the magic level
	 * @param rangeLevel the range level
	 * @param prayerLevel the prayer level
	 * @return the combat level, rounded down
	 */
	static getCombatLevel(attackLevel: number, strengthLevel: number, defenceLevel: number, hitpointsLevel: number, magicLevel: number, rangeLevel: number, prayerLevel: number): number;
	/**
	 * Calculate number of attack/strength levels required to increase combat level.
	 *
	 * @param attackLevel    the attack level
	 * @param strengthLevel  the strength level
	 * @param defenceLevel   the defence level
	 * @param hitpointsLevel the hitpoints level
	 * @param magicLevel     the magic level
	 * @param rangeLevel     the range level
	 * @param prayerLevel    the prayer level
	 * @return the number of levels required
	 */
	static getNextCombatLevelMelee(attackLevel: number, strengthLevel: number, defenceLevel: number, hitpointsLevel: number, magicLevel: number, rangeLevel: number, prayerLevel: number): number;
	/**
	 * Calculate number of hitpoints/defence levels required to increase combat level.
	 *
	 * @param attackLevel    the attack level
	 * @param strengthLevel  the strength level
	 * @param defenceLevel   the defence level
	 * @param hitpointsLevel the hitpoints level
	 * @param magicLevel     the magic level
	 * @param rangeLevel     the range level
	 * @param prayerLevel    the prayer level
	 * @return the number of levels required
	 */
	static getNextCombatLevelHpDef(attackLevel: number, strengthLevel: number, defenceLevel: number, hitpointsLevel: number, magicLevel: number, rangeLevel: number, prayerLevel: number): number;
	/**
	 * Calculate number of magic levels required to increase combat level.
	 *
	 * @param attackLevel    the attack level
	 * @param strengthLevel  the strength level
	 * @param defenceLevel   the defence level
	 * @param hitpointsLevel the hitpoints level
	 * @param magicLevel     the magic level
	 * @param rangeLevel     the range level
	 * @param prayerLevel    the prayer level
	 * @return the number of levels required
	 */
	static getNextCombatLevelMagic(attackLevel: number, strengthLevel: number, defenceLevel: number, hitpointsLevel: number, magicLevel: number, rangeLevel: number, prayerLevel: number): number;
	/**
	 * Calculate number of ranged levels required to increase combat level.
	 *
	 * @param attackLevel    the attack level
	 * @param strengthLevel  the strength level
	 * @param defenceLevel   the defence level
	 * @param hitpointsLevel the hitpoints level
	 * @param magicLevel     the magic level
	 * @param rangeLevel     the range level
	 * @param prayerLevel    the prayer level
	 * @return the number of levels required
	 */
	static getNextCombatLevelRange(attackLevel: number, strengthLevel: number, defenceLevel: number, hitpointsLevel: number, magicLevel: number, rangeLevel: number, prayerLevel: number): number;
	/**
	 * Calculate number of prayer levels required to increase combat level.
	 *
	 * @param attackLevel    the attack level
	 * @param strengthLevel  the strength level
	 * @param defenceLevel   the defence level
	 * @param hitpointsLevel the hitpoints level
	 * @param magicLevel     the magic level
	 * @param rangeLevel     the range level
	 * @param prayerLevel    the prayer level
	 * @return the number of levels required
	 */
	static getNextCombatLevelPrayer(attackLevel: number, strengthLevel: number, defenceLevel: number, hitpointsLevel: number, magicLevel: number, rangeLevel: number, prayerLevel: number): number;
}
}