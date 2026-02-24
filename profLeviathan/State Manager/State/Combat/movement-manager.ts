import { CombatSubStates, state, LeviathanState } from '../../script-state.js';
import { getWorldPoint } from '../../../../imports/location-functions.js';
import { npcOrientationToPlayer } from '../../../../imports/npc-functions.js';
import { attackTargetNpc } from '../../../../imports/player-functions.js';
import { logger } from '../../../../imports/logger.js';
import {
	LEVIATHAN_FALLBACK_ID,
	LEVIATHAN_PRIMARY_ID,
	returnToAttackState,
} from './combat-tracker.js';

// ============ Logging Toggles ============
const ENABLE_MOVEMENT_LOGGING = true;
const ENABLE_SPECIAL_PHASE_LOGGING = true;

const logMovement = (message: string) =>
	ENABLE_MOVEMENT_LOGGING &&
	logger(state, 'debug', 'movementManager', message);
const logSpecialPhase = (functionName: string, message: string) =>
	ENABLE_SPECIAL_PHASE_LOGGING &&
	logger(state, 'debug', functionName, message);

const pickPreferredLeviathan = (
	leviathans: net.runelite.api.NPC[],
): net.runelite.api.NPC | undefined => {
	if (!leviathans || leviathans.length === 0) return undefined;
	const primary = leviathans.find(
		(npc: net.runelite.api.NPC) => npc.getId?.() === LEVIATHAN_PRIMARY_ID,
	);
	if (primary) return primary;
	const fallback = leviathans.find(
		(npc: net.runelite.api.NPC) => npc.getId?.() === LEVIATHAN_FALLBACK_ID,
	);
	return fallback ?? leviathans[0];
};

const attackLeviathanWithFallback = (): boolean => {
	if (attackTargetNpc(state, LEVIATHAN_PRIMARY_ID)) return true;
	return attackTargetNpc(state, LEVIATHAN_FALLBACK_ID);
};

// ============ Manager Function ============
/**
 * Movement Manager - handles special attack phases 1-3 movement patterns
 * Executes lightning or debris phase movement sequences and calculates safe tile positions
 * Transitions to appropriate special phase manager based on attack type
 */
export function movementManager(): void {
	if (!pendingSpecialAttackType) {
		hasLoggedMovementExecution = false;
		returnToAttackState();
		return;
	}

	if (!hasLoggedMovementExecution) {
		logMovement(
			`Executing special attack phases 1-3 for type: ${pendingSpecialAttackType}`,
		);
		hasLoggedMovementExecution = true;
	}

	const phaseData = executeSpecialAttackPhases1to3(
		state,
		pendingSpecialAttackType,
	);
	if (!phaseData) return;

	specialPhaseData = phaseData;
	state.combatState.subState =
		pendingSpecialAttackType === 'lightning'
			? CombatSubStates.SPECIAL_1
			: CombatSubStates.SPECIAL_2;
	pendingSpecialAttackType = null;
	hasLoggedMovementExecution = false;
}

export type SpecialAttackType = 'lightning' | 'debris';

/**
 * Speical Phase Data - contains information about the current special attack phase, including safe tiles and player direction
 * @param currentDirection Direction the player is relative to the boss (north, south, east, west)
 * @param safeTileA First safe tile for the current phase (world point)
 * @param safeTileB Second safe tile for the current phase (world point)
 * @param isOnSafeTile Whether the player is currently on a safe tile
 * @param isFacingPlayer Whether the boss is currently facing the player (used for phase 2 attack timing)
 * @param playerX Player's current X coordinate (used for movement and safe tile calculations)
 * @param playerY Player's current Y coordinate (used for movement and safe tile calculations)
 */
export type SpecialPhaseData = {
	currentDirection: Direction;
	safeTileA: net.runelite.api.coords.WorldPoint;
	safeTileB: net.runelite.api.coords.WorldPoint;
	isOnSafeTile: boolean;
	isFacingPlayer: boolean;
	playerX: number;
	playerY: number;
};

