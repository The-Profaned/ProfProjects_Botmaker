import {
	DRAGON_AXE_ITEM_ID,
	LOG_BASCKET_ID,
} from './State Manager/constants.js';
import { logWoodcutting } from './State Manager/logging.js';
import { handleDragonAxeSpecial } from './State Manager/special-attack.js';
import { stateManager } from './State Manager/state-manager.js';
import { state, MainStates } from './State Manager/script-state.js';
import { woodcuttingUI } from './ui.js';

const checkInitialCamphorState = (): void => {
	if (state.treeTypeName !== 'Camphor') return;

	// Check inventory
	const inventory = client.getItemContainer(
		net.runelite.api.InventoryID.INVENTORY,
	);
	if (!inventory) return;

	const items = inventory.getItems();
	if (!items) return;

	let basketCount = 0;
	let logsCount = 0;

	for (const item of items) {
		if (!item) continue;
		if (item.getId() === LOG_BASCKET_ID) {
			basketCount += item.getQuantity();
		} else if (item.getId() === state.activeLogsItemId) {
			logsCount += item.getQuantity();
		}
	}

	const hasBasket = basketCount >= 1;
	const isFull = hasBasket ? logsCount >= 27 : logsCount >= 28;

	state.mainState = MainStates.TRAVELING;
	state.isTravelingToBank = isFull;
	state.travelingStep = 0;

	if (isFull) {
		logWoodcutting('Startup inventory full - webwalking to bank');
		return;
	}

	logWoodcutting('Startup inventory not full - webwalking to tree');
};

export function onGameTick(): void {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;

	// Wait for UI to be completed before running script logic
	if (!state.uiCompleted) {
		return;
	}

	// Check initial location/inventory state for camphor trees (run once after UI completes)
	if (!state.initialStateCheckDone) {
		checkInitialCamphorState();
		state.initialStateCheckDone = true;
	}

	logWoodcutting(`[${state.mainState}] Processing tick`);
	if (state.mainState === MainStates.WOODCUTTING) {
		handleDragonAxeSpecial();
	} else {
		state.ticksUntilNextSpecial = 0;
		state.hasUsedSpecialThisSession = false;
		state.justUsedSpecialAttack = false;
	}
	stateManager();
}

export function onStart(): void {
	logWoodcutting('Script started. Opening tree selection UI...');

	// Reset UI completion flag so the UI initializes on each script start
	state.uiCompleted = false;

	// Initialize UI - this will set the activeTreeObjectId, activeLogsItemId, and treeTypeName
	// based on user selection from cached values or the UI dialog
	woodcuttingUI.initialize(state);

	// Get player stats for logging
	const woodcuttingLevel: number = client.getRealSkillLevel(
		net.runelite.api.Skill.WOODCUTTING,
	);
	const hasDragonAxe: boolean = bot.equipment.containsId(DRAGON_AXE_ITEM_ID);
	const hasLogBasket: boolean = bot.inventory.containsId(LOG_BASCKET_ID);

	logWoodcutting('=== Player Configuration ===');
	logWoodcutting(`Woodcutting Level: ${woodcuttingLevel}`);
	logWoodcutting(`Tree Type: ${state.treeTypeName} (user selected)`);
	logWoodcutting(
		`Dragon Axe: ${hasDragonAxe ? 'YES (special attack enabled)' : 'NO (special attack disabled)'}`,
	);
	logWoodcutting(
		`Log Basket: ${hasLogBasket ? 'YES (banking at 27 logs)' : 'NO (banking at 28 logs)'}`,
	);
	logWoodcutting('===========================');

	state.mainState = MainStates.WOODCUTTING;
	state.isCurrentlyAnimating = false;
	state.hasInteractedWithTree = false;
	state.ticksUntilNextAction = 0;
	state.bankOpenAttempts = 0;
	state.lastSpecialAttackEnergy = 0;
	state.ticksUntilNextSpecial = 0;
	state.hasUsedSpecialThisSession = false;
	state.justUsedSpecialAttack = false;
	state.lastLoggedMainState = null;
	state.isTravelingToBank = false;
	state.hasClimbedRocks = false;
	state.hasCrossedSteppingStone = false;
	state.travelingStep = 0;
	state.idleTicks = 0;
	state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
	state.initialStateCheckDone = false;
}

export function onEnd(): void {
	woodcuttingUI.dispose();
	logWoodcutting('Script ended');
}
