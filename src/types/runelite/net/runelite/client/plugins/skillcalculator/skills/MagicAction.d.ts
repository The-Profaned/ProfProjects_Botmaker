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
export class MagicAction implements SkillAction
{
static WIND_STRIKE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CONFUSE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_OPAL_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WATER_STRIKE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ARCEUUS_LIBRARY_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_SAPPHIRE_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_SAPPHIRE_JEWELLERY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static EARTH_STRIKE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WEAKEN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FIRE_STRIKE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_JADE_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BONES_TO_BANANAS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BASIC_REANIMATION = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WIND_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAYNOR_MANOR_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CURSE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BIND = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LOW_LEVEL_ALCHEMY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WATER_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_PEARL_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VARROCK_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_EMERALD_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_EMERALD_JEWELLERY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MIND_ALTAR_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static EARTH_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_TOPAZ_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LUMBRIDGE_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELEKINETIC_GRAB = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RESPAWN_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FIRE_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GHOSTLY_GRASP = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FALADOR_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RESURRECT_LESSER_THRALL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CRUMBLE_UNDEAD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SALVE_GRAVEYARD_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELEPORT_TO_HOUSE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WIND_BLAST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ADEPT_REANIMATION = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SUPERHEAT_ITEM = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static INFERIOR_DEMONBANE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CAMELOT_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WATER_BLAST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHADOW_VEIL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FENKENSTRAINS_CASTLE_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KOUREND_CASTLE_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_RUBY_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_RUBY_JEWELLERY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static IBAN_BLAST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_DART = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SMOKE_RUSH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DARK_LURE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SNARE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ARDOUGNE_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHADOW_RUSH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static EARTH_BLAST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CIVITAS_ILLA_FORTIS_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static PADDEWWA_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HIGH_LEVEL_ALCHEMY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLOOD_RUSH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SKELETAL_GRASP = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CHARGE_WATER_ORB = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_DIAMOND_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_DIAMOND_JEWELLERY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RESURRECT_SUPERIOR_THRALL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ICE_RUSH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WATCHTOWER_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FIRE_BLAST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MARK_OF_DARKNESS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CLAWS_OF_GUTHIX = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FLAMES_OF_ZAMORAK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SARADOMIN_STRIKE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BONES_TO_PEACHES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CHARGE_EARTH_ORB = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SENNTISTEN_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TROLLHEIM_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WEST_ARDOUGNE_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SMOKE_BURST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SUPERIOR_DEMONBANE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WIND_WAVE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CHARGE_FIRE_ORB = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHADOW_BURST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELEPORT_APE_ATOLL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LESSER_CORRUPTION = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WATER_WAVE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BAKE_PIE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GEOMANCY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HARMONY_ISLAND_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CURE_PLANT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MONSTER_EXAMINE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CHARGE_AIR_ORB = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KHARYRLL_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VILE_VIGOUR = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VULNERABILITY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static NPC_CONTACT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLOOD_BURST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CURE_OTHER = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HUMIDIFY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_DRAGONSTONE_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_DRAGONSTONE_JEWELLERY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MOONCLAN_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static EARTH_WAVE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ICE_BURST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELE_GROUP_MOONCLAN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DEGRIME = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CURE_ME = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OURANIA_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HUNTER_KIT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CEMETERY_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WATERBIRTH_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LASSAR_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static EXPERT_REANIMATION = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELE_GROUP_WATERBIRTH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENFEEBLE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WARD_OF_ARCEUUS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SMOKE_BLITZ = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CURE_GROUP = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELEOTHER_LUMBRIDGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FIRE_WAVE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BARBARIAN_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STAT_SPY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHADOW_BLITZ = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SPIN_FLAX = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELE_GROUP_BARBARIAN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RESURRECT_GREATER_THRALL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SUPERGLASS_MAKE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KHAZARD_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TAN_LEATHER = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DAREEYAK_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RESURRECT_CROPS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static UNDEAD_GRASP = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELE_GROUP_KHAZARD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DREAM = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENTANGLE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLOOD_BLITZ = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STRING_JEWELLERY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DEATH_CHARGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STUN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CHARGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WIND_SURGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STAT_RESTORE_POT_SHARE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DARK_DEMONBANE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ICE_BLITZ = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_IMBUE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELEOTHER_FALADOR = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FERTILE_SOIL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BARROWS_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CARRALLANGER_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BOOST_POTION_SHARE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DEMONIC_OFFERING = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELEPORT_TO_TARGET = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WATER_SURGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELE_BLOCK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FISHING_GUILD_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GREATER_CORRUPTION = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SMOKE_BARRAGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static PLANK_MAKE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELE_GROUP_FISHING_GUILD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CATHERBY_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_ONYX_BOLT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_ONYX_JEWELLERY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHADOW_BARRAGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELE_GROUP_CATHERBY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ICE_PLATEAU_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RECHARGE_DRAGONSTONE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static EARTH_SURGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELE_GROUP_ICE_PLATEAU = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ANNAKARL_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static APE_ATOLL_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TELEOTHER_CAMELOT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MASTER_REANIMATION = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENERGY_TRANSFER = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLOOD_BARRAGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HEAL_OTHER = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SINISTER_OFFERING = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VENGEANCE_OTHER = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENCHANT_ZENYTE_JEWELLERY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ICE_BARRAGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VENGEANCE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FIRE_SURGE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HEAL_GROUP = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GHORROCK_TELEPORT = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SPELLBOOK_SWAP = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static String = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
	getName(itemManager: ItemManager): string;
	isMembers(itemManager: ItemManager): boolean;
}
}