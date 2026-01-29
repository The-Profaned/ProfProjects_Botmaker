import { logger } from '../imports/logger.js';
import { objectIds } from '../imports/object-ids.js';
import { itemIds } from '../imports/item-ids.js';
import type { State } from '../imports/types.js';
import { utilityFunctions } from '../imports/utility-functions.js';
import { profChinsUI } from './ui.js';

// State that will be initialized by the caller
let state: State;
let trapLocationsCache: net.runelite.api.coords.WorldPoint[];
let safeTilesCache: net.runelite.api.coords.WorldPoint[];
let player_location: net.runelite.api.coords.WorldPoint;
let hunterLvl: number;

// Dynamic Variables For Traps (internal, not exported)
let _resetInProgress = false;
let _resetTargetLocation: net.runelite.api.coords.WorldPoint | null = null;
let _resetPhase: 'walking' | 'ticking' | 'animating' | null = null;
let _resetTickCount = 0;
let _nextTrapSearchAttempts = 0; // Track how many times we've failed to find next trap
let _tickManipulationTriggered = false;
let _isPlayerMoving = false;
let _layingTrapLocation: net.runelite.api.coords.WorldPoint | null = null;
let _layingTickCount = 0;
let _layingLocationIndex = 0;
let _layingWalkCommandIssued = false;
let _layingPhase: 'walking' | 'ticking' | 'animating' | null = null;
let _groundTrapHandlingLocation: net.runelite.api.coords.WorldPoint | null =
	null;
let _groundTrapPhase: 'walking' | 'looting' | 'relaying' | null = null;
let _groundTrapTickCount = 0;
let _groundTrapJustLaid = false; // Track if trap was just laid, waiting for player to idle
let _moveOffTrapIssued = false; // Track if we've already issued a move off trap command
let _repositioningInProgress = false; // Track if player is being repositioned off traps
let _repositioningTickCount = 0; // Track ticks spent repositioning to prevent infinite loops

// Separate timestamp maps for shaking and failed traps (matches AutoChin)
export const shakingTrapTimestamps = new Map<string, number>();
export const failedTrapTimestamps = new Map<string, number>();
export const playerLaidTraps = new Set<string>();

// Export mutable state accessors
export const utilState = {
	get resetInProgress() {
		return _resetInProgress;
	},
	set resetInProgress(value: boolean) {
		_resetInProgress = value;
	},
	get resetTargetLocation() {
		return _resetTargetLocation;
	},
	set resetTargetLocation(value: net.runelite.api.coords.WorldPoint | null) {
		_resetTargetLocation = value;
	},
	get resetPhase() {
		return _resetPhase;
	},
	set resetPhase(value: 'walking' | 'ticking' | 'animating' | null) {
		_resetPhase = value;
	},
	get resetTickCount() {
		return _resetTickCount;
	},
	set resetTickCount(value: number) {
		_resetTickCount = value;
	},
	get tickManipulationTriggered() {
		return _tickManipulationTriggered;
	},
	set tickManipulationTriggered(value: boolean) {
		_tickManipulationTriggered = value;
	},
	get isPlayerMoving() {
		return _isPlayerMoving;
	},
	set isPlayerMoving(value: boolean) {
		_isPlayerMoving = value;
	},
	get layingTrapLocation() {
		return _layingTrapLocation;
	},
	set layingTrapLocation(value: net.runelite.api.coords.WorldPoint | null) {
		_layingTrapLocation = value;
	},
	get layingTickCount() {
		return _layingTickCount;
	},
	set layingTickCount(value: number) {
		_layingTickCount = value;
	},
	get layingLocationIndex() {
		return _layingLocationIndex;
	},
	set layingLocationIndex(value: number) {
		_layingLocationIndex = value;
	},
	get layingWalkCommandIssued() {
		return _layingWalkCommandIssued;
	},
	set layingWalkCommandIssued(value: boolean) {
		_layingWalkCommandIssued = value;
	},
	get layingPhase() {
		return _layingPhase;
	},
	set layingPhase(value: 'walking' | 'ticking' | 'animating' | null) {
		_layingPhase = value;
	},
	get groundTrapHandlingLocation() {
		return _groundTrapHandlingLocation;
	},
	set groundTrapHandlingLocation(
		value: net.runelite.api.coords.WorldPoint | null,
	) {
		_groundTrapHandlingLocation = value;
	},
	get groundTrapPhase() {
		return _groundTrapPhase;
	},
	set groundTrapPhase(value: 'walking' | 'looting' | 'relaying' | null) {
		_groundTrapPhase = value;
	},
	get groundTrapTickCount() {
		return _groundTrapTickCount;
	},
	set groundTrapTickCount(value: number) {
		_groundTrapTickCount = value;
	},
};

