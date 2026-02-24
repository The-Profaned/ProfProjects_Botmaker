import {
	BANK_DEPOSIT_WIDGET_ID,
	BANK_DEPOSIT_WIDGET_IDENTIFIER,
	BANK_DEPOSIT_WIDGET_OPCODE,
	BANK_DEPOSIT_WIDGET_PARAM0,
	GlassMakeMode,
	GLASSBLOWING_PIPE_ITEM_ID,
	MOLTEN_GLASS_ITEM_ID,
	SEAWEED_SPORE_ITEM_ID,
	TARGET_MOLTEN_GLASS_NORMAL_MODE,
	TARGET_MOLTEN_GLASS_SEAWEED_MODE,
} from '../constants.js';
import { logBank } from '../logging.js';
import { findClosestBankObject, getMoltenGlassCount } from '../glass-utils.js';
import { MainStates, state } from '../script-state.js';

const openBankIfNeeded = (): boolean => {
	if (bot.bank.isOpen()) return true;
	if (state.bankCloseRequested) return false;

	state.depositedThisBankOpen = false;

	const bankObject = findClosestBankObject();
	if (!bankObject) {
		logBank('Bank object not found.');
		return false;
	}

	if (bot.localPlayerMoving()) return false;
	bot.objects.interactSuppliedObject(bankObject, 'Use');
	state.ticksUntilNextAction = 2;
	return false;
};

const depositInventoryViaWidget = (): void => {
	bot.widgets.interactSpecifiedWidget(
		BANK_DEPOSIT_WIDGET_ID,
		BANK_DEPOSIT_WIDGET_IDENTIFIER,
		BANK_DEPOSIT_WIDGET_OPCODE,
		BANK_DEPOSIT_WIDGET_PARAM0,
	);
};

const getMoltenCapacity = (): number => {
	const inventory = client.getItemContainer(
		net.runelite.api.InventoryID.INVENTORY,
	);
	if (!inventory) return 0;

	const items = inventory.getItems();
	let nonMoltenOccupiedSlots = 0;
	for (const item of items) {
		if (!item) continue;
		const itemId = item.getId();
		if (itemId <= 0) continue;
		if (itemId === MOLTEN_GLASS_ITEM_ID) continue;
		nonMoltenOccupiedSlots += 1;
	}

	return Math.max(28 - nonMoltenOccupiedSlots, 0);
};

const ensureRequiredSupportItemsInInventory = (): boolean => {
	const hasPipe: boolean = bot.inventory.containsId(
		GLASSBLOWING_PIPE_ITEM_ID,
	);
	if (!hasPipe) {
		const pipeInBank: number = bot.bank.getQuantityOfId(
			GLASSBLOWING_PIPE_ITEM_ID,
		);
		if (pipeInBank <= 0) {
			const warningMessage: string =
				'Missing Glassblowing pipe in inventory and bank. Stopping script.';
			logBank(warningMessage);
			log.printGameMessage(`[profGlassBlowing] ${warningMessage}`);
			bot.terminate();
			return false;
		}

		bot.bank.withdrawQuantityWithId(GLASSBLOWING_PIPE_ITEM_ID, 1);
		return false;
	}

	if (state.selectedMode !== GlassMakeMode.CRAFT_PLUS_SPORES) return true;

	const hasSeaweedSpore: boolean = bot.inventory.containsId(
		SEAWEED_SPORE_ITEM_ID,
	);
	if (hasSeaweedSpore) return true;

	const seaweedSporeInBank: number = bot.bank.getQuantityOfId(
		SEAWEED_SPORE_ITEM_ID,
	);
	if (seaweedSporeInBank <= 0) {
		const warningMessage: string =
			'Missing Seaweed spore in inventory and bank. Stopping script.';
		logBank(warningMessage);
		log.printGameMessage(`[profGlassBlowing] ${warningMessage}`);
		bot.terminate();
		return false;
	}

	bot.bank.withdrawQuantityWithId(SEAWEED_SPORE_ITEM_ID, 1);
	return false;
};

export const Banking = (): void => {
	if (state.ticksUntilNextAction > 0) {
		state.ticksUntilNextAction--;
		return;
	}

	if (state.selectedMode === GlassMakeMode.SPORES_ONLY) {
		state.mainState = MainStates.TRAVEL_TO_ROWBOAT;
		return;
	}

	if (state.bankCloseRequested) {
		if (bot.bank.isOpen()) {
			bot.bank.close();
			return;
		}

		state.bankCloseRequested = false;
		state.depositedThisBankOpen = false;
		state.hasClickedRowboat = false;
		state.hasTriggeredGlassblow = false;
		state.mainState =
			state.selectedMode === GlassMakeMode.CRAFT_PLUS_SPORES
				? MainStates.TRAVEL_TO_ROWBOAT
				: MainStates.GLASSBLOWING;
		return;
	}

	if (!openBankIfNeeded()) return;

	if (!state.depositedThisBankOpen) {
		depositInventoryViaWidget();
		state.depositedThisBankOpen = true;
		return;
	}

	if (!ensureRequiredSupportItemsInInventory()) return;

	const targetMoltenGlass: number =
		state.selectedMode === GlassMakeMode.CRAFT_PLUS_SPORES
			? TARGET_MOLTEN_GLASS_SEAWEED_MODE
			: TARGET_MOLTEN_GLASS_NORMAL_MODE;
	const capacityTarget: number = Math.min(
		targetMoltenGlass,
		getMoltenCapacity(),
	);

	const moltenGlassCount = getMoltenGlassCount();
	if (moltenGlassCount > capacityTarget) {
		depositInventoryViaWidget();
		return;
	}

	if (moltenGlassCount < capacityTarget) {
		const needed = capacityTarget - moltenGlassCount;
		const available = bot.bank.getQuantityOfId(MOLTEN_GLASS_ITEM_ID);
		if (available < needed) {
			logBank('Bank is out of molten glass. Stopping script.');
			bot.terminate();
			return;
		}

		bot.bank.withdrawQuantityWithId(MOLTEN_GLASS_ITEM_ID, needed);
		return;
	}

	state.bankCloseRequested = true;
	bot.bank.close();
};
