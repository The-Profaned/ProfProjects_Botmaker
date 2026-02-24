import { logger } from '../../imports/logger.js';
import { Item } from '../../imports/item-ids.js';
import { utilFunctions, utilState } from '../util-functions.js';
import { profChinsUI } from '../ui.js';
import { MainStates, state } from './script-state.js';

let lastLoggedState: MainStates | '' = '';
let lastResetTrapsTick: number = -2;
const RESET_TRAPS_COOLDOWN: number = 2;

const setCurrentAction = (action: string): void => {
	if (profChinsUI.currentAction !== action) {
		profChinsUI.currentAction = action;
	}
};

const tryResetTraps = (): void => {
	if (state.gameTick - lastResetTrapsTick < RESET_TRAPS_COOLDOWN) {
		return;
	}
	lastResetTrapsTick = state.gameTick;
	utilFunctions.resetTraps();
};

export function stateManager(
	trapsOnGround: number,
	criticalTrapCheck: boolean,
	needsAttentionCheck: boolean,
	maxAllowedTraps: number,
): void {
	try {
		if (state.mainState !== lastLoggedState) {
			logger(
				state,
				'debug',
				'stateManager',
				`State changed to: ${state.mainState}`,
			);
			lastLoggedState = state.mainState;
		}

		switch (state.mainState) {
			case MainStates.START_STATE: {
				try {
					setCurrentAction('Starting...');
					const trapCount: number = bot.inventory.getQuantityOfId(
						Item.boxTrap,
					);
					if (!trapCount && trapCount !== 0) {
						log.printGameMessage(
							'ERROR: Could not get trap quantity from inventory',
						);
						bot.terminate();
						return;
					}
					if (trapCount >= maxAllowedTraps) {
						state.mainState = MainStates.INITIAL_TRAPS;
					} else {
						setCurrentAction('Error: Not enough traps');
						logger(
							state,
							'debug',
							'stateManager',
							`Not enough box traps (have ${trapCount}, need ${maxAllowedTraps})`,
						);
						bot.terminate();
					}
				} catch (error) {
					log.printGameMessage(
						`ERROR in start_state: ${String(error)}`,
					);
					bot.terminate();
				}
				break;
			}
			case MainStates.INITIAL_TRAPS: {
				const action: string = 'Laying initial traps';
				if (profChinsUI.currentAction !== action) {
					setCurrentAction(action);
					logger(
						state,
						'debug',
						'stateManager',
						'Placing initial traps.',
					);
				}
				if (trapsOnGround >= maxAllowedTraps) {
					state.mainState = MainStates.AWAITING_ACTIVITY;
					utilState.layingLocationIndex = 0;
					return;
				}
				utilFunctions.layingInitialTraps(
					maxAllowedTraps,
					trapsOnGround,
				);
				break;
			}
			case MainStates.AWAITING_ACTIVITY: {
				const action: string = 'Awaiting trap activity';
				if (profChinsUI.currentAction !== action) {
					setCurrentAction(action);
					logger(
						state,
						'debug',
						'stateManager',
						'Awaiting trap activity.',
					);
				}

				if (!utilState.resetInProgress && criticalTrapCheck) {
					state.mainState = MainStates.CRITICAL_TRAP_HANDLING;
				} else if (utilState.resetInProgress) {
					state.mainState = MainStates.RESETTING_TRAPS;
				} else if (needsAttentionCheck) {
					state.mainState = MainStates.RESETTING_TRAPS;
				}
				break;
			}
			case MainStates.CRITICAL_TRAP_HANDLING: {
				const action: string = 'Maintaining traps';
				if (profChinsUI.currentAction !== action) {
					setCurrentAction(action);
				}

				if (!utilState.resetInProgress && criticalTrapCheck) {
					tryResetTraps();
				} else {
					state.mainState = MainStates.MAINTAINING_TRAPS;
				}
				break;
			}
			case MainStates.RESETTING_TRAPS: {
				const action: string = 'Maintaining traps';
				if (profChinsUI.currentAction !== action) {
					setCurrentAction(action);
				}

				tryResetTraps();

				if (!utilState.resetInProgress) {
					state.mainState = MainStates.MAINTAINING_TRAPS;
				}
				break;
			}
			case MainStates.MAINTAINING_TRAPS: {
				state.mainState = MainStates.AWAITING_ACTIVITY;
				break;
			}
			default: {
				state.mainState = MainStates.START_STATE;
				break;
			}
		}
	} catch {
		log.printGameMessage('CRITICAL ERROR in stateManager.');
		logger(state, 'all', 'stateManager', 'Critical error in stateManager.');
		bot.terminate();
	}
}
