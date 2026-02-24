import { state, LootingSubStates, MainStates } from '../../script-state.js';
import { logger } from '../../../../imports/logger.js';
import { getCurrentFallingRockTiles } from './projectile-manager.js';
import { getPathfinderNpc } from './pathfinder-spawn-manager.js';
import { isNpcAlive } from '../../../../imports/npc-functions.js';
import {
	attackTargetNpc,
	comboEat,
	drinkPotion,
	eatFood,
	eatFoodAndDrinkPotion,
} from '../../../../imports/player-functions.js';
import {
	canAttack,
	canComboAction,
	canDrinkPotion,
	canEatFood,
	getLeviathanHealthPercent,
	updateLastAttackTick,
	updateLastFoodEatTick,
	updateLastPotionDrinkTick,
	getLeviathanNpc,
	LEVIATHAN_FALLBACK_ID,
	LEVIATHAN_PRIMARY_ID,
	returnToAttackState,
} from './combat-tracker.js';
import { getWorldPoint } from '../../../../imports/location-functions.js';
import {
	NORMAL_FOOD_DELAY,
	POTION_DELAY,
	food,
	potionGroups,
} from '../../../../imports/item-ids.js';

// ============ Logging Toggles ============
const ENABLE_PATHFINDER_TRACKING_LOGGING = true;
const ENABLE_SAFE_AREA_LOGGING = true; // Enable to debug positioning
const ENABLE_FRONT_TILE_LOGGING = true; // Enable to debug front tile selection

const logTracking = (message: string) =>
	ENABLE_PATHFINDER_TRACKING_LOGGING &&
	logger(state, 'debug', 'pathfinderTrackingManager', message);
const logSafeArea = (message: string) =>
	ENABLE_SAFE_AREA_LOGGING &&
	logger(state, 'debug', 'pathfinderTracking', message);
const logFrontTile = (message: string) =>
	ENABLE_FRONT_TILE_LOGGING &&
	logger(state, 'debug', 'pathfinderTracking', message);

const attackLeviathanWithFallback = (): boolean => {
	if (attackTargetNpc(state, LEVIATHAN_PRIMARY_ID)) return true;
	return attackTargetNpc(state, LEVIATHAN_FALLBACK_ID);
};

// Pathfinder movement boundary (inclusive)
const PATHFINDER_BOUNDARY_MIN_X = 2073;
const PATHFINDER_BOUNDARY_MAX_X = 2089;
const PATHFINDER_BOUNDARY_MIN_Y = 6364;
const PATHFINDER_BOUNDARY_MAX_Y = 6380;
const PATHFINDER_SPAWN_GRACE_TICKS = 12;
const FRONT_TILES_AHEAD_OF_3X3 = 2;
const FRONT_TILE_OFFSET_FROM_CENTER = 1 + FRONT_TILES_AHEAD_OF_3X3;
const PATHFINDER_FRONT_MOVE_RECLICK_TICKS = 2;
const ROCK_AVOID_RADIUS = 1;
const HP_THRESHOLD_CRITICAL = 30;
const HP_THRESHOLD_LOW = 45;
const PRAYER_THRESHOLD = 40;
const LEVI_BOSS_CENTER_X = 2081;
const LEVI_BOSS_CENTER_Y = 6372;
const NORMAL_FOODS: number[] = Object.values(food.normalDelay.item);
const COMBO_FOODS: number[] = Object.values(food.comboDelay.item);
const PRAYER_POTIONS: number[] = [
	...potionGroups.ppots1_4,
	...potionGroups.restores1_4,
];

// ============ State Variables ============
let hasReachedPreferredFrontTile: boolean = false;
let lastPreferredFrontMoveTick: number = -10;
let pathfinderTrackingStartTick: number = -1;
let lastFrontMoveTick: number = -10;
let lastFrontMoveTarget: { x: number; y: number } | null = null;
let wasAttackAnimationActive = false;
type PathfinderDirection = 'north' | 'east' | 'south' | 'west';
let currentPathfinderDirection: PathfinderDirection = 'east';

