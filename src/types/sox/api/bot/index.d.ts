/// <reference path="./bank.d.ts" />
/// <reference path="./bmCache.d.ts" />
/// <reference path="./bmGlobalCache.d.ts" />
/// <reference path="./breakHandler.d.ts" />
/// <reference path="./counters.d.ts" />
/// <reference path="./equipment.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./grandExchange.d.ts" />
/// <reference path="./graphicsObjects.d.ts" />
/// <reference path="./inventory.d.ts" />
/// <reference path="./magic.d.ts" />
/// <reference path="./menuActions.d.ts" />
/// <reference path="./net.d.ts" />
/// <reference path="./notifier.d.ts" />
/// <reference path="./npcs.d.ts" />
/// <reference path="./objects.d.ts" />
/// <reference path="./players.d.ts" />
/// <reference path="./plugins.d.ts" />
/// <reference path="./prayer.d.ts" />
/// <reference path="./projectiles.d.ts" />
/// <reference path="./task.d.ts" />
/// <reference path="./tileItems.d.ts" />
/// <reference path="./types.d.ts" />
/// <reference path="./variables.d.ts" />
/// <reference path="./walking.d.ts" />
/// <reference path="./web.d.ts" />
/// <reference path="./widgets.d.ts" />

declare namespace bot {
	// Core methods are accessed directly on the bot object
	interface SoxBotApi extends bot {
		// Namespaces
		attackStyle: bot.attackStyle;
		bank: bot.bank;
		bmCache: bot.bmCache;
		bmGlobalCache: bot.bmGlobalCache;
		breakHandler: bot.breakHandler;
		counters: bot.counters;
		equipment: bot.equipment;
		events: bot.events;
		grandExchange: bot.grandExchange;
		graphicsObjects: bot.graphicsObjects;
		inventory: bot.inventory;
		magic: bot.magic;
		net: bot.net;
		notifier: bot.notifier;
		npcs: bot.npcs;
		objects: bot.objects;
		players: bot.players;
		plugins: bot.plugins;
		prayer: bot.prayer;
		projectiles: bot.projectiles;
		task: bot.task;
		tileItems: bot.tileItems;
		variables: bot.variables;
		walking: bot.walking;
		web: bot.web;
		widgets: bot.widgets;

		// Direct methods
		/**
		 * Performs a menu action.
		 * @param p0 The first parameter for the menu action
		 * @param p1 The second parameter for the menu action
		 * @param action The menu action to perform
		 * @param identifier The identifier for the menu action
		 * @param itemId The item ID for the menu action
		 * @param option The option for the menu action
		 * @param target The target for the menu action
		 * @param bounds The bounds for the menu action
		 */
		menuAction(
			p0: number,
			p1: number,
			action: net.runelite.api.MenuAction,
			identifier: number,
			itemId: number,
			option: string,
			target: string,
			bounds?: java.awt.Rectangle,
		): void;
		/**
		 * Clears the game chat.
		 */
		clearGameChat: () => void;
		/**
		 * Checks if the local player is idle.
		 * @returns True if the local player is idle, false otherwise.
		 */
		localPlayerIdle: () => boolean;
		/**
		 * Checks if the local player is moving.
		 * @returns True if the local player is moving, false otherwise.
		 */
		localPlayerMoving: () => boolean;
		/**
		 * Prints a message to the game chat.
		 * @param message The message to print.
		 */
		printGameMessage: (message: string) => void;
		/**
		 * Prints a message to the log.
		 * @param message The message to print.
		 */
		printLogMessage: (message: string) => void;
		/**
		 * Runs a client script.
		 * @param ints The integer parameters for the script.
		 */
		runClientScript: (ints: number[]) => void;

		/**
		 * Terminates the bot.
		 */
		terminate: () => void;
	}
}
