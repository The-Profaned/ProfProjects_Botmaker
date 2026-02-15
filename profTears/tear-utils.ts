import { logger } from '../imports/logger.js';
import { State } from '../imports/types.js';

const BLUE_TEAR_WALLS: number[] = [6661, 6665];
const GREEN_TEAR_WALLS: number[] = [6662, 6666];
const WEEPING_WALL_ID: number = 6660;
const STARTING_TILE = new net.runelite.api.coords.WorldPoint(3257, 9517, 2);

// Wall tile locations (where decorations appear)
const WALL_TILES: net.runelite.api.coords.WorldPoint[] = [
	new net.runelite.api.coords.WorldPoint(3257, 9520, 2), // 1
	new net.runelite.api.coords.WorldPoint(3258, 9520, 2), // 2
	new net.runelite.api.coords.WorldPoint(3259, 9520, 2), // 3
	new net.runelite.api.coords.WorldPoint(3261, 9518, 2), // 4
	new net.runelite.api.coords.WorldPoint(3261, 9517, 2), // 5
	new net.runelite.api.coords.WorldPoint(3261, 9516, 2), // 6
	new net.runelite.api.coords.WorldPoint(3259, 9514, 2), // 7
	new net.runelite.api.coords.WorldPoint(3258, 9514, 2), // 8
	new net.runelite.api.coords.WorldPoint(3257, 9514, 2), // 9
];

// Player standing positions (adjacent to wall tiles)
const PLAYER_STANDING_TILES: net.runelite.api.coords.WorldPoint[] = [
	new net.runelite.api.coords.WorldPoint(3257, 9519, 2), // 1
	new net.runelite.api.coords.WorldPoint(3258, 9519, 2), // 2
	new net.runelite.api.coords.WorldPoint(3259, 9519, 2), // 3
	new net.runelite.api.coords.WorldPoint(3260, 9518, 2), // 4
	new net.runelite.api.coords.WorldPoint(3260, 9517, 2), // 5
	new net.runelite.api.coords.WorldPoint(3260, 9516, 2), // 6
	new net.runelite.api.coords.WorldPoint(3259, 9515, 2), // 7
	new net.runelite.api.coords.WorldPoint(3258, 9515, 2), // 8
	new net.runelite.api.coords.WorldPoint(3257, 9515, 2), // 9
];

let state: State | null = null;
let scriptInitialized = false;
let junaDialogCompleted = false;
let minigameActive = true;
let startingIdleTicks: number = 0;
let hasStarted: boolean = false;
let initialClickDone: boolean = false;

// Wall spawn tracking
type WallState = {
	location: net.runelite.api.coords.WorldPoint;
	type: 'blue' | 'green' | 'none';
};

let activeWalls: Map<string, WallState> = new Map();
let spawnCycle: Array<'blue' | 'green'> = [];
let cyclePosition = 0; // 0-5: positions in cycle
let cycleVerified = false;
let observedSpawns = 0;
let bluePhaseStartIndex = 3; // Default: blues start at position 3
let blueSpawnCount = 0; // Track which blue spawned (1, 2, or 3)
let canClickThisCycle = false; // Flag to allow clicking when 3rd blue spawns
let blueSpawnLocations: Array<net.runelite.api.coords.WorldPoint | null> = [
	null,
	null,
	null,
];
let lastClickedWallLocation: net.runelite.api.coords.WorldPoint | null = null;

export function initializeTearsUtils(scriptState: State): void {
	state = scriptState;
}

export function resetTearsState(): void {
	scriptInitialized = false;
	junaDialogCompleted = false;
	minigameActive = true;
	startingIdleTicks = 0;
	hasStarted = false;
	initialClickDone = false;
	activeWalls = new Map();
	spawnCycle = [];
	cyclePosition = 0;
	cycleVerified = false;
	observedSpawns = 0;
	bluePhaseStartIndex = 3;
	blueSpawnCount = 0;
	canClickThisCycle = false;
	blueSpawnLocations = [null, null, null];
	lastClickedWallLocation = null;
}