const turnTileToNextDirection: Record<string, PathfinderDirection> = {
	'2075,6366': 'north',
	'2075,6378': 'east',
	'2087,6378': 'south',
	'2087,6366': 'west',
};

const preTurnTileToNextDirection: Record<string, PathfinderDirection> = {
	'2076,6366': 'north',
	'2075,6377': 'east',
	'2086,6378': 'south',
	'2087,6367': 'west',
};

const directionToVector = (
	direction: PathfinderDirection,
): { x: number; y: number } => {
	switch (direction) {
		case 'north': {
			return { x: 0, y: 1 };
		}
		case 'east': {
			return { x: 1, y: 0 };
		}
		case 'south': {
			return { x: 0, y: -1 };
		}
		case 'west': {
			return { x: -1, y: 0 };
		}
	}
};

const isNearEastToSouthCorner = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
): boolean => {
	return pathfinderLoc.getX() >= 2086 && pathfinderLoc.getY() >= 6378;
};

const isNearSouthToWestCorner = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
): boolean => {
	return pathfinderLoc.getY() <= 6367 && pathfinderLoc.getX() >= 2087;
};

const isNearWestToNorthCorner = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
): boolean => {
	return pathfinderLoc.getX() <= 2076 && pathfinderLoc.getY() <= 6366;
};

const isNearNorthToEastCorner = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
): boolean => {
	return pathfinderLoc.getY() >= 6377 && pathfinderLoc.getX() <= 2075;
};

const getPredictedCornerDirection = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
	currentDirection: PathfinderDirection,
): PathfinderDirection => {
	if (currentDirection === 'east' && isNearEastToSouthCorner(pathfinderLoc)) {
		return 'south';
	}

	if (
		currentDirection === 'south' &&
		isNearSouthToWestCorner(pathfinderLoc)
	) {
		return 'west';
	}

	if (currentDirection === 'west' && isNearWestToNorthCorner(pathfinderLoc)) {
		return 'north';
	}

	if (
		currentDirection === 'north' &&
		isNearNorthToEastCorner(pathfinderLoc)
	) {
		return 'east';
	}

	return currentDirection;
};

const isWithinPathfinderBoundary = (x: number, y: number): boolean => {
	return (
		x >= PATHFINDER_BOUNDARY_MIN_X &&
		x <= PATHFINDER_BOUNDARY_MAX_X &&
		y >= PATHFINDER_BOUNDARY_MIN_Y &&
		y <= PATHFINDER_BOUNDARY_MAX_Y
	);
};

const filterTilesToPathfinderBoundary = (
	tiles: { x: number; y: number }[],
): { x: number; y: number }[] => {
	return tiles.filter((tile) => isWithinPathfinderBoundary(tile.x, tile.y));
};

const getClosestFrontTile = (
	frontTiles: { x: number; y: number }[],
	playerLoc: net.runelite.api.coords.WorldPoint,
): { x: number; y: number } => {
	if (frontTiles.length === 0) {
		return { x: playerLoc.getX(), y: playerLoc.getY() };
	}

	const playerX = playerLoc.getX();
	const playerY = playerLoc.getY();

	let closest = frontTiles[0];
	for (let index = 1; index < frontTiles.length; index++) {
		const tile = frontTiles[index];
		const closestDx = closest.x - playerX;
		const closestDy = closest.y - playerY;
		const tileDx = tile.x - playerX;
		const tileDy = tile.y - playerY;
		const closestDistance = closestDx * closestDx + closestDy * closestDy;
		const tileDistance = tileDx * tileDx + tileDy * tileDy;
		if (tileDistance < closestDistance) {
			closest = tile;
		}
	}
	return closest;
};

// ============ Manager Function ============
/**
 * Pathfinder tracking manager - handles the pathfinder phase (20% health)
 * Moves player to safe area around pathfinder, prioritizes front tiles for max DPS
 * Updates pathfinder position tracking for direction calculation
 */
