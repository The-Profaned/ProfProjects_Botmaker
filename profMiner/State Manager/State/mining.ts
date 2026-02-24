import { logMining } from '../logging.js';
import {
	findClosestRockAtConfiguredLocations,
	findClosestRockAtConfiguredLocationsByType,
	getActiveRockConfig,
	isInventoryFull,
} from '../mining-utils.js';
import { RockType } from '../constants.js';
import { state, MainStates } from '../script-state.js';

const trySwitchBackToSilver = (): boolean => {
	if (state.selectedRockType !== RockType.SILVER) return false;
	if (state.activeRockType === RockType.SILVER) return false;

	const silverRock = findClosestRockAtConfiguredLocationsByType(
		RockType.SILVER,
	);
	if (!silverRock) return false;

	state.activeRockType = RockType.SILVER;
	state.hasInteractedWithRock = false;
	state.ticksUntilNextAction = 0;
	state.mainState = MainStates.TRAVEL_TO_ROCK;
	logMining('Silver rocks respawned. Returning to silver.');
	return true;
};

export const Mining = (): void => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;

	if (isInventoryFull()) {
		state.depositOpenAttempts = 0;
		state.depositActionAttempts = 0;
		state.hasInteractedWithRock = false;
		state.mainState = MainStates.OPENING_DEPOSIT_BOX;
		return;
	}

	if (trySwitchBackToSilver()) return;

	const currentAnimation: number = player.getAnimation();
	const isAnimatingNow: boolean = currentAnimation !== -1;

	if (!state.isCurrentlyAnimating && isAnimatingNow) {
		state.hasInteractedWithRock = false;
	}

	if (state.isCurrentlyAnimating && !isAnimatingNow) {
		state.hasInteractedWithRock = false;
	}

	state.isCurrentlyAnimating = isAnimatingNow;
	if (state.isCurrentlyAnimating) return;
	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}
	if (bot.localPlayerMoving()) return;
	if (state.hasInteractedWithRock) return;

	const rock = findClosestRockAtConfiguredLocations(state);
	if (!rock) {
		const activeRockConfig = getActiveRockConfig(state);
		if (
			state.selectedRockType === RockType.SILVER &&
			state.activeRockType === RockType.SILVER
		) {
			state.activeRockType = RockType.IRON;
			state.hasInteractedWithRock = false;
			state.ticksUntilNextAction = 0;
			state.mainState = MainStates.TRAVEL_TO_ROCK;
			logMining(
				'Silver rocks depleted. Switching to iron until respawn.',
			);
			return;
		}

		logMining(
			`No ${activeRockConfig.name} rocks found at configured locations.`,
		);
		return;
	}

	const activeRockConfig = getActiveRockConfig(state);
	bot.objects.interactSuppliedObject(rock, activeRockConfig.action);
	state.hasInteractedWithRock = true;
};
