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
	 * Represents the template of a player.
	 */
	export class PlayerComposition {
		/**
		 * Checks if the player is female.
		 *
		 * @return true if the player is female
		 * @deprecated use getGender
		 */
		/** @deprecated */
		isFemale(): boolean;
		/**
		 * Get the player gender
		 *
		 * @return 0 for male, 1 for female
		 */
		getGender(): number;
		/**
		 * Get the body part colors for this player composition.
		 *
		 * @return an array of the colors, always size 5
		 */
		getColors(): number[];
		/**
		 * Gets an array of IDs related to equipment slots.
		 * <p>
		 * If the ID for a specific slot is between 256 and 512, subtracting
		 * 256 will result in the kit ID. Values above 512 indicate an item
		 * and can be converted to the item ID by subtracting 512.
		 *
		 * @return the equipment IDs
		 */
		getEquipmentIds(): number[];
		/**
		 * Gets the equipment ID of a particular slot.
		 *
		 * @param type equipment slot
		 * @return the equipment ID
		 */
		getEquipmentId(type: net.runelite.api.kit.KitType): number;
		/**
		 * Gets the kit ID of a particular slot.
		 *
		 * @param type equipment slot
		 * @return the kit ID
		 */
		getKitId(type: net.runelite.api.kit.KitType): number;
		/**
		 * Update the cached hash value for player equipment
		 * Used to cache the player models based on equipment.
		 */
		setHash(): void;
		setTransformedNpcId(id: number): void;
		/**
		 * Get the overrides for this player composition, indexed by kit id. The overrides
		 * replace the target color/textures for the item instead of using the target colors/textures
		 * from the item composition. Only works if the kittype is an item.
		 * @return
		 */
		getColorTextureOverrides(): java.awt.ColorTextureOverride[] | null;
	}
}