export function pathfinderTrackingManager(): void {
	if (pathfinderTrackingStartTick < 0) {
		pathfinderTrackingStartTick = state.gameTick;
		hasReachedPreferredFrontTile = false;
		lastPreferredFrontMoveTick = -10;
	}

	const leviathanHealthPercent = getLeviathanHealthPercent();
	if (leviathanHealthPercent === 0) {
		transitionToLooting(
			'Leviathan health reached 0% during pathfinder tracking.',
		);
		return;
	}

	// Get leviathan NPC for ability to attack
	const leviathanNpc = getLeviathanNpc();
	if (!leviathanNpc) {
		pathfinderTrackingStartTick = -1;
		returnToAttackState();
		return;
	}

	// Get current player location
	const playerLoc = getPlayerLocation();
	if (!playerLoc) {
		return;
	}

	manageSustainDuringTracking();

	// Get pathfinder and verify it exists
	const pathfinder = getPathfinderNpc();
	if (!pathfinder) {
		attackLeviathanDuringTracking(leviathanNpc, false);
		wasAttackAnimationActive = isPlayerAttackAnimationActive();

		// No pathfinder yet: stage at preferred front tiles near spawn
		if (!ensureAtPathfinderLocation(playerLoc)) {
			return; // Still moving to spawn location
		}

		const ticksSinceTrackingStart =
			state.gameTick - pathfinderTrackingStartTick;
		if (ticksSinceTrackingStart <= PATHFINDER_SPAWN_GRACE_TICKS) {
			logTracking(
				`Pathfinder NPC not found yet. Waiting in tracking phase (${ticksSinceTrackingStart}/${PATHFINDER_SPAWN_GRACE_TICKS} ticks).`,
			);
			return;
		}

		logTracking(
			'Pathfinder NPC still missing after grace window. Transitioning to looting.',
		);
		transitionToLooting(
			'Pathfinder missing after grace window; assuming Leviathan is dead.',
		);
		return;
	}

	// Pathfinder is spawned: stop forcing initial staging tiles and track live position
	hasReachedPreferredFrontTile = true;

	logTracking(
		`Pathfinder found at (${pathfinder.getWorldLocation()?.getX()}, ${pathfinder.getWorldLocation()?.getY()})`,
	);

	// Get true tile world position of pathfinder (local location converted to world)
	const pathfinderLoc = getPathfinderTrueTileLocation(pathfinder);
	if (!pathfinderLoc) return;

	// Calculate safe area and determine optimal positioning
	const safeAreaTiles = calculateSafeAreaTiles(pathfinderLoc);
	const direction = determinePathfinderDirection(pathfinderLoc);
	const frontTiles = determineFrontTiles(
		pathfinderLoc,
		safeAreaTiles,
		direction,
	);

	const isInSafeArea = isPlayerInSafeArea(playerLoc, safeAreaTiles);
	const middleSafeTiles = determineMiddleSafeTiles(pathfinderLoc, direction);
	const isOnMiddleSafeTile = isPlayerOnFrontTile(playerLoc, middleSafeTiles);
	const attackedThisTick = attackLeviathanDuringTracking(
		leviathanNpc,
		isInSafeArea,
	);

	// Move to safe area if needed
	if (!isInSafeArea) {
		moveToSafeArea(frontTiles, playerLoc);
		wasAttackAnimationActive = isPlayerAttackAnimationActive();
		return;
	}

	const attackAnimationActive = isPlayerAttackAnimationActive();
	if (
		attackedThisTick &&
		attackAnimationActive &&
		!wasAttackAnimationActive
	) {
		repositionToFrontTile(frontTiles, playerLoc, true);
	}
	wasAttackAnimationActive = attackAnimationActive;

	// Reposition cadence: step when reaching the middle row/column of the 3x3 safe area
	if (isOnMiddleSafeTile) {
		repositionToFrontTile(frontTiles, playerLoc);
	}

	// Update previous location for direction calculation
	updatePathfinderLocationTracking(pathfinderLoc);

	// Check if pathfinder phase is complete
	checkPathfinderPhaseComplete(pathfinder);
}

