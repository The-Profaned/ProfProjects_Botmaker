import { state, CombatSubStates } from '../../script-state.js';
import { logger } from '../../../../imports/logger.js';
import { dangerousObjectIds } from '../../../../imports/object-ids.js';
import { getWorldPoint } from '../../../../imports/location-functions.js';
import { isNpcAlive } from '../../../../imports/npc-functions.js';
import { attackTargetNpc } from '../../../../imports/player-functions.js';
import {
	DANGEROUS_GRAPHICS_OBJECT_IDS,
	getCurrentFallingRockTiles,
	PREDEFINED_DANGEROUS_TILES,
} from './projectile-manager.js';
import {
	canAttack,
	getLeviathanHealthPercent,
	check20PercentHealthGate,
	LEVIATHAN_FALLBACK_ID,
	LEVIATHAN_PRIMARY_ID,
	updateLastAttackTick,
} from './combat-tracker.js';

// ============ Logging Toggles ============
const ENABLE_PATHFINDER_SPAWN_LOGGING = true;
const ENABLE_PATHFINDER_ACTION_STATE_LOGGING = true;

const logPathfinderSpawn = (message: string) =>
	ENABLE_PATHFINDER_SPAWN_LOGGING &&
	logger(state, 'debug', 'pathfinderSpawnManager', message);
const logPathfinderActionState = (message: string) =>
	ENABLE_PATHFINDER_ACTION_STATE_LOGGING &&
	logger(state, 'debug', 'pathfinderSpawnActionState', message);

// ============ Constants ============
const ABYSSAL_PATHFINDER = net.runelite.api.gameval.NpcID.LEVIATHAN_BUFF_NPC; // NPC ID 12220
const PATHFINDER_SPAWN_LOCATION = { x: 2076, y: 6378, plane: 0 };
const SPAWN_MOVE_RECLICK_TICKS = 4;
const NORTH_HOLD_MIN_X = 2079;
const NORTH_HOLD_MAX_X = 2086;
const NORTH_HOLD_MIN_Y = 6378;
const NORTH_HOLD_MAX_Y = 6381;
const NORTH_ENTRY_X = 2079;
const NORTH_ENTRY_Y = 6378;
const NORTH_HOLD_ANCHOR_X = 2082;
const NORTH_HOLD_ANCHOR_Y = 6379;
const NORTH_TARGET_LOCK_TIMEOUT_TICKS = 10;
const NORTH_SAME_TARGET_REISSUE_TICKS = 8;
let lastSpawnMoveTick = -10;
let lockedNorthTarget: { x: number; y: number } | null = null;
let lastNorthTargetSetTick = -10;
let lastIssuedNorthWalkTarget: { x: number; y: number } | null = null;
let lastIssuedNorthWalkTick = -10;

const NORTH_APPROACH_WAYPOINTS_WEST = [
	{ x: 2075, y: 6369 },
	{ x: 2075, y: 6375 },
	{ x: 2078, y: 6378 },
];

const NORTH_APPROACH_WAYPOINTS_EAST = [
	{ x: 2087, y: 6369 },
	{ x: 2087, y: 6375 },
	{ x: 2083, y: 6379 },
];

const NORTH_APPROACH_WAYPOINT_PATHS = [
	NORTH_APPROACH_WAYPOINTS_WEST,
	NORTH_APPROACH_WAYPOINTS_EAST,
];

type PathfinderSpawnActionState =
	| 'IDLE'
	| 'MOVING_TO_SPAWN'
	| 'HOLDING_NEAR_SPAWN'
	| 'AT_SPAWN_WAITING_20_GATE'
	| 'ATTACKING_WHILE_PATHING'
	| 'ATTACKING_WHILE_HOLDING';

const hasActiveSpecialHazards = (): boolean => {
	const activeGraphics = bot.graphicsObjects.getWithIds(
		DANGEROUS_GRAPHICS_OBJECT_IDS,
	);
	if (activeGraphics && activeGraphics.length > 0) return true;

	return false;
};

