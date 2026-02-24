import { logMiner } from './State Manager/logging.js';
import { stateManager } from './State Manager/state-manager.js';
import { state, MainStates } from './State Manager/script-state.js';
import { getActiveRockConfig } from './State Manager/mining-utils.js';
import { initializeMinerUI, disposeMinerUI } from './ui.js';

export function onStart(): void {
	state.uiCompleted = false;
	initializeMinerUI(state);

	state.mainState = MainStates.TRAVEL_TO_ROCK;
	state.isCurrentlyAnimating = false;
	state.hasInteractedWithRock = false;
	state.ticksUntilNextAction = 0;
	state.depositOpenAttempts = 0;
	state.depositActionAttempts = 0;
	state.hasVerifiedDepositTile = false;
	state.isWaitingForDepositWidget = false;
	state.depositWidgetReady = false;
	state.activeRockType = state.selectedRockType;
	state.lastLoggedMainState = null;
	state.gameTick = 0;

	const activeRockConfig = getActiveRockConfig(state);
	logMiner(
		`Script started. Rock type: ${activeRockConfig.name}. Object ID: ${activeRockConfig.objectId}.`,
	);
}

export function onGameTick(): void {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;
	if (!state.uiCompleted) return;

	state.gameTick++;
	stateManager();
}

export function onEnd(): void {
	bot.walking.webWalkCancel();
	disposeMinerUI();
	logMiner('Script ended');
}