let pendingSpecialAttackType: SpecialAttackType | null = null;
let specialPhaseData: SpecialPhaseData | null = null;
let phase1TargetTile: net.runelite.api.coords.WorldPoint | null = null;
let phase1WalkInitiated: boolean = false;
let phase3WalkInitiated: boolean = false;
let phase2AttackInitiated: boolean = false;
let phase2AttackInitiatedTick: number = -1;
let phase2Completed: boolean = false;
let hasLoggedMovementExecution: boolean = false;

// ============ Helper Functions ============
/**
 * Start a new special attack phase execution
 * @param attackType Type of special attack: 'lightning' or 'debris'
 */
export const startSpecialAttackPhase = (
	attackType: SpecialAttackType,
): void => {
	logSpecialPhase(
		'startSpecialAttackPhase',
		`Setting pendingSpecialAttackType to: ${attackType}`,
	);
	pendingSpecialAttackType = attackType;
	specialPhaseData = null;
	phase1TargetTile = null;
	phase1WalkInitiated = false;
	phase3WalkInitiated = false;
	phase2AttackInitiated = false;
	phase2AttackInitiatedTick = -1;
	phase2Completed = false;
	hasLoggedMovementExecution = false;
};

/**
 * Get the current special phase data containing safe tiles and direction
 * @returns Special phase data if available, null otherwise
 */
export const getSpecialPhaseData = (): SpecialPhaseData | null => {
	return specialPhaseData;
};

/**
 * Clear the current special phase data
 * @returns void
 */
export const clearSpecialPhaseData = (): void => {
	specialPhaseData = null;
};

/**
 * Hard reset all special-phase movement state.
 * Use when special sequence is aborted (e.g. spell verification failure).
 */
export const resetSpecialAttackPhaseState = (): void => {
	pendingSpecialAttackType = null;
	specialPhaseData = null;
	phase1TargetTile = null;
	phase1WalkInitiated = false;
	phase3WalkInitiated = false;
	phase2AttackInitiated = false;
	phase2AttackInitiatedTick = -1;
	phase2Completed = false;
	hasLoggedMovementExecution = false;
};

// True world coordinate constants
const TRUE_WORLD_COORDS = {
	grave: { x: 2062, y: 6436, plane: 0 },
	bossLocation: { x: 2081, y: 6372, plane: 0 },
	pathfinderStart: { x: 2076, y: 6377, plane: 0 },
	// Arena perimeter boundaries (entire arena)
	arenaMinX: 2071,
	arenaMaxX: 2091,
	arenaMinY: 6363,
	arenaMaxY: 6381,
	ladder: {
		minX: 2064,
		maxX: 2069,
		minY: 6365,
		maxY: 6370,
	},
	// Safe tiles and debris spawn locations for each direction
	zones: {
		north: {
			lightningSafeTileA: { x: 2077, y: 6377 },
			lightningSafeTileB: { x: 2085, y: 6377 },
			debrisStartTileA: { x: 2077, y: 6380 },
			debrisStartTileB: { x: 2084, y: 6381 },
		},
		south: {
			lightningSafeTileA: { x: 2077, y: 6367 },
			lightningSafeTileB: { x: 2085, y: 6367 },
			debrisStartTileA: { x: 2077, y: 6364 },
			debrisStartTileB: { x: 2085, y: 6365 },
		},
		east: {
			lightningSafeTileA: { x: 2086, y: 6368 },
			lightningSafeTileB: { x: 2086, y: 6376 },
			debrisStartTileA: { x: 2089, y: 6369 },
			debrisStartTileB: { x: 2089, y: 6375 },
		},
		west: {
			lightningSafeTileA: { x: 2076, y: 6376 },
			lightningSafeTileB: { x: 2076, y: 6368 },
			debrisStartTileA: { x: 2073, y: 6376 },
			debrisStartTileB: { x: 2073, y: 6368 },
		},
	},
};

// Coordinate type
type Coordinate = { x: number; y: number };
type Direction = 'north' | 'south' | 'east' | 'west';
type ZoneTileType =
	| 'lightningSafeTileA'
	| 'lightningSafeTileB'
	| 'debrisStartTileA'
	| 'debrisStartTileB';

/**
 * Convert a raw coordinate to a true world point
 * @param coord Coordinate to convert
 * @param plane Plane level (default 0)
 * @returns True world point
 */