// Initialize utility functions with required dependencies
export function initializeUtilFunctions(
	scriptState: State,
	traps: net.runelite.api.coords.WorldPoint[],
	safeTiles: net.runelite.api.coords.WorldPoint[],
	playerLoc: net.runelite.api.coords.WorldPoint,
	hunterLevel: number,
): void {
	state = scriptState;
	trapLocationsCache = traps;
	safeTilesCache = safeTiles;
	player_location = playerLoc;
	hunterLvl = hunterLevel;
}

export function maxTraps(): number {
	if (hunterLvl < 20) return 1;
	if (hunterLvl >= 20 && hunterLvl < 39) return 2;
	if (hunterLvl >= 40 && hunterLvl < 59) return 3;
	if (hunterLvl >= 60 && hunterLvl < 79) return 4;
	if (hunterLvl >= 80) return 5;
	return 0;
}

export function getInitialTrapLocations(): net.runelite.api.coords.WorldPoint[] {
	const allTiles: net.runelite.api.coords.WorldPoint[] = [];

	// Get all 9 tiles in the 3x3 grid
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			const tile = player_location.dx(dx).dy(dy);
			allTiles.push(tile);
		}
	}

	// Get shuffled indices and use them to reorder allTiles
	const shuffledKey = utilityFunctions.shuffle(allTiles.length);
	const shuffledTiles = shuffledKey.map((index) => allTiles[index - 1]);

	// Use maxTraps() to determine how many locations to select
	const selectedLocations = shuffledTiles.slice(0, maxTraps());
	const locationString = selectedLocations
		.map((loc) => `(${loc.getX()}, ${loc.getY()})`)
		.join(', ');
	logger(
		state,
		'debug',
		'getInitialTrapLocations',
		`Selected ${maxTraps()} trap locations: ${locationString}`,
	);
	return selectedLocations;
}

export function getSafeTiles(): net.runelite.api.coords.WorldPoint[] {
	const allTiles: net.runelite.api.coords.WorldPoint[] = [];

	// Get all 9 tiles in the 3x3 grid
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			const tile = player_location.dx(dx).dy(dy);
			allTiles.push(tile);
		}
	}

	// Filter out tiles that have traps - return the remaining 4 safe tiles
	const safeTiles = allTiles.filter(
		(tile) =>
			!trapLocationsCache.some(
				(trapLoc) =>
					trapLoc.getX() === tile.getX() &&
					trapLoc.getY() === tile.getY(),
			),
	);

	return safeTiles;
}

export function isOccupiedByTrapOrGround(
	loc: net.runelite.api.coords.WorldPoint,
): boolean {
	const allTrapIds = [
		objectIds.boxTrapLayed,
		objectIds.boxTrap_Failed,
		objectIds.boxTrap_Shaking,
		itemIds.boxTrap,
	];
	const objectAtLoc = bot.objects
		.getTileObjectsWithIds(allTrapIds)
		.find((o) => {
			if (!o) return false;
			const worldLoc = o.getWorldLocation();
			if (!worldLoc) return false;
			return (
				worldLoc.getX() === loc.getX() && worldLoc.getY() === loc.getY()
			);
		});
	return objectAtLoc !== undefined;
}

// Cached oldest trap from last timestamp maintenance scan
let cachedOldestTrap: {
	trap: net.runelite.api.TileObject;
	loc: net.runelite.api.coords.WorldPoint;
	timestamp: number;
	type: 'shaking' | 'failed';
} | null = null;

