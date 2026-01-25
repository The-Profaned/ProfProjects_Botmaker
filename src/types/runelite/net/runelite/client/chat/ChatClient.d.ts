/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.chat {
export class ChatClient
{
	submitKc(username: string, boss: string, kc: number): boolean;
	getKc(username: string, boss: string): number;
	submitQp(username: string, qp: number): boolean;
	getQp(username: string): number;
	submitTask(username: string, task: string, amount: number, initialAmount: number, location: string): boolean;
	getTask(username: string): Task;
	submitPb(username: string, boss: string, pb: number): boolean;
	getPb(username: string, boss: string): number;
	submitGc(username: string, gc: number): boolean;
	getGc(username: string): number;
	submitDuels(username: string, wins: number, losses: number, winningStreak: number, losingStreak: number): boolean;
	getDuels(username: string): Duels;
	submitLayout(username: string, rooms: LayoutRoom[]): boolean;
	getLayout(username: string): LayoutRoom[];
	submitPetList(username: string, petList: Collection<Integer>): boolean;
	getPetList(username: string): Set<Integer>;
			// CHECKSTYLE:OFF
			// CHECKSTYLE:ON
}
}