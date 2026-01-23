import { NpcID } from "net.runelite.api";

// NPC IDs
export const npcIds = {
    dagSupreme : NpcID.DAGANNOTH_SUPREME,
    dagPrime : NpcID.DAGANNOTH_PRIME,
    dagRex : NpcID.DAGANNOTH_REX,
    leviathanPost : NpcID.LEVIATHAN_POST_12213,
    leviathanAwak : NpcID.LEVIATHAN_AWAKENED_12214,
    leviathanQuest1 : NpcID.LEVIATHAN_12215,
    leviathanQuest2 : NpcID.LEVIATHAN_12219
};

// Group NPC IDs
export const npcGroupIds = {
    dagKings : [npcIds.dagRex, npcIds.dagSupreme, npcIds.dagPrime],
    leviathanNormal : [npcIds.leviathanPost, npcIds.leviathanAwak],
    leviathanQuest : [npcIds.leviathanQuest1, npcIds.leviathanQuest2]
};

// NPC Animation IDs
export const npcAnimationIds = {
    dagRex : 0,
    dagSupreme : 0,
    dagPrime : 0,
};