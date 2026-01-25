/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Adam <Adam@sigterm.info>
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
	 * Represents a projectile entity. (ie. cannonball, arrow)
	 */
	export class Projectile extends Renderable {
		/**
		 * Gets the ID of the projectile.
		 *
		 * @return the projectile ID
		 * @see net.runelite.api.gameval.SpotanimID
		 */
		getId(): number;

		/**
		 * Get the level the projectile starts on.
		 *
		 * @return
		 */
		getSourceLevel(): number;

		/**
		 * Get the point the projectile starts at.
		 *
		 * @return
		 */
		getSourcePoint(): net.runelite.api.coords.WorldPoint;

		/**
		 * Get the actor the projectile starts at.
		 *
		 * @return
		 */
		getSourceActor(): Actor | null;

		/**
		 * Get the level the projectile ends on.
		 * @return
		 */
		getTargetLevel(): number;

		/**
		 * Get the point the projectile ends at.
		 *
		 * @return
		 */
		getTargetPoint(): net.runelite.api.coords.WorldPoint;

		/**
		 * Get the actor the projectile ends at.
		 *
		 * @return
		 */
		getTargetActor(): Actor | null;

		/**
		 * Gets the actor that is targeted by this projectile.
		 *
		 * @return the target actor, or null if this projectile is an AoE attack
		 * @deprecated
		 */
		getInteracting(): Actor | null;

		/**
		 * Get the target point of the projectile. For projectiles with an actor target,
		 * this is updated each frame to the actor position.
		 *
		 * @return
		 * @deprecated
		 */
		getTarget(): net.runelite.api.coords.LocalPoint;

		/**
		 * Gets the original x-axis coordinate that this projectile started from.
		 *
		 * @return the original coordinate
		 * @deprecated
		 */
		getX1(): number;

		/**
		 * Gets the original y-axis coordinate that this projectile started from.
		 *
		 * @return the original coordinate
		 * @deprecated
		 */
		getY1(): number;

		/**
		 * Gets the plane that the projectile is on.
		 *
		 * @return the plane
		 * @deprecated
		 */
		getFloor(): number;

		/**
		 * Gets the height of the projectile.
		 *
		 * @return the height
		 * @deprecated
		 */
		getHeight(): number;

		/**
		 * Gets the ending height of the projectile.
		 *
		 * @return the ending height
		 */
		getEndHeight(): number;

		/**
		 * Gets the game cycle that the projectile begun movement at.
		 *
		 * @return the start game cycle
		 */
		getStartCycle(): number;

		/**
		 * Gets the game cycle that the projectile will reach its target at.
		 *
		 * @return the end game cycle
		 */
		getEndCycle(): number;

		/**
		 * Sets the game cycle the projectile will reach its target at. The
		 * projectile automatically despawns after this time, and setting the
		 * end cycle to a time in the past is an effective way of removing the
		 * projectile.
		 * @param cycle
		 */
		setEndCycle(cycle: number): void;

		/**
		 * Gets the remaining game cycles until the projectile reaches its
		 * target and despawns.
		 *
		 * @return the remaining game cycles
		 */
		getRemainingCycles(): number;

		/**
		 * Gets the slope of the projectile.
		 *
		 * @return the slope of the projectile
		 */
		getSlope(): number;

		/**
		 * Gets the starting position of the projectile.
		 *
		 * @return the starting position
		 */
		getStartPos(): number;

		/**
		 * Gets the starting height of the projectile.
		 *
		 * @return the starting height
		 */
		getStartHeight(): number;

		/**
		 * Gets the current x-axis coordinate of the projectile.
		 *
		 * @return the x-axis coordinate
		 */
		getX(): number;

		/**
		 * Gets the current y-axis coordinate of the projectile.
		 *
		 * @return the y-axis coordinate
		 */
		getY(): number;

		/**
		 * Gets the current z-axis coordinate of the projectile.
		 *
		 * @return the z-axis coordinate
		 */
		getZ(): number;

		/**
		 * Get the projectile orientation in JAU
		 *
		 * @return
		 */
		getOrientation(): number;

		/**
		 * The animation of the projectile
		 * @return
		 */
		getAnimation(): Animation | null;

		/**
		 * The frame of the current animation
		 * @return
		 */
		getAnimationFrame(): number;
	}
}
