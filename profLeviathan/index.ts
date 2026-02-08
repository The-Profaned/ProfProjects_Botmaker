/* eslint-disable @typescript-eslint/no-unsafe-call */
// Imports
import { logger } from '../imports/logger.js';
import { createUi } from '../imports/ui-functions.js';
import { generalFunctions } from '../imports/general-function.js';
import { projectileFunctions } from '../imports/projectile-functions.js';
import { playerFunctions } from '../imports/player-functions.js';
import { npcGroupIds, NPC } from '../imports/npc-ids.js';
import { attackTimers } from '../imports/attack-timers.js';
import { npcFunctions } from '../imports/npc-functions.js';
import { tileFunctions } from '../imports/tile-functions.js';
import { tileSets } from '../imports/tile-sets.js';
import { locationFunctions } from '../imports/location-functions.js';
import {
	potionGroups,
	food,
	NORMAL_FOOD_DELAY,
	POTION_DELAY,
} from '../imports/item-ids.js';
import { inventoryFunctions } from '../imports/inventory-functions.js';
import { bankFunctions } from '../imports/bank-functions.js';
import { object } from '../imports/object-ids.js';

// #region Global Variables
// variables for script state
const state = {
	debugEnabled: false,
	debugFullState: false,
	failureCounts: {},
	failureOrigin: '',
	lastFailureKey: '',
	mainState: 'start_state',
	subState: '',
	scriptInitialized: false,
	scriptName: 'profLeviathan',
	uiCompleted: false,
	timeout: 0,
	gameTick: 0,
	movementStartTick: 0,
	attackSpeed: 0,
	lastAttackTick: 0,
	inCombatArea: false,
	returnWalkInitiated: false,
	bankWalkInitiated: false,
	isAtBankLocation: false,
	bankOpenAttemptTick: -1,
	debrisMovementState: null as {
		currentTileIndex: number;
		ticksOnCurrentTile: number;
		tilesCompleted: number;
	} | null,
	pathfinderPrevLoc: null as {
		x: number;
		y: number;
	} | null,
	leviathanLastHealth: 100,
	initialInventory: {} as Record<
		number,
		{ itemId: number; quantity: number }
	>,
	initialEquipment: {} as Record<string, number>,
	graveLootAttempts: 0,
	bankingProgress: {
		initialized: false,
		slots: [] as number[],
		index: 0,
	},
};
// #endregion Global Variables

//=========================================================================================================
// ======================= Leviathan Specific Functions + Variables =======================================
//=========================================================================================================

// #region Levi Functions
// Leviathan Arena Boundaries - need to still verify they are accurate
const arenaBoundaries = {
	north: {
		minX: 2078,
		maxX: 2084,
		minY: 6376,
		maxY: 6381,
		lightningSafeTileA: { x: 0, y: 0 },
		lightningSafeTileB: { x: 0, y: 0 },
		debrisStartTileA: { x: 0, y: 0 },
		debrisStartTileB: { x: 0, y: 0 },
	},
	south: {
		minX: 2078,
		maxX: 2084,
		minY: 6363,
		maxY: 6368,
		lightningSafeTileA: { x: 0, y: 0 },
		lightningSafeTileB: { x: 0, y: 0 },
		debrisStartTileA: { x: 0, y: 0 },
		debrisStartTileB: { x: 0, y: 0 },
	},
	east: {
		minX: 2085,
		maxX: 2091,
		minY: 6363,
		maxY: 6381,
		lightningSafeTileA: { x: 0, y: 0 },
		lightningSafeTileB: { x: 0, y: 0 },
		debrisStartTileA: { x: 0, y: 0 },
		debrisStartTileB: { x: 0, y: 0 },
	},
	west: {
		minX: 2071,
		maxX: 2080,
		minY: 6363,
		maxY: 6381,
		lightningSafeTileA: { x: 0, y: 0 },
		lightningSafeTileB: { x: 0, y: 0 },
		debrisStartTileA: { x: 0, y: 0 },
		debrisStartTileB: { x: 0, y: 0 },
	},
	ladder: {
		minX: 2062,
		maxX: 2069,
		minY: 6365,
		maxY: 6367,
	},
};

// Abyss Pathfinder spawn location (static at fight start)
const pathfinderStartLocation = {
	x: 2076, // verify
	y: 6377, // verify
};

const graveLocation = locationFunctions.coordsToWP([2062, 6436, 0]);

const LEVIATHAN_TARGET_ID: number = npcGroupIds.leviathans[0];
const NORMAL_FOODS: number[] = Object.values(food.normalDelay.item);
const COMBO_FOODS: number[] = Object.values(food.comboDelay.item);
const PRAYER_POTIONS: number[] = [
	...potionGroups.ppots1_4,
	...potionGroups.restores1_4,
];

// Track last selected opposite tile to ensure we never get the same tile twice
let lastOppositeTile: { x: number; y: number } | null = null;

const equipmentSlotIndices: Record<string, number> = {
	head: 0,
	cape: 1,
	neck: 2,
	weapon: 3,
	body: 4,
	shield: 5,
	legs: 7,
	hands: 9,
	feet: 10,
	ring: 12,
	ammo: 13,
};

type BoundaryKey = 'north' | 'south' | 'east' | 'west';

// Sets Boundary Key type for reuse in functions
const isWithinBoundary = (
	boundaryKey: BoundaryKey,
	x: number,
	y: number,
): boolean => {
	const boundary = arenaBoundaries[boundaryKey];
	return (
		x >= boundary.minX &&
		x <= boundary.maxX &&
		y >= boundary.minY &&
		y <= boundary.maxY
	);
};

// Gets current boundary key based on player location, returns null if not within any boundary
const getBoundaryForPoint = (x: number, y: number): BoundaryKey | null => {
	const keys: BoundaryKey[] = ['north', 'south', 'east', 'west'];
	for (const key of keys) {
		if (isWithinBoundary(key, x, y)) return key;
	}
	return null;
};

