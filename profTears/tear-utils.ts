import { LOG_COLOR, logger } from '../imports/logger.js';
import { State } from '../imports/types.js';

type TearWallObject = net.runelite.api.DecorativeObject;

type WallSpawn = {
	wallId: number;
	location: net.runelite.api.coords.WorldPoint;
	spawnTick: number;
	despawnTick: number | null;
	duration: number | null;
	type: 'blue' | 'green';
	simpleKey: string;
};

const BLUE_TEAR_WALLS: number[] = [6661, 6665];
const GREEN_TEAR_WALLS: number[] = [6662, 6666];

let state: State | null = null;

let activeBlueWalls: Map<string, WallSpawn> = new Map();
let activeGreenWalls: Map<string, WallSpawn> = new Map();
let wallSpawnHistory: WallSpawn[] = [];

let currentInteractingWall: TearWallObject | null = null;
let currentInteractingType: 'blue' | 'green' | 'empty' = 'empty';

let lastClickedWallKey: string | null = null;
let waitingForPlayerAnimation = false;
let lastPlayerAnimation = -1;

let scriptInitialized = false;
let junaDialogCompleted = false;
let lastPlayerMovementState = false;
let playerStoppedMovingTicks = 0;

let blueCycleSeen: Set<string> = new Set();
let blueCycleComplete = false;
let blueRespawnOnCurrent = false;
let blueCycleOrder: string[] = [];
let pendingSwitchToFirst = false;
let lastBlueChangeTick: number | null = null;
let blueCycleCompleteTick: number | null = null;

let blueWallCount = 0;
let greenWallCount = 0;

let minigameActive = true;

export function initializeTearsUtils(scriptState: State): void {
	state = scriptState;
}

export function resetTearsState(): void {
	activeBlueWalls = new Map();
	activeGreenWalls = new Map();
	wallSpawnHistory = [];
	currentInteractingWall = null;
	currentInteractingType = 'empty';
	lastClickedWallKey = null;
	waitingForPlayerAnimation = false;
	lastPlayerAnimation = -1;
	scriptInitialized = false;
	junaDialogCompleted = false;
	lastPlayerMovementState = false;
	playerStoppedMovingTicks = 0;
	minigameActive = true;
	blueWallCount = 0;
	greenWallCount = 0;
	blueCycleSeen = new Set();
	blueCycleComplete = false;
	blueRespawnOnCurrent = false;
	blueCycleOrder = [];
	pendingSwitchToFirst = false;
	lastBlueChangeTick = null;
	blueCycleCompleteTick = null;
}

function getMinigameTimer(): string | null {
	const timerWidget = client.getWidget(629, 2);
	if (!timerWidget) {
		return null;
	}
	return timerWidget.getText();
}

export function parseTimerSeconds(): number {
	const timerText = getMinigameTimer();
	if (!timerText) {
		return 0;
	}

	const timeMatch = timerText.match(/(\d+):(\d+)/);
	if (!timeMatch) {
		return 0;
	}

	const minutes = Number.parseInt(timeMatch[1], 10);
	const seconds = Number.parseInt(timeMatch[2], 10);
	return minutes * 60 + seconds;
}

export function isMinigameActive(): boolean {
	const totalSeconds = parseTimerSeconds();
	return totalSeconds > 0;
}

function findBlueTearWalls() {
	// Tears of Guthix walls are DecorativeObjects.
	return bot.objects.getTileObjectsWithIds(BLUE_TEAR_WALLS) ?? [];
}

function findGreenTearWalls() {
	// Tears of Guthix walls are DecorativeObjects.
	return bot.objects.getTileObjectsWithIds(GREEN_TEAR_WALLS) ?? [];
}

function wallUniqueKey(wall: TearWallObject): string {
	const loc = wall.getWorldLocation();
	return (
		wall.getId() +
		'_' +
		loc.getX() +
		'_' +
		loc.getY() +
		'_' +
		loc.getPlane()
	);
}

