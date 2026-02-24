export type AreaBounds = {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
	plane: number;
};

export const MINIGAME_BOUNDS: AreaBounds = {
	minX: 3254,
	maxX: 3261,
	minY: 9514,
	maxY: 9520,
	plane: 2,
};

export const MINIGAME_START_BOUNDS: AreaBounds = {
	minX: 3241,
	maxX: 3252,
	minY: 9498,
	maxY: 9528,
	plane: 2,
};

export const TOG_LOCATION = new net.runelite.api.coords.WorldPoint(
	3250,
	9516,
	2,
);

export const JUNA_LOCATION = new net.runelite.api.coords.WorldPoint(
	3248,
	9516,
	2,
);
