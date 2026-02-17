/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { logger } from './logger.js';
import { getWorldPoint } from './location-functions.js';
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
	tileObjectIds: number[],
	graphicsObjectIds: number[],
): net.runelite.api.coords.WorldPoint[] => {
	const dangerousLocations: net.runelite.api.coords.WorldPoint[] = [];

	// Early return if bot APIs not ready during startup
	if (!bot || !bot.objects || !bot.graphicsObjects) {
		return dangerousLocations;
	}

	// Get tile objects (persistent game objects like Boulders)
	if (tileObjectIds && tileObjectIds.length > 0) {
		const nearbyObjects = bot.objects.getTileObjectsWithIds(tileObjectIds);
		if (nearbyObjects && nearbyObjects.length > 0) {
			for (const obj of nearbyObjects) {
				if (!obj) continue;

				const objLoc = obj.getWorldLocation();
				const trueWorldPoint = getWorldPoint(objLoc) ?? objLoc;

				dangerousLocations.push(trueWorldPoint);
			}
		}
	}

	// Get graphics objects (temporary visual effects like falling rocks)
	if (graphicsObjectIds && graphicsObjectIds.length > 0) {
		const graphicsObjs = bot.graphicsObjects.getWithIds(graphicsObjectIds);
		if (graphicsObjs && graphicsObjs.length > 0) {
			for (const obj of graphicsObjs) {
				if (!obj) continue;

				const localPoint: net.runelite.api.coords.LocalPoint | null =
					obj.getLocation();
				if (!localPoint) continue;

				const worldPoint =
					net.runelite.api.coords.WorldPoint.fromLocalInstance(
						client,
						localPoint,
					);
				if (!worldPoint) continue;

				// Convert from instance to true world coordinates
				const trueWorldPoint = getWorldPoint(worldPoint) ?? worldPoint;

				dangerousLocations.push(trueWorldPoint);
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

/**
 * Check if a tile is walkable using the collision map
 * Returns true if the tile has no collision (is walkable)
 */
const isTileWalkable = (
	tile: net.runelite.api.coords.WorldPoint,
	state?: State,
): boolean => {
	if (!client) return true;

	try {
		const worldView = client.getWorldView(
			client.getTopLevelWorldView()?.getId(),
		);
		if (!worldView) return true;

		const collisionMaps = worldView.getCollisionMaps?.();
		if (!collisionMaps) return true;

		const plane = tile.getPlane();
		if (plane < 0 || plane >= collisionMaps.length) return true;

		const collisionData = collisionMaps[plane];
		if (!collisionData || typeof collisionData.getFlags !== 'function') {
			return true;
		}

		// Convert world point to local scene coordinates
		const localPoint = net.runelite.api.coords.LocalPoint.fromWorld(
			worldView,
			tile,
		);
		if (!localPoint) return true;

		// Get scene coordinates (relative to scene origin)
		const sceneX = localPoint.getSceneX?.();
		const sceneY = localPoint.getSceneY?.();

		if (
			typeof sceneX !== 'number' ||
			typeof sceneY !== 'number' ||
			sceneX < 0 ||
			sceneY < 0 ||
			sceneX >= 104 ||
			sceneY >= 104
		) {
			return true;
		}

		// Get collision flags - handle Java 2D array in Rhino
		try {
			const flags = collisionData.getFlags();
			if (!flags) return true;

			// Java arrays in Rhino: use bracket notation for both dimensions
			let tileFlag = 0;
			try {
				// Try accessing as 2D array
				const row = flags[sceneX];
				if (row !== null && row !== undefined) {
					tileFlag = row[sceneY] || 0;
				}
			} catch {
				// If 2D access fails, assume walkable
				return true;
			}

			// Collision flag constants
			const BLOCK_FLOOR = 0x100; // 256
			const BLOCK_OBJECT = 0x20000; // 131072
			const BLOCK_FULL = 0x40000; // 262144
			const BLOCKED_FLAGS = BLOCK_FLOOR | BLOCK_OBJECT | BLOCK_FULL;

			const isBlocked = (tileFlag & BLOCKED_FLAGS) !== 0;

			if (state && isBlocked) {
				logger(
					state,
					'debug',
					'isTileWalkable',
					`Tile (${tile.getX()}, ${tile.getY()}) blocked - flag: ${tileFlag}`,
				);
			}

			return !isBlocked;
		} catch {
			return true;
		}
	} catch {
		return true;
	}
};

export const getSafeTile = (
	state: State,
	searchRadius: number,
	tileObjectIds?: number[],
	graphicsObjectIds?: number[],
	safeTilesSetName?: string,
	dangerousTileCoordinates?: net.runelite.api.coords.WorldPoint[],
): net.runelite.api.coords.WorldPoint | null => {
	logger(
		state,
		'debug',
		'getSafeTile',
		`Searching for safe tile within ${searchRadius} tiles.`,
	);

	const player = client.getLocalPlayer();
	if (!player) {
		logger(state, 'debug', 'getSafeTile', 'Player not found');
		return null;
	}

	const playerLoc = player.getWorldLocation();
	if (!playerLoc) {
		logger(state, 'debug', 'getSafeTile', 'Player location not found');
		return null;
	}

	const truePlayerLoc = getWorldPoint(playerLoc) ?? playerLoc;

	// Get dangerous tiles (tile objects and/or graphics objects)
	const dynamicDangerousTiles = getDangerousTiles(
		tileObjectIds ?? [],
		graphicsObjectIds ?? [],
	);

	// Combine dynamic and pre-defined dangerous tiles
	const dangerousTiles = [
		...dynamicDangerousTiles,
		...(dangerousTileCoordinates || []),
	];

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

	// Search tiles in radius around player, collecting valid tiles at each distance
	// Then randomly select one to avoid predictable southwest bias
	for (let distribution = 0; distribution <= searchRadius; distribution++) {
		const validTilesAtDistance: net.runelite.api.coords.WorldPoint[] = [];

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

				// 3. Tile must be walkable (check collision map)
				if (!isTileWalkable(testTile, state)) {
					continue;
				}

				// Tile is valid, add it to the collection
				validTilesAtDistance.push(testTile);
			}
		}

		// If we found valid tiles at this distance, randomly pick one
		if (validTilesAtDistance.length > 0) {
			const randomIndex = Math.floor(
				Math.random() * validTilesAtDistance.length,
			);
			const chosenTile = validTilesAtDistance[randomIndex];
			logger(
				state,
				'debug',
				'getSafeTile',
				`Found safe tile at (${chosenTile.getX()}, ${chosenTile.getY()})`,
			);
			return chosenTile;
		}
	}

	logger(state, 'debug', 'getSafeTile', 'No safe tile found.');
	return new net.runelite.api.coords.WorldPoint(
		truePlayerLoc.getX(),
		truePlayerLoc.getY(),
		truePlayerLoc.getPlane(),
	);
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
