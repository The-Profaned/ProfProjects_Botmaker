// imports
import { handleFailure } from './general-function.js';
import { logger } from './logger.js';
import { timeoutManager } from './timeout-manager.js';
import { State } from './types.js';

// Location-related utility functions

// Convert array of coordinates to WorldPoint
export const coordsToWP = ([x, y, z]: [
	number,
	number,
	number,
]): net.runelite.api.coords.WorldPoint =>
	new net.runelite.api.coords.WorldPoint(x, y, z);

// Get distance from local player to WorldPoint
export const localPlayerDistributionFromWP = (
	worldPoint: net.runelite.api.coords.WorldPoint,
): number => client.getLocalPlayer().getWorldLocation().distanceTo(worldPoint);

// Check if player is near WorldPoint within tile threshold
export const isPlayerNearWP = (
	worldPoint: net.runelite.api.coords.WorldPoint,
	tileThreshold: number = 5,
): boolean => localPlayerDistributionFromWP(worldPoint) <= tileThreshold;

// Check if player is within specified area bounds
export const isPlayerInArea = (
	state: State,
	minX: number,
	maxX: number,
	minY: number,
	maxY: number,
	plane?: number,
): boolean => {
	const player = client.getLocalPlayer();
	if (!player) {
		logger(state, 'debug', 'isPlayerInArea', 'Player not found');
		return false;
	}

	const location = player.getWorldLocation();
	const x = location.getX();
	const y = location.getY();
	const currentPlane = location.getPlane();

	const inBounds = x >= minX && x <= maxX && y >= minY && y <= maxY;
	const onPlane = plane === undefined || currentPlane === plane;

	return inBounds && onPlane;
};

// Web walk to WorldPoint with timeout
export const wWalkTimeout = (
	state: State,
	worldPoint: net.runelite.api.coords.WorldPoint,
	targetDescription: string,
	maxWait: number,
	targetDistance: number = 5,
): boolean => {
	// Web walk to WorldPoint with timeout
	const isPlayerAtLocation = () => isPlayerNearWP(worldPoint, targetDistance);
	if (!isPlayerAtLocation() && !bot.walking.isWebWalking()) {
		logger(
			state,
			'all',
			'wWalkTimeout',
			`Web walking to ${targetDescription}`,
		);
		bot.walking.webWalkStart(worldPoint);
		timeoutManager.add({
			state,
			conditionFunction: () => isPlayerAtLocation(),
			maxWait,
			onFail: () =>
				// Handle failure if player does not reach location in time
				handleFailure(
					state,
					'wWalkTimeout',
					`Unable to locate player at ${targetDescription} after ${maxWait} ticks.`,
				),
		});
		return false;
	}
	logger(
		state,
		'debug',
		'wWalkTimeout',
		`Player is at ${targetDescription}.`,
	);
	return true;
};

// Convert instance coordinates to true world coordinates
export function getWorldPoint(
	worldpoint: net.runelite.api.coords.WorldPoint,
): net.runelite.api.coords.WorldPoint | null {
	// Null safety checks for client views (may not be ready during startup)
	const topLevelView = client.getTopLevelWorldView();
	if (!topLevelView) {
		return worldpoint;
	}

	const worldView = client.getWorldView(topLevelView.getId());
	if (!worldView) {
		return worldpoint;
	}

	const inInstance = worldView.isInstance();
	if (inInstance) {
		const localPoint = net.runelite.api.coords.LocalPoint.fromWorld(
			worldView,
			worldpoint,
		);
		if (localPoint) {
			return net.runelite.api.coords.WorldPoint.fromLocalInstance(
				client,
				localPoint,
			);
		}
		return null;
	}
	return worldpoint;
}
