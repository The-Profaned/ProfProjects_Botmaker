import { getClosestSeaweedSpore } from '../seaweed-spore-utils.js';
import { logTravel } from '../logging.js';
import { MainStates, state } from '../script-state.js';

export const LootingSeaweedSpore = (): void => {
	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	const spore = getClosestSeaweedSpore();
	if (!spore) {
		logTravel('No seaweed spore found. Returning to GLASSBLOWING state.');
		state.hasTriggeredGlassblow = false;
		state.waitingForGlassDialog = false;
		state.glassDialogWaitTicks = 0;
		state.mainState = MainStates.GLASSBLOWING;
		return;
	}

	logTravel('Seaweed spore found. Sending loot interaction.');
	bot.tileItems.lootItem(spore);
	if (typeof spore.loot === 'function') {
		spore.loot();
	}
	logTravel('Seaweed spore loot interaction sent.');
	state.ticksUntilNextAction = 2;
	state.hasTriggeredGlassblow = false;
	state.waitingForGlassDialog = false;
	state.glassDialogWaitTicks = 0;
	state.mainState = MainStates.GLASSBLOWING;
};
