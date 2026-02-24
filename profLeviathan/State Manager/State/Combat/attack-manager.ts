import {
	attackTargetNpc,
	castSpellOnNpc,
} from '../../../../imports/player-functions.js';
import { CombatSubStates, state } from '../../script-state.js';
import { logger } from '../../../../imports/logger.js';
import {
	canAttack,
	LEVIATHAN_FALLBACK_ID,
	LEVIATHAN_PRIMARY_ID,
	updateLastAttackTick,
	returnToAttackState,
} from './combat-tracker.js';
import {
	consumeSpecialAttackTrigger,
	resetRoarCounter,
} from './projectile-manager.js';
import {
	resetSpecialAttackPhaseState,
	startSpecialAttackPhase,
} from './movement-manager.js';
import { dangerousObjectIds } from '../../../../imports/object-ids.js';
import { getWorldPoint } from '../../../../imports/location-functions.js';

// ============ Logging Toggles ============
const ENABLE_ATTACK_LOGGING = true;
const ENABLE_COMBAT_LOGGING = true;
const ENABLE_CHECKOBJECTS_LOGGING = true;
const ENABLE_DETERMINE_SPECIAL_LOGGING = true;

const logAttack = (message: string) =>
	ENABLE_ATTACK_LOGGING && logger(state, 'debug', 'attackManager', message);
const logCombat = (message: string) =>
	ENABLE_COMBAT_LOGGING && logger(state, 'debug', 'Combat', message);
const logCheckObjects = (functionName: string, message: string) =>
	ENABLE_CHECKOBJECTS_LOGGING &&
	logger(state, 'debug', functionName, message);
const logDetermineSpecial = (message: string) =>
	ENABLE_DETERMINE_SPECIAL_LOGGING &&
	logger(state, 'debug', 'determineSpecialAttackType', message);

// ============ Manager Function ============
/**
 * Attack Manager - handles standard attacks and special attack detection
 * Monitors projectile intake for special attack triggers, casts shadow spells during specials
 * Alternates between normal attacks and special attack phases based on phase data
 */
