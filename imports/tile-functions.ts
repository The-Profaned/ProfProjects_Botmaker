/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { logger } from './logger.js';
import { dangerousObjectIds } from './object-ids.js';
import { tileSets } from './tile-sets.js';
import { State } from './types.js';

type WorldPoint = {
	equals(currentTile: net.runelite.api.coords.WorldPoint): unknown;
	getX(): number;
	getY(): number;
	getPlane(): number;
};

declare const WorldPoint: {
	new (x: number, y: number, plane: number): WorldPoint;
};

// Tile object-related utility functions
export const tileFunctions = {
	// Return action on tile object
	getAction: (
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
	},

	// Get tile object with specific ID
	getTileObjectWithID: (
		tileObjectId: number,
	): any /* Replace with correct type if available */ => {
		const tileObjectIds = bot.objects.getTileObjectsWithIds([tileObjectId]);
		return tileObjectIds[0] ?? null;
	},

	// Return if tile object has specific name
	validTileName: (tileObjectId: number, tileName: string): boolean =>
		bot.objects.getTileObjectComposition(tileObjectId).getName() ===
		tileName,

	// return dangerous tiles based on dangerousObjectIds
	getDangerousTiles: (): WorldPoint[] => {
		// Collect all dangerous object IDs into an array
		const ids = Object.values(dangerousObjectIds);

		// Get all tile objects with those IDs
		const dangerousObjects = bot.objects.getTileObjectsWithIds(ids);

		// Map to their locations
		return dangerousObjects.map(
			(obj: { getWorldLocation: () => WorldPoint }) =>
				obj.getWorldLocation(),
		);
	},

	// Check if a tile exists in a list of tiles
	isInTileList: (tile: WorldPoint, list: WorldPoint[]): boolean =>
		list.some(
			(t) =>
				t.getX() === tile.getX() &&
				t.getY() === tile.getY() &&
				t.getPlane() === tile.getPlane(),
		),

	getSafeTile: (state: State, searchRadius: number): WorldPoint | null => {
		logger(
			state,
			'debug',
			'getSafeTile',
			`Searching for safe tile within ${searchRadius} tiles.`,
		);
		const playerLoc = client.getLocalPlayer().getWorldLocation();

		// Get dangerous and safe tiles
		const dangerousTiles = tileFunctions.getDangerousTiles(); // Array of WorldPointType
		// Convert plain objects to WorldPointType instances
		const safeTilesRaw = tileSets.safeTiles('leviSafeTiles') || [];
		const safeTiles: WorldPoint[] = Array.isArray(safeTilesRaw)
			? safeTilesRaw.map(
					(t: { x: number; y: number; plane: number }) =>
						new WorldPoint(t.x, t.y, t.plane),
				)
			: [];

		// Before the search loop
		if (tileFunctions.isInTileList(playerLoc, dangerousTiles)) {
			logger(
				state,
				'debug',
				'getSafeTile',
				'Player is standing on DangerousTiles.',
			);
			// Optionally: return null or allow searching for a safe tile anyway
		}

		// Search tiles in radius around player
		for (
			let distribution = 0;
			distribution <= searchRadius;
			distribution++
		) {
			for (let dx = -distribution; dx <= distribution; dx++) {
				for (let dy = -distribution; dy <= distribution; dy++) {
					if (
						Math.abs(dx) !== distribution &&
						Math.abs(dy) !== distribution
					)
						continue; // Only check perimeter for each radius
					const testTile = new WorldPoint(
						playerLoc.getX() + dx,
						playerLoc.getY() + dy,
						playerLoc.getPlane(),
					);

					// 1. Not under getDangerousTiles
					if (tileFunctions.isInTileList(testTile, dangerousTiles)) {
						continue;
					}
					// 2. On safeTiles if safeTiles is defined
					if (
						safeTiles.length > 0 &&
						!tileFunctions.isInTileList(testTile, safeTiles)
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
		return new WorldPoint(
			playerLoc.getX(),
			playerLoc.getY(),
			playerLoc.getPlane(),
		);
	},

	// Check if player is within a specified area bounds
	isPlayerInArea: (
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
	},

	// Check if game objects exist within specified boundaries
	areObjectsInBoundaries: (
		state: State,
		boundaries: Array<{
			minX: number;
			maxX: number;
			minY: number;
			maxY: number;
		}>,
	): boolean => {
		// Get dangerous objects using dangerousObjectIds
		const dangerousObjectIdArray = Object.values(dangerousObjectIds);
		const nearbyObjects = bot.objects.getTileObjectsWithIds(
			dangerousObjectIdArray,
		);

		interface Boundary {
			minX: number;
			maxX: number;
			minY: number;
			maxY: number;
		}

		interface TileObject {
			getWorldLocation(): WorldPoint;
		}

		const objectsFound: boolean = (nearbyObjects as TileObject[]).some(
			(obj: TileObject) => {
				const objLoc: WorldPoint = obj.getWorldLocation();
				return (boundaries as Boundary[]).some(
					(boundary: Boundary) =>
						objLoc.getX() >= boundary.minX &&
						objLoc.getX() <= boundary.maxX &&
						objLoc.getY() >= boundary.minY &&
						objLoc.getY() <= boundary.maxY,
				);
			},
		);

		logger(
			state,
			'debug',
			'areObjectsInBoundaries',
			`Objects found in boundaries: ${objectsFound}`,
		);

		return objectsFound;
	},

	// Analyze webwalk path and log waypoints and destination. Returns the path for use in walking.
	webWalkCalculator: (
		state: State,
		destinationX: number,
		destinationY: number,
	): net.runelite.api.coords.WorldPoint[] => {
		// Initiate webwalk to calculate path
		bot.walking.walkToTrueWorldPoint(destinationX, destinationY);

		// Then get the calculated path
		const path = bot.walking.getWebWalkCalculatedPath();
		if (path && path.length > 0) {
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
			const destination = path.at(-1);
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
		} else {
			logger(
				state,
				'debug',
				'webWalkCalculator',
				'No webwalk path available.',
			);
		}
		return path;
	},
};
