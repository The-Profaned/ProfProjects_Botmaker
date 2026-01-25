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
	 * Holds data of a RuneScape world.
	 */
	export class World {
		/**
		 * Gets all applicable world types for this world.
		 *
		 * @return the world types
		 */
		getTypes(): EnumSet<WorldType>;
		/**
		 * Sets world types.
		 *
		 * @param types the types
		 */
		setTypes(types: EnumSet<WorldType>): void;
		/**
		 * Gets the current number of players logged in the world.
		 *
		 * @return the player count
		 */
		getPlayerCount(): number;
		/**
		 * Sets the player count of the world.
		 *
		 * @param playerCount the new player count
		 */
		setPlayerCount(playerCount: number): void;
		/**
		 * Gets the world location value.
		 *
		 * @return the world location
		 */
		getLocation(): number;
		/**
		 * Sets the world location value.
		 *
		 * @param location the location
		 */
		setLocation(location: number): void;
		/**
		 * Gets the worlds index.
		 *
		 * @return the index
		 */
		getIndex(): number;
		/**
		 *  Sets the worlds index.
		 *
		 * @param index the index
		 */
		setIndex(index: number): void;
		/**
		 * Gets the world number.
		 *
		 * @return the world number
		 */
		getId(): number;
		/**
		 * Sets the world number.
		 *
		 * @param id the world number
		 */
		setId(id: number): void;
		/**
		 * Gets the world activity description.
		 * <p>
		 * For example, world 2 would return "Trade - Members".
		 *
		 * @return the world activity
		 */
		getActivity(): string;
		/**
		 * Sets the world activity description.
		 *
		 * @param activity the activity
		 */
		setActivity(activity: string): void;
		/**
		 * Gets the address of the world.
		 *
		 * @return the world address
		 */
		getAddress(): string;
		/**
		 * Sets the address of the world.
		 *
		 * @param address the address
		 */
		setAddress(address: string): void;
	}
}
