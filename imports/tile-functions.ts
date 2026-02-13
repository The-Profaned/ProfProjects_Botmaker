/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { logger } from './logger.js';
import { getWorldPoint } from './location-functions.js';
import { dangerousObjectIds } from './object-ids.js';
import { tileSets } from './tile-sets.js';
import { State } from './types.js';

// Tile object-related utility functions
export const getAction = (
	tileObjectID: number,
	actionIndexToGet: number,
): string | null => {
	const composition = bot.objects.getTileObjectComposition(tileObjectID);
	const actions = composition?.getActions?.();
	if (
		!actions ||
		actionIndexToGet < 0 ||
		actionIndexToGet >= actions.length
	) {
		return null;
	}
	return actions[actionIndexToGet];
};

// Get tile object with specific ID
export const getTileObjectWithID = (
	tileObjectId: number,
): any /* Replace with correct type if available */ => {
	const tileObjectIds = bot.objects.getTileObjectsWithIds([tileObjectId]);
	return tileObjectIds[0] ?? null;
};

// Return if tile object has specific name
export const validTileName = (
	tileObjectId: number,
	tileName: string,
): boolean =>
	bot.objects.getTileObjectComposition(tileObjectId).getName() === tileName;

// return dangerous tiles based on provided object IDs (converts from instance to true world coordinates)
export const getDangerousTiles = (
	tileObjectIds?: number[],
	graphicsObjectIds?: number[],
): net.runelite.api.coords.WorldPoint[] => {
	const dangerousLocations: net.runelite.api.coords.WorldPoint[] = [];

	// Get tile objects (persistent game objects like Boulders)
	if (tileObjectIds && tileObjectIds.length > 0) {
		const nearbyObjects = bot.objects.getTileObjectsWithIds(tileObjectIds);
		if (nearbyObjects && nearbyObjects.length > 0) {
			for (const obj of nearbyObjects) {
				if (obj) {
					const objLoc = obj.getWorldLocation();
					dangerousLocations.push(getWorldPoint(objLoc) ?? objLoc);
				}
			}
		}
	}

	// Get graphics objects (temporary visual effects like falling rocks)
	if (graphicsObjectIds && graphicsObjectIds.length > 0) {
		const graphicsObjs = bot.graphicsObjects.getWithIds(graphicsObjectIds);
		if (graphicsObjs && graphicsObjs.length > 0) {
			for (const obj of graphicsObjs) {
				if (obj) {
					const localPoint = obj.getLocation();
					if (localPoint) {
						const worldPoint =
							net.runelite.api.coords.WorldPoint.fromLocalInstance(
								client,
								localPoint,
							);
						if (worldPoint) {
							// Convert from instance to true world coordinates
							const trueWorldPoint =
								getWorldPoint(worldPoint) ?? worldPoint;
							dangerousLocations.push(trueWorldPoint);
						}
					}
				}
			}
		}
	}

	return dangerousLocations;
};

// Check if a tile exists in a list of tiles
export const isInTileList = (
	tile: net.runelite.api.coords.WorldPoint,
	list: net.runelite.api.coords.WorldPoint[],
): boolean =>
	list.some(
		(t) =>
			t.getX() === tile.getX() &&
			t.getY() === tile.getY() &&
			t.getPlane() === tile.getPlane(),
	);

const isValidTileSetName = (
	name: string,
): name is 'leviSafeTiles' | 'leviDebrisTiles' =>
	name === 'leviSafeTiles' || name === 'leviDebrisTiles';