const toWorldPoint = (
	coord: Coordinate,
	plane: number = 0,
): net.runelite.api.coords.WorldPoint => {
	const basePoint = new net.runelite.api.coords.WorldPoint(
		coord.x,
		coord.y,
		plane,
	);
	return getWorldPoint(basePoint) ?? basePoint;
};

/**
 * Convert a coordinate object to a true world coordinate
 * @param coord Coordinate to convert
 * @param plane Plane level (default 0)
 * @returns Converted world coordinate
 */
const toWorldCoord = (coord: Coordinate, plane: number = 0): Coordinate => {
	const worldPoint = toWorldPoint(coord, plane);
	return { x: worldPoint.getX(), y: worldPoint.getY() };
};
/**
 * Converted location functions
 * @returns Object containing functions to get converted world points for key locations
 */
export const getGraveLocation = (): net.runelite.api.coords.WorldPoint => {
	return toWorldPoint(TRUE_WORLD_COORDS.grave, TRUE_WORLD_COORDS.grave.plane);
};

/**
 * Get boss location in true world coordinates
 * Used for direction calculations and pathfinding targeting
 * @returns Boss world location point
 */
const getBossLocation = (): net.runelite.api.coords.WorldPoint => {
	return toWorldPoint(
		TRUE_WORLD_COORDS.bossLocation,
		TRUE_WORLD_COORDS.bossLocation.plane,
	);
};

/**
 * Pathfinder start location is used as the initial target for
 * @returns Pathfinder spawn location in true world coordinates
 */
/**
 * Determine which direction the player is relative to the boss location
 * @returns Direction: 'north', 'south', 'east', or 'west'
 */
const getPlayerDirection = (): Direction => {
	const player = client?.getLocalPlayer?.();
	if (!player) return 'north'; // Default fallback

	const playerLoc = player.getWorldLocation();
	const bossLoc = getBossLocation();

	const deltaX = playerLoc.getX() - bossLoc.getX();
	const deltaY = playerLoc.getY() - bossLoc.getY();

	// Use absolute deltas to determine which axis is more extreme
	if (Math.abs(deltaY) > Math.abs(deltaX)) {
		return deltaY > 0 ? 'north' : 'south';
	} else {
		return deltaX > 0 ? 'east' : 'west';
	}
};

/**
 * Get zone data (safe tiles, debris spawns) for the player's current direction relative to boss
 * @returns Zone data for the player's current direction
 */
export const getPlayerZone = () => {
	const direction = getPlayerDirection();
	return TRUE_WORLD_COORDS.zones[direction];
};

/**
 * Get zone data (safe tiles, debris spawns) for a given direction
 * @param x X coordinate of the target
 * @param y Y coordinate of the target
 * @returns Zone data for the determined direction
 */
const getZoneForCoord = (x: number, y: number) => {
	const deltaX = x - TRUE_WORLD_COORDS.bossLocation.x;
	const deltaY = y - TRUE_WORLD_COORDS.bossLocation.y;

	let direction: Direction;
	if (Math.abs(deltaY) > Math.abs(deltaX)) {
		direction = deltaY > 0 ? 'north' : 'south';
	} else {
		direction = deltaX > 0 ? 'east' : 'west';
	}
	return TRUE_WORLD_COORDS.zones[direction];
};

/**
 * Get converted world point for a zone tile (e.g., lightning safe tile A for north zone)
 * @param direction Direction to get tile from ('north', 'south', 'east', 'west')
 * @param tileType Type of tile: 'lightningSafeTileA', 'lightningSafeTileB', 'debrisStartTileA', 'debrisStartTileB'
 * @returns World point of the requested tile
 */
const getZoneTileWorldPoint = (
	direction: Direction,
	tileType: ZoneTileType,
): net.runelite.api.coords.WorldPoint => {
	const zone = TRUE_WORLD_COORDS.zones[direction];
	const tile = zone[tileType];
	return toWorldPoint(tile, 0);
};

/**
 * Get converted world coordinate for a zone tile
 * @param direction Direction to get tile from
 * @param tileType Type of tile to get
 * @return Coordinate of the requested tile
 */