// Maintain timestamps for ALL active shaking/failed traps every tick
// This ensures every trap gets tracked from the moment it appears
// Called from main game tick loop to match AutoChin's approach
export function maintainAllTrapTimestamps(): void {
	const now = Date.now();
	let oldestTrap: {
		trap: net.runelite.api.TileObject;
		loc: net.runelite.api.coords.WorldPoint;
		timestamp: number;
		type: 'shaking' | 'failed';
	} | null = null;
	let oldestTime = Number.POSITIVE_INFINITY;

	// Update timestamps for all shaking traps
	for (const loc of trapLocationsCache) {
		const key = `${loc.getX()},${loc.getY()}`;

		const shakingTrap = bot.objects
			.getTileObjectsWithIds([objectIds.boxTrap_Shaking])
			.find((o) => {
				if (!o) return false;
				const worldLoc = o.getWorldLocation();
				if (!worldLoc) return false;
				return (
					worldLoc.getX() === loc.getX() &&
					worldLoc.getY() === loc.getY()
				);
			});

		// If trap is shaking and we don't have a timestamp, set one NOW
		// Assign immediately even if timing is slightly off - better to have a timestamp than none
		// CRITICAL: Assign to ANY shaking trap at cached location, regardless of playerLaidTraps
		if (shakingTrap && !shakingTrapTimestamps.has(key)) {
			shakingTrapTimestamps.set(key, now);
			// Also ensure this location is marked as player-laid if we see a trap there
			if (!playerLaidTraps.has(key)) {
				playerLaidTraps.add(key);
			}
			logger(
				state,
				'debug',
				'maintainAllTrapTimestamps',
				`Assigned timestamp to shaking trap at ${key} (may be slightly delayed)`,
			);
		}

		// If trap is no longer shaking, remove its timestamp to avoid stale entries
		if (!shakingTrap && shakingTrapTimestamps.has(key)) {
			shakingTrapTimestamps.delete(key);
		}

		// Track oldest while scanning
		if (shakingTrap) {
			const timestamp = shakingTrapTimestamps.get(key) || now;
			if (timestamp < oldestTime) {
				oldestTime = timestamp;
				oldestTrap = {
					trap: shakingTrap,
					loc: loc,
					timestamp,
					type: 'shaking',
				};
			}
		}
	}

	// Update timestamps for all failed traps
	for (const loc of trapLocationsCache) {
		const key = `${loc.getX()},${loc.getY()}`;

		const failedTrap = bot.objects
			.getTileObjectsWithIds([objectIds.boxTrap_Failed])
			.find((o) => {
				if (!o) return false;
				const worldLoc = o.getWorldLocation();
				if (!worldLoc) return false;
				return (
					worldLoc.getX() === loc.getX() &&
					worldLoc.getY() === loc.getY()
				);
			});

		// If trap is failed and we don't have a timestamp, set one NOW
		// Assign immediately even if timing is slightly off - better to have a timestamp than none
		// CRITICAL: Assign to ANY failed trap at cached location, regardless of playerLaidTraps
		if (failedTrap && !failedTrapTimestamps.has(key)) {
			failedTrapTimestamps.set(key, now);
			// Also ensure this location is marked as player-laid if we see a trap there
			if (!playerLaidTraps.has(key)) {
				playerLaidTraps.add(key);
			}
			logger(
				state,
				'debug',
				'maintainAllTrapTimestamps',
				`Assigned timestamp to failed trap at ${key} (may be slightly delayed)`,
			);
		}

		// If trap is no longer failed, remove its timestamp to avoid stale entries
		if (!failedTrap && failedTrapTimestamps.has(key)) {
			failedTrapTimestamps.delete(key);
		}

		// Track oldest while scanning
		if (failedTrap) {
			const timestamp = failedTrapTimestamps.get(key) || now;
			if (timestamp < oldestTime) {
				oldestTime = timestamp;
				oldestTrap = {
					trap: failedTrap,
					loc: loc,
					timestamp,
					type: 'failed',
				};
			}
		}
	}

	// Cache the oldest trap for use by resetTraps()
	cachedOldestTrap = oldestTrap;
}