export const getSafeTile = (
	state: State,
	searchRadius: number,
	tileObjectIds?: number[],
	graphicsObjectIds?: number[],
	safeTilesSetName?: string,
): net.runelite.api.coords.WorldPoint | null => {
	logger(
		state,
		'debug',
		'getSafeTile',
		`Searching for safe tile within ${searchRadius} tiles.`,
	);
	const playerLoc = client.getLocalPlayer().getWorldLocation();
	const truePlayerLoc = getWorldPoint(playerLoc) ?? playerLoc;

	// Get dangerous tiles (tile objects and/or graphics objects)
	const dangerousTiles = getDangerousTiles(tileObjectIds, graphicsObjectIds);

	// Get safe tiles (only if safeTilesSetName provided)

	const safeTilesRaw =
		safeTilesSetName && isValidTileSetName(safeTilesSetName)
			? tileSets.safeTiles(safeTilesSetName) || []
			: [];
	const safeTiles: net.runelite.api.coords.WorldPoint[] = Array.isArray(
		safeTilesRaw,
	)
		? safeTilesRaw.map(
				(t: { x: number; y: number; plane: number }) =>
					new net.runelite.api.coords.WorldPoint(t.x, t.y, t.plane),
			)
		: [];

	// Before the search loop
	if (
		dangerousTiles.length > 0 &&
		isInTileList(truePlayerLoc, dangerousTiles)
	) {
		logger(
			state,
			'debug',
			'getSafeTile',
			'Player is standing on DangerousTiles.',
		);
		// Optionally: return null or allow searching for a safe tile anyway
	}

	// Search tiles in radius around player
	for (let distribution = 0; distribution <= searchRadius; distribution++) {
		for (let dx = -distribution; dx <= distribution; dx++) {
			for (let dy = -distribution; dy <= distribution; dy++) {
				if (
					Math.abs(dx) !== distribution &&
					Math.abs(dy) !== distribution
				)
					continue; // Only check perimeter for each radius
				const testTile = new net.runelite.api.coords.WorldPoint(
					truePlayerLoc.getX() + dx,
					truePlayerLoc.getY() + dy,
					truePlayerLoc.getPlane(),
				);

				// 1. Not under dangerous tiles (if checking dangerous tiles)
				if (
					dangerousTiles.length > 0 &&
					isInTileList(testTile, dangerousTiles)
				) {
					continue;
				}
				// 2. On safeTiles if safeTiles is defined
				if (
					safeTiles.length > 0 &&
					!isInTileList(testTile, safeTiles)
				) {
					continue;
				}
				// If all checks pass, return this tile
				logger(
					state,
					'debug',
					'getSafeTile',
					`Found safe tile at (${testTile.getX()}, ${testTile.getY()})`,
				);
				return testTile;
			}
		}
	}
	logger(state, 'debug', 'getSafeTile', 'No safe tile found.');
	return new net.runelite.api.coords.WorldPoint(
		truePlayerLoc.getX(),
		truePlayerLoc.getY(),
		truePlayerLoc.getPlane(),
	);
};

// Check if player is within a specified area bounds
export const isPlayerInArea = (
	state: State,
	minX: number,
	maxX: number,
	minY: number,
	maxY: number,
	plane?: number,
): boolean => {
	const playerLoc = client.getLocalPlayer().getWorldLocation();
	const playerX = playerLoc.getX();
	const playerY = playerLoc.getY();
	const playerPlane = playerLoc.getPlane();

	const inXBounds = playerX >= minX && playerX <= maxX;
	const inYBounds = playerY >= minY && playerY <= maxY;
	const inPlane = plane === undefined || playerPlane === plane;

	const result = inXBounds && inYBounds && inPlane;

	logger(
		state,
		'debug',
		'isPlayerInArea',
		`Player at (${playerX}, ${playerY}, ${playerPlane}). Area bounds: X[${minX}-${maxX}], Y[${minY}-${maxY}], Plane[${plane ?? 'any'}]. In area: ${result}`,
	);

	return result;
};