const logMessage = (
	level: 'debug' | 'all',
	source: string,
	message: string,
): void => {
	if (state) {
		logger(state, level, source, message);
		return;
	}
	if (level === 'all') {
		log.printGameMessage(`[${source}] ${message}`);
	}
	log.print(`[${source}] ${message}`);
};

export function talkToJuna(): void {
	const junaList = bot.objects.getTileObjectsWithNames(['Juna']);
	if (!junaList || junaList.length === 0) {
		logMessage('debug', 'juna', 'Could not find Juna game object');
		return;
	}

	const juna = junaList[0];
	logMessage('debug', 'juna', 'Interacting with Juna');

	bot.objects.interactSuppliedObject(juna, 'Story');

	junaDialogCompleted = true;
}

export function getTearsStateFlags(): {
	scriptInitialized: boolean;
	junaDialogCompleted: boolean;
	minigameActive: boolean;
} {
	return {
		scriptInitialized,
		junaDialogCompleted,
		minigameActive,
	};
}

export function setTearsStateFlags(flags: {
	scriptInitialized?: boolean;
	junaDialogCompleted?: boolean;
	minigameActive?: boolean;
}): void {
	if (flags.scriptInitialized !== undefined) {
		scriptInitialized = flags.scriptInitialized;
	}
	if (flags.junaDialogCompleted !== undefined) {
		junaDialogCompleted = flags.junaDialogCompleted;
	}
	if (flags.minigameActive !== undefined) {
		minigameActive = flags.minigameActive;
	}
}

function worldPointEquals(
	a: net.runelite.api.coords.WorldPoint,
	b: net.runelite.api.coords.WorldPoint,
): boolean {
	return (
		a.getX() === b.getX() &&
		a.getY() === b.getY() &&
		a.getPlane() === b.getPlane()
	);
}

function getWallTypeAtLocation(
	location: net.runelite.api.coords.WorldPoint,
): 'blue' | 'green' | 'none' {
	const blueWalls = bot.objects.getTileObjectsWithIds(BLUE_TEAR_WALLS);
	if (blueWalls) {
		for (const wall of blueWalls) {
			if (!worldPointEquals(wall.getWorldLocation(), location)) {
				continue;
			}
			return 'blue';
		}
	}

	const greenWalls = bot.objects.getTileObjectsWithIds(GREEN_TEAR_WALLS);
	if (greenWalls) {
		for (const wall of greenWalls) {
			if (!worldPointEquals(wall.getWorldLocation(), location)) {
				continue;
			}
			return 'green';
		}
	}

	return 'none';
}

function getAdjacentWallIndex(): number {
	const player = client.getLocalPlayer();
	if (!player) {
		return -1;
	}

	const playerLoc = player.getWorldLocation();

	for (const [index, tile] of PLAYER_STANDING_TILES.entries()) {
		if (worldPointEquals(playerLoc, tile)) {
			return index;
		}
	}

	return -1;
}

function findNearestBlueWall(): net.runelite.api.coords.WorldPoint | null {
	const player = client.getLocalPlayer();
	if (!player) {
		return null;
	}

	const playerLoc = player.getWorldLocation();
	let nearestWall: net.runelite.api.coords.WorldPoint | null = null;
	let nearestDistance = 999;

	for (const wallTile of WALL_TILES) {
		const wallType = getWallTypeAtLocation(wallTile);
		if (wallType === 'blue') {
			const distance =
				Math.abs(playerLoc.getX() - wallTile.getX()) +
				Math.abs(playerLoc.getY() - wallTile.getY());

			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestWall = wallTile;
			}
		}
	}

	return nearestWall;
}

function areWallsAdjacent(
	wall1: net.runelite.api.coords.WorldPoint,
	wall2: net.runelite.api.coords.WorldPoint,
): boolean {
	const wall1Index = WALL_TILES.findIndex((w) => worldPointEquals(w, wall1));
	const wall2Index = WALL_TILES.findIndex((w) => worldPointEquals(w, wall2));

	if (wall1Index === -1 || wall2Index === -1) {
		return false;
	}

	// Check if walls are adjacent (sequential indices, including wrapping)
	return (
		Math.abs(wall1Index - wall2Index) === 1 ||
		(wall1Index === 0 && wall2Index === WALL_TILES.length - 1) ||
		(wall1Index === WALL_TILES.length - 1 && wall2Index === 0)
	);
}

