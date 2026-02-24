import { logGlass } from './State Manager/logging.js';
import { stateManager } from './State Manager/state-manager.js';
import { state, MainStates } from './State Manager/script-state.js';
import {
	GlassMakeMode,
	TARGET_MOLTEN_GLASS_NORMAL_MODE,
	TARGET_MOLTEN_GLASS_SEAWEED_MODE,
} from './State Manager/constants.js';
import {
	getMoltenGlassCount,
	hasRequiredLockedItems,
	isAtIslandArrival,
} from './State Manager/glass-utils.js';
import { initializeGlassMakeUI, disposeGlassMakeUI } from './ui.js';

const resolveInitialStateFromInventory = (): void => {
	const moltenGlassCount: number = getMoltenGlassCount();

	if (state.selectedMode === GlassMakeMode.CRAFT_ONLY) {
		const hasPipeLocked: boolean = hasRequiredLockedItems(
			GlassMakeMode.CRAFT_ONLY,
		);
		state.mainState =
			hasPipeLocked && moltenGlassCount >= TARGET_MOLTEN_GLASS_NORMAL_MODE
				? MainStates.GLASSBLOWING
				: MainStates.BANKING;
		return;
	}

	if (state.selectedMode === GlassMakeMode.SPORES_ONLY) {
		state.mainState = isAtIslandArrival()
			? MainStates.SPORES_ONLY
			: MainStates.TRAVEL_TO_ROWBOAT;
		return;
	}

	const hasSeaweedSetupLocked: boolean = hasRequiredLockedItems(
		GlassMakeMode.CRAFT_PLUS_SPORES,
	);
	const hasSeaweedTripGlass: boolean =
		moltenGlassCount >= TARGET_MOLTEN_GLASS_SEAWEED_MODE;

	if (isAtIslandArrival()) {
		state.mainState =
			hasSeaweedSetupLocked && hasSeaweedTripGlass
				? MainStates.GLASSBLOWING
				: MainStates.RETURN_TO_BANK;
		return;
	}

	state.mainState =
		hasSeaweedSetupLocked && hasSeaweedTripGlass
			? MainStates.TRAVEL_TO_ROWBOAT
			: MainStates.BANKING;
};

export function onStart(): void {
	state.uiCompleted = false;
	state.selectedMode = GlassMakeMode.CRAFT_ONLY;
	initializeGlassMakeUI(state);

	state.mainState = MainStates.BANKING;
	state.startStateResolved = false;
	state.depositedThisBankOpen = false;
	state.bankCloseRequested = false;
	state.ticksUntilNextAction = 0;
	state.hasClickedRowboat = false;
	state.hasTriggeredGlassblow = false;
	state.waitingForGlassDialog = false;
	state.glassDialogWaitTicks = 0;
	state.lastLoggedMainState = null;
	state.gameTick = 0;

	logGlass('Script started. Waiting for UI selection.');
}

export function onGameTick(): void {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;
	if (!state.uiCompleted) return;
	if (!state.startStateResolved) {
		resolveInitialStateFromInventory();
		state.startStateResolved = true;
		logGlass(`Initial state resolved to ${state.mainState}.`);
	}

	state.gameTick++;
	stateManager();
}

export function onEnd(): void {
	bot.walking.webWalkCancel();
	disposeGlassMakeUI();
	logGlass('Script ended.');
}