const logMessage = (
	level: 'all' | 'debug',
	source: string,
	message: string,
	color?: { r: number; g: number; b: number },
): void => {
	if (state) {
		logger(state, level, source, message, color);
		return;
	}
	if (level === 'all') {
		log.printGameMessage(`[${source}] ${message}`);
	}
	if (color) {
		log.printRGB(`[${source}] ${message}`, color.r, color.g, color.b);
		return;
	}
	log.print(`[${source}] ${message}`);
};

export function trackWallChanges(): void {
	const currentTick = client.getTickCount();
	const blueTears = findBlueTearWalls();
	const greenTears = findGreenTearWalls();

	if (blueTears.length === 0) {
		blueCycleSeen = new Set();
		blueCycleComplete = false;
		blueRespawnOnCurrent = false;
		blueCycleOrder = [];
		pendingSwitchToFirst = false;
		lastBlueChangeTick = null;
		blueCycleCompleteTick = null;
	}

	const currentBlueIds = new Set<string>();
	if (blueTears.length > 0) {
		blueWallCount = blueTears.length;
		for (const wall of blueTears) {
			const wallId = wall.getId();
			const location = wall.getWorldLocation();
			const x = location.getX();
			const y = location.getY();
			const plane = location.getPlane();
			const uniqueId = wallId + '_' + x + '_' + y + '_' + plane;
			const simpleKey = wallUniqueKey(wall);

			currentBlueIds.add(uniqueId);
			blueCycleSeen.add(simpleKey);
			if (!blueCycleOrder.includes(simpleKey)) {
				blueCycleOrder.push(simpleKey);
			}
			if (!blueCycleComplete && blueCycleSeen.size >= 3) {
				blueCycleComplete = true;
				blueCycleCompleteTick = currentTick;
				logMessage(
					'debug',
					'cycle',
					'All 3 blue walls observed',
					LOG_COLOR.BLUE,
				);
			}

			const currentWallKey = currentInteractingWall
				? wallUniqueKey(currentInteractingWall)
				: null;
			if (
				currentInteractingType === 'blue' &&
				currentWallKey !== null &&
				currentWallKey === simpleKey
			) {
				if (!blueRespawnOnCurrent) {
					blueRespawnOnCurrent = true;
					logMessage(
						'debug',
						'respawn',
						'Blue wall reappeared on current wall; hold position',
						LOG_COLOR.BLUE,
					);
				}
			} else {
				blueRespawnOnCurrent = false;
			}

			if (!activeBlueWalls.has(uniqueId)) {
				const spawn: WallSpawn = {
					wallId,
					location,
					spawnTick: currentTick,
					despawnTick: null,
					duration: null,
					type: 'blue',
					simpleKey,
				};
				activeBlueWalls.set(uniqueId, spawn);
				lastBlueChangeTick = currentTick;
				logMessage(
					'debug',
					'spawn',
					`Blue wall #${wallId} at (${x}, ${y}, ${plane}) tick ${currentTick}`,
					LOG_COLOR.TEAL,
				);
			}
		}
	} else {
		blueWallCount = 0;
	}

	const currentGreenIds = new Set<string>();
	if (greenTears.length > 0) {
		greenWallCount = greenTears.length;
		for (const wall of greenTears) {
			const wallId = wall.getId();
			const location = wall.getWorldLocation();
			const x = location.getX();
			const y = location.getY();
			const plane = location.getPlane();
			const uniqueId = wallId + '_' + x + '_' + y + '_' + plane;

			currentGreenIds.add(uniqueId);

			if (!activeGreenWalls.has(uniqueId)) {
				const spawn: WallSpawn = {
					wallId,
					location,
					spawnTick: currentTick,
					despawnTick: null,
					duration: null,
					type: 'green',
					simpleKey: uniqueId,
				};
				activeGreenWalls.set(uniqueId, spawn);
				logMessage(
					'debug',
					'spawn',
					`Green wall #${wallId} at (${x}, ${y}, ${plane}) tick ${currentTick}`,
					LOG_COLOR.EMERALD,
				);
			}
		}
	} else {
		greenWallCount = 0;
	}

	activeBlueWalls.forEach((spawn, id) => {
		if (!currentBlueIds.has(id)) {
			spawn.despawnTick = currentTick;
			spawn.duration = spawn.despawnTick - spawn.spawnTick;

			const thirdKey =
				blueCycleOrder.length >= 3 ? blueCycleOrder[2] : null;
			if (
				thirdKey &&
				spawn.simpleKey === thirdKey &&
				currentInteractingType === 'blue' &&
				currentInteractingWall &&
				wallUniqueKey(currentInteractingWall) === spawn.simpleKey &&
				blueRespawnOnCurrent
			) {
				pendingSwitchToFirst = true;
				logMessage(
					'debug',
					'cycle',
					'3rd blue despawned under player; queue switch to first blue',
					LOG_COLOR.BLUE,
				);
			}

			wallSpawnHistory.push(spawn);
			activeBlueWalls.delete(id);
			lastBlueChangeTick = currentTick;
			logMessage(
				'debug',
				'despawn',
				`Blue wall #${spawn.wallId} lasted ${spawn.duration} ticks`,
				LOG_COLOR.TEAL,
			);
		}
	});

	activeGreenWalls.forEach((spawn, id) => {
		if (!currentGreenIds.has(id)) {
			spawn.despawnTick = currentTick;
			spawn.duration = spawn.despawnTick - spawn.spawnTick;
			wallSpawnHistory.push(spawn);
			activeGreenWalls.delete(id);
			logMessage(
				'debug',
				'despawn',
				`Green wall #${spawn.wallId} lasted ${spawn.duration} ticks`,
				LOG_COLOR.EMERALD,
			);
		}
	});
}