export function attackManager(): void {
	if (state.pathfinderSpawnActive) {
		if (state.waitingForSpellCastConfirmation) {
			state.waitingForSpellCastConfirmation = false;
			pendingConfirmedSpecialType = null;
			spellConfirmationStartedTick = -1;
			resetSpecialAttackPhaseState();
		}

		if (consumeSpecialAttackTrigger()) {
			logAttack(
				'Special trigger ignored during pathfinder staging (no shadow stun).',
			);
		}
	}

	if (state.godMode && state.waitingForSpellCastConfirmation) {
		state.waitingForSpellCastConfirmation = false;
		pendingConfirmedSpecialType = null;
		spellConfirmationStartedTick = -1;
		spellConfirmationRetryCount = 0;
		resetSpecialAttackPhaseState();
		returnToAttackState();
	}

	// Check if we're waiting for spell cast confirmation
	if (state.waitingForSpellCastConfirmation) {
		const magicXpGained =
			getPlayerMagicExperience() > state.magicXpAtSpellCast;
		const shadowAnimationActive = isShadowSpellAnimationActive();
		if (magicXpGained || shadowAnimationActive) {
			logAttack(
				magicXpGained
					? 'Spell cast confirmed via magic experience gain. Moving to movement phase.'
					: 'Spell cast confirmed via shadow spell animation. Moving to movement phase.',
			);
			state.waitingForSpellCastConfirmation = false;
			spellConfirmationRetryCount = 0;
			resetRoarCounter();
			if (pendingConfirmedSpecialType) {
				startSpecialAttackPhase(pendingConfirmedSpecialType);
			}
			pendingConfirmedSpecialType = null;
			spellConfirmationStartedTick = -1;
			state.combatState.subState = CombatSubStates.MOVEMENT;
			return;
		}

		const ticksWaiting =
			spellConfirmationStartedTick >= 0
				? state.gameTick - spellConfirmationStartedTick
				: 0;
		if (ticksWaiting >= SPELL_CONFIRM_TIMEOUT_TICKS) {
			const retried = retryShadowSpellCast();
			if (retried) {
				return;
			}
			logAttack(
				`Spell confirmation timed out after ${ticksWaiting} tick(s). Retries exhausted; resetting to recover safely.`,
			);
			state.waitingForSpellCastConfirmation = false;
			pendingConfirmedSpecialType = null;
			spellConfirmationStartedTick = -1;
			spellConfirmationRetryCount = 0;
			resetSpecialAttackPhaseState();
			returnToAttackState();
			return;
		}

		return; // Still waiting for spell confirmation
	}

	const shouldTriggerSpecial: boolean = consumeSpecialAttackTrigger();
	if (shouldTriggerSpecial) {
		if (state.godMode) {
			logAttack(
				'God Mode enabled: special trigger ignored (no shadow spell cast).',
			);
			resetSpecialAttackPhaseState();
			returnToAttackState();
		} else if (state.pathfinderSpawnActive) {
			logAttack(
				'Special trigger suppressed during pathfinder staging (no shadow stun).',
			);
			return;
		} else {
			const specialType = determineSpecialAttackType();
			const spellCast = castSpellOnNpc(
				state,
				['SHADOW_RUSH', 'SHADOW_BURST', 'SHADOW_BLITZ', 'SHADOW_BARRAGE'],
				[LEVIATHAN_PRIMARY_ID, LEVIATHAN_FALLBACK_ID],
			);

			if (!spellCast) {
				logAttack(
					'Failed to cast shadow spell - aborting special attack sequence',
				);
				resetSpecialAttackPhaseState();
				returnToAttackState();
				return;
			}

			state.magicXpAtSpellCast = getPlayerMagicExperience();
			state.waitingForSpellCastConfirmation = true;
			spellConfirmationRetryCount = 0;
			pendingConfirmedSpecialType = specialType;
			spellConfirmationStartedTick = state.gameTick;
			logAttack(
				`Special attack detected: ${specialType}. Spell cast initiated, waiting for magic experience confirmation before movement.`,
			);
			return;
		}
	}

	if (canAttack()) {
		attackLeviathanWithFallback();
		updateLastAttackTick();
		if (state.lastLoggedSource !== 'Combat') {
			logCombat(
				`Attacking Leviathan (primary: ${LEVIATHAN_PRIMARY_ID}, fallback: ${LEVIATHAN_FALLBACK_ID})`,
			);
		}
	}
	state.combatState.subState = CombatSubStates.STATS;
}

// ============ Helper Functions ============
/**
 * Check if there's an object in a specific boundary region for special attack detection
 * @param type Boundary type: 'north' for debris (2078-2084, 6377-6381), 'east' for lightning (2086-2091, 6369-6375)
 * @returns True if boulders are found in the specified boundary
 */
const attackLeviathanWithFallback = (): boolean => {
	if (attackTargetNpc(state, LEVIATHAN_PRIMARY_ID)) return true;
	return attackTargetNpc(state, LEVIATHAN_FALLBACK_ID);
};

const oppositeSpecialType = (
	type: 'lightning' | 'debris',
): 'lightning' | 'debris' => (type === 'debris' ? 'lightning' : 'debris');

const SPELL_CONFIRM_TIMEOUT_TICKS = 6;
const SHADOW_SPELL_ANIMATION_IDS: Set<number> = new Set([10091, 10092]);
let spellConfirmationStartedTick = -1;
let pendingConfirmedSpecialType: 'lightning' | 'debris' | null = null;
let spellConfirmationRetryCount = 0;
const MAX_SPELL_CONFIRM_RETRIES = 2;

const isShadowSpellAnimationActive = (): boolean => {
	const player = client?.getLocalPlayer?.();
	const animationId = player?.getAnimation?.();
	return (
		typeof animationId === 'number' &&
		SHADOW_SPELL_ANIMATION_IDS.has(animationId)
	);
};

