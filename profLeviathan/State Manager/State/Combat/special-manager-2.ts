import { CombatSubStates, state } from '../../script-state.js';
import { logger } from '../../../../imports/logger.js';
import { attackTargetNpc } from '../../../../imports/player-functions.js';
import { getWorldPoint } from '../../../../imports/location-functions.js';
import {
	getLeviathanNpc,
	getLeviathanHealthPercent,
	LEVIATHAN_FALLBACK_ID,
	LEVIATHAN_PRIMARY_ID,
	returnToAttackState,
} from './combat-tracker.js';
import { tileSets } from '../../../../imports/tile-sets.js';
import {
	clearSpecialPhaseData,
	getSpecialPhaseData,
	SpecialPhaseData,
} from './movement-manager.js';
import { consumeSpecialAttackTrigger } from './projectile-manager.js';

// ============ Logging Toggles ============
const ENABLE_DEBRIS_LOGGING = true;
const ENABLE_TILE_PROGRESSION_LOGGING = true;

const logDebris = (message: string) =>
	ENABLE_DEBRIS_LOGGING && logger(state, 'debug', 'specialManager2', message);
const logTile = (message: string) =>
	ENABLE_TILE_PROGRESSION_LOGGING &&
	logger(state, 'debug', 'handleTileProgression', message);

const attackLeviathanWithFallback = (): boolean => {
	if (attackTargetNpc(state, LEVIATHAN_PRIMARY_ID)) return true;
	return attackTargetNpc(state, LEVIATHAN_FALLBACK_ID);
};

// ============ Constants ============
const DEBRIS_ANIMATION_ID: number = 10289;
const WAVE_ANIMATION_ID: number = 10290;
const oppositeTileSet = (tileSet: 'a' | 'b'): 'a' | 'b' =>
	tileSet === 'a' ? 'b' : 'a';
const lastDebrisTileSetByDirection: Partial<
	Record<SpecialPhaseData['currentDirection'], 'a' | 'b'>
> = {};

// ============ Manager Function ============
/**
 * Special Manager 2 - handles the debris special attack phase
 * Detects debris attack via animation object, moves player to safe tiles, and handles attack timing
 * Uses animation changes to detect start and end of special attack phase
 */
export function specialManager2(): void {
	const leviathan = getLeviathanNpc();
	if (!leviathan) {
		resetDebrisState();
		returnToAttackState();
		return;
	}

	const phaseData = getSpecialPhaseData();
	if (!phaseData) {
		state.combatState.subState = CombatSubStates.MOVEMENT;
		return;
	}

	const isAnimationActive = leviathan.getAnimation() === DEBRIS_ANIMATION_ID;

	if (shouldEndDebrisSpecial(leviathan)) {
		endSpecialAttack();
		return;
	}

	if (!state.debrisMovementState) {
		initializeDebrisMovementState(phaseData);
		return;
	}

	if (
		handleDebrisMovement(
			state.debrisMovementState,
			phaseData,
			isAnimationActive,
			leviathan,
		)
	) {
		endSpecialAttack();
	}
}

// ============ Helper Functions ============
/**
 * Reset debris special state
 * @returns void
 */
const resetDebrisState = (): void => {
	state.debrisMovementState = null;
	clearSpecialPhaseData();
};

/**
 * End current special attack and return to stats (debris handles own tile management)
 * @returns void
 */
const endSpecialAttack = (): void => {
	consumeSpecialAttackTrigger();
	resetDebrisState();
	state.combatState.subState = CombatSubStates.STATS;
};

/**
 * Check if debris special should end
 * @returns True if debris animation has ended and special should transition back to stats, false otherwise
 */
const shouldEndDebrisSpecial = (leviathan: net.runelite.api.NPC): boolean => {
	if (
		leviathan.getAnimation() !== DEBRIS_ANIMATION_ID &&
		leviathan.getAnimation() === -1
	) {
		logDebris('Debris animation ended.');
		return true;
	}
	return false;
};

