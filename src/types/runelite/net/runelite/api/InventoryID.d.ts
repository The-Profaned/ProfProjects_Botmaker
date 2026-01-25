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
	 * An enumeration of possible inventory types.
	 */
	export class InventoryID {
		/**
		 * Reward from fishing trawler
		 */
		static FISHING_TRAWLER_REWARD: InventoryID;
		/**
		 * The trade inventory.
		 */
		static TRADE: InventoryID;
		/**
		 * The other trade inventory.
		 */
		static TRADEOTHER: InventoryID;
		/**
		 * Standard player inventory.
		 */
		static INVENTORY: InventoryID;
		/**
		 * Equipment inventory.
		 */
		static EQUIPMENT: InventoryID;
		/**
		 * Bank inventory.
		 */
		static BANK: InventoryID;
		/**
		 * A puzzle box inventory.
		 */
		static PUZZLE_BOX: InventoryID;
		/**
		 * Barrows reward chest inventory.
		 */
		static BARROWS_REWARD: InventoryID;
		/**
		 * Monkey madness puzzle box inventory.
		 */
		static MONKEY_MADNESS_PUZZLE_BOX: InventoryID;
		/**
		 * Drift net fishing reward
		 */
		static DRIFT_NET_FISHING_REWARD: InventoryID;
		/**
		 * Kingdom Of Miscellania reward inventory.
		 */
		static KINGDOM_OF_MISCELLANIA: InventoryID;
		/**
		 * Chambers of Xeric chest inventory.
		 */
		static CHAMBERS_OF_XERIC_CHEST: InventoryID;
		/**
		 * Theater of Blood reward chest inventory (Raids 2)
		 */
		static THEATRE_OF_BLOOD_CHEST: InventoryID;
		/**
		 * Seed vault located inside the Farming Guild
		 */
		static SEED_VAULT: InventoryID;
		/**
		 * Group ironman shared storage
		 */
		static GROUP_STORAGE: InventoryID;
		/**
		 * Player inventory when accessing group ironman shared storage
		 */
		static GROUP_STORAGE_INV: InventoryID;
		/**
		 * Wilderness loot chest
		 */
		static WILDERNESS_LOOT_CHEST: InventoryID;
		/**
		 * TOA reward chest
		 */
		static TOA_REWARD_CHEST: InventoryID;
		/**
		 * Reward chest for Moons of Peril
		 */
		static LUNAR_CHEST: InventoryID;
		/**
		 * Reward chest for the Fortis Colosseum
		 */
		static FORTIS_COLOSSEUM_REWARD_CHEST: InventoryID;

		/**
		 * Gets the raw inventory type ID.
		 *
		 * @return inventory type
		 */
		getId(): number;

		toString(): string;
	}
}
