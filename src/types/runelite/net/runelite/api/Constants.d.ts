/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Lotto <https://github.com/devLotto>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.api {
/**
 * A utility class containing constant values.
 */
export class Constants
{
	/**
	 * The original width of the game when running in fixed mode.
	 */
	/**
	 * The original height of the game when running in fixed mode.
	 */
	/**
	 * Dimension representation of the width and height of the game in fixed mode.
	 */
	/**
	 * The aspect ratio of the game when running in fixed mode.
	 */
	/**
	 * The default camera zoom value.
	 */
	/**
	 * The width and length of a chunk (8x8 tiles).
	 */
	/**
	 * The width and length of a map region (64x64 tiles).
	 */
	/**
	 * The width and length of the scene (13 chunks x 8 tiles).
	 */
	/**
	 * Size of the extended scene. To compute the offset to convert from scene coordinate to
	 * extended scene coordinate, use (EXTENDED_SCENE_SIZE-SCENE_SIZE)/2.
	 */
	/**
	 * The max allowed plane by the game.
	 * <p>
	 * This value is exclusive. The plane is set by 2 bits which restricts
	 * the plane value to 0-3.
	 */
	/**
	 * Flag for roof removal to remove the roofs above the player's current position.
	 */
	/**
	 * Flag for roof removal to remove the roofs above the currently hovered tile.
	 */
	/**
	 * Flag for roof removal to remove the roofs above the player's destination tile.
	 */
	/**
	 * Flag for roof removal to remove the roofs that are above any tile between the camera and the player.
	 */
	/**
	 * The height of the overworld, in tiles. Coordinates above this are in caves and other such zones.
	 */
	/**
	 * The number of milliseconds in a client tick.
	 * <p>
	 * This is the length of a single frame when the client is running at
	 * the maximum framerate of 50 fps.
	 */
	/**
	 * The number of milliseconds in a server game tick.
	 * <p>
	 * This is the length of a single game cycle under ideal conditions.
	 * All game-play actions operate within multiples of this duration.
	 */
	/**
	 * Width of a standard item sprite
	 */
	/**
	 * Height of a standard item sprite
	 */
	/**
	 * High alchemy = shop price * HIGH_ALCHEMY_MULTIPLIER
	 *
	 * @see ItemComposition#getPrice
	 */
}
}