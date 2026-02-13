import { ItemID } from './types.js';

// Consumable delays in ticks (1 tick = 600ms)
export const NORMAL_FOOD_DELAY = 3;
export const COMBO_FOOD_DELAY = 2;
export const POTION_DELAY = 3;

// Item ID's (inventory)
export const Item = {
	boxTrap: ItemID.BOX_TRAP,
	gamesNecklace1: ItemID.GAMES_NECKLACE1,
	gamesNecklace2: ItemID.GAMES_NECKLACE2,
	gamesNecklace3: ItemID.GAMES_NECKLACE3,
	gamesNecklace4: ItemID.GAMES_NECKLACE4,
	gamesNecklace5: ItemID.GAMES_NECKLACE5,
	gamesNecklace6: ItemID.GAMES_NECKLACE6,
	gamesNecklace7: ItemID.GAMES_NECKLACE7,
	gamesNecklace8: ItemID.GAMES_NECKLACE8,
};

export const gamesNecklace = [
	ItemID.GAMES_NECKLACE1,
	ItemID.GAMES_NECKLACE2,
	ItemID.GAMES_NECKLACE3,
	ItemID.GAMES_NECKLACE4,
	ItemID.GAMES_NECKLACE5,
	ItemID.GAMES_NECKLACE6,
	ItemID.GAMES_NECKLACE7,
	ItemID.GAMES_NECKLACE8,
];

// Gear-related Item ID's
export const gear = {
	tBow: ItemID.TWISTED_BOW,
	bowfa: ItemID.BOW_OF_FAERDHINEN,
	bowfac: ItemID.BOW_OF_FAERDHINEN_C,
	blowpipe: ItemID.TOXIC_BLOWPIPE,
	rcbow: ItemID.RUNE_CROSSBOW,
};

// Food Item ID's organized by delay type
export const food = {
	normalDelay: {
		delay: NORMAL_FOOD_DELAY,
		item: {
			monkFish: ItemID.MONKFISH,
			shark: ItemID.SHARK,
			mantaRay: ItemID.MANTA_RAY,
			anglerFish: ItemID.ANGLERFISH,
		},
	},
	comboDelay: {
		delay: COMBO_FOOD_DELAY,
		item: {
			karambwan: ItemID.COOKED_KARAMBWAN,
		},
	},
};

// All food items in an array for easy reference
export const allFoods = [
	food.normalDelay.item.monkFish,
	food.normalDelay.item.shark,
	food.normalDelay.item.mantaRay,
	food.normalDelay.item.anglerFish,
	food.comboDelay.item.karambwan,
];

// Potion Item ID's organized by delay type (all potions have same delay)
export const potion = {
	normalDelay: {
		delay: POTION_DELAY,
		item: {
			stamina_potion_1: ItemID.STAMINA_POTION1,
			stamina_potion_2: ItemID.STAMINA_POTION2,
			stamina_potion_3: ItemID.STAMINA_POTION3,
			stamina_potion_4: ItemID.STAMINA_POTION4,
			prayer_potion_1: ItemID.PRAYER_POTION1,
			prayer_potion_2: ItemID.PRAYER_POTION2,
			prayer_potion_3: ItemID.PRAYER_POTION3,
			prayer_potion_4: ItemID.PRAYER_POTION4,
			saradomin_brew_1: ItemID.SARADOMIN_BREW1,
			saradomin_brew_2: ItemID.SARADOMIN_BREW2,
			saradomin_brew_3: ItemID.SARADOMIN_BREW3,
			saradomin_brew_4: ItemID.SARADOMIN_BREW4,
			super_restore_1: ItemID.SUPER_RESTORE1,
			super_restore_2: ItemID.SUPER_RESTORE2,
			super_restore_3: ItemID.SUPER_RESTORE3,
			super_restore_4: ItemID.SUPER_RESTORE4,
			drange_potion_1: ItemID.DIVINE_RANGING_POTION1,
			drange_potion_2: ItemID.DIVINE_RANGING_POTION2,
			drange_potion_3: ItemID.DIVINE_RANGING_POTION3,
			drange_potion_4: ItemID.DIVINE_RANGING_POTION4,
		},
	},
};