// ============ Helper Functions ============
/**
 * Convert a world point to true world point (handles instance coordinate conversion)
 * @param point World point to convert
 * @returns Converted true world point, or null if point is null
 */
const toTrueWorldPoint = (
	point: net.runelite.api.coords.WorldPoint | null,
): net.runelite.api.coords.WorldPoint | null => {
	if (!point) {
		return null;
	}
	return getWorldPoint(point) ?? point;
};

/**
 * Get pathfinder true tile location using local position first, with world-location fallback
 * @param pathfinder Pathfinder NPC
 * @returns Pathfinder true tile world point, or null if unavailable
 */
const getPathfinderTrueTileLocation = (
	pathfinder: net.runelite.api.NPC,
): net.runelite.api.coords.WorldPoint | null => {
	const localLocation = pathfinder.getLocalLocation?.();
	if (localLocation) {
		const worldFromLocal =
			net.runelite.api.coords.WorldPoint.fromLocalInstance(
				client,
				localLocation,
			);
		if (worldFromLocal) {
			return getWorldPoint(worldFromLocal) ?? worldFromLocal;
		}
	}

	return toTrueWorldPoint(pathfinder.getWorldLocation());
};

/**
 * Get current player location
 * @returns Player's world location, or null if unable to retrieve
 */
const getPlayerLocation = (): net.runelite.api.coords.WorldPoint | null => {
	const playerLocRaw = client.getLocalPlayer()?.getWorldLocation();

	if (!playerLocRaw) {
		logTracking('Could not get player location');
		return null;
	}

	return getWorldPoint(playerLocRaw) ?? playerLocRaw;
};

/**
 * Ensure player is near pathfinder spawn location (within 3x3 area)
 * Returns true if at location, false if still moving
 * @param playerLoc Current player location
 * @returns True if near pathfinder location, false if still moving
 */
const ensureAtPathfinderLocation = (
	playerLoc: net.runelite.api.coords.WorldPoint,
): boolean => {
	if (hasReachedPreferredFrontTile) return true;

	const preferredFrontTiles = [
		new net.runelite.api.coords.WorldPoint(2078, 6379, 0),
		new net.runelite.api.coords.WorldPoint(2078, 6378, 0),
		new net.runelite.api.coords.WorldPoint(2078, 6377, 0),
	].map((tile) => getWorldPoint(tile) ?? tile);

	const preferredFrontCoords = preferredFrontTiles.map((tile) => ({
		x: tile.getX(),
		y: tile.getY(),
	}));

	const boundedPreferredFrontCoords =
		filterTilesToPathfinderBoundary(preferredFrontCoords);
	if (boundedPreferredFrontCoords.length === 0) return true;

	const isOnPreferredFrontTile = boundedPreferredFrontCoords.some(
		(tile) => tile.x === playerLoc.getX() && tile.y === playerLoc.getY(),
	);

	if (!isOnPreferredFrontTile) {
		if (!bot.localPlayerIdle()) return false;
		if (state.gameTick - lastPreferredFrontMoveTick < 2) return false;

		const targetTile = getClosestFrontTile(
			boundedPreferredFrontCoords,
			playerLoc,
		);
		bot.walking.walkToTrueWorldPoint(targetTile.x, targetTile.y);
		logTracking(
			`Moving to preferred front tile (${targetTile.x}, ${targetTile.y}). Current: (${playerLoc.getX()}, ${playerLoc.getY()})`,
		);
		lastPreferredFrontMoveTick = state.gameTick;
		return false; // Still moving
	}

	hasReachedPreferredFrontTile = true;
	return true; // At preferred front tile
};

