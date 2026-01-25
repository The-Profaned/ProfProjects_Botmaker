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
	 * Information about a specific {@link ObjectID}
	 */
	export class ObjectComposition extends ParamHolder {
		/**
		 * Gets ID for the object.
		 *
		 * @see ObjectID
		 */
		getId(): number;
		/**
		 * Gets the name of the object.
		 */
		getName(): string;
		/**
		 * The 5 menuops this object has when in world. Index 0 corresponds to
		 * {@link MenuAction#GAME_OBJECT_FIRST_OPTION}, Index 2 to
		 * {@link MenuAction#GAME_OBJECT_SECOND_OPTION} and so on.
		 */
		getActions(): string[];
		/**
		 * Gets the index of this object in the {@link Client#getMapScene()}
		 * array, or -1 if it has no map scene icon
		 */
		getMapSceneId(): number;
		/**
		 * Set the map scene index into the {@link Client#getMapScene()}
		 * array, or -1 if it has no map scene icon
		 * @param mapSceneId
		 */
		setMapSceneId(mapSceneId: number): void;
		/**
		 * Gets the index of this object in the {@link Client#getMapIcons()}
		 * array, or -1 if it has no full map icon
		 */
		getMapIconId(): number;
		/**
		 * Set the index of the object in the {@link Client#getMapIcons()}
		 * array, or -1 if it has no map icon
		 * @param mapIconId
		 */
		setMapIconId(mapIconId: number): void;
		/**
		 * Get the {@link ObjectID}s of objects this can transform into, depending
		 * on a {@link Varbits} or {@link VarPlayer}
		 */
		getImpostorIds(): number[];
		/**
		 * Get the object composition the player's state says this object should
		 * transmogrify into.
		 *
		 * @throws NullPointerException if {@link #getImpostorIds()} is null
		 */
		getImpostor(): ObjectComposition;
		/**
		 * Gets the {@link Varbits} used to switch this multiloc, or {@code -1} if this is not switched by a Varbit
		 *
		 * @see #getImpostor()
		 * @see #getImpostorIds()
		 */
		getVarbitId(): number;
		/**
		 * Gets the {@link VarPlayer} used to switch this multiloc, or {@code -1} if this is not switched by a VarPlayer
		 *
		 * @see #getImpostor()
		 * @see #getImpostorIds()
		 */
		getVarPlayerId(): number;
		/**
		 * Get the size of the object on the X-axis in tiles
		 * @return
		 */
		getSizeX(): number;
		/**
		 * Get the size of the object on the Y-axis in tiles
		 * @return
		 */
		getSizeY(): number;
	}
}