export function resetTraps(): boolean {
	// Use the cached oldest trap from the game tick's maintainAllTrapTimestamps() call
	const maintainedOldestTrap = cachedOldestTrap;

	// If reset is already in progress, continue with the reset animation
	if (_resetInProgress && _resetTargetLocation) {
		const playerWp = client.getLocalPlayer().getWorldLocation();
		const targetLoc = _resetTargetLocation;
		const atTarget = playerWp.equals(targetLoc);

		// Walking phase - move to the trap location
		if (_resetPhase === 'walking') {
			if (
				atTarget ||
				(Math.abs(playerWp.getX() - targetLoc.getX()) <= 2 &&
					Math.abs(playerWp.getY() - targetLoc.getY()) <= 2)
			) {
				// At location - reset trap immediately
				const trapToReset = bot.objects
					.getTileObjectsWithIds([
						objectIds.boxTrapLayed,
						objectIds.boxTrap_Shaking,
						objectIds.boxTrap_Failed,
					])
					.find((o) => {
						if (!o) return false;
						const worldLoc = o.getWorldLocation();
						if (!worldLoc) return false;
						return (
							worldLoc.getX() === targetLoc.getX() &&
							worldLoc.getY() === targetLoc.getY()
						);
					});

				if (trapToReset) {
					// Check if it's a shaking trap (caught a chin)
					const isShaking = bot.objects
						.getTileObjectsWithIds([objectIds.boxTrap_Shaking])
						.find((o) => {
							if (!o) return false;
							const worldLoc = o.getWorldLocation();
							if (!worldLoc) return false;
							return (
								worldLoc.getX() === targetLoc.getX() &&
								worldLoc.getY() === targetLoc.getY()
							);
						});

					if (isShaking) {
						profChinsUI.currentAction = 'Collecting chin';
						logger(
							state,
							'debug',
							'resetTraps',
							`Trap shaking - resetting`,
						);
					} else {
						profChinsUI.currentAction = 'Resetting failed trap';
					}

					bot.objects.interactSuppliedObject(trapToReset, 'Reset');
					_resetPhase = 'animating';
					_resetTickCount = 0;
					_tickManipulationTriggered = true;
				}
			} else if (!_isPlayerMoving) {
				// Walking failed
				_resetInProgress = false;
				_resetTargetLocation = null;
				_resetPhase = null;
				_tickManipulationTriggered = false;
			}
			return true; // Action in progress
		}

		// Animating phase - check if trap was reset, then immediately find next
		if (_resetPhase === 'animating') {
			if (_resetTargetLocation) {
				const newTrapLaid = bot.objects
					.getTileObjectsWithIds([objectIds.boxTrapLayed])
					.find((o) => {
						if (!o) return false;
						const worldLoc = o.getWorldLocation();
						if (!worldLoc) return false;
						return (
							worldLoc.getX() === _resetTargetLocation!.getX() &&
							worldLoc.getY() === _resetTargetLocation!.getY()
						);
					});

				if (newTrapLaid) {
					logger(
						state,
						'debug',
						'resetTraps',
						`Trap reset - object detected. Finding next trap immediately`,
					);

					const key = `${_resetTargetLocation.getX()},${_resetTargetLocation.getY()}`;
					shakingTrapTimestamps.delete(key);
					failedTrapTimestamps.delete(key);

					// Find the next oldest trap to reset immediately
					let nextOldestTrap: net.runelite.api.TileObject | null =
						null;
					let nextOldestTime = Number.POSITIVE_INFINITY;

					// Check shaking traps
					for (const loc of trapLocationsCache) {
						const locKey = `${loc.getX()},${loc.getY()}`;

						// Only consider traps we know we laid
						if (!playerLaidTraps.has(locKey)) continue;

						// Skip the trap we just reset
						if (locKey === key) continue;

						const shakingTrap = bot.objects
							.getTileObjectsWithIds([objectIds.boxTrap_Shaking])
							.find((o) => {
								if (!o) return false;
								const worldLoc = o.getWorldLocation();
								if (!worldLoc) return false;
								return (
									worldLoc.getX() === loc.getX() &&
									worldLoc.getY() === loc.getY()
								);
							});

						if (shakingTrap) {
							// Timestamp already maintained by maintainTrapTimestamps() call at start
							const timestamp =
								shakingTrapTimestamps.get(locKey) || Date.now();
							if (timestamp < nextOldestTime) {
								nextOldestTime = timestamp;
								nextOldestTrap = shakingTrap;
							}
						}
					}

					// Check failed traps
					for (const loc of trapLocationsCache) {
						const locKey = `${loc.getX()},${loc.getY()}`;

						// Only consider traps we know we laid
						if (!playerLaidTraps.has(locKey)) continue;

						// Skip the trap we just reset
						if (locKey === key) continue;

						const failedTrap = bot.objects
							.getTileObjectsWithIds([objectIds.boxTrap_Failed])
							.find((o) => {
								if (!o) return false;
								const worldLoc = o.getWorldLocation();
								if (!worldLoc) return false;
								return (
									worldLoc.getX() === loc.getX() &&
									worldLoc.getY() === loc.getY()
								);
							});

						if (failedTrap) {
							// Timestamp already maintained by maintainTrapTimestamps() call at start
							const timestamp =
								failedTrapTimestamps.get(locKey) || Date.now();
							if (timestamp < nextOldestTime) {
								nextOldestTime = timestamp;
								nextOldestTrap = failedTrap;
							}
						}
					}

					// If we found another trap, reset it immediately to cancel animation
					if (nextOldestTrap) {
						bot.objects.interactSuppliedObject(
							nextOldestTrap,
							'Reset',
						);

						_resetInProgress = true;
						_resetTargetLocation =
							nextOldestTrap.getWorldLocation();
						_resetPhase = 'animating';
						_resetTickCount = 0;
						_nextTrapSearchAttempts = 0; // Reset counter since we found a trap
						return true;
					}

					// No traps found - increment search attempt counter
					_nextTrapSearchAttempts++;

					// If we've searched multiple times without finding a trap, exit reset
					// This prevents getting stuck in a loop and allows transition to ground trap handling
					if (_nextTrapSearchAttempts >= 3) {
						logger(
							state,
							'debug',
							'resetTraps',
							`No traps found after ${_nextTrapSearchAttempts} attempts, exiting reset sequence.`,
						);
						_resetInProgress = false;
						_resetTargetLocation = null;
						_resetPhase = null;
						_resetTickCount = 0;
						_nextTrapSearchAttempts = 0;
						_tickManipulationTriggered = false;
						return true;
					}

					return true; // Continue animating, will try again next tick
				}
			}

			// Timeout
			_resetTickCount++;
			if (_resetTickCount > 10) {
				_resetInProgress = false;
				_resetTargetLocation = null;
				_resetPhase = null;
				_resetTickCount = 0;
				_nextTrapSearchAttempts = 0;
				_tickManipulationTriggered = false;
			}
			return true; // Action in progress
		}

		return false; // No action in progress for this tick
	}

	// If reset is not in progress, find the oldest trap that NEEDS reset
	// (Already found by maintainTrapTimestamps() - no need to re-scan)
	const oldestTrap = maintainedOldestTrap;

	// PRIORITY 1: If we're already handling a ground trap, complete it before repositioning
	if (utilState.groundTrapHandlingLocation !== null && handleGroundTraps()) {
		_resetInProgress = true; // Mark that we're handling ground traps
		return true; // Ground trap handling in progress
	}

	// PRIORITY 2: Check if player is on a trap location - skip repositioning for now
	// TODO: Implement better repositioning logic later
	if (isPlayerOnTrapLocation()) {
		// Temporarily disabled - will work out safe repositioning later
		// Just skip for now and let the script continue with trap work
	}

	// PRIORITY 3: Use ground trap handling as a fallback when no traps to reset
	if (!oldestTrap) {
		// No regular traps to reset - check for ground traps as fallback
		if (handleGroundTraps()) {
			_resetInProgress = true; // Mark that we're handling ground traps
			return true; // Ground trap handling in progress
		}
		_resetInProgress = false; // No work being done
		return false; // Nothing to do
	}

	// Initiate reset of the oldest trap (from either shaking or failed)
	const ageInMs = Date.now() - oldestTrap.timestamp;
	const ageInTicks = Math.floor(ageInMs / 600); // 600ms per tick
	logger(
		state,
		'debug',
		'resetTraps',
		`Starting reset sequence for ${oldestTrap.type} trap at (${oldestTrap.loc.getX()}, ${oldestTrap.loc.getY()}) - age: ${ageInTicks} ticks`,
	);
	// Clear timestamp from appropriate map when reset starts
	const key = `${oldestTrap.loc.getX()},${oldestTrap.loc.getY()}`;
	if (oldestTrap.type === 'shaking') {
		shakingTrapTimestamps.delete(key);
	} else {
		failedTrapTimestamps.delete(key);
	}

	// Click the trap to reset it (this initiates walk automatically)
	bot.objects.interactSuppliedObject(oldestTrap.trap, 'Reset');

	_resetInProgress = true;
	_resetTargetLocation = oldestTrap.loc;
	_resetPhase = 'animating'; // Set directly to animating since we clicked
	_resetTickCount = 0;
	return true; // Action taken
}

