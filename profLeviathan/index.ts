// Imports
import { logger } from '../imports/logger.js';
import { createUi } from '../imports/ui-functions.js';
import { endScript, gameTick } from '../imports/general-function.js';
import {
	handleProjectileMoved,
	scanForNewProjectiles,
} from '../imports/projectile-functions.js';
import {
	stateManager,
	state,
	MainStates,
} from './State Manager/state-manager.js';
import { leviathanUI } from './State Manager/leviathan-ui.js';
import {
	handleProjectilePrayerFastPath,
	initializeProjectileTracking,
} from './State Manager/State/Combat/projectile-manager.js';
import { initializeInventoryCache } from './State Manager/State/Banking/inventory-management.js';

// Re-export state for backward compatibility
export { state } from './State Manager/state-manager.js';

// Collision visualizer controls (call from console or within script)
// Usage: leviathanUI.toggleCollisionVisualizer() to toggle on/off
// Usage: leviathanUI.enableCollisionVisualizer() to enable
// Usage: leviathanUI.disableCollisionVisualizer() to disable
export { leviathanUI } from './State Manager/leviathan-ui.js';

// On Start of Script
export function onStart() {
	try {
		createUi(state);
		leviathanUI.initialize(state);
		initializeProjectileTracking();
		// Collision map visualizer disabled (rendering broken - collision data works fine)
		// leviathanUI.enableCollisionVisualizer();
		logger(state, 'all', 'script', `${state.scriptName} started.`);
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

// On Game Tick
export function onGameTick() {
	bot.breakHandler.setBreakHandlerStatus(false);
	try {
		// Handle pending inventory cache request from UI (must happen on client thread)
		if (state.pendingInventoryCacheRequest) {
			state.pendingInventoryCacheRequest = false;
			initializeInventoryCache(state);
			// Update the UI display
			if (
				typeof (state as Record<string, unknown>)
					.__updateCacheDisplay === 'function'
			) {
				(
					(state as Record<string, unknown>)
						.__updateCacheDisplay as () => void
				)();
			}
			log.print('Setup cached successfully.');
			return; // Exit early to let next tick continue
		}

		// Scan for new projectiles each game tick (BotMaker doesn't call onClientTick)
		scanForNewProjectiles();

		if (state.uiCompleted) {
			if (!state.scriptInitalized) notifyScriptInitialized();
			state.scriptInitalized = true;
		} else {
			return;
		}
		if (!gameTick(state)) return;

		// Enable break handler only when not banking, idle, not webwalking, and in main state
		if (
			!bot.bank.isBanking() &&
			bot.localPlayerIdle() &&
			!bot.walking.isWebWalking() &&
			state.mainState == MainStates.COMBAT
		)
			bot.breakHandler.setBreakHandlerStatus(true);
		stateManager();
	} catch (error) {
		logger(state, 'all', 'Script', (error as Error).toString());
		bot.terminate();
	}
}

// Script Initialized Notification
function notifyScriptInitialized(): void {
	log.printGameMessage('Script initialized.');
}

// ProjectileMoved Event Handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onProjectileMoved(projectile: any): void {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		handleProjectileMoved(projectile);
		handleProjectilePrayerFastPath();
	} catch (error) {
		logger(state, 'all', 'onProjectileMoved', (error as Error).toString());
	}
}

// On End of Script
export function onEnd() {
	logger(state, 'all', 'script', `${state.scriptName} ended.`);
	// leviathanUI.disableCollisionVisualizer(); // Disabled (not enabled on start)
	endScript(state);
}
