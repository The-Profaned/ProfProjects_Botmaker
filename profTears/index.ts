// Imports
import { logger } from '../imports/logger.js';
import {
	processBankOpen,
	withdrawFirstExistingItem,
} from '../imports/bank-functions.js';
import { endScript, gameTick } from '../imports/general-function.js';
import { gamesNecklace } from '../imports/item-ids.js';
import { getWornEquipment } from '../imports/player-functions.js';
import { isPlayerInArea } from '../imports/tile-functions.js';
import type { State } from '../imports/types.js';
import {
	clickBlueWall,
	getCycleStatus,
	getTearsStateFlags,
	initializeTearsUtils,
	isCycleVerified,
	resetTearsState,
	setTearsStateFlags,
	talkToJuna,
	trackWallCycle,
} from './tear-utils.js';

type TearsStateFlags = {
	scriptInitialized: boolean;
	junaDialogCompleted: boolean;
	minigameActive: boolean;
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
	uiCompleted: true,
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
	minY: 9498,
	maxY: 9528,
	plane: 2,
};

const ToG = new net.runelite.api.coords.WorldPoint(3250, 9516, 2);

let scriptEnding = false;
let minigameEntered = false;
let pendingUnequipItemIds: number[] = [];
let junaInteractionTick = -1;

// On Start of Script
export function onStart() {
	try {
		initializeTearsUtils(state);
		resetTearsState();
		// No UI for this script, mark complete to allow tick processing.
		state.uiCompleted = true;
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
		bot.widgets.handleDialogue([]);
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
			'debug',
			'timer',
			'Player left minigame area. Stopping script.',
		);
		bot.terminate();
	}
	return true;
}

