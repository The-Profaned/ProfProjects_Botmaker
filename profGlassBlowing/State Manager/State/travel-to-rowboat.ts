import {
	GlassMakeMode,
	ROWBOAT_CONTINUE_WIDGET_ID,
	ROWBOAT_CONTINUE_WIDGET_IDENTIFIER,
	ROWBOAT_CONTINUE_WIDGET_OPCODE,
	ROWBOAT_CONTINUE_WIDGET_PARAM0,
	ROWBOAT_OBJECT_ID,
} from '../constants.js';
import { logTravel } from '../logging.js';
import { findClosestRowboat, isAtIslandArrival } from '../glass-utils.js';
import { MainStates, state } from '../script-state.js';

export const TravelToRowboat = (): void => {
	if (isAtIslandArrival()) {
		state.hasClickedRowboat = false;
		state.mainState =
			state.selectedMode === GlassMakeMode.SPORES_ONLY
				? MainStates.SPORES_ONLY
				: MainStates.GLASSBLOWING;
		return;
	}

	if (state.hasClickedRowboat) {
		const handledDialogue: boolean = bot.widgets.handleDialogue([]);
		if (handledDialogue) {
			logTravel('Handled rowboat Continue dialogue.');
			state.ticksUntilNextAction = 3;
			return;
		}

		if (bot.localPlayerMoving()) return;

		bot.widgets.interactSpecifiedWidget(
			ROWBOAT_CONTINUE_WIDGET_ID,
			ROWBOAT_CONTINUE_WIDGET_IDENTIFIER,
			ROWBOAT_CONTINUE_WIDGET_OPCODE,
			ROWBOAT_CONTINUE_WIDGET_PARAM0,
		);
		logTravel('Attempted rowboat Continue via widget fallback.');
		state.ticksUntilNextAction = 3;
		return;
	}

	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	if (isAtIslandArrival()) {
		state.mainState =
			state.selectedMode === GlassMakeMode.SPORES_ONLY
				? MainStates.SPORES_ONLY
				: MainStates.GLASSBLOWING;
		return;
	}

	const rowboat = findClosestRowboat();
	if (!rowboat) {
		logTravel(`Rowboat object ${ROWBOAT_OBJECT_ID} not found nearby.`);
		return;
	}

	if (bot.localPlayerMoving()) return;
	bot.objects.interactSuppliedObject(rowboat, 'Dive');
	state.hasClickedRowboat = true;
	state.ticksUntilNextAction = 3;
	if (state.selectedMode !== GlassMakeMode.CRAFT_ONLY) {
		logTravel('Using rowboat Dive to start seaweed-spore run.');
	}
};