export function layingInitialTraps(
	maxAllowed: number,
	trapsOnGround: number,
): void {
	if (trapsOnGround >= maxAllowed) {
		return;
	}

	// If currently laying a trap - handle animation completion and tick manipulation
	if (_layingTrapLocation !== null) {
		const playerWp = client.getLocalPlayer().getWorldLocation();

		// Walking phase - get to location and lay trap
		if (_layingPhase === 'walking') {
			const atTarget = playerWp.equals(_layingTrapLocation);
			const dx = Math.abs(playerWp.getX() - _layingTrapLocation.getX());
			const dy = Math.abs(playerWp.getY() - _layingTrapLocation.getY());

			if (atTarget || (dx <= 2 && dy <= 2)) {
				// At location - lay trap immediately
				bot.inventory.interactWithIds([itemIds.boxTrap], ['Lay']);
				logger(
					state,
					'debug',
					'layingInitialTraps',
					`Laying trap at location ${_layingLocationIndex + 1}`,
				);
				_layingPhase = 'animating';
				_layingTickCount = 0;
			} else if (!_isPlayerMoving) {
				// Walking failed
				_layingTrapLocation = null;
				_layingPhase = null;
				_tickManipulationTriggered = false;
				_layingWalkCommandIssued = false;
			}
			return;
		}

		// Animating phase - check if trap was laid, then immediately proceed
		if (_layingPhase === 'animating') {
			if (_layingTrapLocation) {
				const newTrapLaid = bot.objects
					.getTileObjectsWithIds([objectIds.boxTrapLayed])
					.find((o) => {
						if (!o) return false;
						const worldLoc = o.getWorldLocation();
						if (!worldLoc) return false;
						return (
							worldLoc.getX() === _layingTrapLocation!.getX() &&
							worldLoc.getY() === _layingTrapLocation!.getY()
						);
					});

				if (newTrapLaid) {
					logger(
						state,
						'debug',
						'layingInitialTraps',
						`Trap laid - object detected. Issuing next walk immediately`,
					);

					// Track that we laid a trap at this location
					// Timestamps are set only when trap enters shaking/failed state
					const key = `${_layingTrapLocation.getX()},${_layingTrapLocation.getY()}`;
					playerLaidTraps.add(key);

					// Find next location for tick manipulation
					let nextLocation: net.runelite.api.coords.WorldPoint | null =
						null;
					for (
						let index = _layingLocationIndex + 1;
						index < trapLocationsCache.length;
						index++
					) {
						const loc = trapLocationsCache[index];
						if (!isOccupiedByTrapOrGround(loc)) {
							nextLocation = loc;
							break;
						}
					}

					// Issue walk command immediately to cancel the automatic walk
					if (nextLocation) {
						bot.walking.walkToWorldPoint(
							nextLocation.getX(),
							nextLocation.getY(),
						);
					}

					// Clear state and advance
					_layingTrapLocation = null;
					_layingPhase = null;
					_layingTickCount = 0;
					_tickManipulationTriggered = false;
					_layingLocationIndex++;
					_layingWalkCommandIssued = false;
				}
			}

			// Timeout after many ticks
			_layingTickCount++;
			if (_layingTickCount > 10) {
				_layingTrapLocation = null;
				_layingPhase = null;
				_layingTickCount = 0;
				_tickManipulationTriggered = false;
				_layingWalkCommandIssued = false;
			}
			return;
		}
	}

	// Find next unoccupied location to lay trap
	for (
		let index = _layingLocationIndex;
		index < trapLocationsCache.length;
		index++
	) {
		const loc = trapLocationsCache[index];
		if (trapsOnGround >= maxAllowed) {
			return;
		}
		const occupied = isOccupiedByTrapOrGround(loc);
		if (
			!occupied &&
			!_tickManipulationTriggered &&
			bot.inventory.containsId(itemIds.boxTrap)
		) {
			const playerWp = client.getLocalPlayer().getWorldLocation();
			if (!playerWp.equals(loc)) {
				if (!_layingWalkCommandIssued) {
					bot.walking.walkToWorldPoint(loc.getX(), loc.getY());
					_layingWalkCommandIssued = true;
					logger(
						state,
						'debug',
						'layingInitialTraps',
						`Walking to trap location`,
					);
				}
				_layingTrapLocation = loc;
				_layingPhase = 'walking';
				_layingLocationIndex = index;
				_tickManipulationTriggered = true;
				return;
			}
			// Already at location
			_layingTrapLocation = loc;
			_layingPhase = 'walking';
			_layingLocationIndex = index;
			_tickManipulationTriggered = true;
			return;
		}
	}
}

