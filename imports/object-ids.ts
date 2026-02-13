// Object IDs
export const object = {
	boxTrapLayed: 9380,
	boxTrap_Failed: 9385,
	boxTrap_Shaking: 9383,
	leviHandHolds: 47593,
};

// Dangerous object IDs (e.g., falling rocks/hazards)
export const dangerousObjectIds = {
	leviFallingRocks: [2475, 2476, 2477, 2478, 2479],
	leviBoulder: 47590,
};

export function getObjectIdGroups() {
	return {
		boxTrap: [9380, 9385, 9383],
		boxTrap_Shaking: [9383],
		boxTrap_Failed: [9385],
		boxTrapLayed: [9380],
	};
}