// Groups of Item ID's That Are Related
export const potionGroups = {
	stam1_4: [
		potion.normalDelay.item.stamina_potion_1,
		potion.normalDelay.item.stamina_potion_2,
		potion.normalDelay.item.stamina_potion_3,
		potion.normalDelay.item.stamina_potion_4,
	],
	ppots1_4: [
		potion.normalDelay.item.prayer_potion_1,
		potion.normalDelay.item.prayer_potion_2,
		potion.normalDelay.item.prayer_potion_3,
		potion.normalDelay.item.prayer_potion_4,
	],
	brews1_4: [
		potion.normalDelay.item.saradomin_brew_1,
		potion.normalDelay.item.saradomin_brew_2,
		potion.normalDelay.item.saradomin_brew_3,
		potion.normalDelay.item.saradomin_brew_4,
	],
	restores1_4: [
		potion.normalDelay.item.super_restore_1,
		potion.normalDelay.item.super_restore_2,
		potion.normalDelay.item.super_restore_3,
		potion.normalDelay.item.super_restore_4,
	],
	drange1_4: [
		potion.normalDelay.item.drange_potion_1,
		potion.normalDelay.item.drange_potion_2,
		potion.normalDelay.item.drange_potion_3,
		potion.normalDelay.item.drange_potion_4,
	],
};

export const PRAYER_POTION_DOSES: Record<number, number> = {
	[potion.normalDelay.item.prayer_potion_1]: 1,
	[potion.normalDelay.item.prayer_potion_2]: 2,
	[potion.normalDelay.item.prayer_potion_3]: 3,
	[potion.normalDelay.item.prayer_potion_4]: 4,
};

export const SUPER_RESTORE_DOSES: Record<number, number> = {
	[potion.normalDelay.item.super_restore_1]: 1,
	[potion.normalDelay.item.super_restore_2]: 2,
	[potion.normalDelay.item.super_restore_3]: 3,
	[potion.normalDelay.item.super_restore_4]: 4,
};

export const DRANGE_POTION_DOSES: Record<number, number> = {
	[potion.normalDelay.item.drange_potion_1]: 1,
	[potion.normalDelay.item.drange_potion_2]: 2,
	[potion.normalDelay.item.drange_potion_3]: 3,
	[potion.normalDelay.item.drange_potion_4]: 4,
};
// All potions in an array for easy reference
export const allPotions = [
	...potionGroups.stam1_4,
	...potionGroups.ppots1_4,
	...potionGroups.brews1_4,
	...potionGroups.restores1_4,
	...potionGroups.drange1_4,
];

// Item Names for easier reference
export const potionNames = {
	stamina_potion1: 'Stamina potion(1)',
	stamina_potion2: 'Stamina potion(2)',
	stamina_potion3: 'Stamina potion(3)',
	stamina_potion4: 'Stamina potion(4)',
	prayer_potion1: 'Prayer potion(1)',
	prayer_potion2: 'Prayer potion(2)',
	prayer_potion3: 'Prayer potion(3)',
	prayer_potion4: 'Prayer potion(4)',
	saradomin_brew1: 'Saradomin brew(1)',
	saradomin_brew2: 'Saradomin brew(2)',
	saradomin_brew3: 'Saradomin brew(3)',
	saradomin_brew4: 'Saradomin brew(4)',
	super_restore1: 'Super restore(1)',
	super_restore2: 'Super restore(2)',
	super_restore3: 'Super restore(3)',
	super_restore4: 'Super restore(4)',
	drange_potion1: 'Divine ranging potion(1)',
	drange_potion2: 'Divine ranging potion(2)',
	drange_potion3: 'Divine ranging potion(3)',
	drange_potion4: 'Divine ranging potion(4)',
};

// Groups of Item Names That Are Related
export const potionNameGroups = {
	stam1_4: [
		'Stamina potion(1)',
		'Stamina potion(2)',
		'Stamina potion(3)',
		'Stamina potion(4)',
	],
	ppots1_4: [
		'Prayer potion(1)',
		'Prayer potion(2)',
		'Prayer potion(3)',
		'Prayer potion(4)',
	],
	brews1_4: [
		'Saradomin brew(1)',
		'Saradomin brew(2)',
		'Saradomin brew(3)',
		'Saradomin brew(4)',
	],
	restores1_4: [
		'Super restore(1)',
		'Super restore(2)',
		'Super restore(3)',
		'Super restore(4)',
	],
	drange1_4: [
		'Divine ranging potion(1)',
		'Divine ranging potion(2)',
		'Divine ranging potion(3)',
		'Divine ranging potion(4)',
	],
};
