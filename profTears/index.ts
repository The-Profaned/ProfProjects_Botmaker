// Imports
import { LOG_COLOR, logger } from '../imports/logger.js';
import {
	processBankOpen,
	withdrawFirstExistingItem,
} from '../imports/bank-functions.js';
import { endScript, gameTick } from '../imports/general-function.js';
import { gamesNecklace } from '../imports/item-ids.js';
import { unequipWornEquipment } from '../imports/player-functions.js';
import { isPlayerInArea } from '../imports/tile-functions.js';
import type { State } from '../imports/types.js';
import {
	getAverageWallDuration,
	getBlueCycleTiming,
	getTearsInteractionStatus,
	getTearsStateFlags,
	getTearsWallStats,
	initializeTearsUtils,
	interactWithBlueWall,
	resetTearsState,
	setTearsStateFlags,
	talkToJuna,
	trackWallChanges,
	updateInteractionState,
} from './tear-utils.js';

type TearsStateFlags = {
	scriptInitialized: boolean;
	junaDialogCompleted: boolean;
	lastPlayerMovementState: boolean;
	playerStoppedMovingTicks: number;
	minigameActive: boolean;
};

type TearsWallStats = {
	blueWallCount: number;
	greenWallCount: number;
	historyCount: number;
};

// variables for script state
const state: State = {
	debugEnabled: true,
	debugFullState: false,
	failureCounts: {},
	failureOrigin: '',
	lastFailureKey: '',
	mainState: 'start_state',
	scriptInitalized: false,
	scriptName: 'profTears',
	uiCompleted: false,
	timeout: 0,
	gameTick: 0,
	subState: '',
};

const minigameBounds = {
	minX: 3254,
	maxX: 3261,
	minY: 9514,
	maxY: 9520,
	plane: 2,
};

const minigameStartBounds = {
	minX: 3241,
	maxX: 3252,
	minY: 9503,
	maxY: 9528,
	plane: 2,
};

const ToG = new net.runelite.api.coords.WorldPoint(3249, 9515, 2);

let scriptEnding = false;
let minigameEntered = false;

