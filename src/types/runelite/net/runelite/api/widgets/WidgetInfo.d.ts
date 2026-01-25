/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
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
declare namespace net.runelite.api.widgets {
	/**
	 * Represents a group-child {@link Widget} relationship.
	 * <p>
	 * For getting a specific widget from the client, see {@link net.runelite.api.Client#getWidget(WidgetInfo)}.
	 */
	/** @deprecated */
	export class WidgetInfo {
		static FAIRY_RING_TELEPORT_BUTTON: WidgetInfo;
		static WORLD_SWITCHER_BUTTON: WidgetInfo;
		static LOGOUT_BUTTON: WidgetInfo;
		static INVENTORY: WidgetInfo;
		static FRIENDS_LIST: WidgetInfo;
		static IGNORE_LIST: WidgetInfo;
		static FRIENDS_CHAT: WidgetInfo;
		static RAIDING_PARTY: WidgetInfo;
		static WORLD_MAP_VIEW: WidgetInfo;
		static WORLD_MAP_OVERVIEW_MAP: WidgetInfo;
		static WORLD_MAP_BOTTOM_BAR: WidgetInfo;
		static WORLD_MAP_SEARCH: WidgetInfo;
		static WORLD_MAP_SURFACE_SELECTOR: WidgetInfo;
		static WORLD_MAP_TOOLTIP: WidgetInfo;
		static CLUE_SCROLL_TEXT: WidgetInfo;
		static CLUE_SCROLL_REWARD_ITEM_CONTAINER: WidgetInfo;
		static EQUIPMENT: WidgetInfo;
		static EQUIPMENT_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static EMOTE_WINDOW: WidgetInfo;
		static EMOTE_SCROLL_CONTAINER: WidgetInfo;
		static EMOTE_CONTAINER: WidgetInfo;
		static EMOTE_SCROLLBAR: WidgetInfo;
		static MUSIC_WINDOW: WidgetInfo;
		static MUSIC_TRACK_LIST: WidgetInfo;
		static MUSIC_TRACK_SCROLL_CONTAINER: WidgetInfo;
		static MUSIC_TRACK_SCROLLBAR: WidgetInfo;
		static DIARY_QUEST_WIDGET_TITLE: WidgetInfo;
		static DIARY_QUEST_WIDGET_TEXT: WidgetInfo;
		static ACHIEVEMENT_DIARY_SCROLL_TITLE: WidgetInfo;
		static ACHIEVEMENT_DIARY_SCROLL_TEXT: WidgetInfo;
		static PEST_CONTROL_BOAT_INFO: WidgetInfo;
		static PEST_CONTROL_KNIGHT_INFO_CONTAINER: WidgetInfo;
		static PEST_CONTROL_ACTIVITY_SHIELD_INFO_CONTAINER: WidgetInfo;
		static PEST_CONTROL_PURPLE_SHIELD: WidgetInfo;
		static PEST_CONTROL_BLUE_SHIELD: WidgetInfo;
		static PEST_CONTROL_YELLOW_SHIELD: WidgetInfo;
		static PEST_CONTROL_RED_SHIELD: WidgetInfo;
		static PEST_CONTROL_PURPLE_HEALTH: WidgetInfo;
		static PEST_CONTROL_BLUE_HEALTH: WidgetInfo;
		static PEST_CONTROL_YELLOW_HEALTH: WidgetInfo;
		static PEST_CONTROL_RED_HEALTH: WidgetInfo;
		static PEST_CONTROL_PURPLE_ICON: WidgetInfo;
		static PEST_CONTROL_BLUE_ICON: WidgetInfo;
		static PEST_CONTROL_YELLOW_ICON: WidgetInfo;
		static PEST_CONTROL_RED_ICON: WidgetInfo;
		static PEST_CONTROL_ACTIVITY_BAR: WidgetInfo;
		static PEST_CONTROL_ACTIVITY_PROGRESS: WidgetInfo;
		static VOLCANIC_MINE_TIME_LEFT: WidgetInfo;
		static VOLCANIC_MINE_POINTS: WidgetInfo;
		static VOLCANIC_MINE_STABILITY: WidgetInfo;
		static VOLCANIC_MINE_PLAYER_COUNT: WidgetInfo;
		static VOLCANIC_MINE_VENTS_INFOBOX_GROUP: WidgetInfo;
		static VOLCANIC_MINE_STABILITY_INFOBOX_GROUP: WidgetInfo;
		static VOLCANIC_MINE_VENT_A_PERCENTAGE: WidgetInfo;
		static VOLCANIC_MINE_VENT_B_PERCENTAGE: WidgetInfo;
		static VOLCANIC_MINE_VENT_C_PERCENTAGE: WidgetInfo;
		static VOLCANIC_MINE_VENT_A_STATUS: WidgetInfo;
		static VOLCANIC_MINE_VENT_B_STATUS: WidgetInfo;
		static VOLCANIC_MINE_VENT_C_STATUS: WidgetInfo;
		static FRIEND_CHAT_TITLE: WidgetInfo;
		static FRIEND_LIST_FULL_CONTAINER: WidgetInfo;
		static FRIEND_LIST_SORT_BY_NAME_BUTTON: WidgetInfo;
		static FRIEND_LIST_SORT_BY_LAST_WORLD_CHANGE_BUTTON: WidgetInfo;
		static FRIEND_LIST_SORT_BY_WORLD_BUTTON: WidgetInfo;
		static FRIEND_LIST_LEGACY_SORT_BUTTON: WidgetInfo;
		static FRIEND_LIST_NAMES_CONTAINER: WidgetInfo;
		static FRIEND_LIST_SCROLL_BAR: WidgetInfo;
		static FRIEND_LIST_LOADING_TEXT: WidgetInfo;
		static FRIEND_LIST_PREVIOUS_NAME_HOLDER: WidgetInfo;
		static IGNORE_TITLE: WidgetInfo;
		static IGNORE_FULL_CONTAINER: WidgetInfo;
		static IGNORE_SORT_BY_NAME_BUTTON: WidgetInfo;
		static IGNORE_LEGACY_SORT_BUTTON: WidgetInfo;
		static IGNORE_NAMES_CONTAINER: WidgetInfo;
		static IGNORE_SCROLL_BAR: WidgetInfo;
		static IGNORE_LOADING_TEXT: WidgetInfo;
		static IGNORE_PREVIOUS_NAME_HOLDER: WidgetInfo;
		static EXPLORERS_RING_ALCH_INVENTORY: WidgetInfo;
		static FRIENDS_CHAT_ROOT: WidgetInfo;
		static FRIENDS_CHAT_TITLE: WidgetInfo;
		static FRIENDS_CHAT_OWNER: WidgetInfo;
		static FRIENDS_CHAT_LIST: WidgetInfo;
		static BANK_CONTAINER: WidgetInfo;
		static BANK_SEARCH_BUTTON_BACKGROUND: WidgetInfo;
		static BANK_ITEM_CONTAINER: WidgetInfo;
		static BANK_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static BANK_EQUIPMENT_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static BANK_TITLE_BAR: WidgetInfo;
		static BANK_INCINERATOR: WidgetInfo;
		static BANK_INCINERATOR_CONFIRM: WidgetInfo;
		static BANK_CONTENT_CONTAINER: WidgetInfo;
		static BANK_DEPOSIT_EQUIPMENT: WidgetInfo;
		static BANK_DEPOSIT_INVENTORY: WidgetInfo;
		static BANK_TAB_CONTAINER: WidgetInfo;
		static BANK_EQUIPMENT_CONTAINER: WidgetInfo;
		static BANK_EQUIPMENT_BUTTON: WidgetInfo;
		static BANK_POPUP: WidgetInfo;
		static BANK_ITEM_COUNT_TOP: WidgetInfo;
		static BANK_ITEM_COUNT_BAR: WidgetInfo;
		static BANK_ITEM_COUNT_BOTTOM: WidgetInfo;
		static BANK_GROUP_STORAGE_BUTTON: WidgetInfo;
		static BANK_SCROLLBAR: WidgetInfo;
		static BANK_PIN_CONTAINER: WidgetInfo;
		static BANK_SETTINGS_BUTTON: WidgetInfo;
		static BANK_TUTORIAL_BUTTON: WidgetInfo;
		static GROUP_STORAGE_UI: WidgetInfo;
		static GROUP_STORAGE_ITEM_CONTAINER: WidgetInfo;
		static GRAND_EXCHANGE_WINDOW_CONTAINER: WidgetInfo;
		static GRAND_EXCHANGE_OFFER_CONTAINER: WidgetInfo;
		static GRAND_EXCHANGE_OFFER_TEXT: WidgetInfo;
		static GRAND_EXCHANGE_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static DEPOSIT_BOX_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static SHOP_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static SMITHING_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static GUIDE_PRICES_ITEMS_CONTAINER: WidgetInfo;
		static GUIDE_PRICES_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static RUNE_POUCH_ITEM_CONTAINER: WidgetInfo;
		static MINIMAP_ORBS: WidgetInfo;
		static MINIMAP_XP_ORB: WidgetInfo;
		static MINIMAP_PRAYER_ORB: WidgetInfo;
		static MINIMAP_QUICK_PRAYER_ORB: WidgetInfo;
		static MINIMAP_PRAYER_ORB_TEXT: WidgetInfo;
		static MINIMAP_RUN_ORB: WidgetInfo;
		static MINIMAP_TOGGLE_RUN_ORB: WidgetInfo;
		static MINIMAP_RUN_ORB_TEXT: WidgetInfo;
		static MINIMAP_HEALTH_ORB: WidgetInfo;
		static MINIMAP_SPEC_ORB: WidgetInfo;
		static MINIMAP_WORLDMAP_ORB: WidgetInfo;
		static MINIMAP_WIKI_BANNER_PARENT: WidgetInfo;
		static MINIMAP_WIKI_BANNER: WidgetInfo;
		static MINIMAP_WORLDMAP_OPTIONS: WidgetInfo;
		static LMS_INFO: WidgetInfo;
		static LMS_KDA: WidgetInfo;
		static LOGIN_CLICK_TO_PLAY_SCREEN: WidgetInfo;
		static LOGIN_CLICK_TO_PLAY_SCREEN_MESSAGE_OF_THE_DAY: WidgetInfo;
		static FIXED_VIEWPORT: WidgetInfo;
		static FIXED_VIEWPORT_ROOT_INTERFACE_CONTAINER: WidgetInfo;
		static FIXED_VIEWPORT_BANK_CONTAINER: WidgetInfo;
		static FIXED_VIEWPORT_INTERFACE_CONTAINER: WidgetInfo;
		static FIXED_VIEWPORT_INVENTORY_CONTAINER: WidgetInfo;
		static FIXED_VIEWPORT_COMBAT_TAB: WidgetInfo;
		static FIXED_VIEWPORT_STATS_TAB: WidgetInfo;
		static FIXED_VIEWPORT_QUESTS_TAB: WidgetInfo;
		static FIXED_VIEWPORT_INVENTORY_TAB: WidgetInfo;
		static FIXED_VIEWPORT_EQUIPMENT_TAB: WidgetInfo;
		static FIXED_VIEWPORT_PRAYER_TAB: WidgetInfo;
		static FIXED_VIEWPORT_MAGIC_TAB: WidgetInfo;
		static FIXED_VIEWPORT_FRIENDS_CHAT_TAB: WidgetInfo;
		static FIXED_VIEWPORT_FRIENDS_TAB: WidgetInfo;
		static FIXED_VIEWPORT_IGNORES_TAB: WidgetInfo;
		static FIXED_VIEWPORT_LOGOUT_TAB: WidgetInfo;
		static FIXED_VIEWPORT_OPTIONS_TAB: WidgetInfo;
		static FIXED_VIEWPORT_EMOTES_TAB: WidgetInfo;
		static FIXED_VIEWPORT_MUSIC_TAB: WidgetInfo;
		static FIXED_VIEWPORT_COMBAT_ICON: WidgetInfo;
		static FIXED_VIEWPORT_STATS_ICON: WidgetInfo;
		static FIXED_VIEWPORT_QUESTS_ICON: WidgetInfo;
		static FIXED_VIEWPORT_INVENTORY_ICON: WidgetInfo;
		static FIXED_VIEWPORT_EQUIPMENT_ICON: WidgetInfo;
		static FIXED_VIEWPORT_PRAYER_ICON: WidgetInfo;
		static FIXED_VIEWPORT_MAGIC_ICON: WidgetInfo;
		static FIXED_VIEWPORT_FRIENDS_CHAT_ICON: WidgetInfo;
		static FIXED_VIEWPORT_FRIENDS_ICON: WidgetInfo;
		static FIXED_VIEWPORT_IGNORES_ICON: WidgetInfo;
		static FIXED_VIEWPORT_LOGOUT_ICON: WidgetInfo;
		static FIXED_VIEWPORT_OPTIONS_ICON: WidgetInfo;
		static FIXED_VIEWPORT_EMOTES_ICON: WidgetInfo;
		static FIXED_VIEWPORT_MUSIC_ICON: WidgetInfo;
		static FIXED_VIEWPORT_MINIMAP: WidgetInfo;
		static FIXED_VIEWPORT_MINIMAP_DRAW_AREA: WidgetInfo;
		static RESIZABLE_MINIMAP_STONES_WIDGET: WidgetInfo;
		static RESIZABLE_MINIMAP_STONES_DRAW_AREA: WidgetInfo;
		static RESIZABLE_MINIMAP_STONES_ORB_HOLDER: WidgetInfo;
		static RESIZABLE_VIEWPORT_OLD_SCHOOL_BOX: WidgetInfo;
		static RESIZABLE_VIEWPORT_COMBAT_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_STATS_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_QUESTS_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_INVENTORY_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_EQUIPMENT_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_PRAYER_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_MAGIC_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_FRIENDS_CHAT_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_FRIENDS_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_IGNORES_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_LOGOUT_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_OPTIONS_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_EMOTES_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_MUSIC_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_COMBAT_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_STATS_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_QUESTS_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_INVENTORY_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_EQUIPMENT_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_PRAYER_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_MAGIC_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_FRIENDS_CHAT_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_FRIENDS_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_IGNORES_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_LOGOUT_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_OPTIONS_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_EMOTES_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_MUSIC_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_INTERFACE_CONTAINER: WidgetInfo;
		static RESIZABLE_VIEWPORT_INVENTORY_CONTAINER: WidgetInfo;
		static RESIZABLE_VIEWPORT_CHATBOX_PARENT: WidgetInfo;
		static RESIZABLE_VIEWPORT_INVENTORY_PARENT: WidgetInfo;
		static RESIZABLE_MINIMAP_WIDGET: WidgetInfo;
		static RESIZABLE_MINIMAP_DRAW_AREA: WidgetInfo;
		static RESIZABLE_MINIMAP_ORB_HOLDER: WidgetInfo;
		static RESIZABLE_MINIMAP_LOGOUT_BUTTON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_LOGOUT_BUTTON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_QUESTS_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_INVENTORY_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_INVENTORY_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_PRAYER_TAB: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_PRAYER_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_EQUIPMENT_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_COMBAT_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_STATS_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_MAGIC_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_FRIEND_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_FRIEND_CHAT_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_OPTIONS_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_EMOTES_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_MUSIC_ICON: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_INVENTORY_CONTAINER: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_INTERFACE_CONTAINER: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_CHATBOX_PARENT: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_TABS1: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_TABS2: WidgetInfo;
		static RESIZABLE_VIEWPORT_BOTTOM_LINE_INVENTORY_PARENT: WidgetInfo;
		static COMBAT_LEVEL: WidgetInfo;
		static COMBAT_STYLE_ONE: WidgetInfo;
		static COMBAT_STYLE_TWO: WidgetInfo;
		static COMBAT_STYLE_THREE: WidgetInfo;
		static COMBAT_STYLE_FOUR: WidgetInfo;
		static COMBAT_SPELLS: WidgetInfo;
		static COMBAT_DEFENSIVE_SPELL_BOX: WidgetInfo;
		static COMBAT_DEFENSIVE_SPELL_ICON: WidgetInfo;
		static COMBAT_DEFENSIVE_SPELL_SHIELD: WidgetInfo;
		static COMBAT_DEFENSIVE_SPELL_TEXT: WidgetInfo;
		static COMBAT_SPELL_BOX: WidgetInfo;
		static COMBAT_SPELL_ICON: WidgetInfo;
		static COMBAT_SPELL_TEXT: WidgetInfo;
		static COMBAT_AUTO_RETALIATE: WidgetInfo;
		static DIALOG_OPTION: WidgetInfo;
		static DIALOG_OPTION_OPTIONS: WidgetInfo;
		static DIALOG_SPRITE: WidgetInfo;
		static DIALOG_SPRITE_SPRITE: WidgetInfo;
		static DIALOG_SPRITE_TEXT: WidgetInfo;
		static DIALOG_DOUBLE_SPRITE_TEXT: WidgetInfo;
		static DIALOG_DOUBLE_SPRITE_SPRITE1: WidgetInfo;
		static DIALOG_DOUBLE_SPRITE_SPRITE2: WidgetInfo;
		static DIALOG_NPC_NAME: WidgetInfo;
		static DIALOG_NPC_TEXT: WidgetInfo;
		static DIALOG_NPC_HEAD_MODEL: WidgetInfo;
		static DIALOG_PLAYER: WidgetInfo;
		static DIALOG_PLAYER_TEXT: WidgetInfo;
		static PRIVATE_CHAT_MESSAGE: WidgetInfo;
		static SLAYER_REWARDS_TOPBAR: WidgetInfo;
		static CHATBOX_PARENT: WidgetInfo;
		static CHATBOX: WidgetInfo;
		static CHATBOX_MESSAGES: WidgetInfo;
		static CHATBOX_BUTTONS: WidgetInfo;
		static CHATBOX_TITLE: WidgetInfo;
		static CHATBOX_FULL_INPUT: WidgetInfo;
		static CHATBOX_GE_SEARCH_RESULTS: WidgetInfo;
		static CHATBOX_CONTAINER: WidgetInfo;
		static CHATBOX_REPORT_TEXT: WidgetInfo;
		static CHATBOX_INPUT: WidgetInfo;
		static CHATBOX_TRANSPARENT_BACKGROUND: WidgetInfo;
		static CHATBOX_TRANSPARENT_LINES: WidgetInfo;
		static CHATBOX_MESSAGE_LINES: WidgetInfo;
		static CHATBOX_FIRST_MESSAGE: WidgetInfo;
		static CHATBOX_TAB_ALL: WidgetInfo;
		static CHATBOX_TAB_GAME: WidgetInfo;
		static CHATBOX_TAB_PUBLIC: WidgetInfo;
		static CHATBOX_TAB_PRIVATE: WidgetInfo;
		static CHATBOX_TAB_CHANNEL: WidgetInfo;
		static CHATBOX_TAB_CLAN: WidgetInfo;
		static CHATBOX_TAB_TRADE: WidgetInfo;
		static BA_TEAM: WidgetInfo;
		static BA_HEAL_ROLE_TEXT: WidgetInfo;
		static BA_HEAL_ROLE_SPRITE: WidgetInfo;
		static BA_HEAL_TEAMMATES: WidgetInfo;
		static BA_HEAL_TEAMMATE1: WidgetInfo;
		static BA_HEAL_TEAMMATE2: WidgetInfo;
		static BA_HEAL_TEAMMATE3: WidgetInfo;
		static BA_HEAL_TEAMMATE4: WidgetInfo;
		static BA_COLL_ROLE_TEXT: WidgetInfo;
		static BA_COLL_ROLE_SPRITE: WidgetInfo;
		static BA_ATK_ROLE_TEXT: WidgetInfo;
		static BA_ATK_ROLE_SPRITE: WidgetInfo;
		static BA_DEF_ROLE_TEXT: WidgetInfo;
		static BA_DEF_ROLE_SPRITE: WidgetInfo;
		static BA_REWARD_TEXT: WidgetInfo;
		static LEVEL_UP: WidgetInfo;
		static LEVEL_UP_SKILL: WidgetInfo;
		static LEVEL_UP_LEVEL: WidgetInfo;
		static QUEST_COMPLETED: WidgetInfo;
		static QUEST_COMPLETED_NAME_TEXT: WidgetInfo;
		static MOTHERLODE_MINE: WidgetInfo;
		static GWD_KC: WidgetInfo;
		static PUZZLE_BOX: WidgetInfo;
		static LIGHT_BOX: WidgetInfo;
		static LIGHT_BOX_CONTENTS: WidgetInfo;
		static LIGHT_BOX_BUTTON_A: WidgetInfo;
		static LIGHT_BOX_BUTTON_B: WidgetInfo;
		static LIGHT_BOX_BUTTON_C: WidgetInfo;
		static LIGHT_BOX_BUTTON_D: WidgetInfo;
		static LIGHT_BOX_BUTTON_E: WidgetInfo;
		static LIGHT_BOX_BUTTON_F: WidgetInfo;
		static LIGHT_BOX_BUTTON_G: WidgetInfo;
		static LIGHT_BOX_BUTTON_H: WidgetInfo;
		static LIGHT_BOX_WINDOW: WidgetInfo;
		static NIGHTMARE_ZONE: WidgetInfo;
		static NIGHTMARE_PILLAR_HEALTH: WidgetInfo;
		static RAIDS_POINTS_INFOBOX: WidgetInfo;
		static RAIDS_PRIVATE_STORAGE_ITEM_CONTAINER: WidgetInfo;
		static TOB_PARTY_INTERFACE: WidgetInfo;
		static TOB_PARTY_STATS: WidgetInfo;
		static TOB_HEALTH_BAR: WidgetInfo;
		static BLAST_FURNACE_COFFER: WidgetInfo;
		static PYRAMID_PLUNDER_DATA: WidgetInfo;
		static EXPERIENCE_TRACKER: WidgetInfo;
		static EXPERIENCE_TRACKER_WIDGET: WidgetInfo;
		static EXPERIENCE_TRACKER_BOTTOM_BAR: WidgetInfo;
		static FISHING_TRAWLER_CONTRIBUTION: WidgetInfo;
		static FISHING_TRAWLER_TIMER: WidgetInfo;
		static TITHE_FARM: WidgetInfo;
		static BARROWS_BROTHERS: WidgetInfo;
		static BARROWS_POTENTIAL: WidgetInfo;
		static BARROWS_PUZZLE_PARENT: WidgetInfo;
		static BARROWS_PUZZLE_ANSWER1: WidgetInfo;
		static BARROWS_PUZZLE_ANSWER1_CONTAINER: WidgetInfo;
		static BARROWS_PUZZLE_ANSWER2: WidgetInfo;
		static BARROWS_PUZZLE_ANSWER2_CONTAINER: WidgetInfo;
		static BARROWS_PUZZLE_ANSWER3: WidgetInfo;
		static BARROWS_PUZZLE_ANSWER3_CONTAINER: WidgetInfo;
		static BARROWS_FIRST_PUZZLE: WidgetInfo;
		static BLAST_MINE: WidgetInfo;
		static FAIRY_RING: WidgetInfo;
		static FAIRY_RING_HEADER: WidgetInfo;
		static FAIRY_RING_LIST: WidgetInfo;
		static FAIRY_RING_FAVORITES: WidgetInfo;
		static FAIRY_RING_LIST_SEPARATOR: WidgetInfo;
		static FAIRY_RING_LIST_SCROLLBAR: WidgetInfo;
		static DESTROY_ITEM: WidgetInfo;
		static DESTROY_ITEM_NAME: WidgetInfo;
		static DESTROY_ITEM_YES: WidgetInfo;
		static DESTROY_ITEM_NO: WidgetInfo;
		static VARROCK_MUSEUM_QUESTION: WidgetInfo;
		static VARROCK_MUSEUM_FIRST_ANSWER: WidgetInfo;
		static VARROCK_MUSEUM_SECOND_ANSWER: WidgetInfo;
		static VARROCK_MUSEUM_THIRD_ANSWER: WidgetInfo;
		static KILL_LOG_TITLE: WidgetInfo;
		static KILL_LOG_MONSTER: WidgetInfo;
		static KILL_LOG_KILLS: WidgetInfo;
		static KILL_LOG_STREAK: WidgetInfo;
		static ADVENTURE_LOG: WidgetInfo;
		static COLLECTION_LOG: WidgetInfo;
		static COLLECTION_LOG_TABS: WidgetInfo;
		static COLLECTION_LOG_ENTRY: WidgetInfo;
		static COLLECTION_LOG_ENTRY_HEADER: WidgetInfo;
		static COLLECTION_LOG_ENTRY_ITEMS: WidgetInfo;
		static GENERIC_SCROLL_TEXT: WidgetInfo;
		static WORLD_SWITCHER_LIST: WidgetInfo;
		static FOSSIL_ISLAND_OXYGENBAR: WidgetInfo;
		static MINIGAME_TELEPORT_BUTTON: WidgetInfo;
		static SPELL_LUMBRIDGE_HOME_TELEPORT: WidgetInfo;
		static SPELL_EDGEVILLE_HOME_TELEPORT: WidgetInfo;
		static SPELL_LUNAR_HOME_TELEPORT: WidgetInfo;
		static SPELL_ARCEUUS_HOME_TELEPORT: WidgetInfo;
		static SPELL_KOUREND_HOME_TELEPORT: WidgetInfo;
		static SPELL_CATHERBY_HOME_TELEPORT: WidgetInfo;
		static SPELL_LUNAR_FERTILE_SOIL: WidgetInfo;
		static PVP_WILDERNESS_SKULL_CONTAINER: WidgetInfo;
		static PVP_SKULL_CONTAINER: WidgetInfo;
		static PVP_WORLD_SAFE_ZONE: WidgetInfo;
		static PVP_WILDERNESS_LEVEL: WidgetInfo;
		static PVP_KILLDEATH_COUNTER: WidgetInfo;
		static ZEAH_MESS_HALL_COOKING_DISPLAY: WidgetInfo;
		static LOOTING_BAG_CONTAINER: WidgetInfo;
		static SKOTIZO_CONTAINER: WidgetInfo;
		static CHARACTER_SUMMARY_CONTAINER: WidgetInfo;
		static QUESTLIST_BOX: WidgetInfo;
		static QUESTLIST_CONTAINER: WidgetInfo;
		static SEED_VAULT_TITLE_CONTAINER: WidgetInfo;
		static SEED_VAULT_ITEM_CONTAINER: WidgetInfo;
		static SEED_VAULT_ITEM_TEXT: WidgetInfo;
		static SEED_VAULT_SEARCH_BUTTON: WidgetInfo;
		static SEED_VAULT_INVENTORY_ITEMS_CONTAINER: WidgetInfo;
		static SETTINGS_SIDE_CAMERA_ZOOM_SLIDER_TRACK: WidgetInfo;
		static SETTINGS_SIDE_MUSIC_SLIDER: WidgetInfo;
		static SETTINGS_SIDE_MUSIC_SLIDER_STEP_HOLDER: WidgetInfo;
		static SETTINGS_SIDE_SOUND_EFFECT_SLIDER: WidgetInfo;
		static SETTINGS_SIDE_AREA_SOUND_SLIDER: WidgetInfo;
		static SETTINGS_INIT: WidgetInfo;
		static ACHIEVEMENT_DIARY_CONTAINER: WidgetInfo;
		static SKILLS_CONTAINER: WidgetInfo;
		static GAUNTLET_TIMER_CONTAINER: WidgetInfo;
		static HALLOWED_SEPULCHRE_TIMER_CONTAINER: WidgetInfo;
		static HEALTH_OVERLAY_BAR: WidgetInfo;
		static HEALTH_OVERLAY_BAR_TEXT: WidgetInfo;
		static TRAILBLAZER_AREA_TELEPORT: WidgetInfo;
		static MULTICOMBAT_FIXED: WidgetInfo;
		static MULTICOMBAT_RESIZABLE_MODERN: WidgetInfo;
		static MULTICOMBAT_RESIZABLE_CLASSIC: WidgetInfo;
		static TEMPOROSS_STATUS_INDICATOR: WidgetInfo;
		static TEMPOROSS_LOBBY: WidgetInfo;
		static CLAN_LAYER: WidgetInfo;
		static CLAN_HEADER: WidgetInfo;
		static CLAN_MEMBER_LIST: WidgetInfo;
		static CLAN_GUEST_LAYER: WidgetInfo;
		static CLAN_GUEST_HEADER: WidgetInfo;
		static CLAN_GUEST_MEMBER_LIST: WidgetInfo;
		static POH_TREASURE_CHEST_INVENTORY_CONTAINER: WidgetInfo;
		static TRADE_WINDOW_HEADER: WidgetInfo;
		static TOA_PARTY_LAYER: WidgetInfo;
		static TOA_RAID_LAYER: WidgetInfo;
		static QUICK_PRAYER_PRAYERS: WidgetInfo;
		static GOTR_MAIN_DISPLAY: WidgetInfo;
		static TROUBLE_BREWING_SCORE: WidgetInfo;
		static TROUBLE_BREWING_LOBBY: WidgetInfo;
		static MORTTON_TEMPLE_STATUS: WidgetInfo;
		static BGR_RANK_DISPLAY_DRAUGHTS: WidgetInfo;
		static BGR_RANK_DISPLAY_RUNELINK: WidgetInfo;
		static BGR_RANK_DISPLAY_RUNESQUARES: WidgetInfo;
		static BGR_RANK_DISPLAY_RUNEVERSI: WidgetInfo;
		static AGILITY_ARENA_LIGHT_INDICATOR: WidgetInfo;
		static GNOMEBALL_SCORE: WidgetInfo;
		static MTA_ALCHEMY_POINTS: WidgetInfo;
		static MTA_ENCHANT_POINTS: WidgetInfo;
		static MTA_ENCHANT_BONUS: WidgetInfo;
		static MTA_GRAVEYARD_POINTS: WidgetInfo;
		static MTA_GRAVEYARD_VALUES: WidgetInfo;
		static MTA_TELEKINETIC_POINTS: WidgetInfo;
		static MTA_TELEKINETIC_SOLVED: WidgetInfo;
		static STRANGLER_INFECTION_OVERLAY: WidgetInfo;
		static SANITY_OVERLAY: WidgetInfo;
		static int: WidgetInfo;
		/**
		 * Gets the ID of the group-child pairing.
		 *
		 * @return the ID
		 */
		getId(): number;
		/**
		 * Gets the group ID of the pair.
		 *
		 * @return the group ID
		 */
		getGroupId(): number;
		/**
		 * Gets the ID of the child in the group.
		 *
		 * @return the child ID
		 */
		getChildId(): number;
		/**
		 * Gets the packed widget ID.
		 *
		 * @return the packed ID
		 */
		getPackedId(): number;
		/**
		 * Utility method that converts an ID returned by {@link #getId()} back
		 * to its group ID.
		 *
		 * @param id passed group-child ID
		 * @return the group ID
		 */
		static TO_GROUP(id: number): number;
		/**
		 * Utility method that converts an ID returned by {@link #getId()} back
		 * to its child ID.
		 *
		 * @param id passed group-child ID
		 * @return the child ID
		 */
		static TO_CHILD(id: number): number;
		/**
		 * Packs the group and child IDs into a single integer.
		 *
		 * @param groupId the group ID
		 * @param childId the child ID
		 * @return the packed ID
		 */
		static PACK(groupId: number, childId: number): number;
	}
}