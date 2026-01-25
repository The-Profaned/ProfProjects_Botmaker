/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
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
declare namespace net.runelite.api {
	/**
	 * Server controlled "content-developer" integers.
	 *
	 * VarPlayers are stored per RuneScape player save, and synchronized
	 * from the server to the client. The client can change them preemptively
	 * if it thinks they will change the next tick as a lag-hiding measure.
	 * The client CANNOT directly make the server change a varp.
	 */
	export class VarPlayer {
		static CANNON_STATE = 2;
		static CANNON_AMMO = 3;
		static CANNON_COORD = 4;
		static ATTACK_STYLE = 43;
		static QUEST_POINTS = 101;
		/**
		 * Seems to start at 50(10 splash) and goes down by 1 every 30 seconds
		 */
		static DISEASE_VALUE = 456;

		static BANK_TAB = 115;

		static MEMBERSHIP_DAYS = 1780;

		static SPECIAL_ATTACK_PERCENT = 300;
		static SPECIAL_ATTACK_ENABLED = 301;

		/**
		 * The ID of the party. This Var is only set in the raid bank area and the raid lobby
		 *
		 * This gets set to -1 when the raid starts. This is first set when the first player of the friends chat forms a party
		 * on the recruiting board and it changes again when the first person actually enters the raid.
		 *
		 * -1 : Not in a party or in the middle of an ongoing raid
		 * Anything else : This means that your friends chat has a raid party being formed and has not started yet
		 */
		static IN_RAID_PARTY = 1427;

		static NMZ_REWARD_POINTS = 1060;

		/**
		 * The poisoned status of the player, with negative values indicating the duration of poison or venom protection and
		 * positive values representing the amount of poison or venom damage the player will be taking.
		 *
		 * <ul>
		 *     <li>
		 *         (-inf, -38): Venom immune for a duration of {@code (abs(val) - 38) * 30} game ticks (18 seconds per
		 *         poison tick), after which point the value will have increased to {@code -38} and be representing poison
		 *         immunity rather than venom immunity
		 *     </li>
		 *     <li>
		 *         [-38, 0): Poison immune for a duration of {@code abs(val) * 30} game ticks (18 seconds per poison tick)
		 *     </li>
		 *     <li>0: Not poisoned or immune to poison</li>
		 *     <li>[1, 100]: Poisoned for an amount of {@code ceil(val / 5.0f)}</li>
		 *     <li>
		 *         [1000000, inf): Venomed for an amount of {@code min(20, (val - 999997) * 2)}, that is, an amount starting
		 *         at 6 damage, increasing by 2 each time the value increases by one, and capped at 20
		 *     </li>
		 * </ul>
		 */
		static POISON = 102;

		/**
		 * 0 : not started
		 * greater than 0 : in progress
		 * greater than 99 : completed
		 */
		static THRONE_OF_MISCELLANIA = 359;

		/**
		 * Item currently active in the creation of a buy or sell offer
		 */
		static CURRENT_GE_ITEM = 1151;

		/**
		 * Experience tracker goal start.
		 */
		static ATTACK_GOAL_START = 1229;
		static STRENGTH_GOAL_START = 1230;
		static RANGED_GOAL_START = 1231;
		static MAGIC_GOAL_START = 1232;
		static DEFENCE_GOAL_START = 1233;
		static HITPOINTS_GOAL_START = 1234;
		static PRAYER_GOAL_START = 1235;
		static AGILITY_GOAL_START = 1236;
		static HERBLORE_GOAL_START = 1237;
		static THIEVING_GOAL_START = 1238;
		static CRAFTING_GOAL_START = 1239;
		static RUNECRAFT_GOAL_START = 1240;
		static MINING_GOAL_START = 1241;
		static SMITHING_GOAL_START = 1242;
		static FISHING_GOAL_START = 1243;
		static COOKING_GOAL_START = 1244;
		static FIREMAKING_GOAL_START = 1245;
		static WOODCUTTING_GOAL_START = 1246;
		static FLETCHING_GOAL_START = 1247;
		static SLAYER_GOAL_START = 1248;
		static FARMING_GOAL_START = 1249;
		static CONSTRUCTION_GOAL_START = 1250;
		static HUNTER_GOAL_START = 1251;

		/**
		 * Experience tracker goal end.
		 */
		static ATTACK_GOAL_END = 1253;
		static STRENGTH_GOAL_END = 1254;
		static RANGED_GOAL_END = 1255;
		static MAGIC_GOAL_END = 1256;
		static DEFENCE_GOAL_END = 1257;
		static HITPOINTS_GOAL_END = 1258;
		static PRAYER_GOAL_END = 1259;
		static AGILITY_GOAL_END = 1260;
		static HERBLORE_GOAL_END = 1261;
		static THIEVING_GOAL_END = 1262;
		static CRAFTING_GOAL_END = 1263;
		static RUNECRAFT_GOAL_END = 1264;
		static MINING_GOAL_END = 1265;
		static SMITHING_GOAL_END = 1266;
		static FISHING_GOAL_END = 1267;
		static COOKING_GOAL_END = 1268;
		static FIREMAKING_GOAL_END = 1269;
		static WOODCUTTING_GOAL_END = 1270;
		static FLETCHING_GOAL_END = 1271;
		static SLAYER_GOAL_END = 1272;
		static FARMING_GOAL_END = 1273;
		static CONSTRUCTION_GOAL_END = 1274;
		static HUNTER_GOAL_END = 1275;

