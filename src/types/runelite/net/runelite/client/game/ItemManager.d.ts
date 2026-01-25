/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
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
declare namespace net.runelite.client.game {
	export class ItemManager {
		/** TBD-1 */
		// export class ImageKey
		/** TBD-1 */
		// export class OutlineKey
		// Worn items with weight reducing property have a different worn and inventory ItemID
		private loadPrices(): void;
		private loadStats(): void;
		/**
		 * Look up an item's price
		 *
		 * @param itemID item id
		 * @return item price
		 */
		getItemPrice(itemID: number): number;
		/**
		 * Look up an item's price
		 *
		 * @param itemID item id
		 * @param useWikiPrice use the actively traded/wiki price
		 * @return item price
		 */
		getItemPriceWithSource(itemID: number, useWikiPrice: boolean): number;
		/**
		 * Get the wiki price for an item, with checks to try and avoid excessive price manipulation
		 * @param itemPrice
		 * @return
		 */
		getWikiPrice(itemPrice: ItemPrice): number;
		/**
		 * Look up an item's stats
		 * @param itemId item id
		 * @return item stats
		 */
		getItemStats(itemId: number, allowNote: boolean): net.runelite.http.api.item.ItemStats | null;
		/**
		 * Search for tradeable items based on item name
		 *
		 * @param itemName item name
		 * @return
		 */
		search(itemName: string): Array<ItemPrice>;
		/**
		 * Look up an item's composition
		 *
		 * @param itemId item id
		 * @return item composition
		 */
		getItemComposition(itemId: number): net.runelite.api.ItemComposition;
		/**
		 * Get an item's un-noted, un-placeholdered ID
		 */
		canonicalize(itemID: number): number;
		/**
		 * Loads item sprite from game, makes transparent, and generates image
		 *
		 * @param itemId
		 * @return
		 */
		private loadImage(itemId: number, quantity: number, stackable: boolean): AsyncBufferedImage;
		/**
		 * Get item sprite image as BufferedImage.
		 * <p>
		 * This method may return immediately with a blank image if not called on the game thread.
		 * The image will be filled in later. If this is used for a UI label/button, it should be added
		 * using AsyncBufferedImage::addTo to ensure it is painted properly
		 *
		 * @param itemId
		 * @return
		 */
		getImage(itemId: number): AsyncBufferedImage;
		/**
		 * Get item sprite image as BufferedImage.
		 * <p>
		 * This method may return immediately with a blank image if not called on the game thread.
		 * The image will be filled in later. If this is used for a UI label/button, it should be added
		 * using AsyncBufferedImage::addTo to ensure it is painted properly
		 *
		 * @param itemId
		 * @param quantity
		 * @return
		 */
		getImage(itemId: number, quantity: number, stackable: boolean): AsyncBufferedImage;
		/**
		 * Create item sprite and applies an outline.
		 *
		 * @param itemId item id
		 * @param itemQuantity item quantity
		 * @param outlineColor outline color
		 * @return image
		 */
		private loadItemOutline(itemId: number, itemQuantity: number, outlineColor: java.awt.Color): BufferedImage;
		/**
		 * Get item outline with a specific color.
		 *
		 * @param itemId item id
		 * @param itemQuantity item quantity
		 * @param outlineColor outline color
		 * @return image
		 */
		getItemOutline(itemId: number, itemQuantity: number, outlineColor: java.awt.Color): BufferedImage;
	}
}
