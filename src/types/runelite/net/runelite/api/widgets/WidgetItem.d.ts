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
declare namespace net.runelite.api.widgets {
/**
 * An item that is being represented in a {@link Widget}.
 */
export class WidgetItem
{
	/**
	 * The ID of the item represented.
	 *
	 * @see net.runelite.api.ItemID
	 */
	/**
	 * The quantity of the represented item.
	 */
	/**
	 * The area where the widget is drawn on the canvas.
	 */
	/**
	 * The widget which contains this item.
	 */
	/**
	 * The canvas bounds for the widget, if it is being dragged.
	 */
	/**
	 * Get the area where the widget item is drawn on the canvas, accounting for drag
	 * @return
	 */
	getCanvasBounds(): Rectangle;
	/**
	 * Get the area where the widget item is drawn on the canvas
	 * @param dragging whether the returned area should account for widget drag
	 * @return
	 */
	getCanvasBounds(dragging: boolean): Rectangle;
	/**
	 * Gets the upper-left coordinate of where the widget is being drawn
	 * on the canvas, accounting for drag.
	 *
	 * @return the upper-left coordinate of where this widget is drawn
	 */
	getCanvasLocation(): Point;
}
}