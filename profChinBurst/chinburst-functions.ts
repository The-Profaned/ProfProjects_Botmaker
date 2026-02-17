import { potion } from '../imports/item-ids.js';
import { logger } from '../imports/logger.js';
import { shuffle } from '../imports/utility-functions.js';
import type { State } from '../imports/types.js';
import type { profChinBurstUI } from './ui.js';

export type ChinBurstConstants = {
	startLocation: net.runelite.api.coords.WorldPoint;
	enterObjectId: number;
	enterAction: string;
	attackAnimation: number;
	tenMinutesTicks: number;
	quickPrayerVarbit: number;
	path: net.runelite.api.coords.WorldPoint[];
	combatTileA: net.runelite.api.coords.WorldPoint;
	combatTileB: net.runelite.api.coords.WorldPoint;
	resetTiles: net.runelite.api.coords.WorldPoint[];
	prayerPotions: number[];
	divineRangingPotions: number[];
	potionNameById: Record<number, string>;
	funnyLogs: string[];
	obliterationLogs: string[];
};

export type ChinBurstRuntime = {
	pathIndex: number;
	combatTarget: net.runelite.api.coords.WorldPoint;
	jitterRemaining: number;
	cycleStartTick: number | null;
	lastAttackTick: number | null;
	attackAnimationCount: number;
	hasDrankRangePotion: boolean;
	resetTarget: net.runelite.api.coords.WorldPoint | null;
	returningFromReset: boolean;
	totalChinsThrown: number;
	lastLoggedState: string | null;
	lastActionLogTick: number | null;
	lastResetIndex: number | null;
	nextChinMilestone: number;
	funnyLogOrder: number[];
	funnyLogIndex: number;
	obliterationLogOrder: number[];
	obliterationLogIndex: number;
};

export const CHINBURST_CONSTANTS: ChinBurstConstants = {
	startLocation: new net.runelite.api.coords.WorldPoint(2572, 9168, 1),
	enterObjectId: 28772,
	enterAction: 'Enter',
	attackAnimation: 7618,
	tenMinutesTicks: 1000,
	quickPrayerVarbit: net.runelite.api.Varbits.QUICK_PRAYER,
	path: [
		new net.runelite.api.coords.WorldPoint(2380, 9168, 1),
		new net.runelite.api.coords.WorldPoint(2393, 9174, 1),
		new net.runelite.api.coords.WorldPoint(2405, 9176, 1),
		new net.runelite.api.coords.WorldPoint(2417, 9178, 1),
		new net.runelite.api.coords.WorldPoint(2426, 9172, 1),
		new net.runelite.api.coords.WorldPoint(2437, 9172, 1),
		new net.runelite.api.coords.WorldPoint(2448, 9173, 1),
	],
	combatTileA: new net.runelite.api.coords.WorldPoint(2448, 9173, 1),
	combatTileB: new net.runelite.api.coords.WorldPoint(2449, 9172, 1),
	resetTiles: [
		new net.runelite.api.coords.WorldPoint(2447, 9157, 1),
		new net.runelite.api.coords.WorldPoint(2428, 9159, 1),
	],
	prayerPotions: [
		potion.normalDelay.item.prayer_potion_1,
		potion.normalDelay.item.prayer_potion_2,
		potion.normalDelay.item.prayer_potion_3,
		potion.normalDelay.item.prayer_potion_4,
	],
	divineRangingPotions: [
		potion.normalDelay.item.drange_potion_1,
		potion.normalDelay.item.drange_potion_2,
		potion.normalDelay.item.drange_potion_3,
		potion.normalDelay.item.drange_potion_4,
	],
	potionNameById: {
		[potion.normalDelay.item.prayer_potion_1]: 'Prayer potion(1)',
		[potion.normalDelay.item.prayer_potion_2]: 'Prayer potion(2)',
		[potion.normalDelay.item.prayer_potion_3]: 'Prayer potion(3)',
		[potion.normalDelay.item.prayer_potion_4]: 'Prayer potion(4)',
		[potion.normalDelay.item.drange_potion_1]: 'Divine ranging potion(1)',
		[potion.normalDelay.item.drange_potion_2]: 'Divine ranging potion(2)',
		[potion.normalDelay.item.drange_potion_3]: 'Divine ranging potion(3)',
		[potion.normalDelay.item.drange_potion_4]: 'Divine ranging potion(4)',
	},
	funnyLogs: [
		'killing more chins',
		'running between tiles. still...',
		'repetitive motion',
		'why wont they just leave me alone?',
		'if i stop moving, do they win?',
		'this is fine. totally fine.',
		'who needs cardio when you have chins?',
		'left, right, left, right...',
		'the floor tiles know my secrets now',
		'keeping the rhythm alive',
		'not suspicious. just very busy.',
		'what even is personal space?',
	],
	obliterationLogs: [
		'You have obliterated even more beautiful creatures.',
		'The chin population files a complaint.',
		'Another batch sent to the void.',
		'Dust to dust, chin to chin.',
		'Your reputation grows. Their numbers do not.',
		'The ground trembles from all that fluff.',
	],
};

