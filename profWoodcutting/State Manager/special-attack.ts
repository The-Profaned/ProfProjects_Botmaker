import {
	DRAGON_AXE_ITEM_ID,
	SPECIAL_ATTACK_IDENTIFIER,
	SPECIAL_ATTACK_OPCODE,
	SPECIAL_ATTACK_PARAM,
	SPECIAL_ATTACK_VARP,
	SPECIAL_ATTACK_WIDGET_ID,
} from './constants.js';
import { logSpecial } from './logging.js';
import { state } from './script-state.js';

const hasDragonAxeEquipped = (): boolean => {
	return bot.equipment.containsId(DRAGON_AXE_ITEM_ID);
};

const getSpecialAttackEnergy = (): number => {
	const energy: number = client.getVarpValue(SPECIAL_ATTACK_VARP);
	return Math.floor(energy / 10);
};

const activateSpecialAttack = (): void => {
	logSpecial('Activating dragon axe special attack');
	bot.widgets.interactSpecifiedWidget(
		SPECIAL_ATTACK_WIDGET_ID,
		SPECIAL_ATTACK_IDENTIFIER,
		SPECIAL_ATTACK_OPCODE,
		SPECIAL_ATTACK_PARAM,
	);
	state.hasUsedSpecialThisSession = true;
	state.justUsedSpecialAttack = true;
};

export const handleDragonAxeSpecial = (): void => {
	if (!hasDragonAxeEquipped()) return;

	const currentEnergy: number = getSpecialAttackEnergy();
	if (currentEnergy !== state.lastSpecialAttackEnergy) {
		logSpecial(`Special attack energy: ${currentEnergy}%`);
		state.lastSpecialAttackEnergy = currentEnergy;
	}

	if (state.ticksUntilNextSpecial > 0) {
		state.ticksUntilNextSpecial--;
		if (state.ticksUntilNextSpecial === 0) {
			logSpecial('Delay finished, ready to use special attack');
		}
		return;
	}

	if (currentEnergy >= 100) {
		if (
			!state.hasUsedSpecialThisSession &&
			state.ticksUntilNextSpecial === 0
		) {
			state.ticksUntilNextSpecial = Math.floor(Math.random() * 26) + 5;
			logSpecial(
				`Special attack ready! Waiting ${state.ticksUntilNextSpecial} ticks before using (human-like delay)`,
			);
			state.hasUsedSpecialThisSession = true;
		} else if (state.ticksUntilNextSpecial === 0) {
			activateSpecialAttack();
		}
		return;
	}

	if (state.hasUsedSpecialThisSession && currentEnergy < 100) {
		state.hasUsedSpecialThisSession = false;
	}
};
