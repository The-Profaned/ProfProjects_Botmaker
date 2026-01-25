/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2019 Abex
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
	export class Quest {
		static ANIMAL_MAGNETISM: Quest;
		static ANOTHER_SLICE_OF_HAM: Quest;
		static THE_ASCENT_OF_ARCEUUS: Quest;
		static ALFRED_GRIMHANDS_BARCRAWL: Quest;
		static BEAR_YOUR_SOUL: Quest;
		static BELOW_ICE_MOUNTAIN: Quest;
		static BETWEEN_A_ROCK: Quest;
		static BIG_CHOMPY_BIRD_HUNTING: Quest;
		static BIOHAZARD: Quest;
		static BLACK_KNIGHTS_FORTRESS: Quest;
		static BONE_VOYAGE: Quest;
		static CABIN_FEVER: Quest;
		static CLIENT_OF_KOUREND: Quest;
		static CLOCK_TOWER: Quest;
		static COLD_WAR: Quest;
		static CONTACT: Quest;
		static COOKS_ASSISTANT: Quest;
		static THE_CORSAIR_CURSE: Quest;
		static CREATURE_OF_FENKENSTRAIN: Quest;
		static CURSE_OF_THE_EMPTY_LORD: Quest;
		static DADDYS_HOME: Quest;
		static DARKNESS_OF_HALLOWVALE: Quest;
		static DEATH_PLATEAU: Quest;
		static DEATH_TO_THE_DORGESHUUN: Quest;
		static DEMON_SLAYER: Quest;
		static THE_DEPTHS_OF_DESPAIR: Quest;
		static DESERT_TREASURE_I: Quest;
		static DEVIOUS_MINDS: Quest;
		static THE_DIG_SITE: Quest;
		static DORICS_QUEST: Quest;
		static DRAGON_SLAYER_I: Quest;
		static DRAGON_SLAYER_II: Quest;
		static DREAM_MENTOR: Quest;
		static DRUIDIC_RITUAL: Quest;
		static DWARF_CANNON: Quest;
		static EADGARS_RUSE: Quest;
		static EAGLES_PEAK: Quest;
		static ELEMENTAL_WORKSHOP_I: Quest;
		static ELEMENTAL_WORKSHOP_II: Quest;
		static ENAKHRAS_LAMENT: Quest;
		static THE_ENCHANTED_KEY: Quest;
		static ENLIGHTENED_JOURNEY: Quest;
		static ENTER_THE_ABYSS: Quest;
		static ERNEST_THE_CHICKEN: Quest;
		static THE_EYES_OF_GLOUPHRIE: Quest;
		static FAIRYTALE_I__GROWING_PAINS: Quest;
		static FAIRYTALE_II__CURE_A_QUEEN: Quest;
		static FAMILY_CREST: Quest;
		static FAMILY_PEST: Quest;
		static THE_FEUD: Quest;
		static FIGHT_ARENA: Quest;
		static FISHING_CONTEST: Quest;
		static FORGETTABLE_TALE: Quest;
		static THE_FORSAKEN_TOWER: Quest;
		static THE_FREMENNIK_EXILES: Quest;
		static THE_FREMENNIK_ISLES: Quest;
		static THE_FREMENNIK_TRIALS: Quest;
		static GARDEN_OF_TRANQUILLITY: Quest;
		static THE_GENERALS_SHADOW: Quest;
		static GERTRUDES_CAT: Quest;
		static GETTING_AHEAD: Quest;
		static GHOSTS_AHOY: Quest;
		static THE_GIANT_DWARF: Quest;
		static GOBLIN_DIPLOMACY: Quest;
		static THE_GOLEM: Quest;
		static THE_GRAND_TREE: Quest;
		static THE_GREAT_BRAIN_ROBBERY: Quest;
		static GRIM_TALES: Quest;
		static THE_HAND_IN_THE_SAND: Quest;
		static HAUNTED_MINE: Quest;
		static HAZEEL_CULT: Quest;
		static HEROES_QUEST: Quest;
		static HOLY_GRAIL: Quest;
		static HORROR_FROM_THE_DEEP: Quest;
		static ICTHLARINS_LITTLE_HELPER: Quest;
		static IMP_CATCHER: Quest;
		static IN_AID_OF_THE_MYREQUE: Quest;
		static IN_SEARCH_OF_KNOWLEDGE: Quest;
		static IN_SEARCH_OF_THE_MYREQUE: Quest;
		static JUNGLE_POTION: Quest;
		static A_KINGDOM_DIVIDED: Quest;
		static KINGS_RANSOM: Quest;
		static THE_KNIGHTS_SWORD: Quest;
		static LAIR_OF_TARN_RAZORLOR: Quest;
		static LEGENDS_QUEST: Quest;
		static LOST_CITY: Quest;
		static THE_LOST_TRIBE: Quest;
		static LUNAR_DIPLOMACY: Quest;
		static MAGE_ARENA_I: Quest;
		static MAGE_ARENA_II: Quest;
		static MAKING_FRIENDS_WITH_MY_ARM: Quest;
		static MAKING_HISTORY: Quest;
		static MERLINS_CRYSTAL: Quest;
		static MISTHALIN_MYSTERY: Quest;
		static MONKEY_MADNESS_I: Quest;
		static MONKEY_MADNESS_II: Quest;
		static MONKS_FRIEND: Quest;
		static MOUNTAIN_DAUGHTER: Quest;
		static MOURNINGS_END_PART_I: Quest;
		static MOURNINGS_END_PART_II: Quest;
		static MURDER_MYSTERY: Quest;
		static MY_ARMS_BIG_ADVENTURE: Quest;
		static NATURE_SPIRIT: Quest;
		static A_NIGHT_AT_THE_THEATRE: Quest;
		static OBSERVATORY_QUEST: Quest;
		static OLAFS_QUEST: Quest;
		static ONE_SMALL_FAVOUR: Quest;
		static PIRATES_TREASURE: Quest;
		static PLAGUE_CITY: Quest;
		static A_PORCINE_OF_INTEREST: Quest;
		static PRIEST_IN_PERIL: Quest;
		static PRINCE_ALI_RESCUE: Quest;
		static THE_QUEEN_OF_THIEVES: Quest;
		static RAG_AND_BONE_MAN_I: Quest;
		static RAG_AND_BONE_MAN_II: Quest;
		static RATCATCHERS: Quest;
		static RECIPE_FOR_DISASTER: Quest;
		static RECRUITMENT_DRIVE: Quest;
		static REGICIDE: Quest;
		static THE_RESTLESS_GHOST: Quest;
		static ROMEO__JULIET: Quest;
		static ROVING_ELVES: Quest;
		static ROYAL_TROUBLE: Quest;
		static RUM_DEAL: Quest;
		static RUNE_MYSTERIES: Quest;
		static SCORPION_CATCHER: Quest;
		static SEA_SLUG: Quest;
		static SHADES_OF_MORTTON: Quest;
		static SHADOW_OF_THE_STORM: Quest;
		static SHEEP_HERDER: Quest;
		static SHEEP_SHEARER: Quest;
		static SHIELD_OF_ARRAV: Quest;
		static SHILO_VILLAGE: Quest;
		static SINS_OF_THE_FATHER: Quest;
		static SKIPPY_AND_THE_MOGRES: Quest;
		static THE_SLUG_MENACE: Quest;
		static SONG_OF_THE_ELVES: Quest;
		static A_SOULS_BANE: Quest;
		static SPIRITS_OF_THE_ELID: Quest;
		static SWAN_SONG: Quest;
		static TAI_BWO_WANNAI_TRIO: Quest;
		static A_TAIL_OF_TWO_CATS: Quest;
		static TALE_OF_THE_RIGHTEOUS: Quest;
		static A_TASTE_OF_HOPE: Quest;
		static TEARS_OF_GUTHIX: Quest;
		static TEMPLE_OF_IKOV: Quest;
		static THRONE_OF_MISCELLANIA: Quest;
		static THE_TOURIST_TRAP: Quest;
		static TOWER_OF_LIFE: Quest;
		static TREE_GNOME_VILLAGE: Quest;
		static TRIBAL_TOTEM: Quest;
		static TROLL_ROMANCE: Quest;
		static TROLL_STRONGHOLD: Quest;
		static UNDERGROUND_PASS: Quest;
		static VAMPYRE_SLAYER: Quest;
		static WANTED: Quest;
		static WATCHTOWER: Quest;
		static WATERFALL_QUEST: Quest;
		static WHAT_LIES_BELOW: Quest;
		static WITCHS_HOUSE: Quest;
		static WITCHS_POTION: Quest;
		static X_MARKS_THE_SPOT: Quest;
		static ZOGRE_FLESH_EATERS: Quest;
		static THE_FROZEN_DOOR: Quest;
		static LAND_OF_THE_GOBLINS: Quest;
		static HOPESPEARS_WILL: Quest;
		static TEMPLE_OF_THE_EYE: Quest;
		static BENEATH_CURSED_SANDS: Quest;
		static SLEEPING_GIANTS: Quest;
		static THE_GARDEN_OF_DEATH: Quest;
		static INTO_THE_TOMBS: Quest;
		static RECIPE_FOR_DISASTER__ANOTHER_COOKS_QUEST: Quest;
		static RECIPE_FOR_DISASTER__MOUNTAIN_DWARF: Quest;
		static RECIPE_FOR_DISASTER__WARTFACE__BENTNOZE: Quest;
		static RECIPE_FOR_DISASTER__PIRATE_PETE: Quest;
		static RECIPE_FOR_DISASTER__LUMBRIDGE_GUIDE: Quest;
		static RECIPE_FOR_DISASTER__EVIL_DAVE: Quest;
		static RECIPE_FOR_DISASTER__SKRACH_UGLOGWEE: Quest;
		static RECIPE_FOR_DISASTER__SIR_AMIK_VARZE: Quest;
		static RECIPE_FOR_DISASTER__KING_AWOWOGEI: Quest;
		static RECIPE_FOR_DISASTER__CULINAROMANCER: Quest;
		static SECRETS_OF_THE_NORTH: Quest;
		static DESERT_TREASURE_II__THE_FALLEN_EMPIRE: Quest;
		static HIS_FAITHFUL_SERVANTS: Quest;
		static THE_PATH_OF_GLOUPHRIE: Quest;
		static CHILDREN_OF_THE_SUN: Quest;
		static BARBARIAN_TRAINING: Quest;
		static DEFENDER_OF_VARROCK: Quest;
		static WHILE_GUTHIX_SLEEPS: Quest;
		static TWILIGHTS_PROMISE: Quest;
		static AT_FIRST_LIGHT: Quest;
		static PERILOUS_MOONS: Quest;
		static THE_RIBBITING_TALE_OF_A_LILY_PAD_LABOUR_DISPUTE: Quest;

		getId(): number;
		getName(): string;
		toString(): string {
			return '';
		}
		getState(client: Client): QuestState;
	}
}