export function getAverageWallDuration(type: 'blue' | 'green' | 'all'): number {
	const relevantSpawns = wallSpawnHistory.filter((spawn) => {
		if (type === 'all') return spawn.duration !== null;
		return spawn.type === type && spawn.duration !== null;
	});

	if (relevantSpawns.length === 0) return 0;

	const totalDuration = relevantSpawns.reduce(
		(sum, spawn) => sum + (spawn.duration ?? 0),
		0,
	);
	return totalDuration / relevantSpawns.length;
}

function getAdjacentWall(): {
	type: 'blue' | 'green' | 'empty';
	wall: TearWallObject | null;
} {
	const player = client.getLocalPlayer();
	if (!player) {
		return { type: 'empty', wall: null };
	}

	const playerLocation = player.getWorldLocation();
	const playerX = playerLocation.getX();
	const playerY = playerLocation.getY();
	const playerPlane = playerLocation.getPlane();

	const blueTears = findBlueTearWalls();
	const greenTears = findGreenTearWalls();

	const adjacentOffsets = [
		{ dx: 0, dy: 1 },
		{ dx: 0, dy: -1 },
		{ dx: 1, dy: 0 },
		{ dx: -1, dy: 0 },
	];

	for (const offset of adjacentOffsets) {
		const checkX = playerX + offset.dx;
		const checkY = playerY + offset.dy;

		for (const wall of blueTears) {
			const wallId = wall.getId();
			const wallLoc = wall.getWorldLocation();
			if (
				BLUE_TEAR_WALLS.includes(wallId) &&
				wallLoc.getX() === checkX &&
				wallLoc.getY() === checkY &&
				wallLoc.getPlane() === playerPlane
			) {
				return { type: 'blue', wall };
			}
		}

		for (const wall of greenTears) {
			const wallId = wall.getId();
			const wallLoc = wall.getWorldLocation();
			if (
				GREEN_TEAR_WALLS.includes(wallId) &&
				wallLoc.getX() === checkX &&
				wallLoc.getY() === checkY &&
				wallLoc.getPlane() === playerPlane
			) {
				return { type: 'green', wall };
			}
		}
	}

	return { type: 'empty', wall: null };
}

