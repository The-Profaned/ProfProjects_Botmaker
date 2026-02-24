import { logBank } from '../logging.js';
import { state, MainStates } from '../script-state.js';

export const ClosingBank = (): void => {
	logBank('Closing bank and returning to woodcutting');
	bot.bank.close();

	// If camphor tree, need to travel back through terrain obstacles
	if (state.treeTypeName === 'Camphor') {
		state.mainState = MainStates.TRAVELING;
		state.isTravelingToBank = false;
		state.travelingStep = 0;
	} else {
		state.mainState = MainStates.WOODCUTTING;
	}

	state.isCurrentlyAnimating = false;
	state.hasInteractedWithTree = false;
	state.ticksUntilNextAction = 0;
	state.justUsedSpecialAttack = false;
};