function findPriorityBlueWall(): net.runelite.api.coords.WorldPoint | null {
	// Optimization: if wall 2 is adjacent to last clicked wall and wall 1 is far, prefer wall 2
	if (
		lastClickedWallLocation &&
		blueSpawnLocations[0] &&
		blueSpawnLocations[1]
	) {
		const wall1Type = getWallTypeAtLocation(blueSpawnLocations[0]);
		const wall2Type = getWallTypeAtLocation(blueSpawnLocations[1]);

		if (wall1Type === 'blue' && wall2Type === 'blue') {
			const isWall2Adjacent = areWallsAdjacent(
				lastClickedWallLocation,
				blueSpawnLocations[1],
			);

			if (isWall2Adjacent) {
				const player = client.getLocalPlayer();
				if (player) {
					const playerLoc = player.getWorldLocation();
					const wall1Distance =
						Math.abs(
							playerLoc.getX() - blueSpawnLocations[0].getX(),
						) +
						Math.abs(
							playerLoc.getY() - blueSpawnLocations[0].getY(),
						);

					// If wall 1 is more than 3 tiles away and wall 2 is adjacent, prefer wall 2
					if (wall1Distance > 3) {
						logMessage(
							'debug',
							'click',
							`Wall 2 adjacent optimization: choosing wall 2 at (${blueSpawnLocations[1].getX()}, ${blueSpawnLocations[1].getY()}) over distant wall 1`,
						);
						return blueSpawnLocations[1];
					}
				}
			}
		}
	}

	for (const location of blueSpawnLocations) {
		if (!location) {
			continue;
		}
		if (getWallTypeAtLocation(location) === 'blue') {
			return location;
		}
	}

	return null;
}

function findNewestBlueWall(): net.runelite.api.coords.WorldPoint | null {
	for (let index = blueSpawnLocations.length - 1; index >= 0; index -= 1) {
		const location = blueSpawnLocations[index];
		if (!location) {
			continue;
		}
		if (getWallTypeAtLocation(location) === 'blue') {
			return location;
		}
	}

	return null;
}

function getWeepingWallAtLocation(
	location: net.runelite.api.coords.WorldPoint,
): net.runelite.api.TileObject | null {
	const walls = bot.objects.getTileObjectsWithIds([WEEPING_WALL_ID]);
	if (!walls) {
		return null;
	}

	for (const wall of walls) {
		if (worldPointEquals(wall.getWorldLocation(), location)) {
			return wall;
		}
	}

	return null;
}

function locationToKey(loc: net.runelite.api.coords.WorldPoint): string {
	return `${loc.getX()}_${loc.getY()}_${loc.getPlane()}`;
}