let state: State | null = null;
let ui: typeof profChinBurstUI | null = null;
let runtime: ChinBurstRuntime = createChinBurstRuntime(CHINBURST_CONSTANTS);

export function createChinBurstRuntime(
	constants: ChinBurstConstants,
): ChinBurstRuntime {
	return {
		pathIndex: 0,
		combatTarget: constants.combatTileA,
		jitterRemaining: 0,
		cycleStartTick: null,
		lastAttackTick: null,
		attackAnimationCount: 0,
		hasDrankRangePotion: false,
		resetTarget: null,
		returningFromReset: false,
		totalChinsThrown: 0,
		lastLoggedState: null,
		lastActionLogTick: null,
		lastResetIndex: null,
		nextChinMilestone: randomInt(25, 75),
		funnyLogOrder: [],
		funnyLogIndex: 0,
		obliterationLogOrder: [],
		obliterationLogIndex: 0,
	};
}

export function initializeChinBurstUtils(
	scriptState: State,
	scriptUi: typeof profChinBurstUI,
): void {
	state = scriptState;
	ui = scriptUi;
}

export function resetChinBurstRuntime(): void {
	runtime = createChinBurstRuntime(CHINBURST_CONSTANTS);
}

export function getTotalChinsThrown(): number {
	return runtime.totalChinsThrown;
}

export function resetPathIndex(): void {
	runtime.pathIndex = 0;
}

export function resetAggroState(): void {
	runtime.resetTarget = null;
	runtime.returningFromReset = false;
}

export function isOnCombatTile(
	point: net.runelite.api.coords.WorldPoint,
): boolean {
	return (
		equalsWorldPoint(point, CHINBURST_CONSTANTS.combatTileA) ||
		equalsWorldPoint(point, CHINBURST_CONSTANTS.combatTileB)
	);
}

export function moveToStartAndEnter(): boolean {
	if (!state) return false;
	const player = client.getLocalPlayer();
	if (!player) return false;

	const playerLoc = player.getWorldLocation();
	if (distanceTo(playerLoc, CHINBURST_CONSTANTS.startLocation) > 1) {
		if (!bot.walking.isWebWalking() && !bot.localPlayerMoving()) {
			bot.walking.walkToWorldPoint(
				CHINBURST_CONSTANTS.startLocation.getX(),
				CHINBURST_CONSTANTS.startLocation.getY(),
			);
		}
		return false;
	}

	const objects = bot.objects.getTileObjectsWithIds([
		CHINBURST_CONSTANTS.enterObjectId,
	]);
	if (!objects || objects.length === 0) {
		return false;
	}
	bot.objects.interactSuppliedObject(
		objects[0],
		CHINBURST_CONSTANTS.enterAction,
	);
	return true;
}

export function followPath(): boolean {
	if (!state) return false;
	const player = client.getLocalPlayer();
	if (!player) return false;
	ensureQuickPrayers(player);

	if (runtime.pathIndex >= CHINBURST_CONSTANTS.path.length) {
		return true;
	}

	const playerLoc = player.getWorldLocation();
	const target = CHINBURST_CONSTANTS.path[runtime.pathIndex];
	if (distanceTo(playerLoc, target) <= 1) {
		runtime.pathIndex += 1;
		return runtime.pathIndex >= CHINBURST_CONSTANTS.path.length;
	}

	if (!bot.localPlayerMoving()) {
		const randomizedTarget = getRandomizedTargetTile(target);
		bot.walking.walkToWorldPoint(
			randomizedTarget.getX(),
			randomizedTarget.getY(),
		);
	}
	return false;
}

export function initializeCombatCycle(): void {
	runtime.cycleStartTick = client.getTickCount();
	runtime.lastAttackTick = null;
	runtime.attackAnimationCount = 0;
	runtime.combatTarget = CHINBURST_CONSTANTS.combatTileA;
	runtime.jitterRemaining = randomInt(7, 9);
	runtime.hasDrankRangePotion = false;
}

