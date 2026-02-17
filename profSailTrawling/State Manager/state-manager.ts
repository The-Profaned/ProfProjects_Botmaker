import type { State } from '../../imports/types.js';
import { logger } from '../../imports/logger.js';
import { Movement } from './State/movement.js';
import { Fishing } from './State/fishing.js';
import { Boat } from './State/boat.js';
import { Banking } from './State/banking.js';

// Main state enum
export enum MainStates {
	MOVEMENT = 'MOVEMENT',
	FISHING = 'FISHING',
	BOAT = 'BOAT',
	BANKING = 'BANKING',
}

// Sub-state enums
export enum MovementSubStates {
	MOVEMENT = 'MOVEMENT',
	PATHING = 'PATHING',
}

export enum FishingSubStates {
	FISHING = 'FISHING',
	TRAWLING = 'TRAWLING',
}

export enum BoatSubStates {
	BOAT = 'BOAT',
	DECKHAND = 'DECKHAND',
	FACILITY = 'FACILITY',
	LOOT = 'LOOT',
}

export enum BankingSubStates {
	BANK = 'BANK',
	INVENTORY = 'INVENTORY',
}

// Nested state types
export type MovementState = {
	subState: MovementSubStates;
};

export type FishingState = {
	subState: FishingSubStates;
};

export type BoatState = {
	subState: BoatSubStates;
};

export type BankingState = {
	subState: BankingSubStates;
};

// Main state type with nested sub-states
export type SailTrawlingState = State & {
	mainState: MainStates;
	movementState: MovementState;
	fishingState: FishingState;
	boatState: BoatState;
	bankingState: BankingState;
};

// Script state
export const state: SailTrawlingState = {
	debugEnabled: true,
	debugFullState: false,
	failureCounts: {},
	failureOrigin: '',
	lastFailureKey: '',
	mainState: MainStates.MOVEMENT,
	scriptInitalized: false,
	scriptName: 'profSailTrawling',
	uiCompleted: false,
	timeout: 0,
	gameTick: 0,
	subState: '', // For base State compatibility
	movementState: {
		subState: MovementSubStates.MOVEMENT,
	},
	fishingState: {
		subState: FishingSubStates.FISHING,
	},
	boatState: {
		subState: BoatSubStates.BOAT,
	},
	bankingState: {
		subState: BankingSubStates.BANK,
	},
};

// Script Decision Manager
export function stateManager() {
	logger(state, 'debug', 'stateManager', `${state.mainState}`);

	switch (state.mainState) {
		case MainStates.MOVEMENT: {
			Movement();
			break;
		}
		case MainStates.FISHING: {
			Fishing();
			break;
		}
		case MainStates.BOAT: {
			Boat();
			break;
		}
		case MainStates.BANKING: {
			Banking();
			break;
		}
	}
}