// Check if player is on a trap location
export function isPlayerOnTrapLocation(): boolean {
	const playerWp = client.getLocalPlayer().getWorldLocation();
	return trapLocationsCache.some(
		(loc) =>
			loc.getX() === playerWp.getX() && loc.getY() === playerWp.getY(),
	);
}

// Move player to random safe tile
// Temporarily disabled - causing infinite loops with repositioning
// TODO: Implement better repositioning logic that doesn't cause hangs
/*
export function movePlayerAwayFromTraps(): void {
	// Don't issue new walk commands if player is already moving
	if (!bot.localPlayerIdle()) {
		return;
	}

	// If we've already issued a move command, wait for player to reach a safe tile
	if (_moveOffTrapIssued) {
		const playerWp = client.getLocalPlayer().getWorldLocation();
		// Check if player is now on a safe tile
		const isOnSafeTile = safeTilesCache.some((tile) =>
			playerWp.equals(tile),
		);
		if (isOnSafeTile) {
			// Player reached safe tile, clear the flag
			_moveOffTrapIssued = false;
		}
		return;
	}

	const playerWp = client.getLocalPlayer().getWorldLocation();

	// Filter out tile player is currently on
	const availableTiles = safeTilesCache.filter(
		(tile) => !playerWp.equals(tile),
	);

	if (availableTiles.length === 0) return;

	// Shuffle available tiles to ensure true randomness each call
	const shuffled = availableTiles.slice();
	for (let index = shuffled.length - 1; index > 0; index--) {
		const inedex_ = Math.floor(Math.random() * (index + 1));
		const temporary = shuffled[index];
		shuffled[index] = shuffled[inedex_];
		shuffled[inedex_] = temporary;
	}

	// Pick first tile from shuffled array
	const randomTile = shuffled[0];

	bot.walking.walkToWorldPoint(randomTile.getX(), randomTile.getY());
	_moveOffTrapIssued = true; // Set flag to prevent multiple walk commands
	logger(
		state,
		'debug',
		'movePlayerAwayFromTraps',
		`Moving player to safe tile (${randomTile.getX()}, ${randomTile.getY()})`,
	);
	profChinsUI.currentAction = 'Moving off traps';
}
*/