function unequipWeaponOffhand(): boolean {
	if (pendingUnequipItemIds.length === 0) {
		const equipment: Record<string, number> = getWornEquipment(state);
		pendingUnequipItemIds = ['weapon', 'shield']
			.map((slot) => equipment[slot])
			.filter(
				(value): value is number =>
					value !== undefined && value !== null,
			);
	}

	const requiredSlots: number = pendingUnequipItemIds.length;
	if (requiredSlots === 0) {
		return true;
	}

	const emptySlots: number = bot.inventory.getEmptySlots();
	if (emptySlots < requiredSlots) {
		logger(
			state,
			'all',
			'equipment',
			`Need at least ${requiredSlots} empty inventory slot${requiredSlots === 1 ? '' : 's'} to unequip weapon and offhand.`,
		);
		return false;
	}

	for (const itemId of pendingUnequipItemIds) {
		if (bot.equipment.containsId(itemId)) {
			bot.equipment.unequip(itemId);
		}
	}

	const remainingIds: number[] = pendingUnequipItemIds.filter((id) =>
		bot.equipment.containsId(id),
	);
	if (remainingIds.length === 0) {
		pendingUnequipItemIds = [];
		return true;
	}

	return false;
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

	return { currentTick, minigameActive };
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
	switch (state.mainState) {
		case 'start_state': {
			logger(state, 'debug', 'start_state', 'Processing start_state');
			const tickContext = getTickContext();
			if (!tickContext) {
				logger(
					state,
					'debug',
					'start_state',
					'No tickContext available',
				);
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
			logger(
				state,
				'debug',
				'start_state',
				`Player in start bounds: ${isInStartBounds}`,
			);

			if (!isInStartBounds) {
				logger(
					state,
					'debug',
					'start_state',
					'Not in bounds, transitioning to navigate_to_cave',
				);
				state.mainState = 'navigate_to_cave';
				return;
			}

			logger(
				state,
				'debug',
				'start_state',
				'In bounds, attempting to unequip weapon/offhand',
			);
			const unequipped: boolean = unequipWeaponOffhand();
			logger(
				state,
				'debug',
				'start_state',
				`Unequip result: ${unequipped}`,
			);

			if (!unequipped) {
				logger(
					state,
					'debug',
					'start_state',
					'Failed to unequip, waiting for next tick',
				);
				return;
			}

			logger(
				state,
				'debug',
				'start_state',
				'Unequipped successfully, transitioning to talk_to_juna',
			);
			state.mainState = 'talk_to_juna';
			break;
		}
		case 'talk_to_juna': {
			logger(
				state,
				'debug',
				'talk_to_juna',
				'Processing talk_to_juna state',
			);
			const tickContext = getTickContext();
			if (!tickContext) {
				logger(
					state,
					'debug',
					'talk_to_juna',
					'No tickContext available',
				);
				return;
			}

			// Track wall cycle to verify spawn pattern
			trackWallCycle();

			const flags: TearsStateFlags = getTearsStateFlags();

			// Dialog already completed - wait for delay then transition
			if (flags.junaDialogCompleted) {
				const ticksSinceTalk =
					tickContext.currentTick - junaInteractionTick;
				if (ticksSinceTalk < 5) {
					logger(
						state,
						'debug',
						'talk_to_juna',
						`Waiting for dialog completion (${ticksSinceTalk}/5 ticks)`,
					);
					return;
				}

				logger(
					state,
					'debug',
					'talk_to_juna',
					'Dialog complete, transitioning to walk_in_cave',
				);
				state.mainState = 'walk_in_cave';
				break;
			}

			// Start walking to Juna immediately - continue cycle tracking during walk
			logger(state, 'debug', 'talk_to_juna', 'Starting walk to Juna');
			state.mainState = 'navigate_to_juna';
			break;
		}

		case 'navigate_to_juna': {
			const tickContext = getTickContext();
			if (!tickContext) {
				return;
			}

			// Continue tracking wall cycle while walking
			trackWallCycle();

			const player = client.getLocalPlayer();
			if (!player) {
				return;
			}

			const playerLoc = player.getWorldLocation();
			const junaLoc = new net.runelite.api.coords.WorldPoint(
				3248,
				9516,
				2,
			);
			const distance = Math.max(
				Math.abs(playerLoc.getX() - junaLoc.getX()),
				Math.abs(playerLoc.getY() - junaLoc.getY()),
			);

			// Already close to Juna
			if (distance <= 2) {
				// Only talk if cycle is verified
				if (!isCycleVerified()) {
					const cycleStatus = getCycleStatus();
					// If too many spawns observed, something is wrong
					if (cycleStatus.observedSpawns >= 12) {
						logger(
							state,
							'all',
							'cycle',
							'Please log into the appropriate Tears of Guthix World.',
						);
						bot.terminate();
						return;
					}
					// Still waiting for verification
					return;
				}

				logger(
					state,
					'debug',
					'navigate_to_juna',
					'Close to Juna and cycle verified, attempting to talk',
				);
				talkToJuna();
				junaInteractionTick = tickContext.currentTick;
				state.mainState = 'talk_to_juna';
				break;
			}

			// Start walking to Juna if not already walking and not webwalking
			if (!bot.localPlayerMoving() && !bot.walking.isWebWalking()) {
				logger(
					state,
					'debug',
					'navigate_to_juna',
					`Walking to Juna (distance: ${distance}), target: (${ToG.getX()}, ${ToG.getY()})`,
				);
				bot.walking.walkToTrueWorldPoint(ToG.getX(), ToG.getY());
			}

			break;
		}

		case 'walk_in_cave': {
			const tickContext = getTickContext();
			if (!tickContext) {
				return;
			}

			// Player still moving - wait
			if (bot.localPlayerMoving() || !bot.localPlayerIdle()) {
				break;
			}

			// Player is idle - transition to wall clicking
			const flags: TearsStateFlags = getTearsStateFlags();
			setTearsStateFlags({
				...flags,
				scriptInitialized: true,
			});
			logger(
				state,
				'debug',
				'init',
				'Player idle in cave, starting wall interactions',
			);
			state.mainState = 'click_blue_tears';
			break;
		}

		case 'click_blue_tears': {
			const tickContext = getTickContext();
			if (!tickContext) {
				return;
			}

			trackWallCycle();
			const clickedTile = clickBlueWall();
			if (clickedTile) {
				logger(
					state,
					'debug',
					'click_blue_tears',
					`Clicked tile: (${clickedTile.getX()}, ${clickedTile.getY()})`,
				);
			}
			break;
		}

		case 'navigate_to_cave': {
			if (!state.subState) {
				state.subState = 'get_to_bank';
			}

			switch (state.subState) {
				case 'get_to_bank': {
					processBankOpen(state, () => {
						logger(state, 'debug', 'bank', 'Bank opened');
						state.subState = 'find_teleport';
					});
					break;
				}
				case 'find_teleport': {
					const necklaceCandidates: number[] = gamesNecklace.slice(
						0,
						8,
					);

					const hasNecklace: boolean =
						bot.inventory.containsAnyIds(necklaceCandidates);

					// Don't have necklace and bank is closed - reopen bank
					if (!hasNecklace && !bot.bank.isOpen()) {
						state.subState = 'get_to_bank';
						break;
					}

					// Don't have necklace but bank is open - withdraw it
					if (!hasNecklace) {
						withdrawFirstExistingItem(
							state,
							necklaceCandidates,
							1,
							'navigate_to_cave',
						);
						break;
					}

					// Have necklace but bank still open - close it
					if (bot.bank.isOpen()) {
						logger(state, 'debug', 'bank', 'Closing bank');
						bot.bank.close();
						break;
					}

					// Bank is closed and we have necklace
					const selectedNecklace: number | undefined =
						necklaceCandidates.find((id) =>
							bot.inventory.containsId(id),
						);

					if (!selectedNecklace) {
						state.subState = 'get_to_bank';
						break;
					}

					logger(
						state,
						'debug',
						'webwalk',
						`Webwalking to ToG with necklace ${selectedNecklace}`,
					);
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
