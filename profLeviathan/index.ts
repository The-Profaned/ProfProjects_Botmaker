// Imports
import { logger } from '../imports/logger.js';
import { createUi } from '../imports/ui_functions.js';
import { generalFunctions } from '../imports/general_function.js';
import { projectileFunctions } from '../imports/projectile_functions.js';
import { playerFunctions } from '../imports/player_functions.js';
import { npcIds } from '../imports/npc_Ids.js';
import { prayerFunctions} from '../imports/prayer_functions.js';
import { tileFunctions } from '../imports/tile_functions.js';


// variables for script state
const state = {
  debugEnabled: false,
  debugFullState: false,
  failureCounts: {},
  failureOrigin: '',
  lastFailureKey: '',
  mainState: 'start_state',
  scriptInitialized: false,
  scriptName: 'profLeviathan',
  uiCompleted: false,
  timeout: 0,
  gameTick: 0,
  sub_State: '',
  movementStartTick: 0, // Track when movement started
};

// On Start of Script
export const onStart = () => {
  try { 
    createUi(state);
    logger(state, 'all', 'script', `${state.scriptName} started.`);
  } catch (error) {
    logger(state, 'all', 'Script', (error as Error).toString());
    bot.terminate();
  }
};

// On Game Tick
export const onGameTick = () => {
  bot.breakHandler.setBreakHandlerStatus(false);
  try {
    if (state.uiCompleted) {
      if (!state.scriptInitialized) scriptInitialized();
      state.scriptInitialized = true;
    } else {
      return;
    }
    if (!generalFunctions.gameTick(state)) return;

    // Enable break handler only when in start_state
    if (!bot.bank.isBanking() && bot.localPlayerIdle() && !bot.walking.isWebWalking() && state.mainState === 'start_state') {
      bot.breakHandler.setBreakHandlerStatus(true);
    }
    stateManager();
  } catch (error) {
    logger(state, 'all', 'Script', (error as Error).toString());
    bot.terminate();
  }
};

// Script Initialized Notification
const scriptInitialized = () => {
    bot.printGameMessage('Script initialized.');
    projectileFunctions.initializeProjectileTracking(state);
    logger(state, 'debug', 'scriptInitialized', 'Projectile tracking initialized.');
};

// On End of Script
export const onEnd = () => generalFunctions.endScript(state);

