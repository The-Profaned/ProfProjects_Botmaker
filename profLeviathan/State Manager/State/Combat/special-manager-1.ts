import { CombatSubStates, state } from '../../script-state.js';
import { logger } from '../../../../imports/logger.js';
import {
	attackTargetNpc,
	runBetweenTiles,
	avoidDangerousTiles,
} from '../../../../imports/player-functions.js';
import { getWorldPoint } from '../../../../imports/location-functions.js';
import {
	getLeviathanHealthPercent,
	LEVIATHAN_FALLBACK_ID,
	LEVIATHAN_PRIMARY_ID,
} from './combat-tracker.js';
import {
	clearSpecialPhaseData,
	getSpecialPhaseData,
	SpecialPhaseData,
} from './movement-manager.js';
import { consumeSpecialAttackTrigger } from './projectile-manager.js';

// ============ Logging Toggles ============
const ENABLE_LIGHTNING_LOGGING = true;
const ENABLE_LIGHTNING_DETECTION_LOGGING = false; // Noisy - disable by default
const ENABLE_LIGHTNING_DODGE_LOGGING = true;

const logLightning = (message: string) =>
	ENABLE_LIGHTNING_LOGGING &&
	logger(state, 'debug', 'specialManager1', message);
const logDetection = (message: string) =>
	ENABLE_LIGHTNING_DETECTION_LOGGING &&
	logger(state, 'debug', 'detectLightningAttack', message);
const logDodge = (message: string) =>
	ENABLE_LIGHTNING_DODGE_LOGGING &&
	logger(state, 'debug', 'handleLightningDodge', message);

const attackLeviathanWithFallback = (): boolean => {
	if (attackTargetNpc(state, LEVIATHAN_PRIMARY_ID)) return true;
	return attackTargetNpc(state, LEVIATHAN_FALLBACK_ID);
};

// ============ State Variables ============
let startAnimationMoveInitiated: boolean = false;
let lastAttackedSafeTile: { x: number; y: number } | null = null;
let lastMovedFromTile: { x: number; y: number } | null = null;

// ============ Constants ============
const LEVIATHAN_LIGHTNING_ATTACK: number = 2503;
const LIGHTNING_SPECIAL_START_ANIMATION_ID: number = 10285;
const LIGHTNING_ANIMATION_ID: number = 10286;
const LIGHTNING_DODGE_DISTANCE: number = 2;

// ============ Manager Function ============
/**
 * Special Manager 1 - handles the lightning special attack phase
 * Detects lightning attack via graphics object, moves player to safe tiles, and handles attack timing
 * Uses animation changes to detect start and end of special attack phase
 */
export function specialManager1(): void {
	const leviathan = getLeviathanNpc();
	if (!leviathan) {
		resetLightningState();
		state.combatState.subState = CombatSubStates.ATTACK;
		return;
	}

	const phaseData = getSpecialPhaseData();
	if (!phaseData) {
		startAnimationMoveInitiated = false;
		state.combatState.subState = CombatSubStates.MOVEMENT;
		return;
	}

	const isStartAnimationActive =
		leviathan.getAnimation() === LIGHTNING_SPECIAL_START_ANIMATION_ID;
	const isLightningAnimationActive =
		leviathan.getAnimation() === LIGHTNING_ANIMATION_ID;

	if (shouldAttackDuringLightning(phaseData)) {
		attackLeviathanWithFallback();
	}

	if (shouldEndLightningSpecial(leviathan)) {
		endSpecialAttack();
		return;
	}

	if (handleLightningAnimationStartMove(phaseData, isStartAnimationActive)) {
		return;
	}

	handleLightningDodge(phaseData, isLightningAnimationActive);
}

// ============ Helper Functions ============
/**
 * Reset all lightning attack state
 * @returns void
 */
const resetLightningState = (): void => {
	startAnimationMoveInitiated = false;
	lastAttackedSafeTile = null;
	lastMovedFromTile = null;
	clearSpecialPhaseData();
};

