/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2021, Trevor <https://github.com/Trevor159>
 * Copyright (c) 2021 Abex
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
	 * Represents a modified {@link GraphicsObject}
	 */
	export class RuneLiteObject extends GraphicsObject {
		/**
		 * Sets the model of the RuneLiteObject
		 */
		setModel(model: Model): void;
		/**
		 * Sets the animation of the RuneLiteObject
		 * If animation is null model will be static
		 */
		setAnimation(animation: Animation): void;
		/**
		 * Sets whether the animation of the RuneLiteObject should loop when the animation ends.
		 * If this is false the object will despawn when the animation ends.
		 * Does nothing if the animation is null.
		 */
		setShouldLoop(shouldLoop: boolean): void;
		/**
		 * Sets the location in the scene for the RuneLiteObject
		 */
		setLocation(
			point: net.runelite.api.coords.LocalPoint,
			plane: number,
		): void;
		/**
		 * Sets the state of the RuneLiteObject
		 * Set to true to spawn the object
		 * Set to false to despawn the object
		 */
		setActive(active: boolean): void;
		/**
		 * Gets the state of the RuneLiteObject
		 *
		 * @return true if the RuneLiteObject is added to the scene
		 */
		isActive(): boolean;
		/**
		 * Get the object orientation
		 * @see net.runelite.api.coords.Angle
		 * @return
		 */
		getOrientation(): number;
		/**
		 * Set the object orientation
		 * @see net.runelite.api.coords.Angle
		 * @param orientation
		 */
		setOrientation(orientation: number): void;
		/**
		 * Get the object radius. The radius is offset from the object position to form a 2d rectangle, and the tiles
		 * the corners are in are used to determine the min and max scene x/y the object is on. These tiles are then drawn
		 * first prior to the object being drawn, so that the object renders correctly over top of each tile.
		 * The default radius is 60, marginally less than 128/2, which works well for models the size of a single tile.
		 * @return
		 */
		getRadius(): number;
		/**
		 * Set the object radius
		 * @see #getRadius()
		 * @param radius
		 */
		setRadius(radius: number): void;
		/**
		 * If true, the rectangle computed from the radius has 1 or 2 of its sides expanded by a full tile based on the
		 * orientation the object is facing. This causes the tiles the object is facing to be drawn first, even if the
		 * radius of the object would not place the object on that tile.
		 * The default is false.
		 * @return
		 */
		drawFrontTilesFirst(): boolean;
		/**
		 * Sets whether the front tiles are drawn first.
		 * @see #drawFrontTilesFirst()
		 * @param drawFrontTilesFirst
		 */
		setDrawFrontTilesFirst(drawFrontTilesFirst: boolean): void;
	}
}