function getDistanceToWall(wall: TearWallObject): number {
	const player = client.getLocalPlayer();
	if (!player) return 999;

	const playerLoc = player.getWorldLocation();
	const wallLoc = wall.getWorldLocation();
	const dx = Math.abs(playerLoc.getX() - wallLoc.getX());
	const dy = Math.abs(playerLoc.getY() - wallLoc.getY());
	return dx + dy;
}

function selectPreferredBlueTarget(): TearWallObject | null {
	const blues = findBlueTearWalls();
	const player = client.getLocalPlayer();
	if (!player) return null;

	const preferredKeys: string[] = [];
	if (blueCycleOrder.length > 0) preferredKeys.push(blueCycleOrder[0]);
	if (blueCycleOrder.length > 1) preferredKeys.push(blueCycleOrder[1]);

	const candidates: TearWallObject[] = [];
	for (const key of preferredKeys) {
		const found = blues.find((w) => wallUniqueKey(w) === key);
		if (found) candidates.push(found);
	}

	if (candidates.length === 0) return null;
	if (candidates.length === 1) return candidates[0];

	const distributionToFirst = getDistanceToWall(candidates[0]);
	const distributionToSecond = getDistanceToWall(candidates[1]);

	if (
		distributionToFirst > 3 &&
		distributionToSecond <= distributionToFirst
	) {
		logMessage(
			'debug',
			'distance',
			`Wall 1 too far (${distributionToFirst} tiles); choosing closer wall 2 (${distributionToSecond} tiles)`,
			LOG_COLOR.CORAL,
		);
		return candidates[1];
	}

	return candidates[0];
}

export function talkToJuna(): void {
	const junaList = bot.objects.getTileObjectsWithNames(['Juna']);
	if (!junaList || junaList.length === 0) {
		logMessage(
			'debug',
			'juna',
			'Could not find Juna game object',
			LOG_COLOR.PINK,
		);
		return;
	}

	const juna = junaList[0];
	logMessage(
		'debug',
		'juna',
		'Found Juna, interacting with story',
		LOG_COLOR.PINK,
	);
	bot.objects.interactSuppliedObject(juna, 'Story');

	junaDialogCompleted = true;
	logMessage('debug', 'juna', 'Story dialog initiated', LOG_COLOR.PINK);
}

export function updateInteractionState(): void {
	const adjacent = getAdjacentWall();

	if (
		(pendingSwitchToFirst || currentInteractingType !== 'blue') &&
		blueCycleOrder.length > 0
	) {
		const target = selectPreferredBlueTarget();
		if (target) {
			currentInteractingWall = target;
			currentInteractingType = 'blue';
			pendingSwitchToFirst = false;
			const loc = target.getWorldLocation();
			logMessage(
				'debug',
				'target',
				`Selecting preferred blue at (${loc.getX()}, ${loc.getY()}, ${loc.getPlane()})`,
				LOG_COLOR.TEAL,
			);
			return;
		}
	}

	if (
		adjacent.type !== currentInteractingType ||
		adjacent.wall !== currentInteractingWall
	) {
		currentInteractingType = adjacent.type;
		currentInteractingWall = adjacent.wall;

		if (currentInteractingType === 'empty') {
			logMessage(
				'debug',
				'interact',
				'No adjacent tear wall',
				LOG_COLOR.GOLD,
			);
		} else {
			const loc = currentInteractingWall?.getWorldLocation();
			if (loc) {
				logMessage(
					'debug',
					'interact',
					`${currentInteractingType.toUpperCase()} wall at (${loc.getX()}, ${loc.getY()}, ${loc.getPlane()})`,
					LOG_COLOR.GOLD,
				);
			}
		}
	}
}