		/**
		 * Bird house states
		 */
		static BIRD_HOUSE_MEADOW_NORTH = 1626;
		static BIRD_HOUSE_MEADOW_SOUTH = 1627;
		static BIRD_HOUSE_VALLEY_NORTH = 1628;
		static BIRD_HOUSE_VALLEY_SOUTH = 1629;

		/**
		 * Slayer unlock bitfields
		 */
		static SLAYER_UNLOCK_1 = 1076;
		static SLAYER_UNLOCK_2 = 1344;

		static MUSIC_VOLUME = 168;
		static SOUND_EFFECT_VOLUME = 169;
		static AREA_EFFECT_VOLUME = 872;

		/**
		 * 0 = 2 buttons, 1 = 1 button
		 */
		static MOUSE_BUTTONS = 170;

		/**
		 * {@link NpcID} for the HP HUD
		 */
		static HP_HUD_NPC_ID = 1683;

		/**
		 * Colors for chat messages
		 */
		static SETTINGS_OPAQUE_CHAT_PUBLIC = 2992;
		static SETTINGS_OPAQUE_CHAT_PRIVATE = 2993;
		static SETTINGS_OPAQUE_CHAT_AUTO = 2994;
		static SETTINGS_OPAQUE_CHAT_BROADCAST = 2995;
		static SETTINGS_OPAQUE_CHAT_FRIEND = 2996;
		static SETTINGS_OPAQUE_CHAT_CLAN = 2997;
		static SETTINGS_OPAQUE_CHAT_GUEST_CLAN = 3060;
		static SETTINGS_OPAQUE_CHAT_CLAN_BROADCAST = 3192;
		static SETTINGS_OPAQUE_CHAT_IRON_GROUP_CHAT = 3191;
		static SETTINGS_OPAQUE_CHAT_IRON_GROUP_BROADCAST = 3193;
		static SETTINGS_OPAQUE_CHAT_TRADE_REQUEST = 2998;
		static SETTINGS_OPAQUE_CHAT_CHALLENGE_REQUEST = 2999;

		static SETTINGS_TRANSPARENT_CHAT_PUBLIC = 3000;
		static SETTINGS_TRANSPARENT_CHAT_PRIVATE = 3001;
		static SETTINGS_TRANSPARENT_CHAT_AUTO = 3002;
		static SETTINGS_TRANSPARENT_CHAT_BROADCAST = 3003;
		static SETTINGS_TRANSPARENT_CHAT_FRIEND = 3004;
		static SETTINGS_TRANSPARENT_CHAT_CLAN = 3005;
		static SETTINGS_TRANSPARENT_CHAT_GUEST_CLAN = 3061;
		static SETTINGS_TRANSPARENT_CHAT_CLAN_BROADCAST = 3195;
		static SETTINGS_TRANSPARENT_CHAT_IRON_GROUP_CHAT = 3194;
		static SETTINGS_TRANSPARENT_CHAT_IRON_GROUP_BROADCAST = 3196;
		static SETTINGS_TRANSPARENT_CHAT_TRADE_REQUEST = 3006;
		static SETTINGS_TRANSPARENT_CHAT_CHALLENGE_REQUEST = 3007;

		/**
		 * The difference, measured in minutes, between the time home teleport spell was last used and midnight, January 1, 1970 UTC.
		 */
		static LAST_HOME_TELEPORT = 892;

		/**
		 * Charge spell duration
		 * Value * 2 = Remaining game ticks on buff
		 * E.g. value of 50 means buff will expire in 100 ticks.
		 */
		static CHARGE_GOD_SPELL = 272;

		/**
		 * The difference, measured in minutes, between the time minigame teleport was last used and midnight, January 1, 1970 UTC.
		 */
		static LAST_MINIGAME_TELEPORT = 888;

		/**
		 * Number of slayer creatures remaining on the assigned task
		 */
		static SLAYER_TASK_SIZE = 394;

		/**
		 * Currently assigned slayer task if SLAYER_TASK_SIZE is greater than 0.
		 * Mapping of value to name can be found in {@link EnumID#SLAYER_TASK_CREATURE}.
		 */
		static SLAYER_TASK_CREATURE = 395;

		/**
		 * Assigned slayer task location. The mapping of value to name can be found in {@link EnumID#SLAYER_TASK_LOCATION}
		 */
		static SLAYER_TASK_LOCATION = 2096;

		/**
		 * Determines whether the woodcutting group bonus should be displayed on the buff bar or not.
		 * 96 = displayed (including the woodcutting guild).
		 * 0 = not displayed (after login until cutting a tree except normal trees or trees grown through farming).
		 * -1 = not displayed (including normal trees or trees grown through farming).
		 */
		static BUFF_BAR_WC_GROUP_BONUS = 4007;
	}
}
