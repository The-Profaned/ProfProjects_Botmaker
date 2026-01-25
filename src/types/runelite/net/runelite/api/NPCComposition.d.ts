/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
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
declare namespace net.runelite.api {
	/**
	 * Information about a specific {@link NpcID}
	 */
	export class NPCComposition extends ParamHolder {
		/**
		 * Gets the name of the NPC.
		 */
		getName(): string;
		/**
		 * Gets the model IDs that compose this NPC.
		 */
		getModels(): number[];
		/**
		 * The 5 menuops this NPC has when in world. Index 0 corresponds to
		 * {@link MenuAction#NPC_FIRST_OPTION}, Index 2 to
		 * {@link MenuAction#NPC_SECOND_OPTION} and so on.
		 */
		getActions(): string[];
		/**
		 * NPC can be interacting with via menu options
		 * @return
		 */
		isInteractible(): boolean;
		/**
		 * Gets whether the NPC is visible on the mini-map.
		 */
		isMinimapVisible(): boolean;
		isVisible(): boolean;
		/**
		 * Gets the ID of the NPC.
		 *
		 * @see NpcID
		 */
		getId(): number;
		/**
		 * @return the combat level, -1 if none
		 */
		getCombatLevel(): number;
		/**
		 * Get the {@link NpcID}s of NPCs this can transform into, depending
		 * on a {@link Varbits} or {@link VarPlayer}
		 */
		getConfigs(): number[];
		/**
		 * Get the NPC composition the player's state says this NPC should
		 * transmogrify into.
		 *
		 * @throws NullPointerException if {@link #getConfigs()} is null
		 */
		transform(): NPCComposition;
		/**
		 * How many tiles wide this NPC is
		 */
		getSize(): number;
		/**
		 * If the npc is a follower, such as a pet. Is affected by the
		 * "Move follower options lower down" setting.
		 * @return
		 */
		isFollower(): boolean;
		/**
		 * Get the colors to be replaced on this npc's model for this npc.
		 * @see JagexColor
		 * @return the colors to be replaced
		 */
		getColorToReplace(): number[] | null;
		/**
		 * Get the colors applied to this npc's model for this npc.
		 * @see JagexColor
		 * @return the colors to replace with
		 */
		getColorToReplaceWith(): number[] | null;
		/**
		 * Horizontal scaling of the npc model (1/128th of a tile).
		 * @return
		 */
		getWidthScale(): number;
		/**
		 * Vertical scaling of the npc model (1/128th of a tile).
		 * @return
		 */
		getHeightScale(): number;
	}
}
