import {
	DEPOSIT_BOX_OBJECT_ID,
	ROCK_CONFIGS,
	RockType,
	type Coordinate,
	type RockConfig,
} from './constants.js';
import type { MinerScriptState } from './script-state.js';

export const toWorldPoint = (
	coordinate: Coordinate,
): net.runelite.api.coords.WorldPoint =>
	new net.runelite.api.coords.WorldPoint(
		coordinate.x,
		coordinate.y,
		coordinate.plane,
	);

export const getActiveRockConfig = (state: MinerScriptState): RockConfig =>
	ROCK_CONFIGS[state.activeRockType];

export const getRockConfig = (rockType: RockType): RockConfig =>
	ROCK_CONFIGS[rockType];

const isCoordinateMatch = (
	worldPoint: net.runelite.api.coords.WorldPoint,
	coordinate: Coordinate,
): boolean =>
	worldPoint.getX() === coordinate.x &&
	worldPoint.getY() === coordinate.y &&
	worldPoint.getPlane() === coordinate.plane;

export const isInventoryFull = (): boolean => {
	const inventory = client.getItemContainer(
		net.runelite.api.InventoryID.INVENTORY,
	);
	if (!inventory) return false;

	const items = inventory.getItems();
	if (!items || items.length === 0) return false;

	let occupiedSlots = 0;
	for (const item of items) {
		if (!item) continue;
		if (item.getId() <= 0) continue;
		occupiedSlots += 1;
	}

	return occupiedSlots >= 28;
};

const findClosestRockAtConfiguredLocationsByConfig = (
	rockConfig: RockConfig,
): net.runelite.api.TileObject | null => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return null;

	const rocks: net.runelite.api.TileObject[] =
		bot.objects.getTileObjectsWithIds([rockConfig.objectId]);
	if (!rocks || rocks.length === 0) return null;

	const playerLocation = player.getWorldLocation();
	let closestRock: net.runelite.api.TileObject | null = null;
	let closestDistance: number = Number.POSITIVE_INFINITY;

	for (const rock of rocks) {
		if (!rock) continue;

		const rockLocation = rock.getWorldLocation();
		if (!rockLocation) continue;

		const isConfiguredLocation = rockConfig.locations.some((location) =>
			isCoordinateMatch(rockLocation, location),
		);
		if (!isConfiguredLocation) continue;

		const distance = playerLocation.distanceTo(rockLocation);
		if (distance >= closestDistance) continue;

		closestDistance = distance;
		closestRock = rock;
	}

	return closestRock;
};

export const findClosestRockAtConfiguredLocations = (
	state: MinerScriptState,
): net.runelite.api.TileObject | null => {
	const activeRockConfig = getActiveRockConfig(state);
	return findClosestRockAtConfiguredLocationsByConfig(activeRockConfig);
};

export const findClosestRockAtConfiguredLocationsByType = (
	rockType: RockType,
): net.runelite.api.TileObject | null => {
	const rockConfig = getRockConfig(rockType);
	return findClosestRockAtConfiguredLocationsByConfig(rockConfig);
};

export const findClosestDepositBox = (): net.runelite.api.TileObject | null => {
	const player: net.runelite.api.Player | null = client.getLocalPlayer();
	if (!player) return null;

	const depositBoxes: net.runelite.api.TileObject[] =
		bot.objects.getTileObjectsWithIds([DEPOSIT_BOX_OBJECT_ID]);
	if (!depositBoxes || depositBoxes.length === 0) return null;

	const playerLocation = player.getWorldLocation();
	let closestDepositBox: net.runelite.api.TileObject | null = null;
	let closestDistance: number = Number.POSITIVE_INFINITY;

	for (const depositBox of depositBoxes) {
		if (!depositBox) continue;

		const depositLocation = depositBox.getWorldLocation();
		if (!depositLocation) continue;

		const distance = playerLocation.distanceTo(depositLocation);
		if (distance >= closestDistance) continue;

		closestDistance = distance;
		closestDepositBox = depositBox;
	}

	return closestDepositBox;
};
