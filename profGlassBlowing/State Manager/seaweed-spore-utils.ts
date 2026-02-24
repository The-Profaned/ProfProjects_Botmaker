import { SEAWEED_SPORE_ITEM_ID } from './constants.js';

export type TileItemWithLoot = bot.TileItemInfo;

const getTileItemId = (tileItem: TileItemWithLoot): number | null => {
	const tileItemEntity: net.runelite.api.TileItem | undefined = tileItem.item;
	if (tileItemEntity && typeof tileItemEntity.getId === 'function')
		return tileItemEntity.getId();

	const fallbackTileItem = tileItem as unknown as {
		getId?: () => number;
		getItemId?: () => number;
	};
	if (typeof fallbackTileItem.getId === 'function')
		return fallbackTileItem.getId();
	if (typeof fallbackTileItem.getItemId === 'function')
		return fallbackTileItem.getItemId();
	return null;
};

export const getClosestSeaweedSpore = (): TileItemWithLoot | null => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return null;
	const playerLocation = player.getWorldLocation();
	const items: bot.TileItemInfo[] = bot.tileItems.getItemsWithIds([
		SEAWEED_SPORE_ITEM_ID,
	]);
	if (!items || items.length === 0) return null;

	let closest: TileItemWithLoot | null = null;
	let closestDistance: number = Number.POSITIVE_INFINITY;
	for (const tileItem of items) {
		const itemId = getTileItemId(tileItem);
		if (itemId !== SEAWEED_SPORE_ITEM_ID) continue;
		const tile = tileItem.tile;
		if (!tile) continue;
		const location = tile.getWorldLocation();
		if (!location) continue;
		if (location.getPlane() !== playerLocation.getPlane()) continue;
		const distance = playerLocation.distanceTo(location);
		if (distance >= closestDistance) continue;
		closestDistance = distance;
		closest = tileItem;
	}

	return closest;
};