export function handleCombatLoop(): boolean {
	if (!state) return false;
	const player = client.getLocalPlayer();
	if (!player) return false;
	ensureQuickPrayers(player);

	lootPrayerPotion();
	handlePrayerPotion();
	handleRangePotion();

	if (runtime.jitterRemaining > 0) {
		if (moveBetweenCombatTiles()) {
			runtime.jitterRemaining -= 1;
		}
		return false;
	}

	const currentTick = client.getTickCount();
	if (
		runtime.cycleStartTick !== null &&
		currentTick - runtime.cycleStartTick >=
			CHINBURST_CONSTANTS.tenMinutesTicks
	) {
		return true;
	}

	const animation = player.getAnimation();
	if (
		animation === CHINBURST_CONSTANTS.attackAnimation &&
		runtime.lastAttackTick !== currentTick
	) {
		runtime.lastAttackTick = currentTick;
		runtime.attackAnimationCount += 1;
		updateChinsThrown();
		if (runtime.attackAnimationCount % 2 === 0) {
			moveBetweenCombatTiles();
		}
	}

	return false;
}

export function handleAggroReset(): boolean {
	if (!state) return false;
	const player = client.getLocalPlayer();
	if (!player) return false;
	ensureQuickPrayers(player);

	if (!runtime.resetTarget) {
		let choiceIndex = randomInt(
			0,
			CHINBURST_CONSTANTS.resetTiles.length - 1,
		);
		if (
			runtime.lastResetIndex !== null &&
			CHINBURST_CONSTANTS.resetTiles.length > 1 &&
			choiceIndex === runtime.lastResetIndex
		) {
			choiceIndex =
				(choiceIndex + 1) % CHINBURST_CONSTANTS.resetTiles.length;
		}
		runtime.resetTarget = CHINBURST_CONSTANTS.resetTiles[choiceIndex];
		runtime.lastResetIndex = choiceIndex;
	}

	const playerLoc = player.getWorldLocation();
	if (!runtime.returningFromReset) {
		if (distanceTo(playerLoc, runtime.resetTarget) > 1) {
			if (!bot.localPlayerMoving()) {
				const randomizedTarget = getRandomizedTargetTile(
					runtime.resetTarget,
				);
				bot.walking.walkToWorldPoint(
					randomizedTarget.getX(),
					randomizedTarget.getY(),
				);
			}
			return false;
		}
		runtime.returningFromReset = true;
		return false;
	}

	if (distanceTo(playerLoc, CHINBURST_CONSTANTS.combatTileA) > 1) {
		if (!bot.localPlayerMoving()) {
			bot.walking.walkToWorldPoint(
				CHINBURST_CONSTANTS.combatTileA.getX(),
				CHINBURST_CONSTANTS.combatTileA.getY(),
			);
		}
		return false;
	}

	return true;
}

export function moveBetweenCombatTiles(): boolean {
	if (!state) return false;
	const player = client.getLocalPlayer();
	if (!player) return false;

	const playerLoc = player.getWorldLocation();
	const nextTarget = equalsWorldPoint(
		playerLoc,
		CHINBURST_CONSTANTS.combatTileA,
	)
		? CHINBURST_CONSTANTS.combatTileB
		: CHINBURST_CONSTANTS.combatTileA;
	if (!equalsWorldPoint(runtime.combatTarget, nextTarget)) {
		runtime.combatTarget = nextTarget;
	}

	if (!bot.localPlayerMoving()) {
		bot.walking.walkToWorldPoint(
			runtime.combatTarget.getX(),
			runtime.combatTarget.getY(),
		);
		return true;
	}

	return false;
}

export function handleRangePotion(): void {
	if (!state) return;
	const ranged = net.runelite.api.Skill.RANGED;
	const boosted: number = client.getBoostedSkillLevel(ranged);
	const real: number = client.getRealSkillLevel(ranged);

	if (!runtime.hasDrankRangePotion) {
		if (drinkLowestPotion(CHINBURST_CONSTANTS.divineRangingPotions)) {
			runtime.hasDrankRangePotion = true;
		}
		return;
	}

	if (boosted <= real) {
		drinkLowestPotion(CHINBURST_CONSTANTS.divineRangingPotions);
	}
}