const isSpecialSequenceActive = (): boolean => {
	const subStateSpecial =
		state.combatState.subState === CombatSubStates.SPECIAL_1 ||
		state.combatState.subState === CombatSubStates.SPECIAL_2 ||
		state.combatState.subState === CombatSubStates.MOVEMENT;

	return (
		subStateSpecial ||
		state.waitingForSpellCastConfirmation ||
		hasActiveSpecialHazards()
	);
};

let lastPathfinderSpawnActionState: PathfinderSpawnActionState | null = null;

const attackLeviathanWithFallback = (): boolean => {
	if (attackTargetNpc(state, LEVIATHAN_PRIMARY_ID)) return true;
	return attackTargetNpc(state, LEVIATHAN_FALLBACK_ID);
};

const tryAttackDuringPathfinderSpawn = (): void => {
	if (!canAttack()) return;
	if (!attackLeviathanWithFallback()) return;
	updateLastAttackTick();
};

const setPathfinderSpawnActionState = (
	nextState: PathfinderSpawnActionState,
	message: string,
): void => {
	if (lastPathfinderSpawnActionState === nextState) return;
	lastPathfinderSpawnActionState = nextState;
	logPathfinderActionState(`${nextState}: ${message}`);
};
// ============ Manager Function ============
/**
 * Pathfinder Spawn Manager - handles movement to pathfinder spawn location at 25% health
 * Monitors Leviathan's health percentage, moves player to spawn location when 25% gate is hit
 * Continues attacking while moving to maintain DPS, waits for 20% gate to transition to tracking phase
 *
 * SAFETY: Never transitions to pathfinder phase during active special attacks (SPECIAL_1/SPECIAL_2)
 * as this would kill the player by interrupting dodge mechanics
 */
export function pathfinderSpawnManager(): void {
	const leviathanHealthPercent = getLeviathanHealthPercent();
	const isInSpecialAttack = isSpecialSequenceActive();
	if (leviathanHealthPercent === null) return;

	if (state.pathfinderSpawnActive) {
		handleMovementToSpawnLocation();
		return;
	}

	setPathfinderSpawnActionState(
		'IDLE',
		'Not currently in PATHFINDER_SPAWN sub-state.',
	);

	const shouldStartPathfinderSpawn =
		leviathanHealthPercent <= 25 &&
		leviathanHealthPercent > 20 &&
		!state.pathfinderSpawnActive;

	if (shouldStartPathfinderSpawn) {
		logPathfinderSpawn(
			`Leviathan at ${leviathanHealthPercent}% health. Starting north staging for pathfinder spawn.`,
		);
		state.pathfinderSpawnActive = true;
		state.combatState.subState = CombatSubStates.PATHFINDER_SPAWN;
		return;
	}

	if (check20PercentHealthGate(leviathanHealthPercent)) {
		logPathfinderSpawn(
			`Leviathan at ${leviathanHealthPercent}% health. Late gate detected; force-starting north staging until pathfinder spawns.`,
		);
		state.pathfinderSpawnActive = true;
		state.combatState.subState = CombatSubStates.PATHFINDER_SPAWN;
		return;
	}

	if (isInSpecialAttack) {
		setPathfinderSpawnActionState(
			'IDLE',
			'Special sequence active outside pathfinder gates.',
		);
	}
}

const getTileKey = (x: number, y: number): string => `${x},${y}`;

const isSafeTile = (
	x: number,
	y: number,
	occupiedTiles: Set<string>,
	dangerousTiles: Set<string>,
): boolean => {
	if (occupiedTiles.has(getTileKey(x, y))) return false;
	if (dangerousTiles.has(getTileKey(x, y))) return false;
	return true;
};

const getDistanceSquared = (
	from: net.runelite.api.coords.WorldPoint,
	x: number,
	y: number,
): number => {
	const dx = from.getX() - x;
	const dy = from.getY() - y;
	return dx * dx + dy * dy;
};

const getDistanceSquaredCoords = (
	fromX: number,
	fromY: number,
	toX: number,
	toY: number,
): number => {
	const dx = fromX - toX;
	const dy = fromY - toY;
	return dx * dx + dy * dy;
};

const isSameTile = (
	left: { x: number; y: number } | null,
	right: { x: number; y: number } | null,
): boolean => {
	if (!left || !right) return false;
	return left.x === right.x && left.y === right.y;
};

