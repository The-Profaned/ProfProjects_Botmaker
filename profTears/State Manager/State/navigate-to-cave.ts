import { logger } from '../../../imports/logger.js';
import {
	processBankOpen,
	withdrawFirstExistingItem,
} from '../../../imports/bank-functions.js';
import { gamesNecklace } from '../../../imports/item-ids.js';
import { TOG_LOCATION } from '../constants.js';
import { state, MainStates } from '../script-state.js';

export const NavigateToCave = (): void => {
	if (!state.subState) {
		state.subState = 'get_to_bank';
	}

	switch (state.subState) {
		case 'get_to_bank': {
			processBankOpen(state, () => {
				logger(state, 'debug', 'bank', 'Bank opened');
				state.subState = 'find_teleport';
			});
			break;
		}
		case 'find_teleport': {
			const necklaceCandidates: number[] = gamesNecklace.slice(0, 8);
			const hasNecklace: boolean =
				bot.inventory.containsAnyIds(necklaceCandidates);

			if (!hasNecklace && !bot.bank.isOpen()) {
				state.subState = 'get_to_bank';
				break;
			}

			if (!hasNecklace) {
				withdrawFirstExistingItem(
					state,
					necklaceCandidates,
					1,
					'navigate_to_cave',
				);
				break;
			}

			if (bot.bank.isOpen()) {
				logger(state, 'debug', 'bank', 'Closing bank');
				bot.bank.close();
				break;
			}

			const selectedNecklace: number | undefined =
				necklaceCandidates.find((id) => bot.inventory.containsId(id));
			if (!selectedNecklace) {
				state.subState = 'get_to_bank';
				break;
			}

			logger(
				state,
				'debug',
				'webwalk',
				`Webwalking to ToG with necklace ${selectedNecklace}`,
			);
			bot.walking.webWalkStart(TOG_LOCATION);

			state.subState = '';
			state.mainState = MainStates.TALK_TO_JUNA;
			break;
		}
		default: {
			state.subState = 'get_to_bank';
			break;
		}
	}
};
