/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Cameron <moberg@tuta.io>
 * Copyright (c) 2018, Levi <me@levischuck.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.client.plugins.xptracker {
export class XpTrackerPlugin extends Plugin
{
	/**
	 * Amount of EXP that must be gained for an update to be submitted.
	 */
	provideConfig(configManager: ConfigManager): XpTrackerConfig;
	configure(binder: Binder): void;
	private startUp(): void;
		// Initialize the tracker & last xp if already logged in
	private shutDown(): void;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
			// LOGGED_IN is triggered between region changes too.
			// Check that the username changed or the world type changed.
				// Reset
				// xp is not available until after login is finished, so fetch it on the next gametick
				// Must be set from hitting the LOGGING_IN or HOPPING case below
			// Don't submit xptrack unless xp threshold is reached
	private worldSetToType(types: EnumSet<WorldType>): XpWorldType;
	/**
	 * Adds an overlay to the canvas for tracking a specific skill.
	 *
	 * @param skill the skill for which the overlay should be added
	 */
	addOverlay(skill: Skill): void;
	/**
	 * Removes an overlay from the overlayManager if it's present.
	 *
	 * @param skill the skill for which the overlay should be removed.
	 */
	removeOverlay(skill: Skill): void;
	/**
	 * Check if there is an overlay on the canvas for the skill.
	 *
	 * @param skill the skill which should have an overlay.
	 * @return true if the skill has an overlay.
	 */
	hasOverlay(skill: Skill): boolean;
	/**
	 * Reset internal state and re-initialize all skills with XP currently cached by the RS client
	 * This is called by the user manually clicking resetSkillState in the UI.
	 * It reloads the current skills from the client after resetting internal state.
	 */
	resetAndInitState(): void;
	/**
	 * Throw out everything, the user has chosen a different account or world type.
	 * This resets both the internal state and UI elements
	 */
	private resetState(): void;
	/**
	 * Reset an individual skill with the client's current known state of the skill
	 * Will also clear the skill from the UI.
	 *
	 * @param skill Skill to reset
	 */
	resetSkillState(skill: Skill): void;
	/**
	 * Reset all skills except for the one provided
	 *
	 * @param skill Skill to ignore during reset
	 */
	resetOtherSkillState(skill: Skill): void;
	/**
	 * Reset the xp gained since last reset of the skill
	 * Does not clear the skill from the UI.
	 *
	 * @param skill Skill to reset per hour rate
	 */
	resetSkillPerHourState(skill: Skill): void;
	/**
	 * Reset the xp gained since last reset of all skills including OVERALL
	 * Does not clear the UI.
	 */
	resetAllSkillsPerHourState(): void;
	onStatChanged(statChanged: net.runelite.api.events.StatChanged): void;
			// This is the XP sync on login, wait until after login to begin counting
		// Also update the total experience
	onNpcDespawned(event: net.runelite.api.events.NpcDespawned): void;
	onGameTick(event: net.runelite.api.events.GameTick): void;
			// Check for xp gained while logged out
					// Offset start xp for offline gains
			// Initialize the tracker with the initial xp if not already initialized
					// goal exps are not necessary for skill initialization
			// Initialize the overall xp
	onMenuEntryAdded(event: net.runelite.api.events.MenuEntryAdded): void;
		// Get skill from menu option, eg. "View <col=ff981f>Attack</col> guide"
	getSkillState(skill: Skill): XpStateSingle;
	getSkillSnapshot(skill: Skill): XpSnapshotSingle;
	private static startGoalVarpForSkill(skill: Skill): number;
	private static endGoalVarpForSkill(skill: Skill): number;
	tickSkillTimes(): void;
		// Adjust unpause states
	private rebuildSkills(): void;
		// Rebuild calculated values like xp/hr in panel
	pauseSkill(skill: Skill, pause: boolean): void;
	pauseAllSkills(pause: boolean): void;
}
}