const hasLockedNorthTargetExpired = (): boolean => {
	return (
		state.gameTick - lastNorthTargetSetTick >
		NORTH_TARGET_LOCK_TIMEOUT_TICKS
	);
};

const isTileAvailable = (
	tile: { x: number; y: number },
	availableTiles: { x: number; y: number }[],
): boolean => {
	return availableTiles.some(
		(availableTile) =>
			availableTile.x === tile.x && availableTile.y === tile.y,
	);
};

const scoreNorthBoundaryTile = (
	tile: { x: number; y: number },
	playerLoc: net.runelite.api.coords.WorldPoint,
): number => {
	const isApproachingFromSouth = playerLoc.getY() < NORTH_HOLD_MIN_Y;
	const goalX = isApproachingFromSouth ? NORTH_ENTRY_X : NORTH_HOLD_ANCHOR_X;
	const goalY = isApproachingFromSouth ? NORTH_ENTRY_Y : NORTH_HOLD_ANCHOR_Y;

	const goalDistance = getDistanceSquaredCoords(tile.x, tile.y, goalX, goalY);
	const playerDistance = getDistanceSquared(playerLoc, tile.x, tile.y);
	const lateralPenalty = Math.abs(tile.x - goalX);

	return goalDistance * 10 + playerDistance + lateralPenalty * 2;
};

const getBestNorthBoundaryTile = (
	availableTiles: { x: number; y: number }[],
	playerLoc: net.runelite.api.coords.WorldPoint,
): { x: number; y: number } | null => {
	if (availableTiles.length === 0) return null;

	const sortedTiles = [...availableTiles].sort((leftTile, rightTile) => {
		const leftScore = scoreNorthBoundaryTile(leftTile, playerLoc);
		const rightScore = scoreNorthBoundaryTile(rightTile, playerLoc);
		if (leftScore !== rightScore) return leftScore - rightScore;
		if (leftTile.y !== rightTile.y) return rightTile.y - leftTile.y;
		return leftTile.x - rightTile.x;
	});

	return sortedTiles[0] ?? null;
};

const resetNorthTargetLock = (): void => {
	lockedNorthTarget = null;
	lastNorthTargetSetTick = -10;
	lastIssuedNorthWalkTarget = null;
	lastIssuedNorthWalkTick = -10;
};

const getClosestSafeWaypoint = (
	playerLoc: net.runelite.api.coords.WorldPoint,
	occupiedTiles: Set<string>,
	dangerousTiles: Set<string>,
): { x: number; y: number } | null => {
	const pathCandidates: { x: number; y: number }[] = [];

	for (const waypointPath of NORTH_APPROACH_WAYPOINT_PATHS) {
		const nextWaypoint = waypointPath.find(
			(waypoint) =>
				playerLoc.getY() < waypoint.y &&
				isSafeTile(
					waypoint.x,
					waypoint.y,
					occupiedTiles,
					dangerousTiles,
				),
		);
		if (nextWaypoint) {
			pathCandidates.push(nextWaypoint);
			continue;
		}

		const safeWaypoints = waypointPath.filter((waypoint) =>
			isSafeTile(waypoint.x, waypoint.y, occupiedTiles, dangerousTiles),
		);
		if (safeWaypoints.length === 0) continue;

		safeWaypoints.sort(
			(a, b) =>
				getDistanceSquared(playerLoc, a.x, a.y) -
				getDistanceSquared(playerLoc, b.x, b.y),
		);
		const closestInPath = safeWaypoints[0];
		if (closestInPath) {
			pathCandidates.push(closestInPath);
		}
	}

	if (pathCandidates.length === 0) return null;

	pathCandidates.sort(
		(a, b) =>
			getDistanceSquared(playerLoc, a.x, a.y) -
			getDistanceSquared(playerLoc, b.x, b.y),
	);
	return pathCandidates[0] ?? null;
};

