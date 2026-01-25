/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Tyler <https://github.com/tylerthardy>
 * Copyright (c) 2018, Shaun Dreclin <shaundreclin@gmail.com>
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
declare namespace net.runelite.client.plugins.slayer {
export class Task
{
	//<editor-fold desc="Enums">
static ABERRANT_SPECTRES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ABYSSAL_DEMONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ABYSSAL_SIRE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ADAMANT_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ALCHEMICAL_HYDRA = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ANKOU = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static AVIANSIES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BANDITS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BANSHEES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BARROWS_BROTHERS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BASILISKS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BATS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BEARS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BIRDS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLACK_DEMONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLACK_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLACK_KNIGHTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLOODVELD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BLUE_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BRINE_RATS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static BRONZE_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CALLISTO = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CATABLEPON = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CAVE_BUGS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CAVE_CRAWLERS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CAVE_HORRORS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CAVE_KRAKEN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CAVE_SLIMES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CERBERUS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CHAOS_DRUIDS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CHAOS_ELEMENTAL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CHAOS_FANATIC = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static COCKATRICE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static COWS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CRAWLING_HANDS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CRAZY_ARCHAEOLOGIST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static CROCODILES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DAGANNOTH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DAGANNOTH_KINGS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DARK_BEASTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DARK_WARRIORS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DERANGED_ARCHAEOLOGIST = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DOGS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DRAKES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DUKE_SUCELLUS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DUST_DEVILS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static DWARVES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static EARTH_WARRIORS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ELVES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ENTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FEVER_SPIDERS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FIRE_GIANTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FLESH_CRAWLERS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static FOSSIL_ISLAND_WYVERNS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GARGOYLES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GENERAL_GRAARDOR = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GHOSTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GHOULS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GIANT_MOLE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GOBLINS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GREATER_DEMONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GREEN_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static GROTESQUE_GUARDIANS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HARPIE_BUG_SWARMS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HELLHOUNDS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HILL_GIANTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HOBGOBLINS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static HYDRAS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ICEFIENDS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ICE_GIANTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ICE_WARRIORS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static INFERNAL_MAGES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static IRON_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static JAD = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static JELLIES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static JUNGLE_HORROR = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KALPHITE = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KALPHITE_QUEEN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KILLERWATTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KING_BLACK_DRAGON = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KRAKEN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KREEARRA = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KRIL_TSUTSAROTH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static KURASK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LAVA_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LESSER_DEMONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LESSER_NAGUA = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LIZARDMEN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static LIZARDS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAGIC_AXES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MAMMOTHS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MINIONS_OF_SCABARAS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MINOTAURS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MITHRIL_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MOGRES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MOLANISKS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MONKEYS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MOSS_GIANTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static MUTATED_ZYGOMITES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static NECHRYAEL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OGRES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static OTHERWORLDLY_BEING = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static PHANTOM_MUSPAH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static PIRATES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static PYREFIENDS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RATS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RED_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static REVENANTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ROCKSLUGS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ROGUES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static RUNE_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SARACHNIS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SCORPIA = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SCORPIONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SEA_SNAKES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHADES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SHADOW_WARRIORS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SKELETAL_WYVERNS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SKELETONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SMOKE_DEVILS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SOURHOGS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SPIDERS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SPIRITUAL_CREATURES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static STEEL_DRAGONS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static SUQAHS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TERROR_DOGS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static THE_LEVIATHAN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static THE_WHISPERER = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static THERMONUCLEAR_SMOKE_DEVIL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TROLLS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TUROTH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static TZHAAR = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VAMPYRES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VARDORVIS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VENENATIS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VETION = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static VORKATH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WALL_BEASTS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WARPED_CREATURES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WATERFIENDS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WEREWOLVES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WOLVES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static WYRMS = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ZILYANA = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ZOMBIES = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ZUK = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
static ZULRAH = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } };
	//</editor-fold>
	static getTask(taskName: string): Task | null;
}
}