/**
 * Initialize debris movement state
 * @param phaseData Special phase data containing safe tile information and direction
 * @returns void
 */
const initializeDebrisMovementState = (phaseData: SpecialPhaseData): void => {
	const playerLocRaw = client?.getLocalPlayer?.()?.getWorldLocation?.();
	let closestTileSet: 'a' | 'b' = 'a';

	if (playerLocRaw) {
		const playerLoc = getWorldPoint(playerLocRaw) ?? playerLocRaw;
		const px = playerLoc.getX();
		const py = playerLoc.getY();
		const ax = phaseData.safeTileA.getX();
		const ay = phaseData.safeTileA.getY();
		const bx = phaseData.safeTileB.getX();
		const by = phaseData.safeTileB.getY();

		// Calculate Manhattan distance to both tiles
		const distanceToA = Math.abs(px - ax) + Math.abs(py - ay);
		const distanceToB = Math.abs(px - bx) + Math.abs(py - by);

		// Choose closest tile
		closestTileSet = distanceToA <= distanceToB ? 'a' : 'b';

		logDebris(
			`Player at (${px}, ${py}). TileA (${ax}, ${ay}) dist=${distanceToA}, TileB (${bx}, ${by}) dist=${distanceToB}. Closest: ${closestTileSet.toUpperCase()}`,
		);
	}

	// If this direction had a previous debris special, use opposite tile (debris objects block original)
	const previousTileSet =
		lastDebrisTileSetByDirection[phaseData.currentDirection];
	const tileSet = previousTileSet
		? oppositeTileSet(previousTileSet)
		: closestTileSet;

	lastDebrisTileSetByDirection[phaseData.currentDirection] = tileSet;

	logDebris(
		`Debris start set ${tileSet.toUpperCase()} for ${phaseData.currentDirection}. Previous in-region set: ${previousTileSet ?? 'none'}.`,
	);

	state.debrisMovementState = {
		currentTileIndex: 0,
		ticksOnCurrentTile: 0,
		tilesCompleted: 0,
		currentTileSet: tileSet,
		animationStarted: false,
		animationStartTick: -1,
	};
};

/**
 * Get debris tiles for the current direction
 * @param phaseData Special phase data containing direction information
 * @returns Array of tile coordinates (x, y, plane) for the current direction
 */
const getDebrisTiles = (
	phaseData: SpecialPhaseData,
): { x: number; y: number; plane: number }[] => {
	const debrisTileSet = tileSets.safeTileSets.leviDebrisTiles as {
		[key: string]: {
			a: { x: number; y: number; plane: number }[];
			b: { x: number; y: number; plane: number }[];
		};
	};
	const directionTiles = debrisTileSet[phaseData.currentDirection];
	if (!directionTiles) return [];
	const tileSet = state.debrisMovementState?.currentTileSet ?? 'a';
	return directionTiles[tileSet];
};

/**
 * Handle all debris special stages: animation start, tile progression, and wave cleanup
 * @param debrisState Current debris movement state tracking
 * @param phaseData Special phase data with safe tiles and direction
 * @param isAnimationActive Whether the debris animation is currently playing
 * @param leviathan Leviathan NPC reference for animation checks
 * @returns True if debris special should end
 */
const handleDebrisMovement = (
	debrisState: NonNullable<typeof state.debrisMovementState>,
	phaseData: SpecialPhaseData,
	isAnimationActive: boolean,
	leviathan: net.runelite.api.NPC,
): boolean => {
	// Stage 1: Wait for animation to start
	if (!debrisState.animationStarted) {
		if (!isAnimationActive) return false;
		handleAnimationStart(debrisState, phaseData);
		return false;
	}

	// Stage 2: Handle tile progression (tiles 2-6)
	const debrisTiles = getDebrisTiles(phaseData);
	handleTileProgression(debrisState, debrisTiles, isAnimationActive);

	if (debrisState.tilesCompleted < 5) return false;

	// Stage 3: Wait for wave animation after reaching tile 6
	return handleWavePhase(leviathan);
};