// On Start of Script
export function onStart() {
	try {
		initializeTearsUtils(state);
		resetTearsState();
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
			if (!state.scriptInitalized) notifyScriptInitialized();
			state.scriptInitalized = true;
		} else {
			return;
		}
		if (!gameTick(state)) return;

		// Enable break handler only when not banking, idle, not webwalking, and in main state
		if (
			!bot.bank.isBanking() &&
			bot.localPlayerIdle() &&
			!bot.walking.isWebWalking() &&
			state.mainState == 'start_state'
		)
			bot.breakHandler.setBreakHandlerStatus(true);
		stateManager();
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

function updateMinigameState(): boolean {
	const flags: TearsStateFlags = getTearsStateFlags();
	const minigameActive: boolean = (
		isPlayerInArea as (
			state: State,
			minX: number,
			maxX: number,
			minY: number,
			maxY: number,
			plane?: number,
		) => boolean
	)(
		state,
		minigameBounds.minX,
		minigameBounds.maxX,
		minigameBounds.minY,
		minigameBounds.maxY,
		minigameBounds.plane,
	);

	if (minigameActive !== flags.minigameActive) {
		setTearsStateFlags({
			...flags,
			minigameActive,
		});
	}

	if (minigameActive) {
		minigameEntered = true;
	}

	return minigameActive;
}

function handleMinigameEnded(minigameActive: boolean): boolean {
	if (minigameActive) {
		return false;
	}
	if (!minigameEntered) {
		return false;
	}
	if (!scriptEnding) {
		scriptEnding = true;
		logger(
			state,
			'all',
			'timer',
			'Player left minigame area. Stopping script.',
		);
		bot.terminate();
	}
	return true;
}

function unequipWeaponOffhand(): boolean {
	const emptySlots: number = bot.inventory.getEmptySlots();
	if (emptySlots < 2) {
		logger(
			state,
			'all',
			'equipment',
			'Need at least 2 empty inventory slots to unequip weapon and offhand.',
			LOG_COLOR.GOLD,
		);
		return false;
	}

	const result = unequipWornEquipment(state, ['weapon', 'shield']);
	return result.success;
}

function getTickContext(): {
	currentTick: number;
	minigameActive: boolean;
} | null {
	const player = client.getLocalPlayer();
	if (!player) {
		return null;
	}

	const currentTick: number = client.getTickCount();
	const minigameActive: boolean = updateMinigameState();
	if (handleMinigameEnded(minigameActive)) {
		return null;
	}
	trackWallChanges();
	updateInteractionState();

	return { currentTick, minigameActive };
}

function logWallStatus(currentTick: number): void {
	const flags: TearsStateFlags = getTearsStateFlags();
	if (currentTick % 10 !== 0 || !flags.minigameActive) {
		return;
	}

	const avgDuration: number = getAverageWallDuration('all');
	const stats: TearsWallStats = getTearsWallStats();
	logger(
		state,
		'debug',
		'status',
		`Blue: ${stats.blueWallCount} | Green: ${stats.greenWallCount} | Avg duration: ${avgDuration.toFixed(1)} ticks | History: ${stats.historyCount}`,
		LOG_COLOR.GOLD,
	);
}

// Script Initialized Notification
function notifyScriptInitialized(): void {
	log.printGameMessage('Script initialized.');
}

// On End of Script
export function onEnd() {
	logger(state, 'all', 'script', `${state.scriptName} ended.`);
	endScript(state);
}

// Script Decision Manager
function stateManager() {
	logger(
		state,
		'debug',
		'stateManager',
		`${state.mainState}`,
		LOG_COLOR.GOLD,
	);
	switch (state.mainState) {
		case 'start_state': {
			const tickContext = getTickContext();
			if (!tickContext) {
				return;
			}

			const isInStartBounds: boolean = (
				isPlayerInArea as (
					state: State,
					minX: number,
					maxX: number,
					minY: number,
					maxY: number,
					plane?: number,
				) => boolean
			)(
				state,
				minigameStartBounds.minX,
				minigameStartBounds.maxX,
				minigameStartBounds.minY,
				minigameStartBounds.maxY,
				minigameStartBounds.plane,
			);
			if (!isInStartBounds) {
				state.mainState = 'navigate_to_cave';
				return;
			}

			const unequipped: boolean = unequipWeaponOffhand();
			if (!unequipped) {
				return;
			}

			state.mainState = 'talk_to_juna';
			break;
		}
		case 'talk_to_juna': {
			const tickContext = getTickContext();
			if (!tickContext) {
				return;
			}

			const flags: TearsStateFlags = getTearsStateFlags();
			if (!flags.junaDialogCompleted) {
				talkToJuna();
				return;
			}

			state.mainState = 'walk_in_cave';
			break;
		}

		case 'walk_in_cave': {
			const tickContext = getTickContext();
			if (!tickContext) {
				return;
			}

			const flags: TearsStateFlags = getTearsStateFlags();
			const isPlayerMoving: boolean = bot.localPlayerMoving();
			if (isPlayerMoving) {
				setTearsStateFlags({
					...flags,
					lastPlayerMovementState: true,
					playerStoppedMovingTicks: 0,
				});
				return;
			}

			if (flags.lastPlayerMovementState) {
				const stoppedTicks: number = flags.playerStoppedMovingTicks + 1;
				if (stoppedTicks >= 1) {
					setTearsStateFlags({
						...flags,
						scriptInitialized: true,
						playerStoppedMovingTicks: stoppedTicks,
					});
					logger(
						state,
						'debug',
						'init',
						'Player stopped moving, starting wall interactions',
					);
					state.mainState = 'click_blue_tears';
					return;
				}
				setTearsStateFlags({
					...flags,
					playerStoppedMovingTicks: stoppedTicks,
				});
			}
			break;
		}

		case 'click_blue_tears': {
			const tickContext = getTickContext();
			if (!tickContext) {
				return;
			}
			logWallStatus(tickContext.currentTick);

			const interactionStatus = getTearsInteractionStatus();
			if (!interactionStatus.lastClickedWallKey) {
				interactWithBlueWall();
				return;
			}

			if (!interactionStatus.blueCycleComplete) {
				return;
			}

			const timing = getBlueCycleTiming();
			if (
				timing.ticksSinceLastBlueChange !== null &&
				timing.ticksSinceLastBlueChange < 1
			) {
				return;
			}

			interactWithBlueWall();
			break;
		}

		case 'navigate_to_cave': {
			if (!state.subState) {
				state.subState = 'get_to_bank';
			}

			switch (state.subState) {
				case 'get_to_bank': {
					processBankOpen(state, () => {
						state.subState = 'find_teleport';
					});
					break;
				}
				case 'find_teleport': {
					if (!bot.bank.isOpen()) {
						state.subState = 'get_to_bank';
						break;
					}

					const necklaceCandidates: number[] = gamesNecklace.slice(
						1,
						7,
					);
					const hasNecklace: boolean =
						bot.inventory.containsAnyIds(necklaceCandidates);
					if (!hasNecklace) {
						const withdrew: boolean = withdrawFirstExistingItem(
							state,
							necklaceCandidates,
							1,
							'navigate_to_cave',
						);
						if (!withdrew) {
							break;
						}
					}

					bot.bank.close();
					if (bot.bank.isOpen()) {
						break;
					}

					const selectedNecklace: number | undefined =
						necklaceCandidates.find((id) =>
							bot.inventory.containsId(id),
						);
					if (!selectedNecklace) {
						break;
					}
					bot.walking.webWalkStart(ToG);
					state.subState = '';
					state.mainState = 'talk_to_juna';
					break;
				}
				default: {
					state.subState = 'get_to_bank';
					break;
				}
			}
			break;
		}

		default: {
			state.mainState = 'start_state';
			break;
		}
	}
}
