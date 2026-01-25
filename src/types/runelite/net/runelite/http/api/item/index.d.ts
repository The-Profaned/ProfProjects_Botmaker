/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
declare namespace net.runelite.http.api.item {
	export class ItemEquipmentStats {
		private slot: number;
		private is2h: boolean;
		private astab: number;
		private aslash: number;
		private acrush: number;
		private amagic: number;
		private arange: number;
		private dstab: number;
		private dslash: number;
		private dcrush: number;
		private dmagic: number;
		private drange: number;
		private str: number;
		private rstr: number;
		private mdmg: number;
		private prayer: number;
		private aspeed: number;

		constructor(
			slot: number,
			isTwoHanded: boolean,
			astab: number,
			aslash: number,
			acrush: number,
			amagic: number,
			arange: number,
			dstab: number,
			dslash: number,
			dcrush: number,
			dmagic: number,
			drange: number,
			str: number,
			rstr: number,
			mdmg: number,
			prayer: number,
			aspeed: number,
		);

		// public static builder(): ItemEquipmentStatsBuilder

		public getSlot(): number;

		public isTwoHanded(): boolean;

		public getAstab(): number;

		public getAslash(): number;

		public getAcrush(): number;

		public getAmagic(): number;

		public getArange(): number;

		public getDstab(): number;

		public getDslash(): number;

		public getDcrush(): number;

		public getDmagic(): number;

		public getDrange(): number;

		public getStr(): number;

		public getRstr(): number;

		public getMdmg(): number;

		public getPrayer(): number;

		public getAspeed(): number;

		public equals(o: Record<string, any>): boolean;

		public hashCode(): number;

		public toString(): string;

		// public static class ItemEquipmentStatsBuilder {
		//     private int slot;
		//     private boolean isTwoHanded;
		//     private int astab;
		//     private int aslash;
		//     private int acrush;
		//     private int amagic;
		//     private int arange;
		//     private int dstab;
		//     private int dslash;
		//     private int dcrush;
		//     private int dmagic;
		//     private int drange;
		//     private int str;
		//     private int rstr;
		//     private int mdmg;
		//     private int prayer;
		//     private int aspeed;

		//     ItemEquipmentStatsBuilder() {
		//     }

		//     public ItemEquipmentStatsBuilder slot(int slot) {
		//         this.slot = slot;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder isTwoHanded(boolean isTwoHanded) {
		//         this.isTwoHanded = isTwoHanded;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder astab(int astab) {
		//         this.astab = astab;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder aslash(int aslash) {
		//         this.aslash = aslash;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder acrush(int acrush) {
		//         this.acrush = acrush;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder amagic(int amagic) {
		//         this.amagic = amagic;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder arange(int arange) {
		//         this.arange = arange;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder dstab(int dstab) {
		//         this.dstab = dstab;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder dslash(int dslash) {
		//         this.dslash = dslash;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder dcrush(int dcrush) {
		//         this.dcrush = dcrush;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder dmagic(int dmagic) {
		//         this.dmagic = dmagic;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder drange(int drange) {
		//         this.drange = drange;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder str(int str) {
		//         this.str = str;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder rstr(int rstr) {
		//         this.rstr = rstr;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder mdmg(int mdmg) {
		//         this.mdmg = mdmg;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder prayer(int prayer) {
		//         this.prayer = prayer;
		//         return this;
		//     }

		//     public ItemEquipmentStatsBuilder aspeed(int aspeed) {
		//         this.aspeed = aspeed;
		//         return this;
		//     }

		//     public ItemEquipmentStats build() {
		//         return new ItemEquipmentStats(this.slot, this.isTwoHanded, this.astab, this.aslash, this.acrush, this.amagic, this.arange, this.dstab, this.dslash, this.dcrush, this.dmagic, this.drange, this.str, this.rstr, this.mdmg, this.prayer, this.aspeed);
		//     }

		//     public String toString() {
		//         return "ItemEquipmentStats.ItemEquipmentStatsBuilder(slot=" + this.slot + ", isTwoHanded=" + this.isTwoHanded + ", astab=" + this.astab + ", aslash=" + this.aslash + ", acrush=" + this.acrush + ", amagic=" + this.amagic + ", arange=" + this.arange + ", dstab=" + this.dstab + ", dslash=" + this.dslash + ", dcrush=" + this.dcrush + ", dmagic=" + this.dmagic + ", drange=" + this.drange + ", str=" + this.str + ", rstr=" + this.rstr + ", mdmg=" + this.mdmg + ", prayer=" + this.prayer + ", aspeed=" + this.aspeed + ")";
		//     }
		// }
	}

	export class ItemStats {
		private equipable: boolean;
		private weight: number;
		/** ge_limit? */
		private geLimit: number;
		private equipment: ItemEquipmentStats;

		public subtract(other: ItemStats): ItemStats;

		public ItemStats(
			equipable: boolean,
			weight: number,
			geLimit: number,
			equipment: ItemEquipmentStats,
		);

		public isEquipable(): boolean;

		public getWeight(): number;

		public getGeLimit(): number;

		public getEquipment(): ItemEquipmentStats;

		public equals(o: Record<string, any>): boolean;

		public hashCode(): number;

		public toString(): number;
	}
}