// Assigns the opposite boundary tile based on player location
const getOppositeBoundary = (
	current: BoundaryKey | null,
): BoundaryKey | null => {
	if (current === 'north') return 'south';
	if (current === 'south') return 'north';
	if (current === 'east') return 'west';
	if (current === 'west') return 'east';
	return null;
};

// Helper function to get a single random tile from opposite boundary (any tile that isn't dangerous)
function getOppositeSideTiles(playerLoc: net.runelite.api.coords.WorldPoint): {
	x: number;
	y: number;
} {
	const playerX: number = playerLoc.getX();
	const playerY: number = playerLoc.getY();

	// Get dangerous tiles to filter out
	const dangerousTiles: { x: number; y: number }[] =
		tileSets.dangerousTileSets.leviDangerTiles;
	const dangerousSet: Set<string> = new Set(
		dangerousTiles.map((t) => `${t.x},${t.y}`),
	);

	const currentBoundary: BoundaryKey | null = getBoundaryForPoint(
		playerX,
		playerY,
	);
	const oppositeBoundary: BoundaryKey | null =
		getOppositeBoundary(currentBoundary);

	const oppositeTiles: { x: number; y: number }[] = [];

	if (oppositeBoundary) {
		const boundary = arenaBoundaries[oppositeBoundary];
		for (let x: number = boundary.minX; x <= boundary.maxX; x++) {
			for (let y: number = boundary.minY; y <= boundary.maxY; y++) {
				const key = `${x},${y}`;
				if (!dangerousSet.has(key)) {
					oppositeTiles.push({ x, y });
				}
			}
		}
	}

	// Filter out the last tile to ensure we never get the same tile twice
	let availableTiles: { x: number; y: number }[] = oppositeTiles;
	if (lastOppositeTile) {
		availableTiles = oppositeTiles.filter(
			(t) =>
				!(t.x === lastOppositeTile!.x && t.y === lastOppositeTile!.y),
		);
	}

	// Select random tile, fallback to available tiles if filtered is empty
	let selectedTile: { x: number; y: number };
	if (availableTiles.length > 0) {
		selectedTile =
			availableTiles[Math.floor(Math.random() * availableTiles.length)];
	} else if (oppositeTiles.length > 0) {
		selectedTile =
			oppositeTiles[Math.floor(Math.random() * oppositeTiles.length)];
	} else {
		selectedTile = { x: playerX, y: playerY };
	}

	lastOppositeTile = selectedTile;
	return selectedTile;
}

function findClosestFrontTile(
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

// Helper function to execute phases 1-3 for special attacks (lightning and debris)
// Returns: { currentBoundary, safeTileA, safeTileB, isOnSafeTile, isFacingPlayer, playerX, playerY } or null if phases incomplete
function executeSpecialAttackPhases1to3(
	attackType: 'lightning' | 'debris',
	playerLocOverride?: net.runelite.api.coords.WorldPoint | null,
	leviathanOverride?: net.runelite.api.NPC | null,
): {
	currentBoundary: 'north' | 'south' | 'east' | 'west' | null;
	safeTileA: { x: number; y: number };
	safeTileB: { x: number; y: number };
	isOnSafeTile: boolean;
	isFacingPlayer: boolean;
	playerX: number;
	playerY: number;
} | null {
	const leviathan: net.runelite.api.NPC | undefined =
		leviathanOverride ??
		bot.npcs
			.getWithIds(npcGroupIds.leviathans)
			.find((npc: net.runelite.api.NPC) => npcFunctions.isNpcAlive(npc));
	const playerLoc =
		playerLocOverride ??
		client?.getLocalPlayer?.()?.getWorldLocation?.() ??
		null;
	const playerX = playerLoc?.getX() ?? 0;
	const playerY = playerLoc?.getY() ?? 0;

	// Determine current boundary
	const currentBoundary: BoundaryKey | null = getBoundaryForPoint(
		playerX,
		playerY,
	);

	// Get safe tiles for this attack type
	let safeTileA = { x: 0, y: 0 };
	let safeTileB = { x: 0, y: 0 };
	if (currentBoundary) {
		if (attackType === 'lightning') {
			safeTileA = arenaBoundaries[currentBoundary].lightningSafeTileA;
			safeTileB = arenaBoundaries[currentBoundary].lightningSafeTileB;
		} else {
			safeTileA = arenaBoundaries[currentBoundary].debrisStartTileA;
			safeTileB = arenaBoundaries[currentBoundary].debrisStartTileB;
		}
	}

	const isOnSafeTileA = playerX === safeTileA.x && playerY === safeTileA.y;
	const isOnSafeTileB = playerX === safeTileB.x && playerY === safeTileB.y;
	const isOnSafeTile = isOnSafeTileA || isOnSafeTileB;

	const orientationData = leviathan
		? npcFunctions.npcOrientationToPlayer(leviathan)
		: false;
	const isFacingPlayer =
		orientationData && typeof orientationData === 'object'
			? orientationData.isFacingPlayer
			: false;

	// PHASE 1: Run to opposite boundary
	const oppositeBoundary: BoundaryKey | null =
		getOppositeBoundary(currentBoundary);
	const oppositeTile = playerLoc
		? getOppositeSideTiles(playerLoc)
		: { x: playerX, y: playerY };

	const isAtOppositeBoundary = oppositeBoundary
		? isWithinBoundary(oppositeBoundary, playerX, playerY)
		: false;

	if (!isAtOppositeBoundary) {
		bot.walking.walkToWorldPoint(oppositeTile.x, oppositeTile.y);
		return null; // Phases incomplete, still walking
	}

	// PHASE 2: Attack once when at opposite boundary and not facing player
	if (!isFacingPlayer) {
		playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);
	}

	// PHASE 3: Move to safe tile within current boundary (one-time positioning)
	if (!isOnSafeTile) {
		const distanceToA = Math.sqrt(
			Math.pow(playerX - safeTileA.x, 2) +
				Math.pow(playerY - safeTileA.y, 2),
		);
		const distanceToB = Math.sqrt(
			Math.pow(playerX - safeTileB.x, 2) +
				Math.pow(playerY - safeTileB.y, 2),
		);

		const closestTile = distanceToA <= distanceToB ? safeTileA : safeTileB;
		bot.walking.walkToWorldPoint(closestTile.x, closestTile.y);
		return null; // Phases incomplete, still walking to safe tile
	}

	// Attack when reaching safe tile
	playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);

	// Return completed phases data
	return {
		currentBoundary,
		safeTileA,
		safeTileB,
		isOnSafeTile,
		isFacingPlayer,
		playerX,
		playerY,
	};
}

