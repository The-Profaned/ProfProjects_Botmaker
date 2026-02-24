import { logTravel } from '../logging.js';
import { getClosestSeaweedSpore } from '../seaweed-spore-utils.js';
import { isAtIslandArrival } from '../glass-utils.js';
import { MainStates, state } from '../script-state.js';

export const SporesOnly = (): void => {
	if (!isAtIslandArrival()) {
		state.mainState = MainStates.TRAVEL_TO_ROWBOAT;
		return;
	}

	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	if (bot.localPlayerMoving()) return;

	const spore = getClosestSeaweedSpore();
	if (!spore) {
		logTravel('No seaweed spore found in spores-only mode. Waiting...');
		state.ticksUntilNextAction = 2;
		return;
	}

	logTravel(
		'Seaweed spore found in spores-only mode. Sending loot interaction.',
	);
	bot.tileItems.lootItem(spore);
	if (typeof spore.loot === 'function') {
		spore.loot();
	}
	state.ticksUntilNextAction = 2;
};