export const getZoneTileCoord = (
	direction: Direction,
	tileType: ZoneTileType,
): Coordinate => {
	const worldPoint = getZoneTileWorldPoint(direction, tileType);
	return { x: worldPoint.getX(), y: worldPoint.getY() };
};

/**
 * Get zone tiles (as world points) for a given direction and tile pair
 * @param direction Direction to get tiles from
 * @param tileTypeA First tile type to retrieve
 * @param tileTypeB Second tile type to retrieve
 * @returns Object with tileA and tileB as world points
 */
const getDirectionTiles = (
	direction: Direction,
	tileTypeA: ZoneTileType,
	tileTypeB: ZoneTileType,
): {
	tileA: net.runelite.api.coords.WorldPoint;
	tileB: net.runelite.api.coords.WorldPoint;
} => {
	return {
		tileA: getZoneTileWorldPoint(direction, tileTypeA),
		tileB: getZoneTileWorldPoint(direction, tileTypeB),
	};
};

/**
 * Get all lightning safe tiles for a direction
 * @param direction Direction to get lightning safe tiles from
 * @returns Object with tileA and tileB as world points
 */
const getLightningSafeTilesForDirection = (
	direction: Direction,
): {
	tileA: net.runelite.api.coords.WorldPoint;
	tileB: net.runelite.api.coords.WorldPoint;
} => {
	return getDirectionTiles(
		direction,
		'lightningSafeTileA',
		'lightningSafeTileB',
	);
};

/**
 * Get all debris spawn tiles for a direction
 * @param direction Direction to get debris spawn tiles from
 * @returns Object with tileA and tileB as world points
 */
const getDebrisSpawnTilesForDirection = (
	direction: Direction,
): {
	tileA: net.runelite.api.coords.WorldPoint;
	tileB: net.runelite.api.coords.WorldPoint;
} => {
	return getDirectionTiles(direction, 'debrisStartTileA', 'debrisStartTileB');
};

/**
 * Get the opposite direction (north↔south, east↔west)
 * @param direction Current direction
 * @returns Opposite direction
 */
const getOppositeDirection = (direction: Direction): Direction => {
	switch (direction) {
		case 'north': {
			return 'south';
		}
		case 'south': {
			return 'north';
		}
		case 'east': {
			return 'west';
		}
		case 'west': {
			return 'east';
		}
		default: {
			return 'north'; // Fallback
		}
	}
};

/**
 * Get safe tiles for a specific direction and attack type
 * @param direction Direction to get safe tiles from
 * @param attackType Type of attack: 'lightning' or 'debris'
 * @returns Array of safe tile world points
 */
export const getSafeTilesForSpecialAttack = (
	direction: Direction,
	attackType: 'lightning' | 'debris',
): net.runelite.api.coords.WorldPoint[] => {
	const zone = TRUE_WORLD_COORDS.zones[direction];

	return attackType === 'lightning'
		? [
				toWorldPoint(
					{
						x: zone.lightningSafeTileA.x,
						y: zone.lightningSafeTileA.y,
					},
					0,
				),
				toWorldPoint(
					{
						x: zone.lightningSafeTileB.x,
						y: zone.lightningSafeTileB.y,
					},
					0,
				),
			]
		: [
				toWorldPoint(
					{ x: zone.debrisStartTileA.x, y: zone.debrisStartTileA.y },
					0,
				),
				toWorldPoint(
					{ x: zone.debrisStartTileB.x, y: zone.debrisStartTileB.y },
					0,
				),
			];
};

/**
 * Get a tile at optimal distance (7-9 tiles) from boss in the given direction
 * Main direction: 7-9 tiles away
 * Perpendicular axis: +1 or -1 variation
 * @param direction Direction to get tile from
 * @returns World point at optimal distance from boss
 */
