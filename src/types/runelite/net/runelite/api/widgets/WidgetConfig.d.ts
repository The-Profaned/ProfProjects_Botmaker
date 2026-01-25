/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Adam <Adam@sigterm.info>
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
 * Utility class used for defining options to be used on the click mask
 * of a {@link Widget}.
 *
 * @see Widget#getClickMask()
 */
export class WidgetConfig
{
	/**
	 * Enables displaying a ninth option on a menu.
	 */
	/**
	 * Can this widget be used on a item on the floor
	 */
	/**
	 * Can this widget be used on a NPC
	 */
	/**
	 * Can this widget be used on a game object
	 */
	/**
	 * Can this widget be used on a player
	 */
	/**
	 * Can this widget be used on a item in your inventory
	 */
/** @deprecated */
	/**
	 * Can this widget be used on a widget with the WIDGET_USE_TARGET flag
	 */
	/**
	 * Controls whether this widget can be dragged around.
	 */
	/**
	 * Controls whether this widget can have other widgets dragged onto it.
	 */
	/**
	 * Can widgets with USE_WIDGET be used on this widget
	 */
	/**
	 * Does the action (zero bosed) get transmitted to the server
	 * when clicked
	 */
	static transmitAction(action: number): number;
}
}