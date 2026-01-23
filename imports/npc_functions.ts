// NPC-related utility functions
export const npcFunctions = {

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
    }

};