const getOppositeDirectionTile = (
	direction: Direction,
): net.runelite.api.coords.WorldPoint => {
	const bossLoc = getBossLocation();
	const bossX = bossLoc.getX();
	const bossY = bossLoc.getY();

	const distance = 7 + Math.floor(Math.random() * 3); // 7, 8, or 9
	const perpendicular = Math.random() < 0.5 ? 1 : -1; // +1 or -1

	let tileX: number;
	let tileY: number;

	switch (direction) {
		case 'north': {
			// North: move up from boss 7-9 tiles, vary X by ±1
			tileX = bossX + perpendicular;
			tileY = bossY + distance;
			break;
		}
		case 'south': {
			// South: move down from boss 7-9 tiles, vary X by ±1
			tileX = bossX + perpendicular;
			tileY = bossY - distance;
			break;
		}
		case 'east': {
			// East: move right from boss 7-9 tiles, vary Y by ±1
			tileX = bossX + distance;
			tileY = bossY + perpendicular;
			break;
		}
		case 'west': {
			// West: move left from boss 7-9 tiles, vary Y by ±1
			tileX = bossX - distance;
			tileY = bossY + perpendicular;
			break;
		}
	}

	return toWorldPoint({ x: tileX, y: tileY }, 0);
};

/**
 * Execute special attack phases 1-3 for lightning/debris attacks
 * Phase 1: Run to opposite boundary
 * Phase 2: Attack once when at opposite boundary and not facing player
 * Phase 3: Move to safe tile within current boundary, then attack
 * @param currentState Current combat state
 * @param attackType Type of attack: 'lightning' or 'debris'
 * @param playerLocOverride Optional override for player location
 * @param leviathanOverride Optional override for leviathan NPC
 * @returns Phase data if phases complete successfully, null if incomplete
 */