export function trackWallCycle(): void {
	const currentWalls: Map<string, WallState> = new Map();

	// Check all wall tiles for decorations
	for (const wallTile of WALL_TILES) {
		const wallType = getWallTypeAtLocation(wallTile);
		if (wallType !== 'none') {
			const key = locationToKey(wallTile);
			currentWalls.set(key, { location: wallTile, type: wallType });
		}
	}

	// Detect spawns
	for (const [key, wallState] of currentWalls) {
		if (activeWalls.has(key)) {
			continue; // Wall already existed
		}

		// New wall spawned
		if (wallState.type !== 'none') {
			spawnCycle.push(wallState.type);
		}
		observedSpawns += 1;

		// Update cycle position based on pattern: green, green, green, blue, blue, blue
		if (spawnCycle.length > 6) {
			spawnCycle.shift(); // Keep only last 6
		}

		// Determine position in cycle (0-5)
		cyclePosition = (cyclePosition + 1) % 6;

		// Track consecutive blue spawns and set click flag on 3rd blue
		if (cycleVerified) {
			if (wallState.type === 'blue') {
				blueSpawnCount += 1;

				const existingIndex = blueSpawnLocations.findIndex(
					(loc) => loc && worldPointEquals(loc, wallState.location),
				);

				if (existingIndex >= 0) {
					// Later blue respawned on an earlier location; move it to the new slot
					blueSpawnLocations[existingIndex] = null;
				}

				const slotIndex = Math.min(blueSpawnCount - 1, 2);
				blueSpawnLocations[slotIndex] = wallState.location;

				// When 3rd blue spawns, allow clicking
				if (blueSpawnCount === 3) {
					canClickThisCycle = true;
					logMessage(
						'debug',
						'cycle',
						'3rd blue wall spawned - Click allowed',
					);
				}
			} else {
				// Green spawn breaks the blue streak
				blueSpawnCount = 0;
				blueSpawnLocations = [null, null, null];
			}
		}

		// Verify cycle after seeing at least 6 spawns
		if (cycleVerified || observedSpawns < 6) {
			// Skip verification if already verified or not enough spawns
		} else {
			const last6 = spawnCycle.slice(-6);

			// Count blues and greens
			const blueCount = last6.filter((t) => t === 'blue').length;
			const greenCount = last6.filter((t) => t === 'green').length;

			// Must have exactly 3 blues and 3 greens
			if (blueCount !== 3 || greenCount !== 3) {
				// Pattern not valid yet
			} else {
				// Find the start index of consecutive blues (at least 2 in a row)
				let blueStart = -1;
				for (let index = 0; index < last6.length; index++) {
					if (
						last6[index] === 'blue' &&
						last6[(index + 1) % 6] === 'blue'
					) {
						blueStart = index;
						break;
					}
				}

				if (blueStart === -1) {
					// No consecutive blues found
				} else {
					bluePhaseStartIndex = blueStart;
					cycleVerified = true;

					logMessage(
						'debug',
						'cycle',
						`Cycle pattern verified: ${last6.join(',')} | Blue phase starts at position ${bluePhaseStartIndex}`,
					);
				}
			}
		}

		logMessage(
			'debug',
			'cycle',
			`${wallState.type} wall spawned - Position: ${cyclePosition}, Observed: ${observedSpawns}/6 (${cyclePosition < 3 ? 'GREEN phase' : 'BLUE phase'})`,
		);
	}

	// Detect despawns
	for (const [key, wallState] of activeWalls) {
		if (!currentWalls.has(key)) {
			logMessage('debug', 'cycle', `${wallState.type} wall despawned`);
		}
	}

	activeWalls = currentWalls;
}

export function isCycleVerified(): boolean {
	return cycleVerified;
}

export function getCycleStatus(): {
	verified: boolean;
	observedSpawns: number;
	currentPosition: number;
	currentPhase: 'GREEN' | 'BLUE';
} {
	const inBluePhase = isInBluePhase();

	return {
		verified: cycleVerified,
		observedSpawns: observedSpawns,
		currentPosition: cyclePosition,
		currentPhase: inBluePhase ? 'BLUE' : 'GREEN',
	};
}

function isInBluePhase(): boolean {
	// Check if current cycle position is within the blue phase
	// Blue phase is 3 consecutive positions starting at bluePhaseStartIndex
	const pos0 = bluePhaseStartIndex;
	const pos1 = (bluePhaseStartIndex + 1) % 6;
	const pos2 = (bluePhaseStartIndex + 2) % 6;

	return (
		cyclePosition === pos0 ||
		cyclePosition === pos1 ||
		cyclePosition === pos2
	);
}