/**
 * Calculate the 3x3 safe area tiles around pathfinder center (9 tiles total)
 * Pathfinder is a 3x3 NPC, safe area is (center-1, center-1) to (center+1, center+1)
 * @param pathfinderLoc Pathfinder's current location
 * @returns Array of safe area tile coordinates
 */
const calculateSafeAreaTiles = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
): { x: number; y: number }[] => {
	const tiles: { x: number; y: number }[] = [];
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			tiles.push({
				x: pathfinderLoc.getX() + dx,
				y: pathfinderLoc.getY() + dy,
			});
		}
	}
	return filterTilesToPathfinderBoundary(tiles);
};

/**
 * Determine direction pathfinder is moving based on previous location
 * @param pathfinderLoc Current pathfinder location
 * @returns Direction vector with x and y components
 */
const determinePathfinderDirection = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
): { x: number; y: number } => {
	const predictedDirection = getPredictedCornerDirection(
		pathfinderLoc,
		currentPathfinderDirection,
	);
	if (predictedDirection !== currentPathfinderDirection) {
		currentPathfinderDirection = predictedDirection;
		return directionToVector(currentPathfinderDirection);
	}

	const currentTileKey = `${pathfinderLoc.getX()},${pathfinderLoc.getY()}`;
	const preTurnDirection = preTurnTileToNextDirection[currentTileKey];
	if (preTurnDirection) {
		currentPathfinderDirection = preTurnDirection;
		return directionToVector(currentPathfinderDirection);
	}

	const turnDirection = turnTileToNextDirection[currentTileKey];
	if (turnDirection) {
		currentPathfinderDirection = turnDirection;
		return directionToVector(currentPathfinderDirection);
	}

	if (state.pathfinderPrevLoc) {
		const deltaX = pathfinderLoc.getX() - state.pathfinderPrevLoc.x;
		const deltaY = pathfinderLoc.getY() - state.pathfinderPrevLoc.y;

		if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX !== 0) {
			currentPathfinderDirection = deltaX > 0 ? 'east' : 'west';
			return directionToVector(currentPathfinderDirection);
		}

		if (deltaY !== 0) {
			currentPathfinderDirection = deltaY > 0 ? 'north' : 'south';
			return directionToVector(currentPathfinderDirection);
		}
	}

	return directionToVector(currentPathfinderDirection);
};

/**
 * Determine front tiles (leading edge in direction of travel) for 3x3 pathfinder
 * @param pathfinderLoc Pathfinder's current location
 * @param safeAreaTiles All safe area tiles around pathfinder
 * @param direction Movement direction vector
 * @returns Array of front tile coordinates
 */
const determineFrontTiles = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
	safeAreaTiles: { x: number; y: number }[],
	direction: { x: number; y: number },
): { x: number; y: number }[] => {
	void safeAreaTiles;

	if (direction.x > 0 || direction.x < 0) {
		// Moving horizontally (east/west) - 4 tiles ahead of 3x3 area
		const frontX =
			pathfinderLoc.getX() +
			(direction.x > 0
				? FRONT_TILE_OFFSET_FROM_CENTER
				: -FRONT_TILE_OFFSET_FROM_CENTER);
		return filterTilesToPathfinderBoundary(
			[-2, -1, 0, 1, 2].map((dy) => ({
				x: frontX,
				y: pathfinderLoc.getY() + dy,
			})),
		);
	} else if (direction.y > 0 || direction.y < 0) {
		// Moving vertically (north/south) - 4 tiles ahead of 3x3 area
		const frontY =
			pathfinderLoc.getY() +
			(direction.y > 0
				? FRONT_TILE_OFFSET_FROM_CENTER
				: -FRONT_TILE_OFFSET_FROM_CENTER);
		return filterTilesToPathfinderBoundary(
			[-2, -1, 0, 1, 2].map((dx) => ({
				x: pathfinderLoc.getX() + dx,
				y: frontY,
			})),
		);
	} else {
		// Unknown direction, default to east-facing front row for better DPS uptime
		const frontX = pathfinderLoc.getX() + FRONT_TILE_OFFSET_FROM_CENTER;
		return filterTilesToPathfinderBoundary(
			[-2, -1, 0, 1, 2].map((dy) => ({
				x: frontX,
				y: pathfinderLoc.getY() + dy,
			})),
		);
	}
};