const retryShadowSpellCast = (): boolean => {
	if (spellConfirmationRetryCount >= MAX_SPELL_CONFIRM_RETRIES) {
		return false;
	}

	const spellCast = castSpellOnNpc(
		state,
		['SHADOW_RUSH', 'SHADOW_BURST', 'SHADOW_BLITZ', 'SHADOW_BARRAGE'],
		[LEVIATHAN_PRIMARY_ID, LEVIATHAN_FALLBACK_ID],
	);

	if (!spellCast) {
		return false;
	}

	spellConfirmationRetryCount += 1;
	spellConfirmationStartedTick = state.gameTick;
	state.magicXpAtSpellCast = getPlayerMagicExperience();
	logAttack(
		`Retrying shadow spell cast (${spellConfirmationRetryCount}/${MAX_SPELL_CONFIRM_RETRIES}).`,
	);
	return true;
};

const checkObjectsInBoundary = (type: 'north' | 'east'): boolean => {
	const boulders = bot.objects.getTileObjectsWithIds(
		dangerousObjectIds.leviBoulder,
	);
	if (!boulders || boulders.length === 0) {
		logCheckObjects(
			`checkObjectsOn${type.charAt(0).toUpperCase() + type.slice(1)}SideTiles`,
			'No boulders found',
		);
		return false;
	}

	const bounds =
		type === 'north'
			? { minX: 2079, maxX: 2086, minY: 6378, maxY: 6381 }
			: { minX: 2086, maxX: 2091, minY: 6369, maxY: 6375 };

	for (const boulder of boulders) {
		if (!boulder) continue;
		const locRaw = boulder.getWorldLocation();
		if (!locRaw) continue;

		const loc = getWorldPoint(locRaw) ?? locRaw;
		const x = loc.getX();
		const y = loc.getY();

		logCheckObjects(
			`checkObjectsOn${type.charAt(0).toUpperCase() + type.slice(1)}SideTiles`,
			`Checking boulder at true world (${x}, ${y})`,
		);

		if (
			x >= bounds.minX &&
			x <= bounds.maxX &&
			y >= bounds.minY &&
			y <= bounds.maxY
		) {
			logCheckObjects(
				`checkObjectsOn${type.charAt(0).toUpperCase() + type.slice(1)}SideTiles`,
				`Found boulder in ${type} boundary at (${x}, ${y})`,
			);
			return true;
		}
	}
	return false;
};

/**
 * Determine special attack type based on object positions or rotation pattern
 * First special detects from boulder positions, subsequent specials alternate based on count
 * @returns Special attack type: either 'lightning' or 'debris'
 */
const determineSpecialAttackType = (): 'lightning' | 'debris' => {
	let specialType: 'lightning' | 'debris';

	if (state.specialAttackCount === 0) {
		const preDetectedType = state.lastSpecialType;
		if (preDetectedType) {
			specialType = preDetectedType;
			state.firstSpecialDetected = true;
			logDetermineSpecial(`First special (pre-detected): ${specialType}`);
		} else {
			const hasNorthObjects = checkObjectsInBoundary('north');
			const hasEastObjects = checkObjectsInBoundary('east');

			if (hasNorthObjects) {
				specialType = 'debris';
			} else if (hasEastObjects) {
				specialType = 'lightning';
			} else {
				specialType = 'debris';
			}

			state.lastSpecialType = specialType;
			state.firstSpecialDetected = true;
			logDetermineSpecial(
				`First special detected (fallback search): ${specialType}`,
			);
		}

		state.specialAttackCount += 1;
		return specialType;
	}

	const lastType = state.lastSpecialType ?? 'debris';
	specialType = oppositeSpecialType(lastType);
	logDetermineSpecial(
		`Special #${state.specialAttackCount + 1} (alternating): ${specialType} [last=${lastType}]`,
	);

	state.lastSpecialType = specialType;
	state.specialAttackCount += 1;
	return specialType;
};

/**
 * Get the player's current magic experience
 * @returns Player's magic skill experience value
 */
const getPlayerMagicExperience = (): number => {
	try {
		return client.getSkillExperience(net.runelite.api.Skill.MAGIC);
	} catch {
		return 0;
	}
};
