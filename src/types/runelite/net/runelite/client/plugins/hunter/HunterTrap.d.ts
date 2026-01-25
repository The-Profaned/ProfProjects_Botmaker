/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Robin Weymans <Robin.weymans@gmail.com>
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
declare namespace net.runelite.client.plugins.hunter {
/**
 * Wrapper class for a GameObject that represents a hunter trap.
 */
export class HunterTrap
{
	/**
	 * A hunter trap stays up 1 minute before collapsing.
	 */
	/**
	 * The time in milliseconds when the trap was placed.
	 */
	/**
	 * The state of the trap.
	 */
	/**
	 * The ID of the game object this is representing
	 */
	/**
	 * The states a trap can be in.
	 */
static State =
{
		/**
		 * A laid out trap.
		 */
OPEN = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
		/**
		 * A trap that is empty.
		 */
EMPTY = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
		/**
		 * A trap that caught something.
		 */
FULL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
		/**
		 * A trap that is closing.
		 */
TRANSITION = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
}
	/**
	 * Constructor for a HunterTrap object
	 *
	 * @param gameObject The gameobject thats corresponds with this trap.
	 */
	/**
	 * Calculates how much time is left before the trap is collapsing.
	 *
	 * @return Value between 0 and 1. 0 means the trap was laid moments ago.
	 * 1 is a trap that's about to collapse.
	 */
	getTrapTimeRelative(): number;
	/**
	 * Resets the time value when the trap was placed.
	 */
	resetTimer(): void;
}
}