/**
 * Get Leviathan NPC if alive
 * @returns Leviathan NPC if found and alive, undefined otherwise
 */
const getLeviathanNpc = (): net.runelite.api.NPC | undefined => {
	const leviathans = bot.npcs
		.getWithIds([LEVIATHAN_PRIMARY_ID, LEVIATHAN_FALLBACK_ID])
		.filter(
			(npc: net.runelite.api.NPC) => (npc.getHealthRatio?.() ?? 0) > 0,
		);
	const primary = leviathans.find(
		(npc: net.runelite.api.NPC) => npc.getId?.() === LEVIATHAN_PRIMARY_ID,
	);
	if (primary) return primary;
	const fallback = leviathans.find(
		(npc: net.runelite.api.NPC) => npc.getId?.() === LEVIATHAN_FALLBACK_ID,
	);
	return fallback ?? leviathans[0] ?? undefined;
};

/**
 * End current special attack and return to stats
 * @returns void
 */
const endSpecialAttack = (): void => {
	resetLightningState();
	consumeSpecialAttackTrigger();
	avoidDangerousTiles(state, {
		searchRadius: 5,
		preferredBossDistance: 8,
		fallbackBossDistance: 7,
	});
	logLightning(
		'Special attack complete. Moved to safe tile and returning to STATS',
	);
	state.combatState.subState = CombatSubStates.STATS;
};

/**
 * On lightning START animation (10285), immediately move to first safe tile
 * @param phaseData Special phase data containing safe tile information
 * @param isStartAnimationActive Whether the lightning start animation is currently active
 * @returns True if movement was handled, false otherwise
 */