export function clickBlueWall(): net.runelite.api.coords.WorldPoint | null {
	if (!minigameActive) {
		return null;
	}

	const player = client.getLocalPlayer();
	if (!player) {
		return null;
	}

	const playerLoc = player.getWorldLocation();

	const isOnStartingTile: boolean = worldPointEquals(
		playerLoc,
		STARTING_TILE,
	);

	if (!initialClickDone) {
		if (
			!isOnStartingTile ||
			bot.localPlayerMoving() ||
			!bot.localPlayerIdle()
		) {
			startingIdleTicks = 0;
			return null;
		}

		startingIdleTicks += 1;
		if (startingIdleTicks < 4) {
			return null;
		}

		const firstTarget = findNewestBlueWall() ?? findNearestBlueWall();
		if (!firstTarget) {
			return null;
		}

		const firstWeepingWall = getWeepingWallAtLocation(firstTarget);
		if (!firstWeepingWall) {
			return null;
		}

		logMessage(
			'debug',
			'click',
			`Initial click on WEEPING_WALL at (${firstTarget.getX()}, ${firstTarget.getY()})`,
		);
		bot.objects.interactSuppliedObject(firstWeepingWall, 'Collect-from');
		lastClickedWallLocation = firstTarget;
		initialClickDone = true;
		hasStarted = true;
		canClickThisCycle = false;
		return firstTarget;
	}

	// Initialize clicking - player can start from anywhere in room
	if (!hasStarted) {
		hasStarted = true;
		canClickThisCycle = true;
		logMessage(
			'debug',
			'start',
			`Starting wall interactions from tile (${playerLoc.getX()}, ${playerLoc.getY()})`,
		);
	}

	// Don't click if player is moving
	if (bot.localPlayerMoving()) {
		return null;
	}

	// Check if we're adjacent to a wall
	const adjacentIndex = getAdjacentWallIndex();

	if (adjacentIndex >= 0) {
		// We're standing next to a wall - check its type
		const wallType = getWallTypeAtLocation(WALL_TILES[adjacentIndex]);

		switch (wallType) {
			case 'green': {
				// On green wall - must switch immediately
				if (!canClickThisCycle) {
					return null;
				}
				logMessage(
					'debug',
					'switch',
					'On green wall - forcing switch to blue',
				);
				break;
			}
			case 'none': {
				// On dead wall (no decoration) - must find blue wall
				if (!canClickThisCycle) {
					return null;
				}
				logMessage(
					'debug',
					'switch',
					'On dead wall (no decoration) - finding blue wall',
				);
				break;
			}
			case 'blue': {
				// On blue wall - only click if 3rd blue just spawned
				if (!canClickThisCycle) {
					return null; // Wall stayed blue - don't reclick
				}
				break;
			}
		}
	} else {
		// Not next to a wall - only click if we're in click window
		if (!canClickThisCycle) {
			return null;
		}
	}

	logMessage(
		'debug',
		'click',
		`Click window: ${canClickThisCycle}, adjacentIndex: ${adjacentIndex}`,
	);

	if (lastClickedWallLocation) {
		const lastWallType = getWallTypeAtLocation(lastClickedWallLocation);
		logMessage(
			'debug',
			'click',
			`Current wall: (${lastClickedWallLocation.getX()}, ${lastClickedWallLocation.getY()}) type=${lastWallType}`,
		);
		if (lastWallType === 'blue') {
			canClickThisCycle = false;
			return null;
		}
	} else {
		logMessage('debug', 'click', 'Current wall: none');
	}

	// Find the highest-priority blue wall (spawn order)
	const targetWallLoc = findPriorityBlueWall() ?? findNearestBlueWall();
	if (!targetWallLoc) {
		logMessage('debug', 'click', 'No blue wall location found');
		return null;
	}

	// Get the WEEPING_WALL object at this location
	const weepingWall = getWeepingWallAtLocation(targetWallLoc);
	if (!weepingWall) {
		logMessage('debug', 'click', 'No WEEPING_WALL at blue location');
		return null;
	}

	// Click the WEEPING_WALL (not the decoration)
	logMessage(
		'debug',
		'click',
		`Clicking WEEPING_WALL at (${targetWallLoc.getX()}, ${targetWallLoc.getY()})`,
	);
	bot.objects.interactSuppliedObject(weepingWall, 'Collect-from');
	lastClickedWallLocation = targetWallLoc;

	// Reset click flag after clicking
	canClickThisCycle = false;
	return targetWallLoc;
}
