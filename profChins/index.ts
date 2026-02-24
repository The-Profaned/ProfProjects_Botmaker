// Imports
import { logger } from '../imports/logger.js';
import { endScript, gameTick } from '../imports/general-function.js';
import { profChinsUI, initializeUI } from './ui.js';
import {
	utilFunctions,
	initializeUtilFunctions,
	utilState,
} from './util-functions.js';
import { state, MainStates } from './State Manager/script-state.js';
import { stateManager } from './State Manager/state-manager.js';

type StuckStateTracker = {
	currentState: MainStates | '';
	tickCount: number;
};

// Stuck state detection - track how long we've been in current state
const stuckStateTracker: StuckStateTracker = {
	currentState: '',
	tickCount: 0,
};
const MAX_TICKS_PER_STATE: number = 8;
const STUCK_DETECTION_EXCLUSIONS: Set<MainStates> = new Set([
	MainStates.INITIAL_TRAPS,
	MainStates.RESETTING_TRAPS,
]);
const XP_CHECK_INTERVAL: number = 3;
const TRAPS_COUNT_INTERVAL: number = 2;
const TRAP_CHECK_INTERVAL: number = 2;

//============================================================================================================================================================================================
// Script Specific Functions + variables
//============================================================================================================================================================================================

const getPlayerLocation = (): net.runelite.api.coords.WorldPoint => {
	const localPlayer: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!localPlayer) {
		log.printGameMessage(
			'ERROR: Could not get local player on startup. Script stopping.',
		);
		throw new Error('Local player is null at startup');
	}
	const playerLocation: net.runelite.api.coords.WorldPoint | null =
		localPlayer.getWorldLocation();
	if (!playerLocation) {
		log.printGameMessage(
			'ERROR: Could not get player world location on startup. Script stopping.',
		);
		throw new Error('Player world location is null at startup');
	}
	return playerLocation;
};

const getHunterLevel = (): number => {
	const hunterLevel: number = client.getRealSkillLevel(
		net.runelite.api.Skill.HUNTER,
	);
	if (hunterLevel < 0) {
		log.printGameMessage(
			'ERROR: Could not get valid hunter level. Script stopping.',
		);
		throw new Error('Hunter level is invalid at startup');
	}
	return hunterLevel;
};

// Safely get player location with fallback
const playerLocation: net.runelite.api.coords.WorldPoint = getPlayerLocation();

// Safely get hunter level with fallback
const hunterLevel: number = getHunterLevel();

// Initialize utility functions with player location FIRST (before calling getInitialTrapLocations)
initializeUtilFunctions(state, [], [], playerLocation, hunterLevel);

// NOW we can call getInitialTrapLocations() which depends on player_location being set
const initialTrapLocations: net.runelite.api.coords.WorldPoint[] =
	utilFunctions.getInitialTrapLocations();

// Initialize AGAIN with trap locations so getSafeTiles() can filter them out
initializeUtilFunctions(
	state,
	initialTrapLocations,
	[],
	playerLocation,
	hunterLevel,
);

// NOW get safe tiles (with trap locations populated)
const initialSafeTiles: net.runelite.api.coords.WorldPoint[] =
	utilFunctions.getSafeTiles();

// Final initialization with both trap locations and safe tiles
initializeUtilFunctions(
	state,
	initialTrapLocations,
	initialSafeTiles,
	playerLocation,
	hunterLevel,
);

const trapLocationsCache: net.runelite.api.coords.WorldPoint[] =
	initialTrapLocations;
const maxAllowedTraps: number = utilFunctions.maxTraps();
let cachedTrapsOnGround: number = 0;
let lastTrapsCountState: MainStates | '' = '';
let cachedCriticalTrapCheck: boolean = false;
let cachedNeedsAttentionCheck: boolean = false;

const countTrapsOnGround = (): number => {
	let trapsOnGround: number = 0;
	for (const loc of trapLocationsCache) {
		if (utilFunctions.isOccupiedByTrapOrGround(loc)) {
			trapsOnGround++;
		}
	}
	return trapsOnGround;
};

cachedTrapsOnGround = countTrapsOnGround();

const getTrapsOnGround = (): number => {
	const shouldTrackTraps: boolean =
		state.mainState === MainStates.INITIAL_TRAPS ||
		state.mainState === MainStates.AWAITING_ACTIVITY ||
		state.mainState === MainStates.RESETTING_TRAPS;
	if (!shouldTrackTraps) {
		lastTrapsCountState = state.mainState;
		return cachedTrapsOnGround;
	}
	const shouldRefresh: boolean =
		state.gameTick % TRAPS_COUNT_INTERVAL === 0 ||
		state.mainState !== lastTrapsCountState;
	if (shouldRefresh) {
		cachedTrapsOnGround = countTrapsOnGround();
		lastTrapsCountState = state.mainState;
	}
	return cachedTrapsOnGround;
};
//============================================================================================================================================================================================
// Script Event Handlers
//============================================================================================================================================================================================