const getCurrentBoulderTiles = (): net.runelite.api.coords.WorldPoint[] => {
	const boulders = bot.objects.getTileObjectsWithIds(
		dangerousObjectIds.leviBoulder,
	);
	if (!boulders || boulders.length === 0) return [];

	const tiles: net.runelite.api.coords.WorldPoint[] = [];
	for (const boulder of boulders) {
		if (!boulder) continue;
		const locRaw = boulder.getWorldLocation?.();
		if (!locRaw) continue;
		const loc = getWorldPoint(locRaw) ?? locRaw;
		tiles.push(loc);
	}

	return tiles;
};

// ============ Helper Functions ============
/**
 * Handle movement to pathfinder spawn location
 * Continues attacking and praying while moving to maintain DPS and survive projectiles
 * Once location is reached, the health gate check will transition to PATHFINDER_TRACK at 20%
 * @returns void
 */
const handleMovementToSpawnLocation = (): void => {
	const playerLocRaw = client.getLocalPlayer()?.getWorldLocation();
	if (!playerLocRaw) return;
	const playerLoc = getWorldPoint(playerLocRaw) ?? playerLocRaw;
	tryAttackDuringPathfinderSpawn();
	const inNorthBoundary =
		playerLoc.getX() >= NORTH_HOLD_MIN_X &&
		playerLoc.getX() <= NORTH_HOLD_MAX_X &&
		playerLoc.getY() >= NORTH_HOLD_MIN_Y &&
		playerLoc.getY() <= NORTH_HOLD_MAX_Y;

	const pathfinderNpc = getPathfinderNpc();
	if (pathfinderNpc) {
		setPathfinderSpawnActionState(
			'AT_SPAWN_WAITING_20_GATE',
			'Pathfinder detected. Switching to tracking phase.',
		);
		state.pathfinderSpawnActive = false;
		resetNorthTargetLock();
		state.combatState.subState = CombatSubStates.PATHFINDER_TRACK;
		return;
	}

	const leviathanHealthPercent = getLeviathanHealthPercent();
	const currentTick = state.gameTick;
	const waitingFor20Gate =
		typeof leviathanHealthPercent === 'number' &&
		leviathanHealthPercent > 20;
	const hasReachedTrackingGate =
		typeof leviathanHealthPercent === 'number' &&
		leviathanHealthPercent <= 20;

	if (hasReachedTrackingGate) {
		setPathfinderSpawnActionState(
			'AT_SPAWN_WAITING_20_GATE',
			`Leviathan at ${leviathanHealthPercent}% health. Holding north until pathfinder spawns.`,
		);

		if (inNorthBoundary) return;

		if (currentTick - lastSpawnMoveTick < SPAWN_MOVE_RECLICK_TICKS) {
			return;
		}

		if (!bot.localPlayerIdle()) {
			return;
		}

		lastSpawnMoveTick = currentTick;
		moveToNorthBoundary(playerLoc);
		return;
	}

	if (waitingFor20Gate) {
		setPathfinderSpawnActionState(
			'MOVING_TO_SPAWN',
			`Waiting for 20% gate while staging north at ${leviathanHealthPercent}% health.`,
		);
	}

	if (currentTick - lastSpawnMoveTick < SPAWN_MOVE_RECLICK_TICKS) {
		setPathfinderSpawnActionState(
			'MOVING_TO_SPAWN',
			'Waiting for reclick throttle while moving toward north boundary.',
		);
		return;
	}

	if (!bot.localPlayerIdle()) {
		setPathfinderSpawnActionState(
			'MOVING_TO_SPAWN',
			'Player currently moving to north boundary; skipping re-click.',
		);
		return;
	}

	lastSpawnMoveTick = currentTick;
	setPathfinderSpawnActionState(
		'MOVING_TO_SPAWN',
		'Moving toward north boundary staging area.',
	);
	moveToNorthBoundary(playerLoc);
};

