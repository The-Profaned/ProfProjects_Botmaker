// Item ID's
export const itemIds = {
	stamina_potion_1: net.runelite.api.ItemID.STAMINA_POTION1,
	stamina_potion_2: net.runelite.api.ItemID.STAMINA_POTION2,
	stamina_potion_3: net.runelite.api.ItemID.STAMINA_POTION3,
	stamina_potion_4: net.runelite.api.ItemID.STAMINA_POTION4,
	boxTrap: net.runelite.api.ItemID.BOX_TRAP,
	tBow: net.runelite.api.ItemID.TWISTED_BOW,
};

// Group Item ID's
export const itemGroupIds = {
	staminas1_4: [
		itemIds.stamina_potion_1,
		itemIds.stamina_potion_2,
		itemIds.stamina_potion_3,
		itemIds.stamina_potion_4,
	],
};

export const itemNames = {
	stamina_potion1: 'Stamina potion(1)',
	stamina_potion2: 'Stamina potion(2)',
	stamina_potion3: 'Stamina potion(3)',
	stamina_potion4: 'Stamina potion(4)',
};

export const itemNameGroups = {
	staminas1_4: [
		'Stamina potion(1)',
		'Stamina potion(2)',
		'Stamina potion(3)',
		'Stamina potion(4)',
	],
};
