import { logger } from '../../imports/logger.js';
import { getWornEquipment } from '../../imports/player-functions.js';
import { isPlayerInArea } from '../../imports/location-functions.js';
import type { State } from '../../imports/types.js';
import { getTearsStateFlags, setTearsStateFlags } from '../tear-utils.js';
import { MINIGAME_BOUNDS, type AreaBounds } from './constants.js';
import { state } from './script-state.js';

export type TickContext = {
	currentTick: number;
	minigameActive: boolean;
};

const isPlayerInAreaTyped = isPlayerInArea as (
	scriptState: State,
	minX: number,
	maxX: number,
	minY: number,
	maxY: number,
	plane?: number,
) => boolean;

export const isPlayerInBounds = (bounds: AreaBounds): boolean =>
	isPlayerInAreaTyped(
		state,
		bounds.minX,
		bounds.maxX,
		bounds.minY,
		bounds.maxY,
		bounds.plane,
	);

const updateMinigameState = (): boolean => {
	const flags = getTearsStateFlags();
	const minigameActive: boolean = isPlayerInBounds(MINIGAME_BOUNDS);

	if (minigameActive !== flags.minigameActive) {
		setTearsStateFlags({
			...flags,
			minigameActive,
		});
	}

	if (minigameActive) {
		state.minigameEntered = true;
	}

	return minigameActive;
};

const handleMinigameEnded = (minigameActive: boolean): boolean => {
	if (minigameActive) return false;
	if (!state.minigameEntered) return false;
	if (state.scriptEnding) return true;

	state.scriptEnding = true;
	logger(
		state,
		'debug',
		'timer',
		'Player left minigame area. Stopping script.',
	);
	bot.terminate();
	return true;
};

export const getTickContext = (): TickContext | null => {
	const player = client.getLocalPlayer();
	if (!player) return null;

	const currentTick: number = client.getTickCount();
	const minigameActive: boolean = updateMinigameState();
	if (handleMinigameEnded(minigameActive)) return null;

	return { currentTick, minigameActive };
};

export const unequipWeaponOffhand = (): boolean => {
	if (state.pendingUnequipItemIds.length === 0) {
		const equipment: Record<string, number> = getWornEquipment(state);
		state.pendingUnequipItemIds = ['weapon', 'shield']
			.map((slot) => equipment[slot])
			.filter(
				(value): value is number =>
					value !== undefined && value !== null,
			);
	}

	const requiredSlots: number = state.pendingUnequipItemIds.length;
	if (requiredSlots === 0) return true;

	const emptySlots: number = bot.inventory.getEmptySlots();
	if (emptySlots < requiredSlots) {
		logger(
			state,
			'all',
			'equipment',
			`Need at least ${requiredSlots} empty inventory slot${requiredSlots === 1 ? '' : 's'} to unequip weapon and offhand.`,
		);
		return false;
	}

	for (const itemId of state.pendingUnequipItemIds) {
		if (bot.equipment.containsId(itemId)) {
			bot.equipment.unequip(itemId);
		}
	}

	const remainingIds: number[] = state.pendingUnequipItemIds.filter((id) =>
		bot.equipment.containsId(id),
	);
	if (remainingIds.length === 0) {
		state.pendingUnequipItemIds = [];
		return true;
	}

	return false;
};
