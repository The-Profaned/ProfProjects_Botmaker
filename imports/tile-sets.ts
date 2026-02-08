export const tileSets = {
	safeTileSets: {
		leviSafeTiles: [
			{ x: 0, y: 0, plane: 0 }, // placeholder
		],
		leviDebrisTiles: {
			north: [
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
			],
			south: [
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
			],
			east: [
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
			],
			west: [
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
				{ x: 0, y: 0, plane: 0 }, // placeholder
			],
		},
	},

	dangerousTileSets: {
		leviDangerTiles: [
			{ x: 2079, y: 6376, plane: 0 },
			{ x: 2080, y: 6376, plane: 0 },
			{ x: 2081, y: 6376, plane: 0 },
			{ x: 2082, y: 6376, plane: 0 },
			{ x: 2083, y: 6376, plane: 0 },
			{ x: 2079, y: 6368, plane: 0 },
			{ x: 2080, y: 6368, plane: 0 },
			{ x: 2081, y: 6368, plane: 0 },
			{ x: 2082, y: 6368, plane: 0 },
			{ x: 2083, y: 6368, plane: 0 },
			{ x: 2085, y: 6370, plane: 0 },
			{ x: 2085, y: 6371, plane: 0 },
			{ x: 2085, y: 6372, plane: 0 },
			{ x: 2085, y: 6373, plane: 0 },
			{ x: 2085, y: 6374, plane: 0 },
			{ x: 2077, y: 6370, plane: 0 },
			{ x: 2077, y: 6371, plane: 0 },
			{ x: 2077, y: 6372, plane: 0 },
			{ x: 2077, y: 6373, plane: 0 },
			{ x: 2077, y: 6374, plane: 0 },
		],
	},

	safeTiles: function (setName: keyof typeof this.safeTileSets) {
		return this.safeTileSets[setName] || [];
	},

	dangerousTiles: function (setName: keyof typeof this.dangerousTileSets) {
		return this.dangerousTileSets[setName] || [];
	},
};