// Move to a safe tile if not already on one (for idle positioning)
export function moveToSafeTileIfNeeded(): boolean {
	const playerWp = client.getLocalPlayer().getWorldLocation();

	// Check if player is already on a safe tile
	const isOnSafeTile = safeTilesCache.some(
		(safeTile) =>
			safeTile.getX() === playerWp.getX() &&
			safeTile.getY() === playerWp.getY(),
	);

	// Already on a safe tile, no need to move
	if (isOnSafeTile) {
		return false;
	}

	// Not on a safe tile - find closest safe tile within 2 tiles of all traps
	let closestSafeTile: net.runelite.api.coords.WorldPoint | null = null;
	let closestDistance = Number.POSITIVE_INFINITY;

	for (const safeTile of safeTilesCache) {
		// Calculate distance from player to this safe tile
		const dx = playerWp.getX() - safeTile.getX();
		const dy = playerWp.getY() - safeTile.getY();
		const distance = Math.hypot(dx, dy);

		// Check if this tile is within 2 tiles of all cached trap locations
		const within2TilesOfAllTraps = trapLocationsCache.every((trapLoc) => {
			const trapDx = Math.abs(safeTile.getX() - trapLoc.getX());
			const trapDy = Math.abs(safeTile.getY() - trapLoc.getY());
			return trapDx <= 2 && trapDy <= 2;
		});

		if (within2TilesOfAllTraps && distance < closestDistance) {
			closestDistance = distance;
			closestSafeTile = safeTile;
		}
	}

	// Move to closest safe tile if found
	if (closestSafeTile) {
		logger(
			state,
			'debug',
			'moveToSafeTileIfNeeded',
			`Moving to safe tile (${closestSafeTile.getX()}, ${closestSafeTile.getY()}) to stay within 2 tiles of all traps`,
		);
		bot.walking.walkToWorldPoint(
			closestSafeTile.getX(),
			closestSafeTile.getY(),
		);
		profChinsUI.currentAction = 'Positioning';
		return true; // Moved to safe tile
	}

	return false; // No suitable safe tile found
}

// Find and reset critical traps that have hit 80-tick timeout (prevent despawn)
export function criticalTrapChecker(): boolean {
	const CRITICAL_TICK_THRESHOLD = 80; // ~48 seconds at 600ms ticks
	const now = Date.now();

	// PRIORITY 1: Check shaking traps for critical age (80+ ticks)
	for (const loc of trapLocationsCache) {
		const key = `${loc.getX()},${loc.getY()}`;

		// Only handle traps we know we laid
		if (!playerLaidTraps.has(key)) continue;

		const shaking = bot.objects
			.getTileObjectsWithIds([objectIds.boxTrap_Shaking])
			.find((o) => {
				if (!o) return false;
				const worldLoc = o.getWorldLocation();
				if (!worldLoc) return false;
				return (
					worldLoc.getX() === loc.getX() &&
					worldLoc.getY() === loc.getY()
				);
			});

		if (shaking) {
			const timestamp = shakingTrapTimestamps.get(key) || now;
			const ageInSeconds = (now - timestamp) / 1000;
			const ageInTicks = Math.floor(ageInSeconds / 0.6); // 600ms per tick

			if (ageInTicks >= CRITICAL_TICK_THRESHOLD) {
				logger(
					state,
					'all',
					'criticalTrapChecker',
					`CRITICAL: Shaking trap at (${loc.getX()}, ${loc.getY()}) hit 80-tick timeout! Age: ${ageInTicks} ticks. Forcing reset!`,
				);
				utilState.resetInProgress = true;
				utilState.resetTargetLocation = loc;
				utilState.resetPhase = 'walking';
				return true; // Signal that critical trap is being handled
			}
		}
	}

	// PRIORITY 2: Check failed traps for critical age (80+ ticks)
	for (const loc of trapLocationsCache) {
		const key = `${loc.getX()},${loc.getY()}`;

		// Only handle traps we know we laid
		if (!playerLaidTraps.has(key)) continue;

		const failed = bot.objects
			.getTileObjectsWithIds([objectIds.boxTrap_Failed])
			.find((o) => {
				if (!o) return false;
				const worldLoc = o.getWorldLocation();
				if (!worldLoc) return false;
				return (
					worldLoc.getX() === loc.getX() &&
					worldLoc.getY() === loc.getY()
				);
			});

		if (failed) {
			const timestamp = failedTrapTimestamps.get(key) || now;
			const ageInSeconds = (now - timestamp) / 1000;
			const ageInTicks = Math.floor(ageInSeconds / 0.6); // 600ms per tick

			if (ageInTicks >= CRITICAL_TICK_THRESHOLD) {
				logger(
					state,
					'all',
					'criticalTrapChecker',
					`CRITICAL: Failed trap at (${loc.getX()}, ${loc.getY()}) hit 80-tick timeout! Age: ${ageInTicks} ticks. Forcing reset!`,
				);
				utilState.resetInProgress = true;
				utilState.resetTargetLocation = loc;
				utilState.resetPhase = 'walking';
				return true; // Signal that critical trap is being handled
			}
		}
	}

	return false; // No critical traps found
}

