// imports
import { generalFunctions } from './general_function.js';
import { logger } from './logger.js';
import { timeoutManager } from './timeout_manager.js';
import { State } from './types.js';

// Location-related utility functions
export const locationFunctions = {

    // Convert array of coordinates to WorldPoint
    coordsToWP: ([x, y, z]: [number, number, number]): net.runelite.api.coords.WorldPoint => new net.runelite.api.coords.WorldPoint(x, y, z), // Convert coordinates to WorldPoint

    // Get distance from local player to WorldPoint
    localPlayerDistFromWP: (worldPoint: net.runelite.api.coords.WorldPoint): number => client.getLocalPlayer().getWorldLocation().distanceTo(worldPoint), // Get distance from local player to WorldPoint

    // Check if player is near WorldPoint within tile threshold
    isPlayerNearWP: (worldPoint: net.runelite.api.coords.WorldPoint, tileThreshold: number = 5): boolean => locationFunctions.localPlayerDistFromWP(worldPoint) <= tileThreshold, // Check if player is near WorldPoint within tile threshold, 5 tiles by default

    // Web walk to WorldPoint with timeout
    wWalkTimeout: (state: State, worldPoint: net.runelite.api.coords.WorldPoint, targetDescription: string, maxWait: number, targetDistance: number = 5): boolean=> { // Web walk to WorldPoint with timeout
        const isPlayerAtLocation = () => locationFunctions.isPlayerNearWP(worldPoint, targetDistance);
        if (!isPlayerAtLocation() && !bot.walking.isWebWalking()) {
            logger(state, 'all', 'wWalkTimeout', `Web walking to ${targetDescription}`);
            bot.walking.webWalkStart(worldPoint);
            timeoutManager.add({
                state, conditionFunction: () => isPlayerAtLocation(), maxWait, onFail: () =>  // Handle failure if player does not reach location in time
                    generalFunctions.handleFailure(state, 'wWalkTimeout', `Unable to locate player at ${targetDescription} after ${maxWait} ticks.`)
            });
            return false;
        }
        logger(state, 'debug', 'wWalkTimeout', `Player is at ${targetDescription}.`);
        return true;
    }
};