export function handlePrayerPotion(): void {
	if (!state) return;
	const prayer = net.runelite.api.Skill.PRAYER;
	const currentPrayer: number = client.getBoostedSkillLevel(prayer);
	if (currentPrayer < 40) {
		drinkLowestPotion(CHINBURST_CONSTANTS.prayerPotions);
	}
}

export function lootPrayerPotion(): void {
	if (bot.inventory.isFull()) {
		return;
	}
	bot.tileItems.lootItemsWithIds(
		[potion.normalDelay.item.prayer_potion_1],
		2,
	);
}

export function drinkLowestPotion(potions: number[]): boolean {
	const currentState = state;
	if (!currentState) return false;
	for (const potionId of potions) {
		if (bot.inventory.containsId(potionId)) {
			bot.inventory.interactWithIds([potionId], ['Drink']);
			const potionName =
				CHINBURST_CONSTANTS.potionNameById[potionId] ??
				'Unknown potion';
			logger(
				currentState,
				'debug',
				'potion',
				`Drank potion: ${potionName}`,
			);
			return true;
		}
	}
	return false;
}

export function distanceTo(
	from: net.runelite.api.coords.WorldPoint,
	to: net.runelite.api.coords.WorldPoint,
): number {
	const dx = Math.abs(from.getX() - to.getX());
	const dy = Math.abs(from.getY() - to.getY());
	return dx + dy;
}

export function equalsWorldPoint(
	left: net.runelite.api.coords.WorldPoint,
	right: net.runelite.api.coords.WorldPoint,
): boolean {
	return (
		left.getX() === right.getX() &&
		left.getY() === right.getY() &&
		left.getPlane() === right.getPlane()
	);
}

