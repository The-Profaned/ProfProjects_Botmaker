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
	/** @deprecated */
	export class WidgetID {
		static readonly FAIRY_RING_PANEL_GROUP_ID = InterfaceID.FAIRY_RING_PANEL;
		static readonly FAIRY_RING_GROUP_ID = InterfaceID.FAIRY_RING;
		static readonly LOGOUT_PANEL_ID = InterfaceID.LOGOUT_PANEL;
		static readonly BANK_GROUP_ID = InterfaceID.BANK;
		static readonly BANK_INVENTORY_GROUP_ID = InterfaceID.BANK_INVENTORY;
		static readonly GRAND_EXCHANGE_INVENTORY_GROUP_ID = InterfaceID.GRAND_EXCHANGE_INVENTORY;
		static readonly GRAND_EXCHANGE_GROUP_ID = InterfaceID.GRAND_EXCHANGE;
		static readonly DEPOSIT_BOX_GROUP_ID = InterfaceID.DEPOSIT_BOX;
		static readonly INVENTORY_GROUP_ID = InterfaceID.INVENTORY;
		static readonly PLAYER_TRADE_SCREEN_GROUP_ID = InterfaceID.TRADE;
		static readonly PLAYER_TRADE_INVENTORY_GROUP_ID = InterfaceID.TRADE_INVENTORY;
		static readonly FRIENDS_LIST_GROUP_ID = InterfaceID.FRIEND_LIST;
		static readonly IGNORE_LIST_GROUP_ID = InterfaceID.IGNORE_LIST;
		static readonly RAIDING_PARTY_GROUP_ID = InterfaceID.RAIDING_PARTY;
		static readonly EQUIPMENT_GROUP_ID = InterfaceID.EQUIPMENT;
		static readonly EQUIPMENT_INVENTORY_GROUP_ID = InterfaceID.EQUIPMENT_INVENTORY;
		static readonly EMOTES_GROUP_ID = InterfaceID.EMOTES;
		static readonly RUNE_POUCH_GROUP_ID = InterfaceID.RUNE_POUCH;
		static readonly ACHIEVEMENT_DIARY_GROUP_ID = InterfaceID.ACHIEVEMENT_DIARY;
		static readonly PEST_CONTROL_BOAT_GROUP_ID = InterfaceID.PEST_CONTROL_BOAT;
		static readonly PEST_CONTROL_GROUP_ID = InterfaceID.PEST_CONTROL;
		static readonly FRIENDS_CHAT_GROUP_ID = InterfaceID.FRIENDS_CHAT;
		static readonly MINIMAP_GROUP_ID = InterfaceID.MINIMAP;
		static readonly LOGIN_CLICK_TO_PLAY_GROUP_ID = InterfaceID.LOGIN_CLICK_TO_PLAY_SCREEN;
		static readonly CLUE_SCROLL_GROUP_ID = InterfaceID.CLUESCROLL;
		static readonly FIXED_VIEWPORT_GROUP_ID = InterfaceID.FIXED_VIEWPORT;
		static readonly RESIZABLE_VIEWPORT_OLD_SCHOOL_BOX_GROUP_ID = InterfaceID.RESIZABLE_VIEWPORT;
		static readonly RESIZABLE_VIEWPORT_BOTTOM_LINE_GROUP_ID = InterfaceID.RESIZABLE_VIEWPORT_BOTTOM_LINE;
		static readonly SHOP_GROUP_ID = InterfaceID.SHOP;
		static readonly SHOP_INVENTORY_GROUP_ID = InterfaceID.SHOP_INVENTORY;
		static readonly SMITHING_GROUP_ID = InterfaceID.SMITHING;
		static readonly GUIDE_PRICES_GROUP_ID = InterfaceID.GUIDE_PRICES;
		static readonly GUIDE_PRICES_INVENTORY_GROUP_ID = InterfaceID.GUIDE_PRICES_INVENTORY;
		static readonly COMBAT_GROUP_ID = InterfaceID.COMBAT;
		static readonly DIALOG_NPC_GROUP_ID = InterfaceID.DIALOG_NPC;
		static readonly SLAYER_REWARDS_GROUP_ID = InterfaceID.SLAYER_REWARDS;
		static readonly PRIVATE_CHAT = InterfaceID.PRIVATE_CHAT;
		static readonly CHATBOX_GROUP_ID = InterfaceID.CHATBOX;
		static readonly VOLCANIC_MINE_GROUP_ID = InterfaceID.VOLCANIC_MINE;
		static readonly BA_ATTACKER_GROUP_ID = InterfaceID.BA_ATTACKER;
		static readonly BA_COLLECTOR_GROUP_ID = InterfaceID.BA_COLLECTOR;
		static readonly BA_DEFENDER_GROUP_ID = InterfaceID.BA_DEFENDER;
		static readonly BA_HEALER_GROUP_ID = InterfaceID.BA_HEALER;
		static readonly BA_REWARD_GROUP_ID = InterfaceID.BA_REWARD;
		static readonly BA_TEAM_GROUP_ID = InterfaceID.BA_TEAM;
		static readonly LEVEL_UP_GROUP_ID = InterfaceID.LEVEL_UP;
		static readonly DIALOG_SPRITE_GROUP_ID = InterfaceID.DIALOG_SPRITE;
		static readonly DIALOG_DOUBLE_SPRITE_GROUP_ID = InterfaceID.DIALOG_DOUBLE_SPRITE;
		static readonly QUEST_COMPLETED_GROUP_ID = InterfaceID.QUEST_COMPLETED;
		static readonly CLUE_SCROLL_REWARD_GROUP_ID = InterfaceID.CLUESCROLL_REWARD;
		static readonly BARROWS_REWARD_GROUP_ID = InterfaceID.BARROWS_REWARD;
		static readonly RAIDS_GROUP_ID = InterfaceID.RAIDS;
		static readonly TOB_GROUP_ID = InterfaceID.TOB;
		static readonly MOTHERLODE_MINE_GROUP_ID = InterfaceID.MLM;
		static readonly EXPERIENCE_DROP_GROUP_ID = InterfaceID.EXPERIENCE_TRACKER;
		static readonly PUZZLE_BOX_GROUP_ID = InterfaceID.PUZZLE_BOX;
		static readonly LIGHT_BOX_GROUP_ID = InterfaceID.LIGHT_BOX;
		static readonly NIGHTMARE_ZONE_GROUP_ID = InterfaceID.NMZ;
		static readonly NIGHTMARE_PILLAR_HEALTH_GROUP_ID = InterfaceID.NIGHTMARE_PILLAR_HEALTH;
		static readonly BLAST_FURNACE_GROUP_ID = InterfaceID.BLAST_FURNACE;
		static readonly WORLD_MAP_GROUP_ID = InterfaceID.WORLD_MAP;
		static readonly PYRAMID_PLUNDER_GROUP_ID = InterfaceID.PYRAMID_PLUNDER;
		static readonly CHAMBERS_OF_XERIC_REWARD_GROUP_ID = InterfaceID.CHAMBERS_OF_XERIC_REWARD;
		static readonly THEATRE_OF_BLOOD_REWARD_GROUP_ID = InterfaceID.TOB_REWARD;
		static readonly EXPERIENCE_TRACKER_GROUP_ID = InterfaceID.EXPERIENCE_TRACKER;
		static readonly TITHE_FARM_GROUP_ID = InterfaceID.TITHE_FARM;
		static readonly KINGDOM_GROUP_ID = InterfaceID.KINGDOM;
		static readonly BARROWS_GROUP_ID = InterfaceID.BARROWS;
		static readonly BLAST_MINE_GROUP_ID = InterfaceID.BLAST_MINE;
		static readonly MTA_ALCHEMY_GROUP_ID = InterfaceID.MTA_ALCHEMY;
		static readonly MTA_ENCHANT_GROUP_ID = InterfaceID.MTA_ENCHANT;
		static readonly MTA_GRAVEYARD_GROUP_ID = InterfaceID.MTA_GRAVEYARD;
		static readonly MTA_TELEKINETIC_GROUP_ID = InterfaceID.MTA_TELEKINETIC;
		static readonly CORP_DAMAGE = InterfaceID.CORP_DAMAGE;
		static readonly DESTROY_ITEM_GROUP_ID = InterfaceID.DESTROY_ITEM;
		static readonly VARROCK_MUSEUM_QUIZ_GROUP_ID = InterfaceID.VARROCK_MUSEUM;
		static readonly KILL_LOGS_GROUP_ID = InterfaceID.KILL_LOG;
		static readonly DIARY_QUEST_GROUP_ID = InterfaceID.DIARY;
		static readonly THEATRE_OF_BLOOD_GROUP_ID = InterfaceID.TOB;
		static readonly WORLD_SWITCHER_GROUP_ID = InterfaceID.WORLD_SWITCHER;
		static readonly DIALOG_OPTION_GROUP_ID = InterfaceID.DIALOG_OPTION;
		static readonly DIALOG_PLAYER_GROUP_ID = InterfaceID.DIALOG_PLAYER;
		static readonly DRIFT_NET_FISHING_REWARD_GROUP_ID = InterfaceID.DRIFT_NET_FISHING_REWARD;
		static readonly FOSSIL_ISLAND_OXYGENBAR_ID = InterfaceID.FOSSIL_ISLAND_OXYGEN_BAR;
		static readonly SPELLBOOK_GROUP_ID = InterfaceID.SPELLBOOK;
		static readonly PVP_GROUP_ID = InterfaceID.PVP;
		static readonly FISHING_TRAWLER_GROUP_ID = InterfaceID.TRAWLER;
		static readonly FISHING_TRAWLER_REWARD_GROUP_ID = InterfaceID.TRAWLER_REWARD;
		static readonly ZEAH_MESS_HALL_GROUP_ID = InterfaceID.ZEAH_MESS_HALL;
		static readonly LOOTING_BAG_GROUP_ID = InterfaceID.LOOTING_BAG;
		static readonly SKOTIZO_GROUP_ID = InterfaceID.SKOTIZO;
		static readonly FULLSCREEN_CONTAINER_TLI = InterfaceID.FULLSCREEN_CONTAINER_TLI;
		static readonly CHARACTER_SUMMARY_GROUP_ID = InterfaceID.CHARACTER_SUMMARY;
		static readonly QUESTLIST_GROUP_ID = InterfaceID.QUEST_LIST;
		static readonly SKILLS_GROUP_ID = InterfaceID.SKILLS;
		static readonly MUSIC_GROUP_ID = InterfaceID.MUSIC;
		static readonly BARROWS_PUZZLE_GROUP_ID = InterfaceID.BARROWS_PUZZLE;
		static readonly KEPT_ON_DEATH_GROUP_ID = InterfaceID.KEPT_ON_DEATH;
		static readonly GUIDE_PRICE_GROUP_ID = InterfaceID.GUIDE_PRICES;
		static readonly SEED_VAULT_INVENTORY_GROUP_ID = InterfaceID.SEED_VAULT_INVENTORY;
		static readonly BEGINNER_CLUE_MAP_CHAMPIONS_GUILD = InterfaceID.CLUE_BEGINNER_MAP_CHAMPIONS_GUILD;
		static readonly BEGINNER_CLUE_MAP_VARROCK_EAST_MINE = InterfaceID.CLUE_BEGINNER_MAP_VARROCK_EAST_MINE;
		static readonly BEGINNER_CLUE_MAP_DRAYNOR = InterfaceID.CLUE_BEGINNER_MAP_DYANOR;
		static readonly BEGINNER_CLUE_MAP_NORTH_OF_FALADOR = InterfaceID.CLUE_BEGINNER_MAP_NORTH_OF_FALADOR;
		static readonly BEGINNER_CLUE_MAP_WIZARDS_TOWER = InterfaceID.CLUE_BEGINNER_MAP_WIZARDS_TOWER;
		static readonly SEED_BOX_GROUP_ID = InterfaceID.SEED_BOX;
		static readonly SEED_VAULT_GROUP_ID = InterfaceID.SEED_VAULT;
		static readonly EXPLORERS_RING_ALCH_GROUP_ID = InterfaceID.EXPLORERS_RING;
		static readonly SETTINGS_SIDE_GROUP_ID = InterfaceID.SETTINGS_SIDE;
		static readonly SETTINGS_GROUP_ID = InterfaceID.SETTINGS;
		static readonly GWD_KC_GROUP_ID = InterfaceID.GWD_KC;
		static readonly LMS_GROUP_ID = InterfaceID.LMS;
		static readonly LMS_INGAME_GROUP_ID = InterfaceID.LMS_INGAME;
		static readonly ADVENTURE_LOG_ID = InterfaceID.ADVENTURE_LOG;
		static readonly COLLECTION_LOG_ID = InterfaceID.COLLECTION_LOG;
		static readonly GENERIC_SCROLL_GROUP_ID = InterfaceID.GENERIC_SCROLL;
		static readonly GAUNTLET_TIMER_GROUP_ID = InterfaceID.GAUNTLET_TIMER;
		static readonly HALLOWED_SEPULCHRE_TIMER_GROUP_ID = InterfaceID.HALLOWED_SEPULCHRE_TIMER;
		static readonly BANK_PIN_GROUP_ID = InterfaceID.BANK_PIN;
		static readonly HEALTH_OVERLAY_BAR_GROUP_ID = InterfaceID.HEALTH;
		static readonly CHAMBERS_OF_XERIC_STORAGE_UNIT_PRIVATE_GROUP_ID =
			InterfaceID.CHAMBERS_OF_XERIC_STORAGE_UNIT_PRIVATE;
		static readonly CHAMBERS_OF_XERIC_STORAGE_UNIT_SHARED_GROUP_ID = InterfaceID.CHAMBERS_OF_XERIC_STORAGE_UNIT_SHARED;
		static readonly CHAMBERS_OF_XERIC_STORAGE_UNIT_INVENTORY_GROUP_ID = InterfaceID.CHAMBERS_OF_XERIC_INVENTORY;
		static readonly DUEL_INVENTORY_GROUP_ID = InterfaceID.DUEL_INVENTORY;
		static readonly TRAILBLAZER_AREAS_GROUP_ID = InterfaceID.TRAILBLAZER_AREAS;
		static readonly TEMPOROSS_GROUP_ID = InterfaceID.TEMPOROSS;
		static readonly TEMPOROSS_LOBBY_GROUP_ID = InterfaceID.TEMPOROSS_LOBBY;
		static readonly CLAN_GROUP_ID = InterfaceID.CLAN;
		static readonly CLAN_GUEST_GROUP_ID = InterfaceID.CLAN_GUEST;
		static readonly GRAVESTONE_GROUP_ID = InterfaceID.GRAVESTONE;
		static readonly POH_TREASURE_CHEST_INVENTORY_GROUP_ID = InterfaceID.POH_TREASURE_CHEST_INV;
		static readonly GROUP_IRON_GROUP_ID = InterfaceID.GROUP_IRON;
		static readonly GROUP_STORAGE_INVENTORY_GROUP_ID = InterfaceID.GROUP_STORAGE_INVENTORY;
		static readonly GROUP_STORAGE_GROUP_ID = InterfaceID.GROUP_STORAGE;
		static readonly WILDERNESS_LOOT_CHEST = InterfaceID.WILDERNESS_LOOT_CHEST;
		static readonly TRADE_WINDOW_GROUP_ID = InterfaceID.TRADE;
		static readonly TOA_REWARD_GROUP_ID = InterfaceID.TOA_REWARD;
		/**
		 * toa party interface in the raid lobby
		 */
		static readonly TOA_PARTY_GROUP_ID = InterfaceID.TOA_PARTY;
		/**
		 * toa raid interface in the raid
		 */
		static readonly TOA_RAID_GROUP_ID = InterfaceID.TOA_RAID;
		static readonly ACHIEVEMENT_DIARY_SCROLL_GROUP_ID = InterfaceID.ACHIEVEMENT_DIARY_SCROLL;
		static readonly PRAYER_GROUP_ID = InterfaceID.PRAYER;
		static readonly QUICK_PRAYERS_GROUP_ID = InterfaceID.QUICK_PRAYER;
		static readonly GOTR_GROUP_ID = InterfaceID.GOTR;
		static readonly TROUBLE_BREWING_GROUP_ID = InterfaceID.TROUBLE_BREWING;
		static readonly TROUBLE_BREWING_LOBBY_GROUP_ID = InterfaceID.TROUBLE_BREWING_LOBBY;
		static readonly MORTTON_TEMPLE_GROUP_ID = InterfaceID.MORTTON_TEMPLE;
		static readonly BGR_RANK_DRAUGHTS_GROUP_ID = InterfaceID.BGR_RANK_DRAUGHTS;
		static readonly BGR_RANK_RUNELINK_GROUP_ID = InterfaceID.BGR_RANK_RUNELINK;
		static readonly BGR_RANK_RUNESQUARES_GROUP_ID = InterfaceID.BGR_RANK_RUNESQUARES;
		static readonly BGR_RANK_RUNEVERSI_GROUP_ID = InterfaceID.BGR_RANK_RUNEVERSI;
		static readonly AGILITY_ARENA_HUD_GROUP_ID = InterfaceID.AGILITY_ARENA;
		static readonly GNOMEBALL_SCORE_GROUP_ID = InterfaceID.GNOMEBALL;
		static readonly SANITY_GROUP_ID = InterfaceID.SANITY;
		static readonly THE_STRANGLER_INFECTION_GROUP_ID = InterfaceID.STRANGLER;
	}
}