const determineMiddleSafeTiles = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
	direction: { x: number; y: number },
): { x: number; y: number }[] => {
	if (direction.x !== 0) {
		return filterTilesToPathfinderBoundary(
			[-1, 0, 1].map((dy) => ({
				x: pathfinderLoc.getX(),
				y: pathfinderLoc.getY() + dy,
			})),
		);
	}

	return filterTilesToPathfinderBoundary(
		[-1, 0, 1].map((dx) => ({
			x: pathfinderLoc.getX() + dx,
			y: pathfinderLoc.getY(),
		})),
	);
};

/**
 * Check if player is in safe area
 * @param playerLoc Current player location
 * @param safeAreaTiles Safe area tile coordinates
 * @returns True if player is in safe area
 */
const isPlayerInSafeArea = (
	playerLoc: net.runelite.api.coords.WorldPoint,
	safeAreaTiles: { x: number; y: number }[],
): boolean => {
	return safeAreaTiles.some(
		(tile) => tile.x === playerLoc.getX() && tile.y === playerLoc.getY(),
	);
};

/**
 * Check if player is on a front tile
 * @param playerLoc Current player location
 * @param frontTiles Front tile coordinates
 * @returns True if player is on a front tile
 */
const isPlayerOnFrontTile = (
	playerLoc: net.runelite.api.coords.WorldPoint,
	frontTiles: { x: number; y: number }[],
): boolean => {
	return frontTiles.some(
		(tile) => tile.x === playerLoc.getX() && tile.y === playerLoc.getY(),
	);
};

const isRockThreateningTile = (
	tile: { x: number; y: number },
	rockTiles: net.runelite.api.coords.WorldPoint[],
): boolean => {
	return rockTiles.some(
		(rock) =>
			Math.abs(rock.getX() - tile.x) <= ROCK_AVOID_RADIUS &&
			Math.abs(rock.getY() - tile.y) <= ROCK_AVOID_RADIUS,
	);
};

const getBossDistance = (tile: { x: number; y: number }): number => {
	const dx = tile.x - LEVI_BOSS_CENTER_X;
	const dy = tile.y - LEVI_BOSS_CENTER_Y;
	return dx * dx + dy * dy;
};

const getFrontTilesByStablePriority = (
	frontTiles: { x: number; y: number }[],
): { x: number; y: number }[] => {
	if (frontTiles.length === 0) return [];

	if (frontTiles.length < 5) {
		return [...frontTiles];
	}

	// Strict rule: always prioritize the middle three tiles of the 5-wide front row.
	const middleThreeTiles = [frontTiles[1], frontTiles[2], frontTiles[3]];

	// Single fallback: furthest tile from Leviathan.
	const furthestTile = [...frontTiles].sort(
		(leftTile, rightTile) =>
			getBossDistance(rightTile) - getBossDistance(leftTile),
	)[0];

	const orderedTiles: { x: number; y: number }[] = [];
	for (const tile of middleThreeTiles) {
		if (
			!orderedTiles.some(
				(existingTile) =>
					existingTile.x === tile.x && existingTile.y === tile.y,
			)
		) {
			orderedTiles.push(tile);
		}
	}

	if (
		furthestTile &&
		!orderedTiles.some(
			(tile) => tile.x === furthestTile.x && tile.y === furthestTile.y,
		)
	) {
		orderedTiles.push(furthestTile);
	}

	return orderedTiles;
};

