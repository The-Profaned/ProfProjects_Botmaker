export const tileFunctions = {

    getAction: (tileObjectID: number, actionIndexToGet: number): string => bot.objects.getTileObjectComposition(tileObjectID).getActions()[actionIndexToGet], // Return action on tile object

    getTileObjectWithID: (tileObjectId: number): net.runelite.api.TileObject | undefined => { // Return tile object with specific ID
        const tileObjectIds = bot.objects.getTileObjectsWithIds([tileObjectId]);
        return tileObjectIds.find(tileObject => tileObject.getID() == tileObjectId);
    },

    validTileName:( // Return if tile object has specific name
        tileObjectId: number, tileName: string): boolean => bot.objects.getTileObjectComposition(tileObjectId).getName() == tileName
};