export const executeSpecialAttackPhases1to3 = (
	currentState: LeviathanState,
	attackType: 'lightning' | 'debris',
	playerLocOverride?: net.runelite.api.coords.WorldPoint | null,
	leviathanOverride?: net.runelite.api.NPC | null,
): SpecialPhaseData | null => {
	const leviathan: net.runelite.api.NPC | undefined =
		leviathanOverride ??
		pickPreferredLeviathan(
			bot.npcs
				.getWithIds([LEVIATHAN_PRIMARY_ID, LEVIATHAN_FALLBACK_ID])
				.filter(
					(npc: net.runelite.api.NPC) =>
						(npc.getHealthRatio?.() ?? 0) > 0,
				),
		);

	const playerLoc =
		playerLocOverride ??
		client?.getLocalPlayer?.()?.getWorldLocation?.() ??
		null;

	const worldPlayerLoc = playerLoc
		? toWorldCoord(
				{ x: playerLoc.getX(), y: playerLoc.getY() },
				playerLoc.getPlane(),
			)
		: null;

	const playerX = worldPlayerLoc?.x ?? 0;
	const playerY = worldPlayerLoc?.y ?? 0;

	// Determine current direction
	const currentDirection = getZoneForCoord(playerX, playerY);
	const currentDirectionName = Object.entries(TRUE_WORLD_COORDS.zones).find(
		([, zone]) => zone === currentDirection,
	)?.[0] as Direction;

	// Get safe tiles for this attack type
	let safeTileA: net.runelite.api.coords.WorldPoint;
	let safeTileB: net.runelite.api.coords.WorldPoint;

	if (attackType === 'lightning') {
		const tiles = getLightningSafeTilesForDirection(currentDirectionName);
		safeTileA = tiles.tileA;
		safeTileB = tiles.tileB;
	} else {
		const tiles = getDebrisSpawnTilesForDirection(currentDirectionName);
		safeTileA = tiles.tileA;
		safeTileB = tiles.tileB;
	}

	const isOnSafeTileA =
		playerX === safeTileA.getX() && playerY === safeTileA.getY();
	const isOnSafeTileB =
		playerX === safeTileB.getX() && playerY === safeTileB.getY();
	const isOnSafeTile = isOnSafeTileA || isOnSafeTileB;

	const orientationData = leviathan
		? npcOrientationToPlayer(leviathan)
		: false;
	const isFacingPlayer =
		orientationData && typeof orientationData === 'object'
			? orientationData.isFacingPlayer
			: false;

	// PHASE 1: Run to opposite side (7-9 tiles away from boss)
	const oppositeDirection = getOppositeDirection(currentDirectionName);
	if (!phase1TargetTile) {
		phase1TargetTile = getOppositeDirectionTile(oppositeDirection);
	}

	const isAtOppositeDirection = currentDirectionName === oppositeDirection;

	if (!isAtOppositeDirection) {
		// Click once to initiate the walk, then wait for player to finish walking
		if (!phase1WalkInitiated) {
			logSpecialPhase(
				'executeSpecialAttackPhases1to3',
				`PHASE 1: Starting walk from ${currentDirectionName} to ${oppositeDirection} at true world (${phase1TargetTile.getX()}, ${phase1TargetTile.getY()})`,
			);
			bot.walking.walkToTrueWorldPoint(
				phase1TargetTile.getX(),
				phase1TargetTile.getY(),
			);
			phase1WalkInitiated = true;
		}

		// Wait for player to stop moving before proceeding
		if (!bot.localPlayerIdle()) {
			return null; // Still walking, wait
		}
		// Player is idle, reset flag for next phase and continue
		phase1WalkInitiated = false;
	}

	// PHASE 2: Attack once when at opposite side and not facing player
	if (!phase2Completed && !isFacingPlayer) {
		// Initiate attack once
		if (!phase2AttackInitiated) {
			logSpecialPhase(
				'executeSpecialAttackPhases1to3',
				`PHASE 2: At opposite side (${currentDirectionName}), NPC not facing. Attacking to turn NPC.`,
			);
			attackLeviathanWithFallback();
			phase2AttackInitiated = true;
			phase2AttackInitiatedTick = currentState.gameTick;
			return null; // Wait before checking for hitsplat
		}

		// Wait for attack to fully execute: 1 tick for animation to start
		const ticksSinceAttackInitiated =
			currentState.gameTick - phase2AttackInitiatedTick;

		if (ticksSinceAttackInitiated < 1) {
			logSpecialPhase(
				'executeSpecialAttackPhases1to3',
				`PHASE 2: Waiting for attack to execute (tick ${ticksSinceAttackInitiated}/1)`,
			);
			return null; // Wait for attack animation to start
		}

		// Attack has fully executed, proceed to Phase 3
		logSpecialPhase(
			'executeSpecialAttackPhases1to3',
			`PHASE 2: Attack executed, proceeding to PHASE 3 (ticks elapsed: ${ticksSinceAttackInitiated})`,
		);
		phase2AttackInitiated = false;
		phase2AttackInitiatedTick = -1;
		phase2Completed = true;
	}

	// PHASE 3: Move to safe tile within current boundary (one-time positioning)
	if (!isOnSafeTile) {
		// Click once to initiate the walk, then wait for player to finish walking
		if (!phase3WalkInitiated) {
			const distanceToA = Math.sqrt(
				Math.pow(playerX - safeTileA.getX(), 2) +
					Math.pow(playerY - safeTileA.getY(), 2),
			);
			const distanceToB = Math.sqrt(
				Math.pow(playerX - safeTileB.getX(), 2) +
					Math.pow(playerY - safeTileB.getY(), 2),
			);

			const closestTile =
				distanceToA <= distanceToB ? safeTileA : safeTileB;
			logSpecialPhase(
				'executeSpecialAttackPhases1to3',
				`PHASE 3: Starting walk to safe tile at true world (${closestTile.getX()}, ${closestTile.getY()})`,
			);
			bot.walking.walkToTrueWorldPoint(
				closestTile.getX(),
				closestTile.getY(),
			);
			phase3WalkInitiated = true;
		}

		// Wait for player to stop moving before proceeding
		if (!bot.localPlayerIdle()) {
			return null; // Still walking, wait
		}
		// Player is idle, reset flag and continue to attack
		phase3WalkInitiated = false;
	}

	// PHASE 3: Player reached safe tile, return phase data
	// Special managers will handle waiting for safe tile and executing the attack
	logSpecialPhase(
		'executeSpecialAttackPhases1to3',
		`Phase 3 complete! Returning phase data for ${attackType} special (direction: ${currentDirectionName})`,
	);

	// Return completed phases data (special-manager will verify safe tile and handle attack)
	return {
		currentDirection: currentDirectionName,
		safeTileA,
		safeTileB,
		isOnSafeTile,
		isFacingPlayer,
		playerX,
		playerY,
	};
};