const selectFrontTileByPriority = (
	frontTiles: { x: number; y: number }[],
	rockTiles: net.runelite.api.coords.WorldPoint[],
): { x: number; y: number } | null => {
	if (frontTiles.length === 0) return null;

	const closestTile = [...frontTiles].sort(
		(leftTile, rightTile) =>
			getBossDistance(leftTile) - getBossDistance(rightTile),
	)[0];

	const prioritizedTiles = getFrontTilesByStablePriority(frontTiles);
	const safeTile = prioritizedTiles.find(
		(tile) => !isRockThreateningTile(tile, rockTiles),
	);
	if (safeTile) {
		if (closestTile) {
			logFrontTile(
				`Front tile select: chosen (${safeTile.x}, ${safeTile.y}), excluded closest (${closestTile.x}, ${closestTile.y}), candidates=${prioritizedTiles.length}`,
			);
		}
		return safeTile;
	}

	const fallbackTile = prioritizedTiles[0] ?? null;
	if (fallbackTile && closestTile) {
		logFrontTile(
			`Front tile fallback: chosen (${fallbackTile.x}, ${fallbackTile.y}), excluded closest (${closestTile.x}, ${closestTile.y}), no rock-safe candidate`,
		);
	}

	return fallbackTile;
};

const isPlayerAttackAnimationActive = (): boolean => {
	const animationId = client.getLocalPlayer()?.getAnimation?.();
	return typeof animationId === 'number' && animationId !== -1;
};

const manageSustainDuringTracking = (): void => {
	const canEat = canEatFood();
	const canDrink = canDrinkPotion();
	const canCombo = canComboAction();
	if (!canEat && !canDrink) return;

	const currentHealth = client.getBoostedSkillLevel(
		net.runelite.api.Skill.HITPOINTS,
	);
	const currentPrayer = client.getBoostedSkillLevel(
		net.runelite.api.Skill.PRAYER,
	);

	if (
		canCombo &&
		currentHealth <= HP_THRESHOLD_LOW &&
		currentPrayer <= PRAYER_THRESHOLD
	) {
		eatFoodAndDrinkPotion(
			state,
			NORMAL_FOODS,
			NORMAL_FOOD_DELAY,
			PRAYER_POTIONS,
			POTION_DELAY,
		);
		updateLastFoodEatTick(NORMAL_FOOD_DELAY);
		updateLastPotionDrinkTick();
		return;
	}

	if (canEat && currentHealth <= HP_THRESHOLD_CRITICAL) {
		comboEat(state, NORMAL_FOODS, COMBO_FOODS, NORMAL_FOOD_DELAY);
		updateLastFoodEatTick(NORMAL_FOOD_DELAY);
		return;
	}

	if (canEat && currentHealth <= HP_THRESHOLD_LOW) {
		eatFood(state, NORMAL_FOODS, NORMAL_FOOD_DELAY, COMBO_FOODS);
		updateLastFoodEatTick(NORMAL_FOOD_DELAY);
		return;
	}

	if (canDrink && currentPrayer <= PRAYER_THRESHOLD) {
		drinkPotion(state, PRAYER_POTIONS, POTION_DELAY);
		updateLastPotionDrinkTick();
	}
};

/**
 * Move to safe area, prioritizing front tiles while avoiding falling rocks
 * @param frontTiles Front tile coordinates to prioritize
 * @param playerLoc Current player location
 */
const moveToSafeArea = (
	frontTiles: { x: number; y: number }[],
	playerLoc: net.runelite.api.coords.WorldPoint,
): void => {
	void playerLoc;
	if (
		state.gameTick - lastFrontMoveTick <
		PATHFINDER_FRONT_MOVE_RECLICK_TICKS
	) {
		return;
	}

	// Get current falling rocks to avoid
	const rockTiles = getCurrentFallingRockTiles();

	const targetTile = selectFrontTileByPriority(frontTiles, rockTiles);
	if (!targetTile) {
		logSafeArea(
			'No valid bounded front tiles available; holding position.',
		);
		return;
	}

	const hasSameTarget =
		lastFrontMoveTarget?.x === targetTile.x &&
		lastFrontMoveTarget?.y === targetTile.y;
	if (hasSameTarget && !bot.localPlayerIdle()) {
		return;
	}
	bot.walking.walkToTrueWorldPoint(targetTile.x, targetTile.y);
	lastFrontMoveTick = state.gameTick;
	lastFrontMoveTarget = { x: targetTile.x, y: targetTile.y };

	logSafeArea(
		`Moving to front tile. Target: (${targetTile.x}, ${targetTile.y})`,
	);
};