// On Start of Script
export function onStart(): void {
	try {
		state.uiCompleted = true; // Mark UI as completed before starting overlays

		try {
			initializeUI(
				state,
				trapLocationsCache,
				() => cachedTrapsOnGround,
				() => maxAllowedTraps,
				() => utilState.isPlayerMoving,
			);
		} catch {
			log.printGameMessage('Error in initializeUI.');
		}

		try {
			profChinsUI.disableBotMakerOverlay();
		} catch {
			log.printGameMessage('Error in disableBotMakerOverlay.');
		}

		try {
			profChinsUI.start();
		} catch {
			log.printGameMessage('Error in profChinsUI.start.');
		}

		try {
			const hunterXp: number = client.getSkillExperience(
				net.runelite.api.Skill.HUNTER,
			);
			profChinsUI.lastHunterXp = hunterXp;
		} catch {
			log.printGameMessage('Error getting hunter XP.');
		}

		logger(state, 'all', 'script', String(state.scriptName) + ' started.');
	} catch {
		try {
			logger(state, 'all', 'Script', 'Unhandled error in onStart.');
		} catch {
			log.printGameMessage('Critical error in onStart.');
		}
		bot.terminate();
	}
}

// On Game Tick
export function onGameTick(): void {
	bot.breakHandler.setBreakHandlerStatus(false);
	try {
		if (state.uiCompleted) {
			if (!state.scriptInitialized) notifyScriptInitialized();
			state.scriptInitialized = true;
		} else {
			return;
		}
		if (!gameTick(state)) return;

		// Track player movement
		const isWebWalking: boolean = bot.walking.isWebWalking();
		utilState.isPlayerMoving = isWebWalking;
		const trapsOnGround: number = getTrapsOnGround();
		const isBanking: boolean = bot.bank.isBanking();
		const isIdle: boolean = bot.localPlayerIdle();
		// CRITICAL: Maintain timestamps for all shaking/failed traps EVERY TICK
		// This ensures no trap ever loses its timestamp, matching AutoChin's approach
		if (trapsOnGround > 0) {
			utilFunctions.maintainAllTrapTimestamps();
		}
		// Check for hunter XP gains (chins caught)
		const shouldCheckXp: boolean =
			profChinsUI.currentAction === 'Maintaining traps' ||
			profChinsUI.currentAction === 'Awaiting trap activity';
		if (
			shouldCheckXp &&
			!isWebWalking &&
			state.gameTick % XP_CHECK_INTERVAL === 0
		) {
			const currentHunterXp: number = client.getSkillExperience(
				net.runelite.api.Skill.HUNTER,
			);
			if (currentHunterXp > profChinsUI.lastHunterXp) {
				profChinsUI.totalChinsCaught++;
				logger(
					state,
					'debug',
					'onGameTick',
					`Hunter XP gained. Total chins caught: ${profChinsUI.totalChinsCaught}`,
				);
				profChinsUI.lastHunterXp = currentHunterXp;
			}
		}

		// Enable break handler only when not banking, idle, not webwalking, and in main state
		if (
			!isBanking &&
			isIdle &&
			!isWebWalking &&
			state.mainState === MainStates.START_STATE
		) {
			bot.breakHandler.setBreakHandlerStatus(true);
		}

		// Stuck state detection - prevent infinite loops in any state (except long-running ones)
		// Don't timeout initial_traps or resetting_traps as they naturally take longer
		if (STUCK_DETECTION_EXCLUSIONS.has(state.mainState)) {
			// Long-running state, reset tracker
			stuckStateTracker.currentState = state.mainState;
			stuckStateTracker.tickCount = 0;
		} else {
			if (stuckStateTracker.currentState === state.mainState) {
				stuckStateTracker.tickCount++;
				if (stuckStateTracker.tickCount > MAX_TICKS_PER_STATE) {
					logger(
						state,
						'debug',
						'stuckStateDetection',
						`Stuck in ${state.mainState} for ${stuckStateTracker.tickCount} ticks. Resetting to maintaining_traps.`,
					);
					// Reset to maintaining_traps state to recover
					state.mainState = MainStates.MAINTAINING_TRAPS;
					stuckStateTracker.currentState = '';
					stuckStateTracker.tickCount = 0;
				}
			} else {
				// State changed, reset tracker
				stuckStateTracker.currentState = state.mainState;
				stuckStateTracker.tickCount = 0;
			}
		}

		const shouldCheckTraps: boolean =
			state.gameTick % TRAP_CHECK_INTERVAL === 0;
		if (shouldCheckTraps && trapsOnGround > 0) {
			cachedCriticalTrapCheck = utilFunctions.criticalTrapChecker();
		} else if (shouldCheckTraps) {
			cachedCriticalTrapCheck = false;
		}
		if (shouldCheckTraps) {
			cachedNeedsAttentionCheck =
				utilFunctions.hasTrapsNeedingAttention();
		}

		stateManager(
			trapsOnGround,
			cachedCriticalTrapCheck,
			cachedNeedsAttentionCheck,
			maxAllowedTraps,
		);
	} catch {
		logger(state, 'all', 'Script', 'Unhandled error in onGameTick.');
		bot.terminate();
	}
}

// Script Initialized Notification
function notifyScriptInitialized(): void {
	log.printGameMessage('Script initialized.');
}

// On End of Script
export function onEnd(): void {
	profChinsUI.stop();
	profChinsUI.enableBotMakerOverlay();
	endScript(state);
}
