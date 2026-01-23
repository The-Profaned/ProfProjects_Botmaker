// Tile object-related utility functions
export const tileFunctions = {

    // Return action on tile object
    getAction: (tileObjectID: number, actionIndexToGet: number): string => bot.objects.getTileObjectComposition(tileObjectID).getActions()[actionIndexToGet], // Return action on tile object

    // Get tile object with specific ID
    getTileObjectWithID: (tileObjectId: number): net.runelite.api.TileObject | undefined => {
        const tileObjectIds = bot.objects.getTileObjectsWithIds([tileObjectId]);
        return tileObjectIds.find(tileObject => tileObject.getId() === tileObjectId);
    },

    // Return if tile object has specific name
    validTileName:( 
        tileObjectId: number, tileName: string): boolean => bot.objects.getTileObjectComposition(tileObjectId).getName() === tileName
};