// Check for and handle ground trap items (boxTrap fallback) - returns true if handling a ground trap
export function handleGroundTraps(): boolean {
	// If trap was just laid, wait for player to idle before allowing repositioning
	if (_groundTrapJustLaid) {
		if (bot.localPlayerIdle()) {
			// Player is now idle, we can proceed
			_groundTrapJustLaid = false;
			return false; // Exit handling, ready for repositioning
		}
		return true; // Still waiting for player to idle
	}

	// If we're currently handling a ground trap, wait for laying animation to complete
	if (utilState.groundTrapHandlingLocation) {
		const targetLoc = utilState.groundTrapHandlingLocation;

		// Check if trap has been successfully laid at this location
		const trapLaidAtLocation = bot.objects
			.getTileObjectsWithIds([objectIds.boxTrapLayed])
			.find((o) => {
				if (!o) return false;
				const worldLoc = o.getWorldLocation();
				if (!worldLoc) return false;
				return (
					worldLoc.getX() === targetLoc.getX() &&
					worldLoc.getY() === targetLoc.getY()
				);
			});

		// If trap has been laid, reset state and mark that we're waiting for player to idle
		if (trapLaidAtLocation) {
			logger(
				state,
				'debug',
				'handleGroundTraps',
				`Trap successfully laid at (${targetLoc.getX()}, ${targetLoc.getY()}). Waiting for player to idle before repositioning.`,
			);
			utilState.groundTrapHandlingLocation = null;
			utilState.groundTrapTickCount = 0;
			_groundTrapJustLaid = true; // Flag that we're waiting for idle after laying
			return true; // Keep returning true so we stay in this function waiting for idle
		}

		// Still waiting for animation or haven't laid yet
		utilState.groundTrapTickCount++;

		// On tick 2, lay the trap from inventory (give it time to loot first)
		if (
			utilState.groundTrapTickCount === 2 &&
			bot.inventory.containsId(itemIds.boxTrap)
		) {
			logger(
				state,
				'debug',
				'handleGroundTraps',
				`Laying trap from inventory at (${targetLoc.getX()}, ${targetLoc.getY()}).`,
			);
			bot.inventory.interactWithIds([itemIds.boxTrap], ['Lay']);
			profChinsUI.currentAction = 'Laying trap';
		}

		// Timeout after 10 ticks to prevent infinite waiting
		if (utilState.groundTrapTickCount > 10) {
			logger(
				state,
				'debug',
				'handleGroundTraps',
				`Timeout waiting for trap at (${targetLoc.getX()}, ${targetLoc.getY()}). Resetting state.`,
			);
			utilState.groundTrapHandlingLocation = null;
			utilState.groundTrapTickCount = 0;
			return false; // Done waiting
		}
		return true; // Still handling existing trap
	}

	// No trap in progress, find next one to handle
	// Look for ground traps at cached locations
	/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
	const groundTraps = bot.tileItems.getItemsWithIds([itemIds.boxTrap]);

	for (const groundTrap of groundTraps) {
		// Safely access the tile property
		if (!groundTrap || !groundTrap.tile) continue;

		const trapLoc: net.runelite.api.coords.WorldPoint =
			groundTrap.tile.getWorldLocation();

		if (!trapLoc) continue;

		// Check if this ground trap is at one of our cached locations
		const isAtCachedLocation = trapLocationsCache.some(
			(loc) =>
				loc.getX() === trapLoc.getX() && loc.getY() === trapLoc.getY(),
		);

		if (isAtCachedLocation) {
			// Start handling this trap - loot it first, then lay from inventory
			utilState.groundTrapHandlingLocation = trapLoc;
			utilState.groundTrapTickCount = 0;

			logger(
				state,
				'debug',
				'handleGroundTraps',
				`Looting trap from ground at (${trapLoc.getX()}, ${trapLoc.getY()}).`,
			);

			// Loot the ground trap item
			bot.tileItems.lootItem(groundTrap);
			profChinsUI.currentAction = 'Looting fallen trap';

			// Track that we just relaid the trap at this location
			const relayKey = `${trapLoc.getX()},${trapLoc.getY()}`;
			playerLaidTraps.add(relayKey);
			return true; // Found and started handling a ground trap
		}
	}
	/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
	return false; // No ground traps found or handled
}

// Export utility functions through the utilFunctions object
export const utilFunctions = {
	maxTraps,
	getInitialTrapLocations,
	getSafeTiles,
	isOccupiedByTrapOrGround,
	maintainAllTrapTimestamps,
	resetTraps,
	layingInitialTraps,
	isPlayerOnTrapLocation,
	moveToSafeTileIfNeeded,
	criticalTrapChecker,
	handleGroundTraps,
};
