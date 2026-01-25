/// <reference path="../../runelite/index.d.ts" />

/** @deprecated Use bot */
declare const api: SoxApi;

interface SoxApi {
	/** @deprecated */
	attackPlayer: (names: string[]) => void;
	/** @deprecated */
	clearGameChat: () => void;
	/** @deprecated */
	depositAllToBankWithId: (id: number) => void;
	/** @deprecated */
	depositAllToBankWithName: (name: string) => void;
	/** @deprecated */
	depositToBankWithId: (id: number) => void;
	/** @deprecated */
	depositToBankWithName: (name: string) => void;
	/** @deprecated */
	followPlayer: (names: string[]) => void;
	/** @deprecated */
	getBooleanVariable: (variableName: string) => boolean;
	/** @deprecated */
	getCounter: (name: string) => number;
	/** @deprecated */
	getGraphicsObjectsWithIds: (ids: number[]) => net.runelite.api.GraphicsObject[];
	/** @deprecated */
	getIntArrayVariable: (variableName: string) => number[];
	/** @deprecated */
	getIntVariable: (variableName: string) => number;
	/** @deprecated */
	getNpcAttackSpeed: (npcId: number) => number;
	/** @deprecated */
	getNpcsWithIds: (ids: number[]) => net.runelite.api.NPC[];
	/** @deprecated */
	getNpcsWithNames: (names: string[]) => net.runelite.api.NPC[];
	/** @deprecated */
	getProjectilesWithIds: (ids: number[]) => net.runelite.api.Projectile[];
	/** @deprecated */
	getStringArrayVariable: (variableName: string) => string[];
	/** @deprecated */
	getStringVariable: (variableName: string) => string;
	/** @deprecated */
	getTileObjectComposition: (objectId: number) => net.runelite.api.ObjectComposition;
	/** @deprecated */
	getTileObjectsWithIds: (ids: number[]) => net.runelite.api.TileObject[];
	/** @deprecated */
	getTileObjectsWithNames: (names: string[]) => net.runelite.api.TileObject[];
	/** @deprecated */
	interactInventoryItemOnNpcWithIds(itemId: number, npc: net.runelite.api.NPC): void;
	/** @deprecated */
	interactInventoryItemOnObjectWithIds(itemId: number, tileObject: net.runelite.api.TileObject): void;
	/** @deprecated */
	interactInventoryWithIds: (itemIds: number[], options: string[]) => void;
	/** @deprecated */
	interactInventoryWithNames: (itemNames: string[], options: string[]) => void;
	/** @deprecated */
	interactNpc: (npcName: string, action: string) => void;
	/** @deprecated */
	interactObject: (objectName: string, action: string) => void;
	/** @deprecated */
	interactObjects: (objectName: string[], action: string[]) => void;
	/** @deprecated */
	interactSpecifiedWidget(pid: number, id: number, opcode: number, param0: number, param1?: number): void;
	/** @deprecated */
	interactSuppliedNpc: (target: net.runelite.api.NPC, action: string) => void;
	/** @deprecated */
	interactSuppliedObject: (target: net.runelite.api.TileObject, action: string) => void;
	/** @deprecated */
	interactWidgetText(text: string): void;
	/** @deprecated */
	isBankOpen: () => boolean;
	/** @deprecated */
	isNearPlayer: (radius: number, names: string[]) => boolean;
	/** @deprecated */
	isWebWalking: () => boolean;
	/** @deprecated */
	localPlayerIdle: () => boolean;
	/** @deprecated */
	localPlayerMoving: () => boolean;
	/** @deprecated */
	lootItemsWithIds: (lootIds: number[], maxDistance: number) => void;
	/** @deprecated */
	lootItemsWithNames: (lootNames: string[], maxDistance: number) => void;
	/** @deprecated */
	printGameMessage: (message: string) => void;
	/** @deprecated */
	runClientScript(params: any[]): void;
	/** @deprecated */
	setCounter: (name: string, value: number) => void;
	/** @deprecated */
	setVariable: (variableName: string, value: string | number | boolean | string[] | number[]) => void;
	/** @deprecated */
	togglePrayer: (prayer: net.runelite.api.Prayer, bypassMouseClicks: boolean) => void;
	/** @deprecated */
	tradePlayer: (names: string[]) => void;
	/** Use if you're using a World point provided by the Bot Makers World Point true tile debug */
	/** @deprecated */
	walkToTrueWorldPoint: (x: number, y: number) => void;
	/** Use if you're walking to a world point thats already provided by the RL API such as localPlayer.getWorldLocation */
	/** @deprecated */
	walkToWorldPoint: (x: number, y: number) => void;
	/** @deprecated */
	webWalkCancel: () => void;
	/** @deprecated */
	webWalkStart: (point: net.runelite.api.coords.WorldPoint) => void;
	/** @deprecated */
	withdrawAllFromBankWithId: (id: number) => void;
	/** @deprecated */
	withdrawAllFromBankWithName: (name: string) => void;
	/** @deprecated */
	withdrawFromBankWithId: (id: number) => void;
	/** @deprecated */
	withdrawFromBankWithName: (name: string) => void;
}
