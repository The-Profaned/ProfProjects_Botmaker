/* eslint-disable unicorn/no-for-loop */
import {
	FELLING_AXE_ANIMATION_ID,
	LOG_BASCKET_ID,
	WOODCUTTING_ANIMATION_ID,
} from '../constants.js';
import { logObject, logState, logWoodcutting, logSpecial } from '../logging.js';
import { state, MainStates } from '../script-state.js';

const findClosestAvailableTree = (): net.runelite.api.TileObject | null => {
	const treeObjects: net.runelite.api.TileObject[] =
		bot.objects.getTileObjectsWithIds([state.activeTreeObjectId]);
	if (!treeObjects) {
		logObject(`No ${state.treeTypeName.toLowerCase()} trees found`);
		return null;
	}

	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return null;

	const playerLoc: net.runelite.api.coords.WorldPoint =
		player.getWorldLocation();
	let closest: net.runelite.api.TileObject | null = null;
	let closestDistance: number = Number.POSITIVE_INFINITY;

	for (let index = 0; index < treeObjects.length; index++) {
		const tree = treeObjects[index];
		if (!tree) continue;
		const treeLoc = tree.getWorldLocation();
		if (!treeLoc) continue;

		const distance: number = playerLoc.distanceTo(treeLoc);
		if (distance < closestDistance) {
			closestDistance = distance;
			closest = tree;
		}
	}

	return closest;
};

const isInventoryFull = (): boolean => {
	const inventory = client.getItemContainer(
		net.runelite.api.InventoryID.INVENTORY,
	);
	if (!inventory) return false;

	const items = inventory.getItems();
	if (!items) return false;

	let basketCount: number = 0;
	let logsCount: number = 0;

	for (let index = 0; index < items.length; index++) {
		const item = items[index];
		if (!item) continue;

		if (item.getId() === LOG_BASCKET_ID) {
			basketCount += item.getQuantity();
		} else if (item.getId() === state.activeLogsItemId) {
			logsCount += item.getQuantity();
		}
	}

	if (basketCount >= 1) {
		const isFullWithBasket: boolean = logsCount >= 27;
		if (isFullWithBasket) {
			logWoodcutting(
				`Inventory full: ${basketCount}x log basket, ${logsCount}x logs (with basket)`,
			);
		}
		return isFullWithBasket;
	}

	const isFullWithoutBasket: boolean = logsCount >= 28;
	if (isFullWithoutBasket) {
		logWoodcutting(
			`Inventory full: ${logsCount}x logs (no basket, full inventory)`,
		);
	}
	return isFullWithoutBasket;
};

export const Woodcutting = (): void => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return;

	if (isInventoryFull()) {
		logState('Inventory full, moving to bank');
		// If camphor tree, need to travel to bank due to terrain obstacles
		if (state.treeTypeName === 'Camphor') {
			state.mainState = MainStates.TRAVELING;
			state.isTravelingToBank = true;
			state.travelingStep = 0;
		} else {
			state.mainState = MainStates.MOVING_TO_BANK;
		}
		return;
	}

	const currentAnimation: number = player.getAnimation();
	const wasAnimating: boolean = state.isCurrentlyAnimating;
	state.isCurrentlyAnimating =
		currentAnimation === WOODCUTTING_ANIMATION_ID ||
		currentAnimation === FELLING_AXE_ANIMATION_ID;

	if (!wasAnimating && state.isCurrentlyAnimating) {
		logObject('Animation started - interaction successful');
		state.hasInteractedWithTree = false;
		state.idleTicks = 0;
		state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
	}

	if (wasAnimating && !state.isCurrentlyAnimating) {
		logObject('Animation ended, waiting before next action');
		state.hasInteractedWithTree = false;
		state.justUsedSpecialAttack = false;
		state.idleTicks = 0;
		state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
		state.ticksUntilNextAction = Math.floor(Math.random() * 7) + 2;
		logObject(
			`Waiting ${state.ticksUntilNextAction} ticks before next action`,
		);
	}

	const isIdle: boolean =
		!state.isCurrentlyAnimating && !bot.localPlayerMoving();
	if (isIdle) {
		state.idleTicks++;
	} else {
		state.idleTicks = 0;
	}

	if (state.idleTicks >= state.idleResetThreshold) {
		logObject(
			`Idle for ${state.idleTicks} ticks in woodcutting, resetting tree interaction`,
		);
		state.hasInteractedWithTree = false;
		state.justUsedSpecialAttack = false;
		state.ticksUntilNextAction = 0;
		state.idleTicks = 0;
		state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
	}

	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	if (state.justUsedSpecialAttack) {
		logSpecial(
			'Skipping tree interaction after special attack - game will auto re-interact',
		);
		return;
	}

	if (bot.walking.isWebWalking() || bot.localPlayerMoving()) {
		return;
	}

	if (!state.isCurrentlyAnimating && !state.hasInteractedWithTree) {
		const tree: net.runelite.api.TileObject | null =
			findClosestAvailableTree();
		if (!tree) {
			logObject('No available trees found');
			return;
		}

		const treeLoc = tree.getWorldLocation();
		logObject(`Found tree at (${treeLoc.getX()}, ${treeLoc.getY()})`);

		const reCheckAnimation: number = player.getAnimation();
		const isAlreadyAnimating: boolean =
			reCheckAnimation === WOODCUTTING_ANIMATION_ID ||
			reCheckAnimation === FELLING_AXE_ANIMATION_ID;
		if (isAlreadyAnimating) {
			logObject('Already animating, skipping tree interaction');
			state.hasInteractedWithTree = false;
			return;
		}

		bot.objects.interactSuppliedObject(tree, 'Chop down');
		state.hasInteractedWithTree = true;
		state.idleTicks = 0;
		state.idleResetThreshold = Math.floor(Math.random() * 6) + 10;
		logObject('Interacting with tree');
	}
};
