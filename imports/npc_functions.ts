export const npcFunctions = {

    npcRendered: (npcId: number): boolean => bot.npcs.getWithId([npcId]).some(npc => npc.getId() === npcId), // Check if NPC with specific NPC-ID is rendered

    getfirstNPC: (npcId: number): net.runelite.api.NPC | undefined => bot.npcs.getWithIds([npcId])[0], // Return first NPC with specific NPC-ID

    getClosestNPC: (npcIds: number[]): net.runelite.api.NPC | undefined => { // Get closest NPC with the specific ID
        const npcs = bot.npcs.getWithIds(npcIds);
        if (!npcs?.length) return undefined;
        let closest: net.runelite.api.NPC | null = null;
        let min = Number.POSITIVE_INFINITY;
        npcs.forEach(npc => {
            const dist = client.getLocalPLayer().getWorldLocation().distanceTo(npc.getWorldLocation());
            if (dist < min) min = dist, closest = npc;
        })
        return closest || undefined;
    }

};