/**
 * Handle animation start - move to tile 2 when debris animation begins
 * @param debrisState Current debris movement state to update
 * @param phaseData Special phase data with tile information
 */
const handleAnimationStart = (
	debrisState: NonNullable<typeof state.debrisMovementState>,
	phaseData: SpecialPhaseData,
): void => {
	debrisState.animationStarted = true;
	debrisState.animationStartTick = state.gameTick;
	const debrisTiles = getDebrisTiles(phaseData);
	moveToNextDebrisTile(debrisState, debrisTiles);
	logDebris('Debris animation started. Moving to tile 2.');
};

/**
 * Handle tile progression - move through tiles 2-6 every 2 ticks
 * @param debrisState Current debris movement state to update
 * @param debrisTiles Array of tile coordinates for current sequence
 * @param isAnimationActive Whether the debris animation is currently playing
 */
const handleTileProgression = (
	debrisState: NonNullable<typeof state.debrisMovementState>,
	debrisTiles: { x: number; y: number; plane: number }[],
	isAnimationActive: boolean,
): void => {
	if (shouldSuppressSpecialAttacks()) {
		logTile('Staging for pathfinder - skipping debris attacks.');
		return;
	}

	if (isAnimationActive) {
		debrisState.ticksOnCurrentTile += 1;
	}

	// Attack logic: tile 6 waits 2 ticks, others attack on tick 1
	if (isAnimationActive && debrisState.tilesCompleted > 0) {
		const isOnTile6 = debrisState.tilesCompleted === 5;
		const shouldAttack = isOnTile6
			? debrisState.ticksOnCurrentTile === 3
			: debrisState.ticksOnCurrentTile === 1;
		if (shouldAttack) attackLeviathanWithFallback();
	}

	// Move to next debris tile every 2 ticks until tile 6 is reached
	if (debrisState.ticksOnCurrentTile >= 2 && debrisState.tilesCompleted < 5) {
		moveToNextDebrisTile(debrisState, debrisTiles);
		return;
	}

	logTile(
		`Tile ${debrisState.tilesCompleted + 1}/6 (${debrisState.ticksOnCurrentTile}/2 ticks)`,
	);
};

const shouldSuppressSpecialAttacks = (): boolean => {
	if (state.pathfinderSpawnActive) return true;
	const healthPercent = getLeviathanHealthPercent();
	return (
		typeof healthPercent === 'number' &&
		healthPercent <= 25 &&
		healthPercent > 20
	);
};

/**
 * Move to next tile in debris sequence
 * @param debrisState Current debris movement state to update
 * @param debrisTiles Array of tile coordinates for current sequence
 */
const moveToNextDebrisTile = (
	debrisState: NonNullable<typeof state.debrisMovementState>,
	debrisTiles: { x: number; y: number; plane: number }[],
): void => {
	debrisState.currentTileIndex += 1;
	const nextTile = debrisTiles[debrisState.currentTileIndex];
	if (!nextTile) return;

	bot.walking.walkToTrueWorldPoint(nextTile.x, nextTile.y);
	debrisState.ticksOnCurrentTile = 0;
	debrisState.tilesCompleted += 1;
	logDebris(
		`Tile ${debrisState.currentTileSet.toUpperCase()}${debrisState.currentTileIndex + 1} (${debrisState.tilesCompleted}/5)`,
	);
};

/**
 * Handle wave phase - wait for wave animation to end
 * @param leviathan Leviathan NPC reference for animation checks
 * @returns True if wave animation is detected and special should end
 */
const handleWavePhase = (leviathan: net.runelite.api.NPC): boolean => {
	if (leviathan.getAnimation() === WAVE_ANIMATION_ID) {
		logDebris('Wave animation detected - ending special.');
		return true;
	}
	return false;
};
