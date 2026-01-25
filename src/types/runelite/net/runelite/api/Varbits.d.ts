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
	 * Server controlled "content-developer" integers.
	 *
	 * @see VarPlayer
	 * <p>
	 * These differ from a {@link VarPlayer} in that VarBits can be
	 * less than 32 bits. One or more VarBits can be assigned to a
	 * backing VarPlayer, each with a static range of bits that it is
	 * allowed to access. This allows a more compact representation
	 * of small values, like booleans
	 */
	export class Varbits {
		/*
		 * If chatbox is transparent or not
		 */
		static TRANSPARENT_CHATBOX = 4608;

		/*
		 * If the player has an active stamina potion effect or not
		 */
		static RUN_SLOWED_DEPLETION_ACTIVE = 25;

		/**
		 * Stamina effect timer
		 * Number of game ticks remaining on stamina effect in intervals of 10; for a value X there are 10 * X game ticks remaining.
		 * The stamina effect expires once this reaches 0.
		 */
		static STAMINA_EFFECT = 24;

		/**
		 * Antifire timer
		 * Number of game ticks remaining on antifire in intervals of 30; for a value X there are 30 * X game ticks remaining.
		 * The antifire expires once this reaches 0.
		 */
		static ANTIFIRE = 3981;

		/**
		 * Super Antifire timer
		 * Number of game ticks remaining on super antifire in intervals of 20; for a value X there are 20 * X game ticks remaining.
		 * The super antifire expires once this reaches 0.
		 */
		static SUPER_ANTIFIRE = 6101;

		/**
		 * Magic imbue timer
		 * Number of game ticks remaining on magic imbue effect in intervals of 10; for a value X there are 10 * X game ticks remaining.
		 * The magic imbue effect expires once this reaches 0.
		 */
		static MAGIC_IMBUE = 5438;

		/**
		 * Divine effect timers
		 * Number of game ticks remaining on a divine effect.
		 * A potion that combines multiple effects will set the varbits for the individual effects as well as its own effect.
		 */
		static DIVINE_SUPER_ATTACK = 8429;
		static DIVINE_SUPER_STRENGTH = 8430;
		static DIVINE_SUPER_DEFENCE = 8431;
		static DIVINE_RANGING = 8432;
		static DIVINE_MAGIC = 8433;
		static DIVINE_SUPER_COMBAT = 13663;
		static DIVINE_BASTION = 13664;
		static DIVINE_BATTLEMAGE = 13665;

		/**
		 * Ring of endurance effect timer, stamina duration extended from using the ring of endurance
		 * Number of game ticks remaining on ring of endurance effect in intervals of 10; for a value X there are 10 * X game ticks remaining.
		 * Unequipping the ring of endurance will cause this to change to 0.
		 * When this reaches 0, {@link #STAMINA_EFFECT} will begin counting down.
		 */
		static RING_OF_ENDURANCE_EFFECT = 10385;

		/**
		 * If scrollbar in resizable mode chat is on the left
		 */
		static CHAT_SCROLLBAR_ON_LEFT = 6374;

		/**
		 * Runepouch
		 */
		static RUNE_POUCH_RUNE1 = 29;
		static RUNE_POUCH_RUNE2 = 1622;
		static RUNE_POUCH_RUNE3 = 1623;
		static RUNE_POUCH_RUNE4 = 14285;
		static RUNE_POUCH_RUNE5 = 15373;
		static RUNE_POUCH_RUNE6 = 15374;
		static RUNE_POUCH_AMOUNT1 = 1624;
		static RUNE_POUCH_AMOUNT2 = 1625;
		static RUNE_POUCH_AMOUNT3 = 1626;
		static RUNE_POUCH_AMOUNT4 = 14286;
		static RUNE_POUCH_AMOUNT5 = 15375;
		static RUNE_POUCH_AMOUNT6 = 15376;

		/**
		 * Prayers
		 */
		static QUICK_PRAYER = 4103;
		static PRAYER_THICK_SKIN = 4104;
		static PRAYER_BURST_OF_STRENGTH = 4105;
		static PRAYER_CLARITY_OF_THOUGHT = 4106;
		static PRAYER_SHARP_EYE = 4122;
		static PRAYER_MYSTIC_WILL = 4123;
		static PRAYER_ROCK_SKIN = 4107;
		static PRAYER_SUPERHUMAN_STRENGTH = 4108;
		static PRAYER_IMPROVED_REFLEXES = 4109;
		static PRAYER_RAPID_RESTORE = 4110;
		static PRAYER_RAPID_HEAL = 4111;
		static PRAYER_PROTECT_ITEM = 4112;
		static PRAYER_HAWK_EYE = 4124;
		static PRAYER_MYSTIC_LORE = 4125;
		static PRAYER_STEEL_SKIN = 4113;
		static PRAYER_ULTIMATE_STRENGTH = 4114;
		static PRAYER_INCREDIBLE_REFLEXES = 4115;
		static PRAYER_PROTECT_FROM_MAGIC = 4116;
		static PRAYER_PROTECT_FROM_MISSILES = 4117;
		static PRAYER_PROTECT_FROM_MELEE = 4118;
		static PRAYER_EAGLE_EYE = 4126;
		static PRAYER_MYSTIC_MIGHT = 4127;
		static PRAYER_RETRIBUTION = 4119;
		static PRAYER_REDEMPTION = 4120;
		static PRAYER_SMITE = 4121;
		static PRAYER_CHIVALRY = 4128;
		static PRAYER_PIETY = 4129;
		static PRAYER_PRESERVE = 5466;
		static PRAYER_RIGOUR = 5464;
		static PRAYER_AUGURY = 5465;

		/**
		 * Ruinous Powers
		 */
		static PRAYER_RP_REJUVENATION = 14840;
		static PRAYER_RP_ANCIENT_STRENGTH = 14829;
		static PRAYER_RP_ANCIENT_SIGHT = 14830;
		static PRAYER_RP_ANCIENT_WILL = 14831;
		static PRAYER_RP_PROTECT_ITEM = 14966;
		static PRAYER_RP_RUINOUS_GRACE = 14841;
		static PRAYER_RP_DAMPEN_MAGIC = 14964;
		static PRAYER_RP_DAMPEN_RANGED = 14963;
		static PRAYER_RP_DAMPEN_MELEE = 14962;
		static PRAYER_RP_TRINITAS = 14832;
		static PRAYER_RP_BERSERKER = 14844;
		static PRAYER_RP_PURGE = 14839;
		static PRAYER_RP_METABOLISE = 14843;
		static PRAYER_RP_REBUKE = 14850;
		static PRAYER_RP_VINDICATION = 14851;
		static PRAYER_RP_DECIMATE = 14833;
		static PRAYER_RP_ANNIHILATE = 14834;
		static PRAYER_RP_VAPORISE = 14835;
		static PRAYER_RP_FUMUS_VOW = 14845;
		static PRAYER_RP_UMBRA_VOW = 14847;
		static PRAYER_RP_CRUORS_VOW = 14846;
		static PRAYER_RP_GLACIES_VOW = 14848;
		static PRAYER_RP_WRATH = 14842;
		static PRAYER_RP_INTENSIFY = 14965;

		/**
		 * Diary Entries
		 */
		static DIARY_ARDOUGNE_EASY = 4458;
		static DIARY_ARDOUGNE_MEDIUM = 4459;
		static DIARY_ARDOUGNE_HARD = 4460;
		static DIARY_ARDOUGNE_ELITE = 4461;

		static DIARY_DESERT_EASY = 4483;
		static DIARY_DESERT_MEDIUM = 4484;
		static DIARY_DESERT_HARD = 4485;
		static DIARY_DESERT_ELITE = 4486;

		static DIARY_FALADOR_EASY = 4462;
		static DIARY_FALADOR_MEDIUM = 4463;
		static DIARY_FALADOR_HARD = 4464;
		static DIARY_FALADOR_ELITE = 4465;

		static DIARY_FREMENNIK_EASY = 4491;
		static DIARY_FREMENNIK_MEDIUM = 4492;
		static DIARY_FREMENNIK_HARD = 4493;
		static DIARY_FREMENNIK_ELITE = 4494;

		static DIARY_KANDARIN_EASY = 4475;
		static DIARY_KANDARIN_MEDIUM = 4476;
		static DIARY_KANDARIN_HARD = 4477;
		static DIARY_KANDARIN_ELITE = 4478;

		static DIARY_KARAMJA_EASY = 3578;
		static DIARY_KARAMJA_MEDIUM = 3599;
		static DIARY_KARAMJA_HARD = 3611;
		static DIARY_KARAMJA_ELITE = 4566;

		static DIARY_KOUREND_EASY = 7925;
		static DIARY_KOUREND_MEDIUM = 7926;
		static DIARY_KOUREND_HARD = 7927;
		static DIARY_KOUREND_ELITE = 7928;

		static DIARY_LUMBRIDGE_EASY = 4495;
		static DIARY_LUMBRIDGE_MEDIUM = 4496;
		static DIARY_LUMBRIDGE_HARD = 4497;
		static DIARY_LUMBRIDGE_ELITE = 4498;

		static DIARY_MORYTANIA_EASY = 4487;
		static DIARY_MORYTANIA_MEDIUM = 4488;
		static DIARY_MORYTANIA_HARD = 4489;
		static DIARY_MORYTANIA_ELITE = 4490;

		static DIARY_VARROCK_EASY = 4479;
		static DIARY_VARROCK_MEDIUM = 4480;
		static DIARY_VARROCK_HARD = 4481;
		static DIARY_VARROCK_ELITE = 4482;

		static DIARY_WESTERN_EASY = 4471;
		static DIARY_WESTERN_MEDIUM = 4472;
		static DIARY_WESTERN_HARD = 4473;
		static DIARY_WESTERN_ELITE = 4474;

		static DIARY_WILDERNESS_EASY = 4466;
		static DIARY_WILDERNESS_MEDIUM = 4467;
		static DIARY_WILDERNESS_HARD = 4468;
		static DIARY_WILDERNESS_ELITE = 4469;

		/**
		 * Kourend house favours
		 */
		static KOUREND_FAVOR_ARCEUUS = 4896;
		static KOUREND_FAVOR_HOSIDIUS = 4895;
		static KOUREND_FAVOR_LOVAKENGJ = 4898;
		static KOUREND_FAVOR_PISCARILIUS = 4899;
		static KOUREND_FAVOR_SHAYZIEN = 4894;

		/**
		 * Equipped weapon type
		 */
		static EQUIPPED_WEAPON_TYPE = 357;

		/**
		 * Defensive casting mode
		 */
		static DEFENSIVE_CASTING_MODE = 2668;

		/**
		 * Options
		 */
		static SIDE_PANELS = 4607;

		/**
		 * Herbiboar Trails
		 */
		static HB_TRAIL_31303 = 5737;
		static HB_TRAIL_31306 = 5738;
		static HB_TRAIL_31309 = 5739;
		static HB_TRAIL_31312 = 5740;
		static HB_TRAIL_31315 = 5741;
		static HB_TRAIL_31318 = 5742;
		static HB_TRAIL_31321 = 5743;
		static HB_TRAIL_31324 = 5744;
		static HB_TRAIL_31327 = 5745;
		static HB_TRAIL_31330 = 5746;

		static HB_TRAIL_31333 = 5768;
		static HB_TRAIL_31336 = 5769;
		static HB_TRAIL_31339 = 5770;
		static HB_TRAIL_31342 = 5771;
		static HB_TRAIL_31345 = 5772;
		static HB_TRAIL_31348 = 5773;
		static HB_TRAIL_31351 = 5774;
		static HB_TRAIL_31354 = 5775;
		static HB_TRAIL_31357 = 5776;
		static HB_TRAIL_31360 = 5777;

		static HB_TRAIL_31363 = 5747;
		static HB_TRAIL_31366 = 5748;
		static HB_TRAIL_31369 = 5749;
		static HB_TRAIL_31372 = 5750;

		static HB_FINISH = 5766;

		/**
		 * Started hunting Herbiboar.
		 * <br>
		 * NOTE: This value remains at 0 even after starting a Herbiboar trail up until searching the first object along the
		 * hunting path.
		 */
		static HB_STARTED = 5767;

		/**
		 * Barbarian Assault
		 */
		static IN_GAME_BA = 3923;
		static BA_GC = 4768;

		/**
		 * 0 = Outside wilderness
		 * 1 = In wilderness
		 */
		static IN_WILDERNESS = 5963;

		/**
		 * Fishing Trawler
		 * FISHING_TRAWLER_ACTIVITY Expected values: 0-255
		 */
		static FISHING_TRAWLER_ACTIVITY = 3377;

		/**
		 * Blast Furnace Bar Dispenser
		 * <p>
		 * These are the expected values:
		 * 0 = No bars being processed
		 * 1 = Ores are being processed on the conveyor belt, bar dispenser cannot be checked
		 * 2 = Bars are cooling down
		 * 3 = Bars can be collected
		 */
		static BAR_DISPENSER = 936;

		/**
		 * Motherlode mine sack
		 */
		static SACK_NUMBER = 5558;
		static SACK_UPGRADED = 5556;

		/**
		 * Experience tracker
		 * <p>
		 * EXPERIENCE_TRACKER_POSITION expected values:
		 * 0 = Right
		 * 1 = Middle
		 * 2 = Left
		 */
		static EXPERIENCE_TRACKER_POSITION = 4692;
		static EXPERIENCE_TRACKER_COUNTER = 4697;
		static EXPERIENCE_TRACKER_PROGRESS_BAR = 4698;

		/**
		 * Experience drop color
		 */
		static EXPERIENCE_DROP_COLOR = 4695;

		/**
		 * Tithe Farm
		 */
		static TITHE_FARM_SACK_AMOUNT = 4900;
		static TITHE_FARM_SACK_ICON = 5370;
		static TITHE_FARM_POINTS = 4893;

		/**
		 * Blast Mine
		 */
		static BLAST_MINE_COAL = 10698;
		static BLAST_MINE_GOLD = 10699;
		static BLAST_MINE_MITHRIL = 10700;
		static BLAST_MINE_ADAMANTITE = 10701;
		static BLAST_MINE_RUNITE = 10702;

		/**
		 * Raids
		 */
		static IN_RAID = 5432;
		static TOTAL_POINTS = 5431;
		static PERSONAL_POINTS = 5422;
		static RAID_PARTY_SIZE = 5424;

		// 0 = raid not started, >0 = raid started
		static RAID_STATE = 5425;

		/**
		 * Making Friends with My Arm fire pits
		 * <p>
		 * Expected values:
		 * 0 = Not built
		 * 1 = Built
		 */
		static FIRE_PIT_GIANT_MOLE = 6532;
		static FIRE_PIT_LUMBRIDGE_SWAMP = 6533;
		static FIRE_PIT_MOS_LE_HARMLESS = 6534;

		/**
		 * Theatre of Blood 1=In Party, 2=Inside/Spectator, 3=Dead Spectating
		 */
		static THEATRE_OF_BLOOD = 6440;
		/**
		 * Theatre of Blood orb healths
		 * 0=hide 1-27=% of health - 27 is 100% health and 1 is 0% health, 30=dead
		 */
		static THEATRE_OF_BLOOD_ORB1 = 6442;
		static THEATRE_OF_BLOOD_ORB2 = 6443;
		static THEATRE_OF_BLOOD_ORB3 = 6444;
		static THEATRE_OF_BLOOD_ORB4 = 6445;
		static THEATRE_OF_BLOOD_ORB5 = 6446;

		/**
		 * Nightmare Zone
		 */
		static NMZ_ABSORPTION = 3956;
		static NMZ_POINTS = 3949;

		/**
		 * Blast Furnace
		 */
		static BLAST_FURNACE_COPPER_ORE = 959;
		static BLAST_FURNACE_TIN_ORE = 950;
		static BLAST_FURNACE_IRON_ORE = 951;
		static BLAST_FURNACE_COAL = 949;
		static BLAST_FURNACE_MITHRIL_ORE = 952;
		static BLAST_FURNACE_ADAMANTITE_ORE = 953;
		static BLAST_FURNACE_RUNITE_ORE = 954;
		static BLAST_FURNACE_SILVER_ORE = 956;
		static BLAST_FURNACE_GOLD_ORE = 955;

		static BLAST_FURNACE_BRONZE_BAR = 941;
		static BLAST_FURNACE_IRON_BAR = 942;
		static BLAST_FURNACE_STEEL_BAR = 943;
		static BLAST_FURNACE_MITHRIL_BAR = 944;
		static BLAST_FURNACE_ADAMANTITE_BAR = 945;
		static BLAST_FURNACE_RUNITE_BAR = 946;
		static BLAST_FURNACE_SILVER_BAR = 948;
		static BLAST_FURNACE_GOLD_BAR = 947;

		static BLAST_FURNACE_COFFER = 5357;

		/**
		 * Pyramid plunder
		 */
		static PYRAMID_PLUNDER_ROOM_LOCATION = 2365;
		static PYRAMID_PLUNDER_TIMER = 2375;
		static PYRAMID_PLUNDER_THIEVING_LEVEL = 2376;
		static PYRAMID_PLUNDER_ROOM = 2377;

		/**
		 * Barrows
		 */
		static BARROWS_KILLED_AHRIM = 457;
		static BARROWS_KILLED_DHAROK = 458;
		static BARROWS_KILLED_GUTHAN = 459;
		static BARROWS_KILLED_KARIL = 460;
		static BARROWS_KILLED_TORAG = 461;
		static BARROWS_KILLED_VERAC = 462;
		static BARROWS_REWARD_POTENTIAL = 463;
		static BARROWS_NPCS_SLAIN = 464;

		/**
		 * Spicy stew ingredients
		 */
		static SPICY_STEW_RED_SPICES = 1879;
		static SPICY_STEW_YELLOW_SPICES = 1880;
		static SPICY_STEW_BROWN_SPICES = 1881;
		static SPICY_STEW_ORANGE_SPICES = 1882;

		/**
		 * Multicombat area
		 */
		static MULTICOMBAT_AREA = 4605;

		/**
		 * Kingdom of Miscellania Management
		 * Kingdom Approval is represented as a 7-bit unsigned integer; 127 corresponds to 100% approval
		 */
		static KINGDOM_APPROVAL = 72;
		static KINGDOM_COFFER = 74;

		/**
		 * The Hand in the Sand quest status
		 */
		static QUEST_THE_HAND_IN_THE_SAND = 1527;

		/**
		 * Daily Tasks =Collection availability)
		 */
		static DAILY_HERB_BOXES_COLLECTED = 3961;
		static DAILY_STAVES_COLLECTED = 4539;
		static DAILY_ESSENCE_COLLECTED = 4547;
		static DAILY_RUNES_COLLECTED = 4540;
		static DAILY_SAND_COLLECTED = 4549;
		static DAILY_FLAX_STATE = 4559;
		static DAILY_ARROWS_STATE = 4563;
		/**
		 * This varbit tracks how much bonemeal has been redeemed from Robin
		 * The player gets 13 for each diary completed above and including Medium, for a maxiumum of 39
		 */
		static DAILY_BONEMEAL_STATE = 4543;

		static DAILY_DYNAMITE_COLLECTED = 7939;

		/**
		 * Fairy Ring
		 */
		static FAIR_RING_LAST_DESTINATION = 5374;
		static FAIRY_RING_DIAL_ADCB = 3985; //Left dial
		static FAIRY_RIGH_DIAL_ILJK = 3986; //Middle dial
		static FAIRY_RING_DIAL_PSRQ = 3987; //Right dial

		/**
		 * Transmog controllers for farming
		 */
		static FARMING_4771 = 4771;
		static FARMING_4772 = 4772;
		static FARMING_4773 = 4773;
		static FARMING_4774 = 4774;
		static FARMING_4775 = 4775;
		static FARMING_7904 = 7904;
		static FARMING_7905 = 7905;
		static FARMING_7906 = 7906;
		static FARMING_7907 = 7907;
		static FARMING_7908 = 7908;
		static FARMING_7909 = 7909;
		static FARMING_7910 = 7910;
		static FARMING_7911 = 7911;
		static FARMING_7912 = 7912;

		/**
		 * Transmog controllers for grapes
		 */
		static GRAPES_4953 = 4953;
		static GRAPES_4954 = 4954;
		static GRAPES_4955 = 4955;
		static GRAPES_4956 = 4956;
		static GRAPES_4957 = 4957;
		static GRAPES_4958 = 4958;
		static GRAPES_4959 = 4959;
		static GRAPES_4960 = 4960;
		static GRAPES_4961 = 4961;
		static GRAPES_4962 = 4962;
		static GRAPES_4963 = 4963;
		static GRAPES_4964 = 4964;

		/**
		 * Automatically weed farming patches
		 */
		static AUTOWEED = 5557;

		/**
		 * The player's account type.
		 * <p>
		 * 0 = normal
		 * 1 = ironman
		 * 2 = ultimate ironman
		 * 3 = hardcore ironman
		 * 4 = group ironman
		 * 5 = hardcore group ironman
		 * 6 = unranked group ironman
		 */
		static ACCOUNT_TYPE = 1777;

		/**
		 * The varbit that stores the oxygen percentage for player
		 */
		static OXYGEN_LEVEL = 5811;

		/**
		 * Drift net status
		 * <p>
		 * Expected values
		 * 0 = Unset
		 * 1 = Set up
		 * 2 = Caught some fish
		 * 3 = Full
		 */
		static NORTH_NET_STATUS = 5812;
		static SOUTH_NET_STATUS = 5814;

		/**
		 * Drift net catch count
		 */
		static NORTH_NET_CATCH_COUNT = 5813;
		static SOUTH_NET_CATCH_COUNT = 5815;

		/**
		 * Drift net collect interface
		 * <p>
		 * Expected values:
		 * 0 = Not open
		 * 1 = North interface open
		 * 2 = South interface open
		 */
		static DRIFT_NET_COLLECT = 5933;

		/**
		 * Corp beast damage
		 */
		static CORP_DAMAGE = 999;

		/**
		 * Toggleable slayer unlocks
		 */
		static SUPERIOR_ENABLED = 5362;
		static FOSSIL_ISLAND_WYVERN_DISABLE = 6251;

		static BANK_REARRANGE_MODE = 3959;
		static CURRENT_BANK_TAB = 4150;

		static WORLDHOPPER_FAVORITE_1 = 4597;
		static WORLDHOPPER_FAVORITE_2 = 4598;

		/**
		 * Spell activeness
		 */
		static VENGEANCE_ACTIVE = 2450;
		static DEATH_CHARGE = 12411;
		static RESURRECT_THRALL = 12413;
		static SHADOW_VEIL = 12414;

		/**
		 * Spell cooldowns
		 */
		static HEAL_GROUP_COOLDOWN = 925;
		static VENGEANCE_COOLDOWN = 2451;
		static DEATH_CHARGE_COOLDOWN = 12138;
		static CORRUPTION_COOLDOWN = 12288;
		static RESURRECT_THRALL_COOLDOWN = 12290;
		static SHADOW_VEIL_COOLDOWN = 12291;
		static WARD_OF_ARCEUUS_COOLDOWN = 12293;

		/**
		 * Imbued Heart cooldown
		 * Number of game tick remaining on cooldown in intervals of 10; for a value X there are 10 * X game ticks remaining.
		 * The heart regains its power once this reaches 0.
		 */
		static IMBUED_HEART_COOLDOWN = 5361;

		/**
		 * Dragonfire shield cooldown
		 * <p>
		 * Number of game ticks remaining on cooldown in intervals of 8; for a value X there are 8 * X game ticks remaining.
		 */
		static DRAGONFIRE_SHIELD_COOLDOWN = 6539;

		/**
		 * Amount of items in each bank tab
		 */
		static BANK_TAB_ONE_COUNT = 4171;
		static BANK_TAB_TWO_COUNT = 4172;
		static BANK_TAB_THREE_COUNT = 4173;
		static BANK_TAB_FOUR_COUNT = 4174;
		static BANK_TAB_FIVE_COUNT = 4175;
		static BANK_TAB_SIX_COUNT = 4176;
		static BANK_TAB_SEVEN_COUNT = 4177;
		static BANK_TAB_EIGHT_COUNT = 4178;
		static BANK_TAB_NINE_COUNT = 4179;

		/**
		 * Type of GE offer currently being created
		 * 0 = buy
		 * 1 = sell
		 */
		static GE_OFFER_CREATION_TYPE = 4397;

		/**
		 * The active tab within the quest interface
		 */
		static QUEST_TAB = 8168;

		/**
		 * Explorer ring
		 */
		static EXPLORER_RING_ALCHTYPE = 5398;
		static EXPLORER_RING_TELEPORTS = 4552;
		static EXPLORER_RING_ALCHS = 4554;
		static EXPLORER_RING_RUNENERGY = 4553;

		static WINTERTODT_TIMER = 7980;

		/**
		 * League relics
		 */
		static LEAGUE_RELIC_1 = 10049;
		static LEAGUE_RELIC_2 = 10050;
		static LEAGUE_RELIC_3 = 10051;
		static LEAGUE_RELIC_4 = 10052;
		static LEAGUE_RELIC_5 = 10053;
		static LEAGUE_RELIC_6 = 11696;
		static LEAGUE_RELIC_7 = 17301;
		static LEAGUE_RELIC_8 = 17302;

		/**
		 * Muted volume restore values
		 */
		static MUTED_MUSIC_VOLUME = 12426;
		static MUTED_SOUND_EFFECT_VOLUME = 12427;
		static MUTED_AREA_EFFECT_VOLUME = 12428;

		/**
		 * Parasite infection status during nightmare of ashihama bossfight
		 * <p>
		 * 0 = not infected
		 * 1 = infected
		 */
		static PARASITE = 10151;

		/**
		 * Whether the vanilla wiki entity lookup is displayed under the minimap
		 * <p>
		 * 0 = Enabled
		 * 1 = Disabled
		 */
		static WIKI_ENTITY_LOOKUP = 10113;

		/**
		 * Whether the player is in a PvP area
		 * <p>
		 * 0 = Player is not in PvP area
		 * 1 = Player is in PvP area
		 * <p>
		 * Note: The name of this varbit comes from historical behavior where
		 * the special attack orb would be disabled in PvP, but this was changed
		 * on 2023-03-09 due to Poll 78. Yet, the varbit still updates as before.
		 */
		static PVP_SPEC_ORB = 8121;

		/**
		 * Collection Log notification settings whenever a new item is added
		 * <p>
		 * 0 = no notification
		 * 1 = chat notification only
		 * 2 = popup notification only
		 * 3 = chat and popup
		 */
		static COLLECTION_LOG_NOTIFICATION = 11959;

		/**
		 * Combat Achievements popup settings whenever a new task is completed
		 * <p>
		 * 0 = popup notification enabled
		 * 1 = popup notification disabled
		 */
		static COMBAT_ACHIEVEMENTS_POPUP = 12455;

		/**
		 * Combat Achievement tier completion variables
		 *
		 * 2 = completed
		 */
		static COMBAT_ACHIEVEMENT_TIER_EASY = 12863;
		static COMBAT_ACHIEVEMENT_TIER_MEDIUM = 12864;
		static COMBAT_ACHIEVEMENT_TIER_HARD = 12865;
		static COMBAT_ACHIEVEMENT_TIER_ELITE = 12866;
		static COMBAT_ACHIEVEMENT_TIER_MASTER = 12867;
		static COMBAT_ACHIEVEMENT_TIER_GRANDMASTER = 12868;

		/**
		 * Show boss health overlay setting
		 * 0 = on
		 * 1 = off
		 */
		static BOSS_HEALTH_OVERLAY = 12389;

		/**
		 * Boss health bar info
		 */
		static BOSS_HEALTH_CURRENT = 6099;
		static BOSS_HEALTH_MAXIMUM = 6100;

		/**
		 * Whether the PVP kill-death stats widget should be drawn while in the wilderness or in PVP worlds.
		 * <p>
		 * 0 = Disabled
		 * 1 = Enabled
		 */
		static SHOW_PVP_KDR_STATS = 4143;

		/**
		 * State of Teleblock spell effects on the player
		 * <p>
		 * 0 = Teleblock inactive, no immunity
		 * 1 &lt;= X &lt;= 100 = Teleblock inactive, remaining ticks of immunity from reapplication of spell effect
		 * 101 &lt;= Teleblock active, remaining ticks of blocking effect
		 */
		static TELEBLOCK = 4163;

		/**
		 * Cooldown timer remaining before eligible to restore at a god wars dungeon altar.
		 * Number of game ticks remaining is in intervals of 100; for a value X there are 100 * X game ticks remaining.
		 * A player can pray at a god wars altar once this reaches 0.
		 */
		static GOD_WARS_ALTAR_COOLDOWN = 4099;

		/**
		 * Farmer's Affinity effect timer
		 * Number of game ticks remaining on Farmer's Affinity effect in intervals of 20; for a value X there are 20 * X game ticks remaining.
		 * The Farmer's Affinity expires once this reaches 0.
		 */
		static FARMERS_AFFINITY = 11765;

		/**
		 * If the player has Menaphite remedy effect active.
		 * This will go down by 1 every 25 ticks (15 seconds) and the player's combat stats will be restored by 6 + 16%.
		 * Set to 20 upon consuming potion.
		 */
		static MENAPHITE_REMEDY = 14448;

		/**
		 * How many salt stat boost refreshes the player has remaining.
		 * This will go down by 1 every 25 ticks (15 seconds) and the player's stats will be restored.
		 * Set to 32 upon crushing salts.
		 */
		static BUFF_STAT_BOOST = 14344;

		/**
		 * If the player has liquid adrenaline buff active
		 * <p>
		 * 0 = inactive
		 * 1 = active
		 */
		static LIQUID_ADERNALINE_ACTIVE = 14361;

		static TOA_RAID_LEVEL = 14380;
		static TOA_RAID_DAMAGE = 14325;

		/**
		 * Tombs of Amascut orb healths
		 * 0=hide 1-27=% of health - 27 is 100% health and 1 is 0% health, 30=dead
		 */
		static TOA_MEMBER_0_HEALTH = 14346;
		static TOA_MEMBER_1_HEALTH = 14347;
		static TOA_MEMBER_2_HEALTH = 14348;
		static TOA_MEMBER_3_HEALTH = 14349;
		static TOA_MEMBER_4_HEALTH = 14350;
		static TOA_MEMBER_5_HEALTH = 14351;
		static TOA_MEMBER_6_HEALTH = 14352;
		static TOA_MEMBER_7_HEALTH = 14353;

		/**
		 * How many NMZ overload refreshes the player has remaining.
		 * <p>
		 * This will go down by 1 every 25 ticks (15 seconds) and the player's stats will be restored.
		 * Set to 20 upon drinking an overload.
		 */
		static NMZ_OVERLOAD_REFRESHES_REMAINING = 3955;

		/**
		 * How many Chambers of Xeric overload refreshes the player has remaining.
		 * <p>
		 * This will go down by 1 every 25 ticks (15 seconds) and the player's stats will be restored.
		 * Set to 20 upon drinking an overload.
		 */
		static COX_OVERLOAD_REFRESHES_REMAINING = 5418;

		static SLAYER_POINTS = 4068;
		static SLAYER_TASK_STREAK = 4069;

		/**
		 * The assigned boss for boss slayer.
		 */
		static SLAYER_TASK_BOSS = 4723;

		/**
		 * Whether the level up interface is disabled
		 */
		static DISABLE_LEVEL_UP_INTERFACE = 9452;

		static PRAYERBOOK = 14826;

		/**
		 * During and after Curse of the Empty Lord, Viggora can be located in one of three locations,
		 * which is uniquely and permanently set for each player.
		 * This varbit determines which location he will appear in, which is useful for a master clue step.
		 */
		static VIGGORA_LOCATION = 815;

		/**
		 * If the player has a spellbook swap active
		 * <p>
		 * 0 = inactive
		 * 1 = active
		 */
		static SPELLBOOK_SWAP = 3617;

		static SPELLBOOK = 4070;
		static SPELLBOOK_SUBMENU = 9730;
	}
}
