import { CombatSubStates, state } from '../script-state.js';
import { projectileManager } from './Combat/projectile-manager.js';
import { statManager } from './Combat/stat-manager.js';
import { attackManager } from './Combat/attack-manager.js';
import { movementManager } from './Combat/movement-manager.js';
import { pathfinderSpawnManager } from './Combat/pathfinder-spawn-manager.js';
import { pathfinderTrackingManager } from './Combat/pathfinder-tracking-manager.js';
import { specialManager1 } from './Combat/special-manager-1.js';
import { specialManager2 } from './Combat/special-manager-2.js';

// Combat State Manager
export function Combat() {
	const combatState = state.combatState;

	// Handle projectile tracking, prayer activation, and danger avoidance every tick
	projectileManager();

	// Check pathfinder health gate every tick (at 25% and 20% health)
	pathfinderSpawnManager();

	switch (combatState.subState) {
		case CombatSubStates.ATTACK: {
			attackManager();
			break;
		}
		case CombatSubStates.STATS: {
			statManager();
			break;
		}
		case CombatSubStates.MOVEMENT: {
			movementManager();
			break;
		}
		case CombatSubStates.PATHFINDER_SPAWN: {
			pathfinderSpawnManager();
			break;
		}
		case CombatSubStates.PATHFINDER_TRACK: {
			pathfinderTrackingManager();
			break;
		}
		case CombatSubStates.SPECIAL_1: {
			specialManager1();
			break;
		}
		case CombatSubStates.SPECIAL_2: {
			specialManager2();
			break;
		}
		default: {
			combatState.subState = CombatSubStates.ATTACK;
			break;
		}
	}
}
