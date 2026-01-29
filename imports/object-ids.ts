// Object IDs
export const objectIds = {
	boxTrapLayed: net.runelite.api.ObjectID.BOX_TRAP_9380,
	boxTrap_Failed: net.runelite.api.ObjectID.BOX_TRAP_9385,
	boxTrap_Shaking: net.runelite.api.ObjectID.SHAKING_BOX_9383,
};

export const objectIdGroups = {
	boxTraps: [
		objectIds.boxTrapLayed,
		objectIds.boxTrap_Failed,
		objectIds.boxTrap_Shaking,
	],
};

// Dangerous object IDs (e.g., falling rocks/hazards)
export const dangerousObjectIds = {
	leviFallingRock: 29736,
	books: 1260,
};
