import { prayers } from "./prayer_functions.js";
import { logger } from "../imports/logger.js";
import { State } from "./types.js";

// Map NPC animation IDs to prayer keys (add your IDs here)
const animationPrayerMap: Record<number, keyof typeof prayers> = {
        /* example:
        7617: "protRange",
        7618: "protMage",
        */
};

// Map NPC animation IDs to attack type labels
const animationTypeMap: Record<number, "magic" | "ranged" | "melee" | "other"> = {
        /* example:
        7617: "ranged",
        7618: "magic",
        */
};

export const npcFunctions = {
  // Track NPC attack animations
  trackedNpcAttacks: new Map<number, { npcIndex: number; animationId: number; distance: number }>(),

    // Check if NPC with specific ID is currently rendered
    npcRendered: (npcId: number): boolean => bot.npcs.getWithIds([npcId]).some(npc => npc.getId() === npcId),

    // Return first NPC with specific NPC-ID
    getFirstNPC: (npcId: number): net.runelite.api.NPC | undefined => bot.npcs.getWithIds([npcId])[0], // Return first NPC with specific NPC-ID

    // Get closest NPC with the specific ID
    getClosestNPC: (npcIds: number[]): net.runelite.api.NPC | undefined => { // Get closest NPC with the specific ID
        const npcs = bot.npcs.getWithIds(npcIds);
        if (!npcs?.length) return undefined;
        let closest: net.runelite.api.NPC | null = null;
        let min = Number.POSITIVE_INFINITY;
        npcs.forEach(npc => {
            const dist = client.getLocalPlayer().getWorldLocation().distanceTo(npc.getWorldLocation());
            if (dist < min) min = dist, closest = npc;
        })
        return closest || undefined;
    },

  // Initialize event listeners for NPC attack tracking
  initializeNpcAttackTracking: (state: State): void => {
    bot.events.register("AnimationChanged", (event: any) => {
        npcFunctions.updateNpcAttackAnimation(state, event);
      },
      0
    );

    bot.events.register( "NpcDespawned", (event: any) => {
        npcFunctions.removeNpcAttack(state, event);
      },
      0
    );
  },

  // Update NPC attack animation or add to tracking
  updateNpcAttackAnimation: (state: State, event: any): void => {
    const actor = event.getActor?.();
    if (!actor?.isNpc?.()) return;

    const npc = actor;
    const animationId = event.getAnimationId?.() ?? npc.getAnimation?.();
    if (!animationId) return;

    const prayerKey = animationPrayerMap[animationId];
    if (!prayerKey) {
      npcFunctions.trackedNpcAttacks.delete(npc.getIndex?.() ?? -1);
      return;
    }

    const player = client?.getLocalPlayer?.();
    const playerLoc = player?.getWorldLocation?.();
    const npcLoc = npc?.getWorldLocation?.();
    if (!playerLoc || !npcLoc) return;

    const distance = npcLoc.distanceTo(playerLoc);
    const maxDistance = 10;

    const npcIndex = npc.getIndex?.() ?? -1;
    if (distance <= maxDistance) {
      npcFunctions.trackedNpcAttacks.set(npcIndex, { npcIndex, animationId, distance });
      logger( state, "debug", "updateNpcAttackAnimation", `Tracking npc ${npcIndex} anim=${animationId} at distance ${distance}`
      );
    } else if (npcFunctions.trackedNpcAttacks.has(npcIndex)) {
      npcFunctions.trackedNpcAttacks.delete(npcIndex);
      logger(state, "debug", "updateNpcAttackAnimation", `Npc ${npcIndex} out of range`);
    }
  },

  // Remove NPC from tracking on despawn
  removeNpcAttack: (state: State, event: any): void => {
    const npc = event.getNpc?.();
    if (!npc) return;
    const npcIndex = npc.getIndex?.() ?? -1;
    if (npcFunctions.trackedNpcAttacks.has(npcIndex)) {
      npcFunctions.trackedNpcAttacks.delete(npcIndex);
      logger(state, "debug", "removeNpcAttack", `Npc ${npcIndex} despawned/removed`);
    }
  },

  // Get sorted NPC attacks by distance
  getSortedNpcAttacks: (): Array<{ npcIndex: number; animationId: number; distance: number }> => {
    return Array.from(npcFunctions.trackedNpcAttacks.values()).sort((a, b) => a.distance - b.distance);
  },

  // Get prayer key for given NPC animation ID
  getPrayerKeyForAnimation: (animationId: number): keyof typeof prayers | null => {
    return animationPrayerMap[animationId] ?? null;
  },
};