/// <reference path="../../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018 Abex
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 *  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.client.plugins.timetracking.farming {
export class FarmingTracker
{
	/**
	 * The time at which all patches of a particular type will be ready to be harvested,
	 * or {@code -1} if we have no data about any patch of the given type.
	 */
	createTabPanel(tab: Tab, farmingContractManager: FarmingContractManager): FarmingTabPanel;
	/**
	 * Updates tracker data for the current region. Returns true if any data was changed.
	 */
	updateData(location: net.runelite.api.coords.WorldPoint, timeSinceModalClose: number): boolean;
		//Varbits don't get sent when a modal widget is open so just return
			// Write config with new varbits
			// timetracking.<rsprofile>.<regionID>.<VarbitID>=<varbitValue>:<unix time>
				// Write the config value if it doesn't match what is current, or it is more than 5 minutes old
								// ignored
								// Don't set wasNotified to false if witnessing a check-health action
		//Do one scan after loading a new region before possibly updating tick offsets
	private isObservedGrowthTick(previous: PatchState, current: PatchState): boolean;
		//Check the previous state so it will still calculate during the final growth tick
		//Ignore weeds growing or being cleared.
	predictPatch(patch: FarmingPatch): PatchPrediction | null;
	predictPatch(patch: FarmingPatch, profile: string): PatchPrediction | null;
	getTickTime(tickRate: number, ticks: number): number;
	getTickTime(tickRate: number, ticks: number, requestedTime: number, profile: string): number;
		//All offsets are negative but are stored as positive
		//Calculate "now" as +offset seconds in the future so we calculate the correct ticks
		//The time that the tick requested will happen
		//Move ourselves back to real time
	loadCompletionTimes(): void;
	getSummary(patchType: Tab): SummaryState;
	/**
	 * Gets the overall completion time for the given patch type.
	 *
	 * @see #completionTimes
	 */
	getCompletionTime(patchType: Tab): number;
	/**
	 * Updates the overall completion time for the given patch type.
	 *
	 * @see #completionTimes
	 */
	private updateCompletionTime(): void;
					// update max duration if this patch takes longer to grow
	checkCompletion(): void;
	sendNotification(profile: RuneScapeProfile, prediction: PatchPrediction, patch: FarmingPatch): void;
		// Same RS account
			// Same RS account but different profile type
			// Same RS account AND profile falls through here so no bracketed prefix is added
			// Different RS account AND profile type
				//Don't print profile type when logged out if is STANDARD
			// Different RS account but same profile type
				// EMPTY and FILLING are caught above
}
}