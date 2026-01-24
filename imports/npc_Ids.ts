import { prayers } from "./prayer_functions.js";
import { NpcID } from "net.runelite.api";

// NPC IDs
export const npcIds = {
    dagSupreme : NpcID.DAGANNOTH_SUPREME,
    dagPrime : NpcID.DAGANNOTH_PRIME,
    dagRex : NpcID.DAGANNOTH_REX,
    leviathanPost : NpcID.LEVIATHAN_POST_12214,
    leviathanQuest1 : NpcID.LEVIATHAN_12215,
    leviathanQuest2 : NpcID.LEVIATHAN_12219,
    zulrahSerp : NpcID.ZULRAH_2042,
    zulrahMag: NpcID.ZULRAH_2043,
    zulrahTanz: NpcID.ZULRAH_2044,
};

// Group NPC IDs
export const npcGroupIds = {
    dagKings : [npcIds.dagRex, npcIds.dagSupreme, npcIds.dagPrime],
    leviathanQuest : [npcIds.leviathanQuest1, npcIds.leviathanQuest2],
    zulrahAll : [npcIds.zulrahSerp, npcIds.zulrahMag, npcIds.zulrahTanz],
};

// NPC Animation IDs
export const npcAnimationIds = {
    dagRex : 0,
    dagSupreme : 0,
    dagPrime : 0,
};

// Map NPC animation IDs to prayer keys (add your IDs here)
export const animationPrayerMap: Record<number, keyof typeof prayers> = {
        /* example:
        npcAnimationId: "protRange",
        npcAnimationId: "protMage",
        */
};

// Map NPC animation IDs to attack type labels
export const animationTypeMap: Record<number, "magic" | "ranged" | "melee" | "other"> = {
        /* example:
        npcAnimationId: "ranged",
        npcAnimationId: "magic",
        */
};

export const npcProjectileIds = {
    leviathanMagic : 0,
    leviathanRanged : 0,
    leviathanMelee : 0,
}

// Map projectile IDs to prayer keys (add your IDs here)
export const projectilePrayerMap: Record<number, keyof typeof prayers> = {
  /*
   example: npcProjectileId: "protMage",
  example: npcProjectile: "protRange",
  */
};

// Map projectile IDs to simple type labels
export const projectileTypeMap: Record<number, "magic" | "ranged" | "melee" | "other"> = {
  /*
   example: npcProjectileId: "magic",
  example: npcProjectileId: "ranged",
  */
};