// Script Decision Manager
const stateManager = () => {
  logger(state, 'debug', 'stateManager', `${state.mainState} - ${state.sub_State}`);
  switch(state.mainState) {
    
    case 'start_state': {
      // Initial setup - transition to combat
      logger(state, 'debug', 'start_state', 'Starting script, moving to prepare_combat.');
      state.mainState = 'prepare_combat';
      break;
    }

    case 'prepare_combat': {
      // Initialize combat state (only runs once due to scriptInitialized flag)
      logger(state, 'debug', 'prepare_combat', 'Preparing for combat.');
      state.mainState = 'attack_leviathan';
      state.sub_State = 'attacking';
      break;
    }

    case 'attack_leviathan': {
        // Sub-state manager for attacking Leviathan
        switch(state.sub_State) {
          // Attacking Leviathan if NPC is found/Alive
          case 'attacking': {
            const leviathans = bot.npcs.getWithIds([npcIds.leviathanPost]);
            if (!leviathans || leviathans.length === 0) {
              logger(state, 'debug', 'attacking', 'Leviathan not found or dead, ending script.');
              state.mainState = 'start_state';
              state.sub_State = '';
              break;
            }

            // Check for projectiles FIRST before attacking
            const sortedProj = projectileFunctions.getSortedProjectiles();
            if (sortedProj.length > 0) {
              logger(state, 'debug', 'attacking', 'Projectiles detected, switching to handle_projectiles.');
              state.sub_State = 'handle_projectiles';
              break;
            }

            // No projectiles, safe to attack
            playerFunctions.attackTargetNpc(state, npcIds.leviathanPost);
            break;
          }

          // Handles all projectile logic during the fight
          case 'handle_projectiles': {
            const sortedProj = projectileFunctions.getSortedProjectiles();
            const currentTile = client.getLocalPlayer().getWorldLocation();
            const isDangerousTile = tileFunctions.getDangerousTiles().some(tile => tile.equals(currentTile));

            // Priority 1: If tile is dangerous, move immediately
            if (isDangerousTile) {
              logger(state, 'debug', 'handle_projectiles', 'Current tile is dangerous, moving to safe tile.');
              const safeTile = tileFunctions.getSafeTile(state, 10);
              
              if (safeTile) {
                bot.walking.webWalkStart(safeTile);
                state.movementStartTick = state.gameTick;
                state.sub_State = 'moving_to_safe_tile';
                logger(state, 'debug', 'handle_projectiles', 'Started movement to safe tile.');
              }
              
              // Pray against projectiles WHILE initiating movement
              if (sortedProj.length > 0) {
                const closest = sortedProj[0];
                logger(state, 'debug', 'handle_projectiles', `Praying against projectile ${closest.id} while moving.`);
                projectileFunctions.prayProjectile(state, closest);
              } else {
                // No projectiles, disable protection prayers
                logger(state, 'debug', 'handle_projectiles', 'No projectiles tracked, deactivating protection prayers.');
                const activePrayer = prayerFunctions.getActivePrayer(state);
                if (activePrayer) {
                  prayerFunctions.togglePrayer(state, activePrayer);
                }
              }
              break;
            }

            // Priority 2: Tile is safe, handle incoming projectiles
            if (sortedProj.length > 0) {
              const closestProj = sortedProj[0];
              logger(state, 'debug', 'handle_projectiles', 
                `Handling projectile ${closestProj.id} at distance ${closestProj.distance}, hits in ${closestProj.ticksUntilHit} ticks.`);
              projectileFunctions.prayProjectile(state, closestProj);
              break;
            }

            // Priority 3: No projectiles and tile is safe, return to attacking
            logger(state, 'debug', 'handle_projectiles', 'No projectiles and tile is safe, returning to attacking state.');
            
            // Disable protection prayers before returning to attack
            const activePrayer = prayerFunctions.getActivePrayer(state);
            if (activePrayer) {
              prayerFunctions.togglePrayer(state, activePrayer);
            }
            
            state.sub_State = 'attacking';
            break;
          }

          // Handles all moving to safe tile logic during the fight
          case 'moving_to_safe_tile': {
            const currentTile = client.getLocalPlayer().getWorldLocation();
            const isDangerousTile = tileFunctions.getDangerousTiles().some(tile => tile.equals(currentTile));
            const sortedProj = projectileFunctions.getSortedProjectiles();
            const isWalking = bot.walking.isWebWalking();
            const movementTimeout = 10; // 10 ticks = 6 seconds max movement time

            // Continue praying projectiles while moving
            if (sortedProj.length > 0) {
              const closest = sortedProj[0];
              if (closest.ticksUntilHit && closest.ticksUntilHit <= 3) {
                logger(state, 'debug', 'moving_to_safe_tile', `Praying against projectile ${closest.id} while moving.`);
                projectileFunctions.prayProjectile(state, closest);
              }
            } else {
              // No projectiles, deactivate protection prayers
              logger(state, 'debug', 'moving_to_safe_tile', 'No projectiles tracked, deactivating protection prayers.');
              const activePrayer = prayerFunctions.getActivePrayer(state);
              if (activePrayer) {
                prayerFunctions.togglePrayer(state, activePrayer);
              }
            }

            // Check if reached safe tile and stopped walking
            if (!isDangerousTile && !isWalking) {
              logger(state, 'debug', 'moving_to_safe_tile', 'Reached safe tile, re-attacking NPC.');
              
              // Re-attack the NPC to maintain DPS
              const leviathans = bot.npcs.getWithIds([npcIds.leviathanPost]);
              if (leviathans && leviathans.length > 0) {
                playerFunctions.attackTargetNpc(state, npcIds.leviathanPost);
                logger(state, 'debug', 'moving_to_safe_tile', 'Re-engaged Leviathan after moving to safety.');
              } else {
                logger(state, 'debug', 'moving_to_safe_tile', 'Leviathan not found after reaching safe tile.');
              }
              
              // Return to projectile handling (which will loop back to attacking if no threats)
              state.sub_State = 'handle_projectiles';
              break;
            }

            // Check for movement timeout
            if (state.movementStartTick > 0 && state.gameTick - state.movementStartTick > movementTimeout) {
              logger(state, 'debug', 'moving_to_safe_tile', 'Movement timeout reached, stopping walk and returning to attacking.');
              bot.walking.webWalkCancel();
              state.sub_State = 'handle_projectiles';
              break;
            }

            // Still moving, continue waiting and praying
            if (isDangerousTile) {
              logger(state, 'debug', 'moving_to_safe_tile', 'Tile still dangerous, continuing movement.');
            }
            break;
          }

          default: {
            logger(state, 'debug', 'attack_leviathan', 'Unknown sub_State, resetting to attacking.');
            state.sub_State = 'attacking';
            break;
          }
        }
      break;
    }
    
    default: {
      logger(state, 'debug', 'stateManager', 'Unknown mainState, resetting to start_state.');
      state.mainState = 'start_state';
      state.sub_State = '';
      break;
    }
  }
};
