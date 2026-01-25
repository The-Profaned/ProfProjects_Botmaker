import { logger } from "./logger.js";
import { dangerousObjectIds } from "./object_ids.js";
import { tileSets } from "./tile_sets.js";
import { State } from "./types.js";


// Tile object-related utility functions
export const tileFunctions = {

    // Return action on tile object
    getAction: (tileObjectID: number, actionIndexToGet: number): string => bot.objects.getTileObjectComposition(tileObjectID).getActions()[actionIndexToGet], // Return action on tile object

    // Get tile object with specific ID
    getTileObjectWithID: (tileObjectId: number): any /* Replace with correct type if available */ => {
        const tileObjectIds = bot.objects.getTileObjectsWithIds([tileObjectId]);
        return tileObjectIds.find(tileObject => tileObject.getId() === tileObjectId);
    },

    // Return if tile object has specific name
    validTileName:( 
        tileObjectId: number, tileName: string): boolean => bot.objects.getTileObjectComposition(tileObjectId).getName() === tileName,

    getDangerousTiles: (): WorldPoint[] => {
    // Collect all dangerous object IDs into an array
    const ids = Object.values(dangerousObjectIds);

    // Get all tile objects with those IDs
    const dangerousObjects = bot.objects.getTileObjectsWithIds(ids);

    // Map to their locations
    return dangerousObjects.map(obj => obj.getWorldLocation());
    },

    getSafeTile: (state: State, searchRadius: number): WorldPoint | null => {
            logger(state, 'debug', 'getSafeTile', `Searching for safe tile within ${searchRadius} tiles.`);
            const playerLoc = client.getLocalPlayer().getWorldLocation();
    
            // Get dangerous and safe tiles
            const dangerousTiles = tileFunctions.getDangerousTiles(); // Array of WorldPoint
            const safeTiles = tileSets.safeTiles("testTiles") || []; // Array of WorldPoint
    
            // Helper to check if a tile is in a list
            const isInTileList = (tile: WorldPoint, list: WorldPoint[]) =>
                list.some(t => t.getX() === tile.getX() && t.getY() === tile.getY() && t.getPlane() === tile.getPlane());
    
            // Before the search loop
            if (isInTileList(playerLoc, dangerousTiles)) {
                logger(state, 'debug', 'getSafeTile', 'Player is standing on DangerousTiles.');
                // Optionally: return null or allow searching for a safe tile anyway
            }
    
            // Search tiles in radius around player
            for (let dist = 0; dist <= searchRadius; dist++) {
                for (let dx = -dist; dx <= dist; dx++) {
                    for (let dy = -dist; dy <= dist; dy++) {
                        if (Math.abs(dx) !== dist && Math.abs(dy) !== dist) continue; // Only check perimeter for each radius
                        const testTile = new WorldPoint(
                            playerLoc.getX() + dx,
                            playerLoc.getY() + dy,
                            playerLoc.getPlane()
                        );
    
                        // 1. Not under getDangerousTiles
                        if (isInTileList(testTile, dangerousTiles)) {
                            logger(state, 'debug', 'getSafeTile', 'Test Tile is on DangerousTiles.'); 
                        continue;
                        }
                        // 2. On safeTiles if safeTiles is defined
                        if (safeTiles.length > 0 && !isInTileList(testTile, safeTiles)) {
                            logger(state, 'debug', 'getSafeTile', 'Test Tile is on SafeTiles.')
                            continue;
                        }
                        // If all checks pass, return this tile
                        return testTile;
                    }
                }
            }
            logger(state, 'debug', 'getSafeTile', 'No safe tile found.');
            return null;
        },
};