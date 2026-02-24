import { GlassMakeMode } from '../constants.js';
import { logGlass, logTravel } from '../logging.js';
import { hasMoltenGlass, triggerGlassblowAction } from '../glass-utils.js';
import { getClosestSeaweedSpore } from '../seaweed-spore-utils.js';
import { MainStates, state } from '../script-state.js';

const GLASS_DIALOG_WAIT_TICKS: number = 6;
const GLASS_IDLE_MIN_TICKS: number = 14;
const GLASS_IDLE_MAX_TICKS: number = 20;

let glassIdleTicks: number = 0;
let lastCraftingExperience: number = -1;
let glassIdleRestartThresholdTicks: number =
	Math.floor(
		Math.random() * (GLASS_IDLE_MAX_TICKS - GLASS_IDLE_MIN_TICKS + 1),
	) + GLASS_IDLE_MIN_TICKS;

const resetGlassIdleWatchdog = (): void => {
	glassIdleTicks = 0;
	glassIdleRestartThresholdTicks =
		Math.floor(
			Math.random() * (GLASS_IDLE_MAX_TICKS - GLASS_IDLE_MIN_TICKS + 1),
		) + GLASS_IDLE_MIN_TICKS;
};

const resetGlassIdleAndExperienceWatchdog = (): void => {
	resetGlassIdleWatchdog();
	lastCraftingExperience = -1;
};

const getPlayerCraftingExperience = (): number =>
	client.getSkillExperience(net.runelite.api.Skill.CRAFTING);

const isPlayerIdleForGlassblowing = (): boolean => {
	if (bot.localPlayerMoving()) return false;

	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return false;

	const animationId: number = player.getAnimation();
	return animationId === -1;
};

export const Glassblowing = (): void => {
	if (!hasMoltenGlass()) {
		if (state.selectedMode === GlassMakeMode.CRAFT_PLUS_SPORES) {
			state.mainState = MainStates.RETURN_TO_BANK;
		} else if (state.selectedMode === GlassMakeMode.SPORES_ONLY) {
			state.mainState = MainStates.SPORES_ONLY;
		} else {
			state.mainState = MainStates.BANKING;
		}
		state.hasTriggeredGlassblow = false;
		state.waitingForGlassDialog = false;
		state.glassDialogWaitTicks = 0;
		resetGlassIdleAndExperienceWatchdog();
		return;
	}

	if (state.selectedMode === GlassMakeMode.CRAFT_PLUS_SPORES) {
		const spore = getClosestSeaweedSpore();
		if (spore) {
			logTravel(
				'Seaweed spore detected underwater. Switching to LOOTING_SEAWEED_SPORE.',
			);
			state.hasTriggeredGlassblow = false;
			state.waitingForGlassDialog = false;
			state.glassDialogWaitTicks = 0;
			resetGlassIdleAndExperienceWatchdog();
			state.mainState = MainStates.LOOTING_SEAWEED_SPORE;
			return;
		}
	}

	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	if (!isPlayerIdleForGlassblowing()) {
		resetGlassIdleWatchdog();
		return;
	}

	if (state.waitingForGlassDialog) {
		resetGlassIdleWatchdog();
		state.glassDialogWaitTicks += 1;
		if (state.glassDialogWaitTicks < GLASS_DIALOG_WAIT_TICKS) return;
		state.waitingForGlassDialog = false;
		state.glassDialogWaitTicks = 0;
		state.hasTriggeredGlassblow = true;
		lastCraftingExperience = getPlayerCraftingExperience();
		state.ticksUntilNextAction = 4;
		return;
	}

	if (state.hasTriggeredGlassblow) {
		const currentCraftingExperience: number = getPlayerCraftingExperience();
		if (lastCraftingExperience < 0) {
			lastCraftingExperience = currentCraftingExperience;
		}

		if (currentCraftingExperience > lastCraftingExperience) {
			lastCraftingExperience = currentCraftingExperience;
			resetGlassIdleWatchdog();
			return;
		}

		glassIdleTicks += 1;
		if (glassIdleTicks < glassIdleRestartThresholdTicks) return;

		logGlass(
			`Glassblowing idle for ${glassIdleTicks} ticks. Restarting glassblow action.`,
		);
		state.hasTriggeredGlassblow = false;
		state.waitingForGlassDialog = false;
		state.glassDialogWaitTicks = 0;
		resetGlassIdleWatchdog();
	}

	const success: boolean = triggerGlassblowAction();
	if (!success) return;
	state.waitingForGlassDialog = true;
	state.glassDialogWaitTicks = 0;
	state.ticksUntilNextAction = 1;
	lastCraftingExperience = getPlayerCraftingExperience();
	resetGlassIdleWatchdog();
};