/**
 * Reposition to front tile when idle, avoiding falling rocks
 * @param frontTiles Front tile coordinates to target
 * @param playerLoc Current player location
 */
const repositionToFrontTile = (
	frontTiles: { x: number; y: number }[],
	playerLoc: net.runelite.api.coords.WorldPoint,
	forceImmediateReclick = false,
): void => {
	void playerLoc;
	if (
		!forceImmediateReclick &&
		state.gameTick - lastFrontMoveTick < PATHFINDER_FRONT_MOVE_RECLICK_TICKS
	) {
		return;
	}

	// Get current falling rocks to avoid
	const rockTiles = getCurrentFallingRockTiles();

	const targetTile = selectFrontTileByPriority(frontTiles, rockTiles);
	if (!targetTile) {
		logFrontTile(
			'No valid bounded front tiles available; holding position.',
		);
		return;
	}

	const hasSameTarget =
		lastFrontMoveTarget?.x === targetTile.x &&
		lastFrontMoveTarget?.y === targetTile.y;
	if (!forceImmediateReclick && hasSameTarget && !bot.localPlayerIdle()) {
		return;
	}
	bot.walking.walkToTrueWorldPoint(targetTile.x, targetTile.y);
	lastFrontMoveTick = state.gameTick;
	lastFrontMoveTarget = { x: targetTile.x, y: targetTile.y };

	logFrontTile(
		`Repositioning to front tile. Target: (${targetTile.x}, ${targetTile.y})`,
	);
};

/**
 * Attack leviathan while tracking pathfinder
 * @param leviathan Leviathan NPC reference
 */
const attackLeviathanDuringTracking = (
	leviathan: net.runelite.api.NPC,
	isInSafeArea: boolean,
): boolean => {
	void leviathan;
	if (!canAttack()) return false;
	const attacked = attackLeviathanWithFallback();
	if (!attacked) return false;
	updateLastAttackTick();

	logTracking(
		isInSafeArea
			? 'Attacking leviathan on cooldown during pathfinder tracking.'
			: 'Attacking leviathan while re-positioning to pathfinder safe area.',
	);
	return true;
};

/**
 * Update previous location tracking for direction calculation
 * @param pathfinderLoc Current pathfinder location to store
 */
const updatePathfinderLocationTracking = (
	pathfinderLoc: net.runelite.api.coords.WorldPoint,
): void => {
	state.pathfinderPrevLoc = {
		x: pathfinderLoc.getX(),
		y: pathfinderLoc.getY(),
	};
};

/**
 * Check if pathfinder phase is complete (pathfinder despawned)
 * @param pathfinder Pathfinder NPC reference
 */
const checkPathfinderPhaseComplete = (
	pathfinder: net.runelite.api.NPC | null,
): void => {
	if (!pathfinder || !isNpcAlive(pathfinder)) {
		transitionToLooting(
			'Pathfinder despawned; transitioning to looting phase.',
		);
	}
};

const transitionToLooting = (message: string): void => {
	logTracking(message);
	state.mainState = MainStates.LOOTING;
	state.lootingState.subState = LootingSubStates.LOOTING;
	state.pathfinderPrevLoc = null;
	currentPathfinderDirection = 'east';
	hasReachedPreferredFrontTile = false;
	lastPreferredFrontMoveTick = -10;
	lastFrontMoveTick = -10;
	lastFrontMoveTarget = null;
	wasAttackAnimationActive = false;
	pathfinderTrackingStartTick = -1;
	returnToAttackState();
};