const moveToNorthBoundary = (
	playerLoc: net.runelite.api.coords.WorldPoint,
): void => {
	const fallingRockTiles = getCurrentFallingRockTiles();
	const boulderTiles = getCurrentBoulderTiles();
	const occupiedTiles = new Set<string>(
		[...fallingRockTiles, ...boulderTiles].map(
			(tile) => `${tile.getX()},${tile.getY()}`,
		),
	);
	const dangerousTiles = new Set<string>(
		PREDEFINED_DANGEROUS_TILES.map((tile) =>
			getTileKey(tile.getX(), tile.getY()),
		),
	);

	const inNorthBoundary =
		playerLoc.getX() >= NORTH_HOLD_MIN_X &&
		playerLoc.getX() <= NORTH_HOLD_MAX_X &&
		playerLoc.getY() >= NORTH_HOLD_MIN_Y &&
		playerLoc.getY() <= NORTH_HOLD_MAX_Y;

	if (inNorthBoundary) {
		resetNorthTargetLock();
		setPathfinderSpawnActionState(
			'HOLDING_NEAR_SPAWN',
			`Holding north boundary tile at (${playerLoc.getX()}, ${playerLoc.getY()}).`,
		);
		return;
	}

	let targetTile: { x: number; y: number } | null = null;
	const availableTiles: Array<{ x: number; y: number }> = [];
	const waypointTile = getClosestSafeWaypoint(
		playerLoc,
		occupiedTiles,
		dangerousTiles,
	);
	if (waypointTile) {
		targetTile = waypointTile;
	}

	for (let x = NORTH_HOLD_MIN_X; x <= NORTH_HOLD_MAX_X; x++) {
		for (let y = NORTH_HOLD_MIN_Y; y <= NORTH_HOLD_MAX_Y; y++) {
			if (!isSafeTile(x, y, occupiedTiles, dangerousTiles)) continue;
			availableTiles.push({ x, y });
		}
	}

	if (!targetTile && lockedNorthTarget && !hasLockedNorthTargetExpired()) {
		if (isTileAvailable(lockedNorthTarget, availableTiles)) {
			targetTile = lockedNorthTarget;
		} else {
			resetNorthTargetLock();
		}
	}

	if (!targetTile) {
		targetTile = getBestNorthBoundaryTile(availableTiles, playerLoc);
	}

	if (!targetTile) {
		resetNorthTargetLock();
		setPathfinderSpawnActionState(
			'HOLDING_NEAR_SPAWN',
			'North boundary blocked; holding current position.',
		);
		return;
	}

	if (!isSameTile(lockedNorthTarget, targetTile)) {
		lockedNorthTarget = { x: targetTile.x, y: targetTile.y };
		lastNorthTargetSetTick = state.gameTick;
	}

	const isRepeatTarget = isSameTile(lastIssuedNorthWalkTarget, targetTile);
	if (
		isRepeatTarget &&
		state.gameTick - lastIssuedNorthWalkTick <
			NORTH_SAME_TARGET_REISSUE_TICKS
	) {
		return;
	}

	bot.walking.walkToTrueWorldPoint(targetTile.x, targetTile.y);
	lastIssuedNorthWalkTarget = { x: targetTile.x, y: targetTile.y };
	lastIssuedNorthWalkTick = state.gameTick;
	logPathfinderSpawn(
		`Moving to north boundary (${targetTile.x}, ${targetTile.y}) from (${playerLoc.getX()}, ${playerLoc.getY()}) with deterministic target lock.`,
	);
};

/**
 * Get pathfinder spawn location in true world coordinates
 * @returns Object with x and y coordinates of the spawn location
 */
export const getPathfinderStartLocation = (): { x: number; y: number } => {
	const basePoint = new net.runelite.api.coords.WorldPoint(
		PATHFINDER_SPAWN_LOCATION.x,
		PATHFINDER_SPAWN_LOCATION.y,
		PATHFINDER_SPAWN_LOCATION.plane,
	);
	const worldPoint = getWorldPoint(basePoint) ?? basePoint;
	return { x: worldPoint.getX(), y: worldPoint.getY() };
};

/**
 * Check if pathfinder NPC exists and is alive
 * @returns Pathfinder NPC if found and alive, null otherwise
 */
export const getPathfinderNpc = (): net.runelite.api.NPC | null => {
	const pathfinders = bot.npcs
		.getWithIds([ABYSSAL_PATHFINDER])
		.filter((npc: net.runelite.api.NPC) => isNpcAlive(npc));
	return pathfinders.length > 0 ? pathfinders[0] : null;
};
