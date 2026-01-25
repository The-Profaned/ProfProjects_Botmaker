/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Tomas Slusny <slusnucky@gmail.com>
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
	 * An enumeration of possible world types.
	 */
	export class WorldType {
		/**
		 * Members world type.
		 */
		static MEMBERS: WorldType;
		/**
		 * Pvp world type.
		 */
		static PVP: WorldType;
		/**
		 * Bounty world type.
		 */
		static BOUNTY: WorldType;
		/**
		 * PVP arena world type.
		 */
		static PVP_ARENA: WorldType;
		/**
		 * Skill total world type.
		 */
		static SKILL_TOTAL: WorldType;
		/**
		 * Quest speedrunning
		 */
		static QUEST_SPEEDRUNNING: WorldType;
		/**
		 * High risk world type.
		 */
		static HIGH_RISK: WorldType;
		/**
		 * Last man standing world type.
		 */
		static LAST_MAN_STANDING: WorldType;
		/**
		 * Beta world.
		 */
		static BETA_WORLD: WorldType;
		static LEGACY_ONLY: WorldType;
		static EOC_ONLY: WorldType;
		/**
		 * Beta worlds without profiles that are saved.
		 */
		static NOSAVE_MODE: WorldType;
		/**
		 * Tournament world type
		 */
		static TOURNAMENT_WORLD: WorldType;
		/**
		 * Fresh start world type
		 */
		static FRESH_START_WORLD: WorldType;
		/**
		 * Deadman world type.
		 */
		static DEADMAN: WorldType;
		/**
		 * Seasonal world type for leagues and seasonal deadman.
		 */
		static SEASONAL: WorldType;

		toString(): string;

		/**
		 * Create enum set of world types from mask.
		 *
		 * @param mask the mask
		 * @return the enum set
		 */
		static fromMask(mask: number): EnumSet<WorldType>;

		/**
		 * Create mask from enum set of world types.
		 *
		 * @param types the types
		 * @return the int containing all mask
		 */
		static toMask(types: EnumSet<WorldType>): number;

		/**
		 * Checks whether a world having a {@link Collection} of {@link WorldType}s is a PVP world.
		 *
		 * @param worldTypes A {@link Collection} of {@link WorldType}s describing the given world.
		 * @return           True if the given worldtypes of the world are a PVP world, false otherwise.
		 * @see Client#getWorldType()
		 */
		static isPvpWorld(worldTypes: Collection<WorldType>): boolean;
	}
}