export function interactWithBlueWall(): void {
	const targetWall = selectPreferredBlueTarget();
	if (!targetWall) {
		return;
	}

	const player = client.getLocalPlayer();
	if (!player) {
		return;
	}

	const wallKey = wallUniqueKey(targetWall);

	if (lastClickedWallKey === wallKey && waitingForPlayerAnimation) {
		const currentAnimation = player.getAnimation();
		if (currentAnimation === -1) {
			if (lastPlayerAnimation !== -1) {
				logMessage(
					'debug',
					'wait',
					'Player animation stopped, ready for next wall',
				);
				lastClickedWallKey = null;
				waitingForPlayerAnimation = false;
				lastPlayerAnimation = -1;
			}
		} else if (currentAnimation !== lastPlayerAnimation) {
			lastPlayerAnimation = currentAnimation;
		}
		return;
	}

	if (lastClickedWallKey !== wallKey) {
		const distance = getDistanceToWall(targetWall);
		if (distance > 1) {
			return;
		}

		const wallLoc = targetWall.getWorldLocation();
		const localLoc = net.runelite.api.coords.LocalPoint.fromWorld(
			client,
			new net.runelite.api.coords.WorldPoint(
				wallLoc.getX(),
				wallLoc.getY(),
				wallLoc.getPlane(),
			),
		);

		if (!localLoc) {
			return;
		}

		const sceneX = localLoc.getSceneX();
		const sceneY = localLoc.getSceneY();

		bot.menuAction(
			sceneX,
			sceneY,
			net.runelite.api.MenuAction.GAME_OBJECT_FIRST_OPTION,
			targetWall.getId(),
			0,
			'Interact',
			'<col=4080ff>Tear</col>',
		);

		logMessage(
			'debug',
			'click',
			`Clicking blue wall at (${wallLoc.getX()}, ${wallLoc.getY()})`,
			LOG_COLOR.GOLD,
		);

		lastClickedWallKey = wallKey;
		waitingForPlayerAnimation = true;
		lastPlayerAnimation = player.getAnimation();
	}
}

export function getTearsStateFlags(): {
	scriptInitialized: boolean;
	junaDialogCompleted: boolean;
	lastPlayerMovementState: boolean;
	playerStoppedMovingTicks: number;
	minigameActive: boolean;
} {
	return {
		scriptInitialized,
		junaDialogCompleted,
		lastPlayerMovementState,
		playerStoppedMovingTicks,
		minigameActive,
	};
}

export function setTearsStateFlags(paramaters: {
	scriptInitialized: boolean;
	junaDialogCompleted: boolean;
	lastPlayerMovementState: boolean;
	playerStoppedMovingTicks: number;
	minigameActive: boolean;
}): void {
	scriptInitialized = paramaters.scriptInitialized;
	junaDialogCompleted = paramaters.junaDialogCompleted;
	lastPlayerMovementState = paramaters.lastPlayerMovementState;
	playerStoppedMovingTicks = paramaters.playerStoppedMovingTicks;
	minigameActive = paramaters.minigameActive;
}

export function getTearsWallStats(): {
	blueWallCount: number;
	greenWallCount: number;
	historyCount: number;
} {
	return {
		blueWallCount,
		greenWallCount,
		historyCount: wallSpawnHistory.length,
	};
}

export function getTearsInteractionStatus(): {
	lastClickedWallKey: string | null;
	blueCycleComplete: boolean;
	blueCycleOrderLength: number;
	blueRespawnOnCurrent: boolean;
	pendingSwitchToFirst: boolean;
	currentInteractingType: 'blue' | 'green' | 'empty';
} {
	return {
		lastClickedWallKey,
		blueCycleComplete,
		blueCycleOrderLength: blueCycleOrder.length,
		blueRespawnOnCurrent,
		pendingSwitchToFirst,
		currentInteractingType,
	};
}

export function getBlueCycleTiming(): {
	lastBlueChangeTick: number | null;
	blueCycleCompleteTick: number | null;
	ticksSinceLastBlueChange: number | null;
} {
	const currentTick: number = client.getTickCount();
	const ticksSinceLastBlueChange: number | null =
		lastBlueChangeTick === null ? null : currentTick - lastBlueChangeTick;

	return {
		lastBlueChangeTick,
		blueCycleCompleteTick,
		ticksSinceLastBlueChange,
	};
}
