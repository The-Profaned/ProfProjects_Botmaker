// Imports
import { logger } from '../imports/logger.js';
import { generalFunctions } from '../imports/general-function.js';
import { Item } from '../imports/item-ids.js';
import { profChinsUI, initializeUI } from './ui.js';
import {
	utilFunctions,
	initializeUtilFunctions,
	utilState,
} from './util-functions.js';

// variables for script state
const state = {
	debugEnabled: true,
	debugFullState: false,
	failureCounts: {},
	failureOrigin: '',
	lastFailureKey: '',
	mainState: 'start_state',
	scriptInitialized: false,
	scriptName: 'profChins',
	uiCompleted: false,
	timeout: 0,
	gameTick: 0,
	subState: '',
};

// Debug throttling - track last logged state to avoid spam
let lastLoggedState = '';

// Stuck state detection - track how long we've been in current state
const stuckStateTracker = {
	currentState: '',
	tickCount: 0,
};
const MAX_TICKS_PER_STATE = 8;

//============================================================================================================================================================================================
// Script Specific Functions + variables
//============================================================================================================================================================================================

// Safely get player location with fallback
let player_location;
try {
	const localPlayer = client.getLocalPlayer();
	if (!localPlayer) {
		bot.printGameMessage(
			'ERROR: Could not get local player on startup. Script stopping.',
		);
		throw new Error('Local player is null at startup');
	}
	player_location = localPlayer.getWorldLocation();
	if (!player_location) {
		bot.printGameMessage(
			'ERROR: Could not get player world location on startup. Script stopping.',
		);
		throw new Error('Player world location is null at startup');
	}
} catch (error) {
	bot.printGameMessage(
		`FATAL: Player initialization failed: ${String(error)}`,
	);
	throw error;
}

// Safely get hunter level with fallback
let hunterLvl;
try {
	hunterLvl = client.getRealSkillLevel(net.runelite.api.Skill.HUNTER);
	if (hunterLvl === undefined || hunterLvl === null || hunterLvl < 0) {
		bot.printGameMessage(
			'ERROR: Could not get valid hunter level. Script stopping.',
		);
		throw new Error('Hunter level is invalid at startup');
	}
} catch (error) {
	bot.printGameMessage(
		`FATAL: Hunter level initialization failed: ${String(error)}`,
	);
	throw error;
}

// Initialize utility functions with player location FIRST (before calling getInitialTrapLocations)
initializeUtilFunctions(state, [], [], player_location, hunterLvl);

// NOW we can call getInitialTrapLocations() which depends on player_location being set
const initialTrapLocations = utilFunctions.getInitialTrapLocations();

// Initialize AGAIN with trap locations so getSafeTiles() can filter them out
initializeUtilFunctions(
	state,
	initialTrapLocations,
	[],
	player_location,
	hunterLvl,
);

// NOW get safe tiles (with trap locations populated)
const initialSafeTiles = utilFunctions.getSafeTiles();

// Final initialization with both trap locations and safe tiles
initializeUtilFunctions(
	state,
	initialTrapLocations,
	initialSafeTiles,
	player_location,
	hunterLvl,
);