function tryEquipMissingGearFromInventory(
	stateReference: typeof state,
	requiredEquipment: Record<string, number>,
	wornEquipment: Record<string, number>,
): boolean {
	for (const [slot, itemId] of Object.entries(requiredEquipment)) {
		if (wornEquipment[slot] === itemId) {
			continue;
		}
		if (bot.inventory.containsId(itemId)) {
			inventoryFunctions.swapGear(
				stateReference,
				[itemId],
				[],
				equipmentSlotIndices[slot] ?? -1,
				'death',
			);
			return true;
		}
	}
	return false;
}

function webWalkToPointIfIdle(
	worldPoint: net.runelite.api.coords.WorldPoint,
): void {
	if (!bot.walking.isWebWalking()) {
		bot.walking.webWalkStart(worldPoint);
	}
}

// #endregion functions + function variables

//=========================================================================================================
// ============================ Script Event Handlers and State Manager ===================================
//=========================================================================================================

// #region Script Handlers
// On Start of Script
export function onStart() {
	try {
		createUi(state);
		projectileFunctions.initializeProjectileTracking(state);
		npcFunctions.initializeNpcAttackTracking(state);
		state.initialInventory = inventoryFunctions.cacheInventory(state);
		state.initialEquipment = playerFunctions.getWornEquipment(state);
		logger(state, 'all', 'script', `${state.scriptName} started.`);
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

// On Game Tick
export function onGameTick() {
	bot.breakHandler.setBreakHandlerStatus(false);

	try {
		if (state.uiCompleted) {
			if (!state.scriptInitialized) notifyScriptInitialized();
			state.scriptInitialized = true;
		} else {
			return;
		}
		if (!generalFunctions.gameTick(state)) return;

		// Update projectile tracking each tick (polling-based system)
		projectileFunctions.updateProjectileDistance(state);

		// Enable break handler only when in start_state
		if (
			!bot.bank.isBanking() &&
			bot.localPlayerIdle() &&
			!bot.walking.isWebWalking() &&
			state.mainState === 'start_state'
		) {
			bot.breakHandler.setBreakHandlerStatus(true);
		}
		stateManager();
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

// Script Initialized Notification
function notifyScriptInitialized(): void {
	bot.printGameMessage('Script initialized.');
}

// On End of Script
export function onEnd() {
	return generalFunctions.endScript(state);
}
// #endregion Script Handlers

//=========================================================================================================
// ============================ Leviathan State/Case Manager ==============================================
//=========================================================================================================

// #region PreFight Case
// Script Decision Manager
export function stateManager() {
	logger(
		state,
		'debug',
		'stateManager',
		`${state.mainState} - ${state.subState}`,
	);
	// Main state machine - allows logic seperation for main states and sub states
	switch (state.mainState) {
		case 'start_state': {
			logger(
				state,
				'debug',
				'stateManager',
				'Starting Auto Leviathan. Grabbing required data.',
			);
			state.attackSpeed = attackTimers.getEquippedWeaponSpeed(state);
			state.mainState = 'approach_leviathan';
			break;
		}

		// Move to Leviathan and climb ladder to arena
		case 'approach_leviathan': {
			const player: net.runelite.api.Player | null =
				client?.getLocalPlayer?.() ?? null;
			const playerLoc: net.runelite.api.coords.WorldPoint | null =
				player?.getWorldLocation?.() ?? null;
			if (!playerLoc) break;

			const ladderBoundary = arenaBoundaries.ladder;
			const isInLadderArea: boolean =
				playerLoc.getX() >= ladderBoundary.minX &&
				playerLoc.getX() <= ladderBoundary.maxX &&
				playerLoc.getY() >= ladderBoundary.minY &&
				playerLoc.getY() <= ladderBoundary.maxY;

			if (isInLadderArea) {
				const ladderObject: net.runelite.api.TileObject | null =
					bot.objects.getTileObjectsWithIds([
						object.leviHandHolds,
					])[0] ?? null;
				if (ladderObject) {
					bot.objects.interactSuppliedObject(ladderObject, 'Climb');
				}
			}
			break;
		}

		// Preparation logic before engaging Leviathan
		case 'prepare_combat': {
			const inCombatArea = playerFunctions.engageNPC(state, {
				minX: 2017,
				maxX: 2091,
				minY: 6363,
				maxY: 6381,
				plane: 0,
			});

			if (inCombatArea) {
				state.mainState = 'leviathan_combat';
				state.subState = 'manage_hp/prayer';
			} else {
				logger(
					state,
					'debug',
					'prepare_combat',
					'Not in combat area. Returning to Leviathan.',
				);
				state.mainState = 'return_to_leviathan';
			}
			break;
		}
		// #endregion PreFight Case

		//=========================================================================================================
		// ======================================  Fight Manager ==================================================
		//=========================================================================================================

		// #region Fight Case
		// Primary Leviathan combat logic
		case 'leviathan_combat': {
			const HP = net.runelite.api.Skill.HITPOINTS;
			const Prayer = net.runelite.api.Skill.PRAYER;
			const currentHealthLeft = client.getBoostedSkillLevel(HP);
			const player = client.getLocalPlayer();
			const playerLoc = player?.getWorldLocation?.() ?? null;
			const playerLocForTick =
				playerLoc ?? client.getLocalPlayer().getWorldLocation();
			if (currentHealthLeft <= 0) {
				logger(
					state,
					'debug',
					'leviathan_combat',
					'Player is dead. Transitioning to death state.',
				);
				state.mainState = 'death';
				state.subState = 'return_to_grave';
				break;
			}

			// Cache leviathan lookup for reuse in sub-states (performance optimization)
			const leviathan: net.runelite.api.NPC | undefined = bot.npcs
				.getWithIds(npcGroupIds.leviathans)
				.find((npc: net.runelite.api.NPC) =>
					npcFunctions.isNpcAlive(npc),
				);

			// Always handle incoming projectiles (prayer defense)
			const sortedProjectiles =
				projectileFunctions.getSortedProjectiles(state);
			if (sortedProjectiles.length > 0) {
				playerFunctions.handleIncomingProjectiles(state);
			}

			// Check if taking projectile hits every tick from leviathan
			const allProjectileRates =
				projectileFunctions.getAllProjectileHitRates(state, 10);
			const takingProjectileEveryTick = Object.values(
				allProjectileRates,
			).some((rate) => rate.hitsEveryTick && rate.totalHits > 0);

			// Trigger reset_leviathan if actively taking damage every tick
			if (
				takingProjectileEveryTick &&
				state.subState !== 'reset_leviathan'
			) {
				logger(
					state,
					'debug',
					'leviathan_combat',
					'Taking projectiles every tick. Stunning Leviathan.',
				);
				state.subState = 'reset_leviathan';
			}

			// Monitor leviathan health for pathfinder phase transition
			// Note: getHealthRatio() returns 0-255 representing the NPC's health bar state (not absolute HP)
			if (leviathan) {
				// Convert health ratio (0-255) to percentage (0-100)
				const leviathanHealthRatio = leviathan.getHealthRatio() ?? 255;
				const leviathanHealthPercent = Math.round(
					(leviathanHealthRatio / 255) * 100,
				);
				state.leviathanLastHealth = leviathanHealthPercent;

				// At 25% health, start moving to pathfinder location
				if (
					leviathanHealthPercent <= 25 &&
					leviathanHealthPercent > 20 &&
					![
						'moving_to_pathfinder',
						'track_abyss_pathfinder',
					].includes(state.subState)
				) {
					logger(
						state,
						'debug',
						'leviathan_combat',
						`Leviathan at ${leviathanHealthPercent}% health. Moving to pathfinder location.`,
					);
					state.subState = 'moving_to_pathfinder';
				}

				// At 20% health, run to pathfinder location and start phase
				if (
					leviathanHealthPercent <= 20 &&
					state.subState !== 'track_abyss_pathfinder'
				) {
					logger(
						state,
						'debug',
						'leviathan_combat',
						`Leviathan at ${leviathanHealthPercent}% health. Starting pathfinder phase!`,
					);
					state.subState = 'track_abyss_pathfinder';
				}
			}

			// Check for dangerous tiles (falling rocks/debris) during normal combat
			// Prioritize moving to safety before attacking
			const dangerousTiles = tileFunctions.getDangerousTiles();
			const inSpecialAttackState = [
				'reset_leviathan',
				'avoid_lightning',
				'dodge_debris',
			].includes(state.subState);
			if (dangerousTiles.length > 0 && !inSpecialAttackState) {
				logger(
					state,
					'debug',
					'leviathan_combat',
					`Dangerous tiles detected (${dangerousTiles.length} tiles). Moving to safety.`,
				);
				state.subState = 'handle_danger_tiles';
			}

			// sub-state logic for leviathan combat (primary actions during fight)
			switch (state.subState) {
				// Manage HP and prayer during combat
				case 'manage_hp/prayer': {
					const currentPrayerLeft =
						client.getBoostedSkillLevel(Prayer);

					// Emergency: below 25 HP - combo eat
					if (currentHealthLeft < 25) {
						playerFunctions.comboEat(
							state,
							NORMAL_FOODS,
							COMBO_FOODS,
							NORMAL_FOOD_DELAY,
						);
						break;
					}

					// Below 50 HP AND below 30 Prayer - eat food and drink potion
					if (currentHealthLeft < 50 && currentPrayerLeft < 30) {
						playerFunctions.eatFoodAndDrinkPotion(
							state,
							NORMAL_FOODS,
							NORMAL_FOOD_DELAY,
							PRAYER_POTIONS,
							POTION_DELAY,
						);
						break;
					}

					// Below 30 Prayer only - drink potion
					if (currentPrayerLeft < 30) {
						playerFunctions.drinkPotion(
							state,
							PRAYER_POTIONS,
							POTION_DELAY,
						);
						break;
					}

					// Below 50 HP only - eat normal delay food
					if (currentHealthLeft < 50) {
						playerFunctions.eatFood(
							state,
							NORMAL_FOODS,
							NORMAL_FOOD_DELAY,
						);
						break;
					}
					state.subState = 'engage_combat';
					break;
				}

				// Engage Leviathan combat logic
				case 'engage_combat': {
					if (!leviathan || !npcFunctions.isNpcAlive(leviathan)) {
						logger(
							state,
							'debug',
							'engage_combat',
							'Leviathan not found or dead.',
						);
						state.mainState = 'prepare_combat';
						break;
					}

					// Check if attack speed cooldown allows attack
					const ticksSinceLastAttack =
						state.gameTick - state.lastAttackTick;
					const attackCooldown =
						state.attackSpeed > 0 ? state.attackSpeed : 4; // Default 4 ticks if unknown

					// Attack if cooldown elapsed
					if (ticksSinceLastAttack >= attackCooldown) {
						playerFunctions.attackTargetNpc(
							state,
							LEVIATHAN_TARGET_ID,
						);
						state.lastAttackTick = state.gameTick;
						logger(
							state,
							'debug',
							'engage_combat',
							`Attacking Leviathan. Cooldown: ${attackCooldown} ticks.`,
						);
					}
					break;
				}

				// Move to safe tile when dangerous tiles are detected
				case 'handle_danger_tiles': {
					if (dangerousTiles.length === 0) {
						logger(
							state,
							'debug',
							'handle_danger_tiles',
							'No dangerous tiles detected. Returning to manage_hp/prayer.',
						);
						state.subState = 'manage_hp/prayer';
						break;
					}

					// Get safe tile within 5 tiles radius
					const safeTile = tileFunctions.getSafeTile(state, 5);

					if (safeTile) {
						const currentPlayerLoc = playerLocForTick;

						// Only move if not already at safe tile
						if (
							currentPlayerLoc.getX() !== safeTile.getX() ||
							currentPlayerLoc.getY() !== safeTile.getY()
						) {
							bot.walking.walkToWorldPoint(
								safeTile.getX(),
								safeTile.getY(),
							);
							state.movementStartTick = state.gameTick;
							logger(
								state,
								'debug',
								'handle_danger_tiles',
								`Moving to safe tile (${safeTile.getX()}, ${safeTile.getY()}).`,
							);
							// Continue attacking while moving
							state.subState = 'engage_combat';
						} else {
							logger(
								state,
								'debug',
								'handle_danger_tiles',
								'At safe tile. Returning to manage_hp/prayer.',
							);
							state.subState = 'manage_hp/prayer';
						}
					} else {
						logger(
							state,
							'debug',
							'handle_danger_tiles',
							'No safe tile found. Get ready to die!',
						);
					}
					break;
				}

				// We only reach this state when taking projectiles every tick,
				// reset Leviathan's attack speed by casting shadow spells on it
				case 'reset_leviathan': {
					// Check for dangerous objects in arena boundaries (primary detection)
					const objectsInBoundaries =
						tileFunctions.areObjectsInBoundaries(state, [
							arenaBoundaries.west,
							arenaBoundaries.east,
						]);

					// Cast shadow spells on Leviathan to reset its attack speed
					playerFunctions.castSpellOnNpc(
						state,
						[
							'SHADOW_RUSH',
							'SHADOW_BURST',
							'SHADOW_BLITZ',
							'SHADOW_BARRAGE',
						],
						[LEVIATHAN_TARGET_ID],
					);

					// Determine which special attack is incoming
					if (objectsInBoundaries) {
						logger(
							state,
							'debug',
							'reset_leviathan',
							'Lightning special attack detected. Transitioning to avoid_lightning.',
						);
						state.subState = 'avoid_lightning';
					} else {
						logger(
							state,
							'debug',
							'reset_leviathan',
							'Debris special attack detected. Transitioning to dodge_debris.',
						);
						state.subState = 'dodge_debris';
					}
					break;
				}

				// Lightning special attack avoidance
				case 'avoid_lightning': {
					const lightningAnimationId = 12345; // Update with actual lightning animation ID
					const isAnimationActive =
						leviathan?.getAnimation() === lightningAnimationId;

					// Execute phases 1-3 (walk to opposite, attack, move to safe tile)
					const phaseData = executeSpecialAttackPhases1to3(
						'lightning',
						playerLocForTick,
						leviathan ?? null,
					);
					if (!phaseData) break; // Phases still in progress

					const {
						safeTileA,
						safeTileB,
						isOnSafeTile,
						isFacingPlayer,
					} = phaseData;

					// Check if animation has ended - exit if so
					if (!isAnimationActive) {
						logger(
							state,
							'debug',
							'avoid_lightning',
							'Lightning special attack ended. Returning to manage_hp/prayer.',
						);
						state.subState = 'manage_hp/prayer';
						break;
					}

					// PHASE 5: Loop - Check facing and handle movement/attack
					if (isFacingPlayer) {
						// Run between the safe tiles to dodge lightning
						playerFunctions.runBetweenTiles(
							state,
							safeTileA,
							safeTileB,
						);
					} else {
						// Verify on safe tile and attack
						if (isOnSafeTile) {
							playerFunctions.attackTargetNpc(
								state,
								LEVIATHAN_TARGET_ID,
							);
						}
					}

					logger(
						state,
						'debug',
						'avoid_lightning',
						`${isFacingPlayer ? 'Alternating between tiles.' : 'Attacking from safe tile.'}`,
					);
					break;
				}

				// Debris special attack dodging
				case 'dodge_debris': {
					const currentPlayerLoc = playerLocForTick;
					const playerX = currentPlayerLoc.getX();
					const playerY = currentPlayerLoc.getY();

					// Get current boundary
					const currentBoundary: BoundaryKey | null =
						getBoundaryForPoint(playerX, playerY);

					// Execute shared phases 1-3
					const phaseData = executeSpecialAttackPhases1to3(
						'debris',
						playerLocForTick,
						leviathan ?? null,
					);
					if (!phaseData) break;

					const debrisAnimationId = 12346; // Update with actual debris animation ID
					const isAnimationActive =
						leviathan?.getAnimation() === debrisAnimationId;

					// Attack when reaching debris tile
					playerFunctions.attackTargetNpc(state, LEVIATHAN_TARGET_ID);

					// Check if animation has ended - exit if so
					if (!isAnimationActive) {
						logger(
							state,
							'debug',
							'dodge_debris',
							'Debris special attack ended. Returning to manage_hp/prayer.',
						);
						state.subState = 'manage_hp/prayer';
						break;
					}

					// Debris handling: stand on tile for 2 ticks, move to next tile, attack in between
					// Initialize debris movement state if not already done
					if (!state.debrisMovementState && currentBoundary) {
						state.debrisMovementState = {
							currentTileIndex: 0,
							ticksOnCurrentTile: 0,
							tilesCompleted: 0,
						};
					}

					const debrisState = state.debrisMovementState;
					if (!debrisState || !currentBoundary) break;

					const debrisTiles =
						tileSets.safeTileSets.leviDebrisTiles[currentBoundary];

					// Stand on current tile for 2 ticks
					debrisState.ticksOnCurrentTile++;

					if (debrisState.ticksOnCurrentTile >= 2) {
						// Time to move to next tile
						if (debrisState.tilesCompleted < 4) {
							// Move to next tile in sequence
							debrisState.currentTileIndex++;
							const nextTile =
								debrisTiles[debrisState.currentTileIndex];

							if (nextTile) {
								bot.walking.walkToWorldPoint(
									nextTile.x,
									nextTile.y,
								);
								debrisState.ticksOnCurrentTile = 0;
								debrisState.tilesCompleted++;

								logger(
									state,
									'debug',
									'dodge_debris',
									`Moving to tile ${debrisState.currentTileIndex + 1} (move ${debrisState.tilesCompleted}/4)`,
								);
							}
						} else {
							// After 4 moves, walk 1 tile behind rock 4 to obstruct line of sight
							if (leviathan) {
								const leviathanLoc =
									leviathan.getWorldLocation?.();
								if (leviathanLoc && debrisTiles[3]) {
									const rock4 = debrisTiles[3]; // tile 4 is at index 3

									// Calculate direction from leviathan to rock 4
									const directionX =
										rock4.x - leviathanLoc.getX();
									const directionY =
										rock4.y - leviathanLoc.getY();

									// Normalize direction (but just get the sign for 1 tile distance)
									let directionXSign = 0;
									if (directionX > 0) {
										directionXSign = 1;
									} else if (directionX < 0) {
										directionXSign = -1;
									}

									let directionYSign = 0;
									if (directionY > 0) {
										directionYSign = 1;
									} else if (directionY < 0) {
										directionYSign = -1;
									}

									// Position 1 tile behind rock 4 (away from leviathan)
									const behindX = rock4.x + directionXSign;
									const behindY = rock4.y + directionYSign;

									bot.walking.walkToWorldPoint(
										behindX,
										behindY,
									);

									logger(
										state,
										'debug',
										'dodge_debris',
										`Positioning 1 tile behind rock 4 at (${behindX}, ${behindY}) to obstruct line of sight`,
									);

									// Reset debris state and return to normal combat
									state.debrisMovementState = null;
									state.subState = 'manage_hp/prayer';
									break;
								}
							}
						}
					} else if (
						debrisState.ticksOnCurrentTile === 1 &&
						debrisState.tilesCompleted > 0
					) {
						// Attack between tile movements
						playerFunctions.attackTargetNpc(
							state,
							LEVIATHAN_TARGET_ID,
						);
					}

					// Check for wave animation during debris special
					const waveAnimationId = 12347; // Update with actual wave animation ID
					const isWaveAnimationActive =
						leviathan?.getAnimation() === waveAnimationId;

					if (isWaveAnimationActive) {
						logger(
							state,
							'debug',
							'dodge_debris',
							'Wave animation detected during debris special. Returning to manage_hp/prayer.',
						);
						state.debrisMovementState = null;
						state.subState = 'manage_hp/prayer';
						break;
					}

					logger(
						state,
						'debug',
						'dodge_debris',
						`Standing on tile (${debrisState.ticksOnCurrentTile}/2 ticks)`,
					);
					break;
				}

				// Move to pathfinder starting location (25-20% health window)
				case 'moving_to_pathfinder': {
					const currentPlayerLoc = playerLocForTick;

					// Check if already at pathfinder location
					if (
						currentPlayerLoc.getX() === pathfinderStartLocation.x &&
						currentPlayerLoc.getY() === pathfinderStartLocation.y
					) {
						logger(
							state,
							'debug',
							'moving_to_pathfinder',
							'Arrived at pathfinder location. Waiting for 20% health.',
						);
						break; // Wait at location for 20% trigger
					}

					// Walk to pathfinder location (normal speed)
					bot.walking.walkToWorldPoint(
						pathfinderStartLocation.x,
						pathfinderStartLocation.y,
					);

					// Attack leviathan while moving to maintain DPS
					if (
						leviathan &&
						bot.localPlayerIdle() &&
						state.gameTick - state.lastAttackTick >=
							state.attackSpeed
					) {
						bot.npcs.interact(leviathan.getName(), 'Attack');
						state.lastAttackTick = state.gameTick;

						logger(
							state,
							'debug',
							'moving_to_pathfinder',
							'Attacking leviathan while moving',
						);
					}

					logger(
						state,
						'debug',
						'moving_to_pathfinder',
						`Moving to pathfinder location (${pathfinderStartLocation.x}, ${pathfinderStartLocation.y})`,
					);
					break;
				}

				// Track and follow the abyss pathfinder in its 3x3 safe zone
				// Prioritize positioning on the front 3 tiles (in direction of travel) for max reaction time
				case 'track_abyss_pathfinder': {
					const currentPlayerLoc = playerLocForTick;

					// Ensure player reaches pathfinder location (sprint if not there yet)
					if (
						currentPlayerLoc.getX() !== pathfinderStartLocation.x ||
						currentPlayerLoc.getY() !== pathfinderStartLocation.y
					) {
						// Sprint to location at 20% threshold
						bot.walking.walkToWorldPoint(
							pathfinderStartLocation.x,
							pathfinderStartLocation.y,
						);

						logger(
							state,
							'debug',
							'track_abyss_pathfinder',
							`Sprinting to pathfinder location (${pathfinderStartLocation.x}, ${pathfinderStartLocation.y})`,
						);
						break; // Continue sprinting until location reached
					}

					// 1. Find the abyss pathfinder NPC
					const pathfinder = bot.npcs
						.getWithIds([NPC.abbyssalPathfinder])
						.find((npc: net.runelite.api.NPC) =>
							npcFunctions.isNpcAlive(npc),
						);
					if (!pathfinder) {
						logger(
							state,
							'debug',
							'track_abyss_pathfinder',
							'Abyss pathfinder not found. Resuming normal combat.',
						);
						state.subState = '';
						state.pathfinderPrevLoc = null;
						break;
					}

					const pathfinderLoc = pathfinder.getWorldLocation();
					if (!pathfinderLoc) break;

					// 2. Calculate the 5x5 safe area around pathfinder center
					// The 5x5 area means tiles from (center-2, center-2) to (center+2, center+2)
					const safeAreaTiles: { x: number; y: number }[] = [];
					for (let dx = -2; dx <= 2; dx++) {
						for (let dy = -2; dy <= 2; dy++) {
							safeAreaTiles.push({
								x: pathfinderLoc.getX() + dx,
								y: pathfinderLoc.getY() + dy,
							});
						}
					}

					// 3. Determine direction pathfinder is moving (for prioritizing front tiles)
					let directionX = 0;
					let directionY = 0;
					if (state.pathfinderPrevLoc) {
						directionX =
							Math.sign(
								pathfinderLoc.getX() -
									state.pathfinderPrevLoc.x,
							) || directionX;
						directionY =
							Math.sign(
								pathfinderLoc.getY() -
									state.pathfinderPrevLoc.y,
							) || directionY;
					}

					// 4. Identify front tiles (center + left/right in direction of travel)
					// Front tiles are the 3 tiles that give maximum reaction time
					let frontTiles: { x: number; y: number }[] = [];

					if (directionX > 0 || directionX < 0) {
						// Moving horizontally (east/west) - front is the column in direction of travel
						frontTiles = safeAreaTiles.filter(
							(t) =>
								t.x ===
								pathfinderLoc.getX() +
									(directionX > 0 ? 1 : -1),
						);
					} else if (directionY > 0 || directionY < 0) {
						// Moving vertically (north/south) - front is the row in direction of travel
						frontTiles = safeAreaTiles.filter(
							(t) =>
								t.y ===
								pathfinderLoc.getY() +
									(directionY > 0 ? 1 : -1),
						);
					} else {
						// Unknown direction yet, use center tile
						frontTiles = [
							{
								x: pathfinderLoc.getX(),
								y: pathfinderLoc.getY(),
							},
						];
					}

					const playerLocForPathfinder = currentPlayerLoc;

					// 5. Check if player is in safe area
					const isInSafeArea = safeAreaTiles.some(
						(tile) =>
							tile.x === playerLocForPathfinder.getX() &&
							tile.y === playerLocForPathfinder.getY(),
					);

					// 6. Move to safe area if not already there, prioritizing front tiles
					if (!isInSafeArea) {
						const targetTile = findClosestFrontTile(
							frontTiles,
							playerLocForPathfinder,
						);

						// Move to closest front tile
						bot.walking.walkToWorldPoint(
							targetTile.x,
							targetTile.y,
						);

						logger(
							state,
							'debug',
							'track_abyss_pathfinder',
							`Moving to front tile. Target: (${targetTile.x}, ${targetTile.y}), Direction: (${directionX}, ${directionY})`,
						);
						break;
					}

					// 7. If in safe area but not on front tile, reposition to front
					const isOnFrontTile = frontTiles.some(
						(tile) =>
							tile.x === playerLocForPathfinder.getX() &&
							tile.y === playerLocForPathfinder.getY(),
					);

					if (!isOnFrontTile && bot.localPlayerIdle()) {
						const targetTile = findClosestFrontTile(
							frontTiles,
							playerLocForPathfinder,
						);
						bot.walking.walkToWorldPoint(
							targetTile.x,
							targetTile.y,
						);

						logger(
							state,
							'debug',
							'track_abyss_pathfinder',
							`Repositioning to front tile. Target: (${targetTile.x}, ${targetTile.y})`,
						);
						break;
					}

					// 8. Attack leviathan for maximum DPS (critical during pathfinder phase)
					if (leviathan && isOnFrontTile) {
						// If on front tile and idle, always attack if cooldown allows
						if (
							bot.localPlayerIdle() &&
							state.gameTick - state.lastAttackTick >=
								state.attackSpeed
						) {
							bot.npcs.interact(leviathan.getName(), 'Attack');
							state.lastAttackTick = state.gameTick;

							logger(
								state,
								'debug',
								'track_abyss_pathfinder',
								'Attacking leviathan from front tile (idle)',
							);
						}
						// If just arrived at front tile, re-attack immediately to verify max DPS
						else if (
							state.gameTick - state.lastAttackTick >=
							state.attackSpeed
						) {
							bot.npcs.interact(leviathan.getName(), 'Attack');
							state.lastAttackTick = state.gameTick;

							logger(
								state,
								'debug',
								'track_abyss_pathfinder',
								'Re-attacking leviathan from front tile (post-move)',
							);
						}
					}

					// 9. Update previous location for next tick's direction calculation
					state.pathfinderPrevLoc = {
						x: pathfinderLoc.getX(),
						y: pathfinderLoc.getY(),
					};

					// 10. Check if pathfinder phase is complete
					// (When pathfinder despawns or special attack resolves)
					if (!pathfinder || !npcFunctions.isNpcAlive(pathfinder)) {
						logger(
							state,
							'debug',
							'track_abyss_pathfinder',
							'Pathfinder phase complete. Resuming normal combat.',
						);
						state.mainState = 'looting';
						state.pathfinderPrevLoc = null;
					}
					break;
				}
				// Default case for unknown sub-states
				default: {
					logger(
						state,
						'debug',
						'leviathan_combat',
						`Unknown subState: ${state.subState}. Returning to manage_hp/prayer.`,
					);
					state.subState = 'manage_hp/prayer';
					break;
				}
			}
			break;
		}
		// #endregion Fight Case

		//=========================================================================================================
		// ================================== Looting / Reset Manager  ============================================
		//=========================================================================================================

		// #region Post-Fight Case
		// TODO: Looting logic
		case 'looting': {
			// Looting logic
			break;
		}

		// TODO: Inventory management logic
		case 'inventory_management': {
			// Inventory management logic
			break;
		}

		// Run to bank and open it in preparation for banking state
		case 'run_to_bank': {
			bankFunctions.processBankOpen(state, () => {
				state.mainState = 'banking';
			});
			break;
		}

		// Banking logic - deposit loot, withdraw supplies, re-equip gear if needed
		case 'banking': {
			const completed: boolean = bankFunctions.quickBanking(
				state,
				state.initialInventory,
				state.bankingProgress,
				'banking',
			);

			if (completed) {
				state.mainState = 'return_to_leviathan';
			}
			break;
		}

		// Return to Leviathan combat area
		case 'return_to_leviathan': {
			// If currently webwalking, stay in this state and wait
			if (bot.walking.isWebWalking()) {
				break;
			}

			// If walk hasn't been initiated yet, do it now
			if (!state.returnWalkInitiated) {
				const bossLocationX = 2066;
				const bossLocationY = 6368;
				tileFunctions.webWalkCalculator(
					state,
					bossLocationX,
					bossLocationY,
				);
				state.returnWalkInitiated = true;
				break;
			}

			// Walk is complete, transition to next state
			state.returnWalkInitiated = false;
			state.mainState = 'leviathan_combat';
			state.subState = 'approach_leviathan';
			break;
		}
		// #endregion Post-Fight Case Manager

		//=========================================================================================================
		// ========================================= Death Manager  ===============================================
		//=========================================================================================================

		//#region Death Case
		// Death handling logic - return to grave, loot, return to bank, re-gear, then back to main loop
		case 'death': {
			const HP = net.runelite.api.Skill.HITPOINTS;
			const currentHealthLeft = client.getBoostedSkillLevel(HP);
			if (currentHealthLeft <= 0) {
				break;
			}

			if (!state.subState) {
				state.subState = 'return_to_grave';
			}

			// Sub-state logic for death handling
			switch (state.subState) {
				// Return to grave and loot if possible, otherwise skip to bank return
				case 'return_to_grave': {
					const isAtGraveLocation = locationFunctions.isPlayerNearWP(
						graveLocation,
						2,
					);

					if (!isAtGraveLocation) {
						webWalkToPointIfIdle(graveLocation);
						break;
					}

					const graveNpc = npcFunctions.getClosestNPC([
						NPC.graveDefault,
						NPC.graveAngel,
					]);
					if (!graveNpc) {
						state.graveLootAttempts = 0;
						state.subState = 'return_to_bank';
						break;
					}

					const { requiredEquipment, wornEquipment, isFullyGeared } =
						playerFunctions.getGearSnapshot(
							state,
							state.initialEquipment,
						);

					if (
						!isFullyGeared &&
						tryEquipMissingGearFromInventory(
							state,
							requiredEquipment,
							wornEquipment,
						)
					) {
						break;
					}

					if (state.graveLootAttempts >= 2) {
						state.graveLootAttempts = 0;
						state.subState = 'return_to_bank';
						break;
					}

					bot.npcs.interact(graveNpc.getName(), 'Loot');
					state.graveLootAttempts += 1;
					break;
				}

				// If we can't loot or aren't at the grave, return to bank to re-gear for next fight
				case 'return_to_bank': {
					bankFunctions.processBankOpen(state, () => {
						state.subState = 're_gear';
					});
					break;
				}

				// Re-gear from bank if needed, then return to main loop to get back into fight
				case 're_gear': {
					if (!bot.bank.isOpen()) {
						state.subState = 'return_to_bank';
						break;
					}

					const { requiredEquipment, wornEquipment, isFullyGeared } =
						playerFunctions.getGearSnapshot(
							state,
							state.initialEquipment,
						);
					if (isFullyGeared) {
						state.mainState = 'banking';
						state.subState = '';
						break;
					}

					if (
						tryEquipMissingGearFromInventory(
							state,
							requiredEquipment,
							wornEquipment,
						)
					) {
						break;
					}

					for (const [slot, itemId] of Object.entries(
						requiredEquipment,
					)) {
						if (wornEquipment[slot] === itemId) {
							continue;
						}

						const bankQuantity = bot.bank.getQuantityOfId(itemId);
						if (bankQuantity <= 0) {
							const message = `Missing required gear item ${itemId} in slot ${slot}.`;
							bot.printGameMessage(message);
							logger(state, 'all', 're_gear', message);
							bot.terminate();
							break;
						}

						bot.bank.withdrawQuantityWithId(itemId, 1);
						inventoryFunctions.itemInventoryTimeout.present(
							state,
							itemId,
							'death',
						);
						break;
					}
					break;
				}

				// deafult state if somehow we end up in an unknown sub-state, return to grave as a safe fallback
				default: {
					state.subState = 'return_to_grave';
					break;
				}
			}
			break;
		}
		//#endregion Death Case

		// Default case to handle unknown states
		default: {
			logger(
				state,
				'debug',
				'stateManager',
				'Unknown mainState, resetting to start_state.',
			);
			state.mainState = 'start_state';
			state.subState = '';
			break;
		}
	}
}
