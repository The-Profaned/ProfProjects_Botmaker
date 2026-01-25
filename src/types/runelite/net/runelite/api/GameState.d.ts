/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2016-2017, Adam <Adam@sigterm.info>
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
	 * An enumeration of game states the client is in.
	 */
	export class GameState {
		/**
		 * Unknown game state.
		 */
		static UNKNOWN: GameState;
		/**
		 * The client is starting.
		 */
		static STARTING: GameState;
		/**
		 * The client is at the login screen.
		 */
		static LOGIN_SCREEN: GameState;
		/**
		 * The client is at the login screen entering authenticator code.
		 */
		static LOGIN_SCREEN_AUTHENTICATOR: GameState;
		/**
		 * There is a player logging in.
		 */
		static LOGGING_IN: GameState;
		/**
		 * The game is being loaded.
		 */
		static LOADING: GameState;
		/**
		 * The user has successfully logged in.
		 */
		static LOGGED_IN: GameState;
		/**
		 * Connection to the server was lost.
		 */
		static CONNECTION_LOST: GameState;
		/**
		 * A world hop is taking place.
		 */
		static HOPPING: GameState;

		/**
		 * The raw state value.
		 */
		getState(): number;

		toString(): string;

		/**
		 * Utility method that maps the rank value to its respective
		 * {@link GameState} value.
		 *
		 * @param state the raw state value
		 * @return the gamestate
		 */
		static of(state: number): GameState;
	}
}
