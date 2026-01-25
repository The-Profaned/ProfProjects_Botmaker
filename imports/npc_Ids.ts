import { prayers } from "./prayer_functions.js";

// NPC IDs
export const npcIds = {
  dagSupreme: client.npcIds.DAGANNOTH_SUPREME,
  dagPrime: client.npcIds.DAGANNOTH_PRIME,
  dagRex: client.npcIds.DAGANNOTH_REX,
  leviathanPost: client.npcIds.LEVIATHAN_POST_12214,
  leviathanQuest1: client.npcIds.LEVIATHAN_12215,
  leviathanQuest2: client.npcIds.LEVIATHAN_12219,
  abbyssalPathfinder: client.npcIds.ABYSSAL_PATHFINDER,
  zulrahSerp: client.npcIds.ZULRAH_2042,
  zulrahMag: client.npcIds.ZULRAH_2043,
  zulrahTanz: client.npcIds.ZULRAH_2044,
  derangedArch: client.npcIds.DERANGED_ARCHAEOLOGIST,
};

// Group NPC IDs
export const npcGroupIds = {
  dagKings: [npcIds.dagRex, npcIds.dagSupreme, npcIds.dagPrime],
  leviathanQuest: [npcIds.leviathanQuest1, npcIds.leviathanQuest2],
  zulrahAll: [npcIds.zulrahSerp, npcIds.zulrahMag, npcIds.zulrahTanz],
};

// NPC Animation IDs
export const npcAnimationIds = {
  dagRex: 0,
  dagSupreme: 0,
  dagPrime: 0,
};

// Map NPC animation IDs to prayer keys (add your IDs here)
export const animationPrayerMap: Record<number, keyof typeof prayers> = {
  /* example:
        npcAnimationId: "protRange",
        npcAnimationId: "protMage",
        */
};

// Map NPC animation IDs to attack type labels
export const animationTypeMap: Record<
  number,
  "magic" | "ranged" | "melee" | "other"
> = {
  /* example:
        npcAnimationId: "ranged",
        npcAnimationId: "magic",
        */
};

export const npcProjectileIds = {
  leviathanMagic: 0,
  leviathanRanged: 0,
  leviathanMelee: 0,
  derangedArch: 1259,
};

// Map projectile IDs to prayer keys (add your IDs here)
export const projectilePrayerMap: Record<number, keyof typeof prayers> = {
  /*
   example: npcProjectileId: "protMage",
  example: npcProjectileId: "protRange",
  */
  2487: "protRange",
  2488: "protMelee",
  2489: "protMage",
  1259: "protRange",
};

// Map projectile IDs to simple type labels
export const projectileTypeMap: Record<
  number,
  "magic" | "ranged" | "melee" | "other"
> = {
  /*
   example: npcProjectileId: "magic",
  example: npcProjectileId: "ranged",
  */
  1259: "ranged",
  2487: "ranged",
  2488: "melee",
  2489: "ranged",
};
