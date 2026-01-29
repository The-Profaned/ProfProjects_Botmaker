import { prayers } from './prayer-functions.js';

// NPC IDs
export const npcIds = {
	dagSupreme: net.runelite.api.gameval.NpcID.DAGCAVE_RANGED_BOSS,
	dagPrime: net.runelite.api.gameval.NpcID.DAGCAVE_MAGIC_BOSS,
	dagRex: net.runelite.api.gameval.NpcID.DAGCAVE_MELEE_BOSS,
	leviathan: net.runelite.api.gameval.NpcID.LEVIATHAN,
	leviathanQuest: net.runelite.api.gameval.NpcID.LEVIATHAN_QUEST,
	abbyssalPathfinder: net.runelite.api.gameval.NpcID.LEVIATHAN_BUFF_NPC,
	zulrahSerp: net.runelite.api.gameval.NpcID.SNAKEBOSS_BOSS_RANGED,
	zulrahMag: net.runelite.api.gameval.NpcID.SNAKEBOSS_BOSS_MELEE,
	zulrahTanz: net.runelite.api.gameval.NpcID.SNAKEBOSS_BOSS_MAGIC,
	derangedArch: net.runelite.api.gameval.NpcID.FOSSIL_CRAZY_ARCHAEOLOGIST,
};

// Group NPC IDs
export const npcGroupIds = {
	dagKings: [npcIds.dagRex, npcIds.dagSupreme, npcIds.dagPrime],
	leviathans: [npcIds.leviathan, npcIds.leviathanQuest],
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
	'magic' | 'ranged' | 'melee' | 'other'
> = {
	/* example:
        npcAnimationId: "ranged",
        npcAnimationId: "magic",
        */
};

// NPC Projectile IDs
export const npcProjectileIds = {
	leviathanMagic: 0,
	leviathanRanged: 0,
	leviathanMelee: 0,
	crazyArch: 1259,
};

// Map projectile IDs to prayer keys (add your IDs here)
export const projectilePrayerMap: Record<
	keyof typeof npcProjectileIds,
	keyof typeof prayers
> = {
	/*
   example: npcProjectileId: "protMage",
  */
	leviathanRanged: 'protRange',
	leviathanMelee: 'protMelee',
	leviathanMagic: 'protMage',
	crazyArch: 'protRange',
};

// Map projectile IDs to simple type labels
export const projectileTypeMap: Record<
	keyof typeof npcProjectileIds,
	'magic' | 'ranged' | 'melee' | 'other'
> = {
	/*
   example: npcProjectileName: "magic",
  */
	leviathanRanged: 'ranged',
	leviathanMelee: 'melee',
	leviathanMagic: 'magic',
	crazyArch: 'ranged',
};
