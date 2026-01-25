/// <reference path="../../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2021, Jordan Atwood <nightfirecat@protonmail.com>
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
declare namespace net.runelite.client.plugins.skillcalculator.skills {
export class FletchingAction implements ItemSkillAction
{
static ARROW_SHAFT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HEADLESS_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BRONZE_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BRONZE_JAVELIN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OGRE_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHORTBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHORTBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BRONZE_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BRONZE_CROSSBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WOODEN_STOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BRONZE_CROSSBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BRONZE_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LONGBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LONGBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OPAL_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static IRON_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static IRON_JAVELIN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OAK_SHORTBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OAK_SHORTBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static IRON_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLURITE_CROSSBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OAK_STOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLURITE_CROSSBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OAK_LONGBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OAK_LONGBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OAK_SHIELD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STEEL_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KEBBIT_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STEEL_JAVELIN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WILLOW_SHORTBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WILLOW_SHORTBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STEEL_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static IRON_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static IRON_CROSSBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WILLOW_STOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static IRON_CROSSBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WILLOW_LONGBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WILLOW_LONGBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BATTLESTAFF = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static PEARL_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LONG_KEBBIT_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WILLOW_SHIELD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SILVER_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MITHRIL_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STEEL_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STEEL_CROSSBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TEAK_STOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STEEL_CROSSBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MITHRIL_JAVELIN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAPLE_SHORTBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAPLE_SHORTBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BARBED_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BROAD_ARROWS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MITHRIL_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TOXIC_BLOWPIPE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MITHRIL_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAPLE_STOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MITHRIL_CROSSBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MITHRIL_CROSSBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BROAD_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAPLE_LONGBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAPLE_LONGBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SAPPHIRE_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAPLE_SHIELD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static EMERALD_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HUNTERS_SPEAR = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ADAMANT_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ADAMANT_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ADAMANT_CROSSBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAHOGANY_STOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ADAMANT_CROSSBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ADAMANT_JAVELIN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RUBY_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DIAMOND_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static YEW_SHORTBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static YEW_SHORTBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ADAMANT_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RUNITE_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RUNE_CROSSBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static YEW_STOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RUNITE_CROSSBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static YEW_LONGBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static YEW_LONGBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAGONSTONE_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static YEW_SHIELD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ONYX_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RUNE_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static AMETHYST_BROAD_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RUNE_JAVELIN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAGON_CROSSBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_STOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAGON_CROSSBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_SHORTBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_SHORTBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RUNE_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static AMETHYST_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAGON_BOLTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static AMETHYST_JAVELIN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_LONGBOW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_LONGBOW_U = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_SHIELD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAGON_ARROW = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static AMETHYST_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAGON_JAVELIN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static REDWOOD_SHIELD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAGON_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static int = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
	isMembers(itemManager: ItemManager): boolean;
}
}