const handleLightningAnimationStartMove = (
	phaseData: SpecialPhaseData,
	isStartAnimationActive: boolean,
): boolean => {
	if (!isStartAnimationActive || startAnimationMoveInitiated) return false;

	const playerLocRaw = client?.getLocalPlayer?.()?.getWorldLocation?.();
	if (!playerLocRaw) return false;

	const playerLoc = getWorldPoint(playerLocRaw) ?? playerLocRaw;
	const playerX = playerLoc.getX();
	const playerY = playerLoc.getY();
	const safeAx = phaseData.safeTileA.getX();
	const safeAy = phaseData.safeTileA.getY();

	const targetTile =
		playerX === safeAx && playerY === safeAy
			? phaseData.safeTileB
			: phaseData.safeTileA;
	bot.walking.walkToTrueWorldPoint(targetTile.getX(), targetTile.getY());
	logLightning(
		`START animation detected. Moving to first safe tile at (${targetTile.getX()}, ${targetTile.getY()}).`,
	);

	startAnimationMoveInitiated = true;

	return true;
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
 * Check if lightning special should end
 * @param leviathan Leviathan NPC to check animation state
 * @returns True if lightning animation has ended
 */
const shouldEndLightningSpecial = (
	leviathan: net.runelite.api.NPC,
): boolean => {
	if (leviathan.getAnimation() === -1) {
		logLightning('Lightning animation ended.');
		return true;
	}
	return false;
};

/**
 * Check if player should attack during lightning phase
 * @param phaseData Special phase data with safe tile information
 * @returns True if player is on a safe tile and can attack
 */
const shouldAttackDuringLightning = (phaseData: SpecialPhaseData): boolean => {
	if (shouldSuppressSpecialAttacks()) return false;
	const playerLocRaw = client?.getLocalPlayer?.()?.getWorldLocation?.();
	if (!playerLocRaw) return false;

	const playerLoc = getWorldPoint(playerLocRaw) ?? playerLocRaw;
	const playerX = playerLoc.getX();
	const playerY = playerLoc.getY();
	const isOnSafeTileA =
		playerX === phaseData.safeTileA.getX() &&
		playerY === phaseData.safeTileA.getY();
	const isOnSafeTileB =
		playerX === phaseData.safeTileB.getX() &&
		playerY === phaseData.safeTileB.getY();

	if (!isOnSafeTileA && !isOnSafeTileB) return false;

	const currentTile = { x: playerX, y: playerY };
	const isNewTile =
		!lastAttackedSafeTile ||
		lastAttackedSafeTile.x !== currentTile.x ||
		lastAttackedSafeTile.y !== currentTile.y;

	if (isNewTile) {
		lastAttackedSafeTile = currentTile;
		logLightning(
			`On safe tile (${isOnSafeTileA ? 'A' : 'B'}) at (${playerX}, ${playerY}) - ATTACKING`,
		);
		return true;
	}

	return false;
};

/**
 * Detect if lightning attack is nearby
 * @param playerLoc Current player location to check distance from lightning
 * @returns True if lightning is detected within dodge distance
 */
const detectLightningAttack = (
	playerLoc: net.runelite.api.coords.WorldPoint,
): boolean => {
	const lightningGraphics = bot.graphicsObjects.getWithIds([
		LEVIATHAN_LIGHTNING_ATTACK,
	]);
	if (!lightningGraphics || lightningGraphics.length === 0) return false;

	let closestDistance = Number.POSITIVE_INFINITY;
	let closestLightningLoc: net.runelite.api.coords.WorldPoint | null = null;

	for (const lightningObject of lightningGraphics) {
		if (!lightningObject) continue;
		const lightningLoc = lightningObject.getLocation();
		if (!lightningLoc) continue;

		const lightningWorldPoint =
			net.runelite.api.coords.WorldPoint.fromLocalInstance(
				client,
				lightningLoc,
			);
		if (!lightningWorldPoint) continue;

		const distance = Math.max(
			Math.abs(lightningWorldPoint.getX() - playerLoc.getX()),
			Math.abs(lightningWorldPoint.getY() - playerLoc.getY()),
		);

		if (distance < closestDistance) {
			closestDistance = distance;
			closestLightningLoc = lightningWorldPoint;
		}
	}

	const isNearby = closestDistance <= LIGHTNING_DODGE_DISTANCE;
	logDetection(
		`Closest lightning ${closestDistance} tiles away at (${closestLightningLoc?.getX()}, ${closestLightningLoc?.getY()}) - ${isNearby ? 'DODGING NOW' : 'safe for now'}`,
	);
	return isNearby;
};

/**
 * Handle lightning dodge by running between safe tiles
 * @param phaseData Special phase data containing safe tile locations
 * @param isLightningAnimationActive Whether the lightning animation is currently active
 */
const handleLightningDodge = (
	phaseData: SpecialPhaseData,
	isLightningAnimationActive: boolean,
): void => {
	const playerLocRaw = client?.getLocalPlayer?.()?.getWorldLocation?.();
	if (!playerLocRaw) return;

	const playerLoc = getWorldPoint(playerLocRaw) ?? playerLocRaw;
	const playerX = playerLoc.getX();
	const playerY = playerLoc.getY();
	const isOnSafeTileA =
		playerX === phaseData.safeTileA.getX() &&
		playerY === phaseData.safeTileA.getY();
	const isOnSafeTileB =
		playerX === phaseData.safeTileB.getX() &&
		playerY === phaseData.safeTileB.getY();

	if (!isOnSafeTileA && !isOnSafeTileB) return;

	const currentTile = { x: playerX, y: playerY };
	const hasMoveFromTile =
		lastMovedFromTile &&
		lastMovedFromTile.x === currentTile.x &&
		lastMovedFromTile.y === currentTile.y;
	const isLightningNearby = detectLightningAttack(playerLoc);

	if (isLightningNearby && !hasMoveFromTile && isLightningAnimationActive) {
		lastMovedFromTile = currentTile;
		runBetweenTiles(
			state,
			{ x: phaseData.safeTileA.getX(), y: phaseData.safeTileA.getY() },
			{ x: phaseData.safeTileB.getX(), y: phaseData.safeTileB.getY() },
		);
		logDodge(
			`Moving from tile (${playerX}, ${playerY}) to opposite safe tile (lightning detected)`,
		);
	}
};