export function randomInt(min: number, max: number): number {
	const lower = Math.min(min, max);
	const upper = Math.max(min, max);
	return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function getRandomizedTargetTile(
	target: net.runelite.api.coords.WorldPoint,
): net.runelite.api.coords.WorldPoint {
	const randomX = target.getX() + randomInt(-1, 1);
	const randomY = target.getY() + randomInt(-1, 1);
	return new net.runelite.api.coords.WorldPoint(
		randomX,
		randomY,
		target.getPlane(),
	);
}

export function ensureQuickPrayers(player: net.runelite.api.Player): void {
	if (!state) return;
	const playerLoc = player.getWorldLocation();
	if (equalsWorldPoint(playerLoc, CHINBURST_CONSTANTS.startLocation)) {
		return;
	}
	const quickPrayerActive: boolean =
		client.getVarbitValue(CHINBURST_CONSTANTS.quickPrayerVarbit) === 1;
	if (!quickPrayerActive) {
		bot.widgets.interactSpecifiedWidget(10485780, 1, 57, -1);
	}
}

export function setCurrentAction(action: string): void {
	if (ui && ui.currentAction !== action) {
		ui.currentAction = action;
	}
}

export function updateChinsThrown(): void {
	const currentState = state;
	if (!currentState) return;
	runtime.totalChinsThrown += 1;
	if (ui) {
		ui.chinsThrown = runtime.totalChinsThrown;
	}
	if (runtime.totalChinsThrown >= runtime.nextChinMilestone) {
		const message = getNextObliterationLog();
		logger(currentState, 'debug', 'chins', message);
		runtime.nextChinMilestone =
			runtime.totalChinsThrown + randomInt(25, 75);
	}
}

export function logStateChange(): void {
	const currentState = state;
	if (!currentState) return;
	if (currentState.mainState === runtime.lastLoggedState) {
		return;
	}
	logger(
		currentState,
		'debug',
		'stateManager',
		`State changed to: ${currentState.mainState}`,
	);
	runtime.lastLoggedState = currentState.mainState;
}

export function logCurrentAction(): void {
	const currentState = state;
	if (!currentState) return;
	const currentTick: number = currentState.gameTick;
	const player = client.getLocalPlayer();
	if (!player) {
		return;
	}
	const playerLoc = player.getWorldLocation();
	if (
		!equalsWorldPoint(playerLoc, CHINBURST_CONSTANTS.combatTileA) &&
		!equalsWorldPoint(playerLoc, CHINBURST_CONSTANTS.combatTileB)
	) {
		return;
	}
	if (
		runtime.lastActionLogTick !== null &&
		currentTick - runtime.lastActionLogTick < 20
	) {
		return;
	}
	const message = getNextFunnyLog();
	logger(currentState, 'debug', 'action', message);
	runtime.lastActionLogTick = currentTick;
}

function getNextFunnyLog(): string {
	if (CHINBURST_CONSTANTS.funnyLogs.length === 0) {
		return '...';
	}
	if (
		runtime.funnyLogOrder.length === 0 ||
		runtime.funnyLogIndex >= runtime.funnyLogOrder.length
	) {
		runtime.funnyLogOrder = shuffle(CHINBURST_CONSTANTS.funnyLogs.length);
		runtime.funnyLogIndex = 0;
	}
	const orderValue = runtime.funnyLogOrder[runtime.funnyLogIndex];
	runtime.funnyLogIndex += 1;
	const index = Math.max(
		0,
		Math.min(CHINBURST_CONSTANTS.funnyLogs.length - 1, orderValue - 1),
	);
	return CHINBURST_CONSTANTS.funnyLogs[index];
}

function getNextObliterationLog(): string {
	if (CHINBURST_CONSTANTS.obliterationLogs.length === 0) {
		return 'Chins. Chins everywhere.';
	}
	if (
		runtime.obliterationLogOrder.length === 0 ||
		runtime.obliterationLogIndex >= runtime.obliterationLogOrder.length
	) {
		runtime.obliterationLogOrder = shuffle(
			CHINBURST_CONSTANTS.obliterationLogs.length,
		);
		runtime.obliterationLogIndex = 0;
	}
	const orderValue =
		runtime.obliterationLogOrder[runtime.obliterationLogIndex];
	runtime.obliterationLogIndex += 1;
	const index = Math.max(
		0,
		Math.min(
			CHINBURST_CONSTANTS.obliterationLogs.length - 1,
			orderValue - 1,
		),
	);
	return CHINBURST_CONSTANTS.obliterationLogs[index];
}

/*
function checkLawAirWaterRunes() {
    var rune1 = client.getVarbitValue(29);
    var rune2 = client.getVarbitValue(1622);
    var rune3 = client.getVarbitValue(1623);
    var rune4 = client.getVarbitValue(14285);

    var lawRuneID = 11;
    var airRuneID = 1;
    var waterRuneID = 2;
    var mistRuneID = 15;
    var mudRuneID = 16;
    var dustRuneID = 17;
    var steamRuneID = 19;
    var smokeRuneID = 20;

    var pouchHasLawRune = rune1 === lawRuneID || rune2 === lawRuneID || rune3 === lawRuneID || rune4 === lawRuneID;
    var pouchHasAirRune = rune1 === airRuneID || rune2 === airRuneID || rune3 === airRuneID || rune4 === airRuneID || rune1 === mistRuneID || rune2 === mistRuneID || rune3 === mistRuneID || rune4 === mistRuneID || rune1 === dustRuneID || rune2 === dustRuneID || rune3 === dustRuneID || rune4 === dustRuneID || rune1 === smokeRuneID || rune2 === smokeRuneID || rune3 === smokeRuneID || rune4 === smokeRuneID;
    var pouchHasWaterRune = rune1 === waterRuneID || rune2 === waterRuneID || rune3 === waterRuneID || rune4 === waterRuneID || rune1 === mistRuneID || rune2 === mistRuneID || rune3 === mistRuneID || rune4 === mistRuneID || rune1 === mudRuneID || rune2 === mudRuneID || rune3 === mudRuneID || rune4 === mudRuneID || rune1 === steamRuneID || rune2 === steamRuneID || rune3 === steamRuneID || rune4 === steamRuneID;

    if (pouchHasLawRune && pouchHasAirRune && pouchHasWaterRune) {
        return true; 
    }

    var inventory = client.getItemContainer(93);

    var lawRuneActualID = 563;
    var airRuneActualID = 556;
    var waterRuneActualID = 557;
    var mistRuneID = 4695;
    var mudRuneID = 4698;
    var dustRuneID = 4696;
    var steamRuneID = 4694;
    var smokeRuneID = 4697;
    
    if (inventory != null) {
        for (var i = 0; i < 28; i++) {
            var item = inventory.getItem(i);
            if (item != null) {
                var itemID = item.getId();
                if (!pouchHasLawRune && itemID === lawRuneActualID) {
                    pouchHasLawRune = true;
                }
                if (!pouchHasAirRune && (itemID === airRuneActualID || itemID === mistRuneID || itemID === dustRuneID || itemID === smokeRuneID)) {
                    pouchHasAirRune = true;
                }
                if (!pouchHasWaterRune && (itemID === waterRuneActualID || itemID === mistRuneID || itemID === mudRuneID || itemID === steamRuneID)) {
                    pouchHasWaterRune = true;
                }
            }
        }
    }*/