// Check if game objects or graphics objects exist within specified boundaries
export const areObjectsInBoundaries = (
	state: State,
	boundaries: Array<{
		minX: number;
		maxX: number;
		minY: number;
		maxY: number;
	}>,
): boolean => {
	interface Boundary {
		minX: number;
		maxX: number;
		minY: number;
		maxY: number;
	}

	interface TileObject {
		getWorldLocation(): net.runelite.api.coords.WorldPoint;
	}

	// Check for leviBoulders (game objects) to detect debris special attack
	const nearbyObjects = bot.objects.getTileObjectsWithIds([
		dangerousObjectIds.leviBoulder,
	]);

	const tileObjectsFound: boolean = (nearbyObjects as TileObject[]).some(
		(obj: TileObject) => {
			const objLoc: net.runelite.api.coords.WorldPoint =
				obj.getWorldLocation();
			// Convert from instance coordinates to true world coordinates
			const trueWorldLoc: net.runelite.api.coords.WorldPoint =
				getWorldPoint(objLoc) ?? objLoc;
			return (boundaries as Boundary[]).some(
				(boundary: Boundary) =>
					trueWorldLoc.getX() >= boundary.minX &&
					trueWorldLoc.getX() <= boundary.maxX &&
					trueWorldLoc.getY() >= boundary.minY &&
					trueWorldLoc.getY() <= boundary.maxY,
			);
		},
	);

	// Check for leviFallingRock (graphics objects) for early detection
	const graphicsObjs = bot.graphicsObjects.getWithIds(
		dangerousObjectIds.leviFallingRocks,
	);

	let graphicsObjectsFound = false;
	if (graphicsObjs && graphicsObjs.length > 0) {
		for (const obj of graphicsObjs) {
			if (obj) {
				const localPoint = obj.getLocation();
				if (localPoint) {
					const worldPoint =
						net.runelite.api.coords.WorldPoint.fromLocalInstance(
							client,
							localPoint,
						);
					if (worldPoint) {
						// Convert from instance to true world coordinates
						const trueWorldLoc =
							getWorldPoint(worldPoint) ?? worldPoint;
						const found = (boundaries as Boundary[]).some(
							(boundary: Boundary) =>
								trueWorldLoc.getX() >= boundary.minX &&
								trueWorldLoc.getX() <= boundary.maxX &&
								trueWorldLoc.getY() >= boundary.minY &&
								trueWorldLoc.getY() <= boundary.maxY,
						);
						if (found) {
							graphicsObjectsFound = true;
							break;
						}
					}
				}
			}
		}
	}

	const objectsFound = tileObjectsFound || graphicsObjectsFound;

	logger(
		state,
		'debug',
		'areObjectsInBoundaries',
		`Objects found in boundaries: ${objectsFound} (tileObjects: ${tileObjectsFound}, graphicsObjects: ${graphicsObjectsFound})`,
	);

	return objectsFound;
};

// Analyze webwalk path and log waypoints and destination. Returns the path for use in walking.
export const webWalkCalculator = (
	state: State,
	destinationX: number,
	destinationY: number,
): net.runelite.api.coords.WorldPoint[] => {
	try {
		if (!bot.walking) {
			logger(
				state,
				'debug',
				'webWalkCalculator',
				'Walking API unavailable.',
			);
			return [];
		}

		// Initiate webwalk to calculate path
		bot.walking.webWalkStart(
			new net.runelite.api.coords.WorldPoint(
				destinationX,
				destinationY,
				0,
			),
		);

		// Then get the calculated path
		const path = bot.walking.getWebWalkCalculatedPath?.() ?? [];
		if (path.length > 0) {
			logger(
				state,
				'debug',
				'webWalkCalculator',
				'Webwalk path is possible.',
			);
			path.forEach(
				(
					waypoint: net.runelite.api.coords.WorldPoint,
					index: number,
				) => {
					logger(
						state,
						'debug',
						'webWalkCalculator',
						`Waypoint ${index}: (${waypoint.getX()}, ${waypoint.getY()})`,
					);
				},
			);
			const destination = path.length > 0 ? path.at(-1) : null;
			if (destination) {
				logger(
					state,
					'debug',
					'webWalkCalculator',
					`Destination: (${destination.getX()}, ${destination.getY()})`,
				);
			} else {
				logger(
					state,
					'debug',
					'webWalkCalculator',
					'Destination is undefined.',
				);
			}
			return path;
		}

		logger(
			state,
			'debug',
			'webWalkCalculator',
			'No webwalk path available.',
		);
		return [];
	} catch (error) {
		logger(
			state,
			'debug',
			'webWalkCalculator',
			`Webwalk calculation failed: ${(error as Error).toString()}`,
		);
		return [];
	}
};

// Find the closest tile to the player from an array of tiles
export function findClosestFrontTile(
	frontTiles: { x: number; y: number }[],
	playerLoc: net.runelite.api.coords.WorldPoint,
): { x: number; y: number } {
	let targetTile = frontTiles[0];
	let minDistanceSquared =
		(playerLoc.getX() - targetTile.x) ** 2 +
		(playerLoc.getY() - targetTile.y) ** 2;

	for (const tile of frontTiles) {
		const dx = playerLoc.getX() - tile.x;
		const dy = playerLoc.getY() - tile.y;
		const distanceSquared = dx * dx + dy * dy;
		if (distanceSquared < minDistanceSquared) {
			minDistanceSquared = distanceSquared;
			targetTile = tile;
		}
	}
	return targetTile;
}
