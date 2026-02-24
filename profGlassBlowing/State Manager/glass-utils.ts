import {
	ANCHOR_ROPE_OBJECT_ID,
	BANK_OBJECT_ID,
	BANK_RETURN_TILE,
	GlassMakeMode,
	GLASSBLOWING_PIPE_ITEM_ID,
	ISLAND_ARRIVAL_TILE,
	MOLTEN_GLASS_ITEM_ID,
	ROWBOAT_OBJECT_ID,
	SEAWEED_SPORE_ITEM_ID,
} from './constants.js';
import { logGlass } from './logging.js';

export type Coordinate = {
	x: number;
	y: number;
	plane: number;
};

export const isAtCoordinate = (coordinate: Coordinate): boolean => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return false;
	const location = player.getWorldLocation();
	return (
		location.getX() === coordinate.x &&
		location.getY() === coordinate.y &&
		location.getPlane() === coordinate.plane
	);
};

export const distanceToCoordinate = (coordinate: Coordinate): number => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return Number.POSITIVE_INFINITY;
	const location = player.getWorldLocation();
	const dx = Math.abs(location.getX() - coordinate.x);
	const dy = Math.abs(location.getY() - coordinate.y);
	return Math.max(dx, dy);
};

export const isAtIslandArrival = (): boolean =>
	isAtCoordinate(ISLAND_ARRIVAL_TILE);

export const isAtBankReturnTile = (): boolean =>
	isAtCoordinate(BANK_RETURN_TILE);

export const hasRequiredLockedItems = (mode: GlassMakeMode): boolean => {
	if (mode === GlassMakeMode.SPORES_ONLY) return true;

	const hasPipe: boolean = bot.inventory.containsId(
		GLASSBLOWING_PIPE_ITEM_ID,
	);
	if (!hasPipe) return false;

	if (mode !== GlassMakeMode.CRAFT_PLUS_SPORES) return true;
	return bot.inventory.containsId(SEAWEED_SPORE_ITEM_ID);
};

export const getMoltenGlassCount = (): number =>
	bot.inventory.getQuantityOfId(MOLTEN_GLASS_ITEM_ID);

export const hasMoltenGlass = (): boolean => getMoltenGlassCount() > 0;

export const findClosestObjectById = (
	objectId: number,
): net.runelite.api.TileObject | null => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return null;
	const objects: net.runelite.api.TileObject[] =
		bot.objects.getTileObjectsWithIds([objectId]);
	if (!objects || objects.length === 0) return null;
	const playerLocation = player.getWorldLocation();
	let closest: net.runelite.api.TileObject | null = null;
	let closestDistance: number = Number.POSITIVE_INFINITY;
	for (const object of objects) {
		if (!object) continue;
		const location = object.getWorldLocation();
		if (!location) continue;
		const distance = playerLocation.distanceTo(location);
		if (distance >= closestDistance) continue;
		closestDistance = distance;
		closest = object;
	}
	return closest;
};

export const findClosestBankObject = (): net.runelite.api.TileObject | null =>
	findClosestObjectById(BANK_OBJECT_ID);

export const findClosestRowboat = (): net.runelite.api.TileObject | null =>
	findClosestObjectById(ROWBOAT_OBJECT_ID);

export const findClosestAnchorRope = (): net.runelite.api.TileObject | null =>
	findClosestObjectById(ANCHOR_ROPE_OBJECT_ID);

export const triggerGlassblowAction = (): boolean => {
	logGlass(`[TRIGGER GLASSBLOW] Starting glassblowing action`);

	if (!bot.inventory.containsId(GLASSBLOWING_PIPE_ITEM_ID)) {
		logGlass(
			`[TRIGGER GLASSBLOW] ✗ Inventory does not contain pipe ID ${GLASSBLOWING_PIPE_ITEM_ID}`,
		);
		return false;
	}

	if (!bot.inventory.containsId(MOLTEN_GLASS_ITEM_ID)) {
		logGlass(
			`[TRIGGER GLASSBLOW] ✗ Inventory does not contain molten glass ID ${MOLTEN_GLASS_ITEM_ID}`,
		);
		return false;
	}

	logGlass(
		`[TRIGGER GLASSBLOW] Using itemOnItemWithIds: pipe (${GLASSBLOWING_PIPE_ITEM_ID}) -> molten glass (${MOLTEN_GLASS_ITEM_ID})`,
	);

	bot.inventory.itemOnItemWithIds(
		GLASSBLOWING_PIPE_ITEM_ID,
		MOLTEN_GLASS_ITEM_ID,
	);

	logGlass(`[TRIGGER GLASSBLOW] ✓ Glassblowing action triggered`);
	return true;
};
