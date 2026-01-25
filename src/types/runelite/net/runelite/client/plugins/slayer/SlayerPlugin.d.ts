/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Tyler <https://github.com/tylerthardy>
 * Copyright (c) 2018, Shaun Dreclin <shaundreclin@gmail.com>
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
declare namespace net.runelite.client.plugins.slayer {
export class SlayerPlugin extends Plugin
{
	//Chat messages
	// Chat Command
	configure(binder: Binder): void;
	private startUp(): void;
			// !task requires off-thread access to slayer task locations
	private shutDown(): void;
	provideSlayerConfig(configManager: ConfigManager): SlayerConfig;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
			// client (or with CONNECTION_LOST, the server...) will soon zero the slayer varps.
			// zero task/amount so that this doesn't cause the plugin to reset the task, which
			// would forget the initial amount. The vars are then resynced shortly after
	onCommandExecuted(commandExecuted: net.runelite.api.events.CommandExecuted): void;
	getIntProfileConfig(key: string): number;
	private setProfileConfig(key: string, value: Record<string, any>): void;
	private save(): void;
	onNpcSpawned(npcSpawned: net.runelite.api.events.NpcSpawned): void;
	onNpcDespawned(npcDespawned: net.runelite.api.events.NpcDespawned): void;
	onVarbitChanged(varbitChanged: net.runelite.api.events.VarbitChanged): void;
			// points is on a tooltip on the counter, so requires a rebuild if it changes
			// streak is on a tooltip on the counter, so requires a rebuild if it changes
	private updateTask(): void;
				// initial amount is not in a var, so we initialize it from the stored amount
				// initialize streak and points in the event the plugin was toggled on after login
				// save changed value
					// add and update counter, set timer
	onGameTick(tick: net.runelite.api.events.GameTick): void;
	onChatMessage(event: net.runelite.api.events.ChatMessage): void;
	private onConfigChanged(event: ConfigChanged): void;
	onMenuOptionClicked(menuOptionClicked: net.runelite.api.events.MenuOptionClicked): void;
			// hack around equipment interface which has the item on a child component
	isTarget(npc: NPC): boolean;
					// Pick action is for zygomite-fungi
	private rebuildTargetNames(task: Task): void;
	private static targetNamePattern(targetName: string): Pattern;
	private rebuildTargetList(): void;
	setTask(name: string, amt: number, initAmt: number): void;
	private setTask(name: string, amt: number, initAmt: number, location: string, addCounter: boolean): void;
	private addCounter(): void;
	private removeCounter(): void;
	taskLookup(chatMessage: net.runelite.api.events.ChatMessage, message: string): void;
	private taskSubmit(chatInput: ChatInput, value: string): boolean;
	private isValidLocation(location: string): boolean;
	//Utils
	private static capsString(str: string): string;
}
}