const trapLocationsCache = initialTrapLocations;

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
				utilFunctions.isOccupiedByTrapOrGround,
				utilFunctions.maxTraps,
			);
		} catch (error) {
			bot.printGameMessage(`Error in initializeUI: ${String(error)}`);
		}

		try {
			profChinsUI.disableBotMakerOverlay();
		} catch (error) {
			bot.printGameMessage(
				`Error in disableBotMakerOverlay: ${String(error)}`,
			);
		}

		try {
			profChinsUI.start();
		} catch (error) {
			bot.printGameMessage(
				`Error in profChinsUI.start: ${String(error)}`,
			);
		}

		try {
			const hunterXp = client.getSkillExperience(
				net.runelite.api.Skill.HUNTER,
			);
			profChinsUI.lastHunterXp = hunterXp;
		} catch (error) {
			bot.printGameMessage(`Error getting hunter XP: ${String(error)}`);
		}

		logger(state, 'all', 'script', String(state.scriptName) + ' started.');
	} catch (error) {
		try {
			logger(state, 'all', 'Script', String(error));
		} catch {
			bot.printGameMessage(`Critical error: ${String(error)}`);
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
		if (!generalFunctions.gameTick(state)) return;

		// Track player movement
		utilState.isPlayerMoving = bot.walking.isWebWalking();
		// CRITICAL: Maintain timestamps for all shaking/failed traps EVERY TICK
		// This ensures no trap ever loses its timestamp, matching AutoChin's approach
		utilFunctions.maintainAllTrapTimestamps();
		// Check for hunter XP gains (chins caught)
		const currentHunterXp = client.getSkillExperience(
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

		// Enable break handler only when not banking, idle, not webwalking, and in main state
		if (
			!bot.bank.isBanking() &&
			bot.localPlayerIdle() &&
			!bot.walking.isWebWalking() &&
			state.mainState == 'start_state'
		)
			bot.breakHandler.setBreakHandlerStatus(true);

		// Stuck state detection - prevent infinite loops in any state (except long-running ones)
		// Don't timeout initial_traps or resetting_traps as they naturally take longer
		const excludeFromStuckDetection = ['initial_traps', 'resetting_traps'];
		if (excludeFromStuckDetection.includes(state.mainState)) {
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
					state.mainState = 'maintaining_traps';
					stuckStateTracker.currentState = '';
					stuckStateTracker.tickCount = 0;
				}
			} else {
				// State changed, reset tracker
				stuckStateTracker.currentState = state.mainState;
				stuckStateTracker.tickCount = 0;
			}
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
export function onEnd(): void {
	profChinsUI.stop();
	profChinsUI.enableBotMakerOverlay();
	generalFunctions.endScript(state);
}

// Script Decision Manager
function stateManager(): void {
	try {
		// Only log state changes, not every tick
		if (state.mainState !== lastLoggedState) {
			logger(
				state,
				'debug',
				'stateManager',
				`State changed to: ${state.mainState}`,
			);
			lastLoggedState = state.mainState;
		}

		// Calculate dynamic values each call (but use cached locations)
		const maxAllowed = utilFunctions.maxTraps();
		let trapsOnGround = 0;
		for (const loc of trapLocationsCache) {
			if (!loc) continue;
			if (utilFunctions.isOccupiedByTrapOrGround(loc)) {
				trapsOnGround++;
			}
		}

		switch (state.mainState) {
			// Initial State - Check inventory for traps
			case 'start_state': {
				try {
					profChinsUI.currentAction = 'Starting...';
					const trapCount = bot.inventory.getQuantityOfId(
						Item.boxTrap,
					);
					if (!trapCount && trapCount !== 0) {
						bot.printGameMessage(
							'ERROR: Could not get trap quantity from inventory',
						);
						bot.terminate();
						return;
					}
					if (trapCount >= maxAllowed) {
						state.mainState = 'initial_traps';
					} else {
						profChinsUI.currentAction = 'Error: Not enough traps';
						logger(
							state,
							'debug',
							'stateManager',
							`Not enough box traps (have ${trapCount}, need ${maxAllowed})`,
						);
						bot.terminate();
					}
				} catch (error) {
					bot.printGameMessage(
						`ERROR in start_state: ${String(error)}`,
					);
					bot.terminate();
				}
				break;
			}
			// Laying initial traps - place traps until max reached
			case 'initial_traps': {
				const action = 'Laying initial traps';
				if (profChinsUI.currentAction !== action) {
					profChinsUI.currentAction = action;
					logger(
						state,
						'debug',
						'stateManager',
						'Placing initial traps.',
					);
				}
				if (trapsOnGround >= maxAllowed) {
					state.mainState = 'awaiting_activity';
					utilState.layingLocationIndex = 0;
					return;
				}
				utilFunctions.layingInitialTraps(maxAllowed, trapsOnGround);
				break;
			}
			// Awaiting activity - all traps laid, waiting for them to be caught
			case 'awaiting_activity': {
				const action = 'Awaiting trap activity';
				if (profChinsUI.currentAction !== action) {
					profChinsUI.currentAction = action;
					logger(
						state,
						'debug',
						'stateManager',
						'Awaiting trap activity.',
					);
				}

				// Once we have traps laid, transition to maintaining immediately
				// No need to wait for activity - we'll start resetting as soon as anything happens
				if (trapsOnGround > 0) {
					profChinsUI.currentAction = action;
					logger(
						state,
						'debug',
						'stateManager',
						'Maintaining traps.',
					);
				}

				// Route to appropriate handler based on priority
				// CRITICAL: Always check for critical traps first, even during ground trap handling
				if (
					!utilState.resetInProgress &&
					utilFunctions.criticalTrapChecker()
				) {
					state.mainState = 'critical_trap_handling';
				} else if (utilState.resetInProgress) {
					// If reset is in progress, go straight to resetting_traps
					state.mainState = 'resetting_traps';
				} else if (utilFunctions.hasTrapsNeedingAttention()) {
					// Only proceed to reset traps if there's actually something to reset
					state.mainState = 'resetting_traps';
				}
				// Otherwise stay in awaiting_activity
				break;
			}
			// PRIORITY 1: Handle critical traps (80+ ticks) - prevents despawn
			case 'critical_trap_handling': {
				const action = 'Maintaining traps';
				if (profChinsUI.currentAction !== action) {
					profChinsUI.currentAction = action;
				}

				if (
					!utilState.resetInProgress &&
					utilFunctions.criticalTrapChecker()
				) {
					utilFunctions.resetTraps();
				} else {
					// No more critical traps, return to main maintenance
					state.mainState = 'maintaining_traps';
				}
				break;
			}
			// PRIORITY 2: Normal reset flow - oldest trap first (with ground trap and repositioning fallback)
			case 'resetting_traps': {
				const action = 'Maintaining traps';
				if (profChinsUI.currentAction !== action) {
					profChinsUI.currentAction = action;
				}

				// resetTraps() handles:
				// 1. Player repositioning if on a trap location
				// 2. Ground trap handling as fallback when no regular traps to reset
				// 3. Normal trap resetting
				utilFunctions.resetTraps();

				// After reset completes, return to main maintenance
				if (!utilState.resetInProgress) {
					state.mainState = 'maintaining_traps';
				}
				break;
			}

			// Maintenance loop - continue checking for work
			case 'maintaining_traps': {
				// Loop back to awaiting_activity to check for more work
				state.mainState = 'awaiting_activity';
				break;
			}

			default: {
				state.mainState = 'start_state';
				break;
			}
		}
	} catch (error) {
		const errorMessage = String(error);
		bot.printGameMessage(`CRITICAL ERROR in stateManager: ${errorMessage}`);
		logger(state, 'all', 'stateManager', `Critical error: ${errorMessage}`);
		bot.terminate();
	}
}
