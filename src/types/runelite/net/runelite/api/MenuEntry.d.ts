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
	 * A menu entry in a right-click menu.
	 */
	export class MenuEntry {
		/**
		 * The option text added to the menu. (ie. "Walk here", "Use")
		 */
		getOption(): string;
		setOption(option: string): MenuEntry;
		/**
		 * The target of the action. (ie. Item or Actor name)
		 * <p>
		 * If the option does not apply to any target, this field
		 * will be set to empty string.
		 */
		getTarget(): string;
		setTarget(target: string): MenuEntry;
		/**
		 * An identifier value for the target of the action.
		 */
		getIdentifier(): number;
		setIdentifier(identifier: number): MenuEntry;
		/**
		 * The action the entry will trigger.
		 */
		getType(): MenuAction;
		setType(type: MenuAction): MenuEntry;
		/**
		 * An additional parameter for the action.
		 */
		getParam0(): number;
		setParam0(param0: number): MenuEntry;
		/**
		 * A second additional parameter for the action.
		 */
		getParam1(): number;
		setParam1(param1: number): MenuEntry;
		/**
		 * If this is true and you have single mouse button on and this entry is
		 * the top entry the right click menu will not be opened when you left click
		 *
		 * This is used  for shift click
		 */
		isForceLeftClick(): boolean;
		setForceLeftClick(forceLeftClick: boolean): MenuEntry;
		getWorldViewId(): number;
		setWorldViewId(worldViewId: number): MenuEntry;
		/**
		 * Deprioritized menus are sorted in the menu to be below the other menu entries.
		 * @return
		 */
		isDeprioritized(): boolean;
		setDeprioritized(deprioritized: boolean): MenuEntry;
		/**
		 * Set a callback to be called when this menu option is clicked
		 * @param callback
		 * @return
		 */
		onClick(callback: Consumer<MenuEntry>): MenuEntry;
		/**
		 * Set the parent for the menu entry. This makes this menu entry part of the sub-menu off of the parent.
		 * @param parent
		 * @return
		 */
		setParent(parent: MenuEntry): MenuEntry;
		/**
		 * Get the parent for the menu entry.
		 * @return
		 */
		getParent(): MenuEntry | null;
		/**
		 * Test if this menu entry is an item op. "Use" and "Examine" are not considered item ops.
		 * @return
		 */
		isItemOp(): boolean;
		/**
		 * If this menu entry is an item op, get the item op id
		 * @return 1-5
		 */
		getItemOp(): number;
		/**
		 * Get the item id
		 * @return
		 * @see ItemID
		 * @see NullItemID
		 */
		getItemId(): number;
		/**
		 * Get the widget this menu entry is on, if this is a menu entry
		 * with an associated widget. Such as eg, CC_OP.
		 * @return
		 */
		getWidget(): net.runelite.api.widgets.Widget | null;
		/**
		 * Get the {@link NPC} this menu entry is targeting, if any.
		 * @return
		 */
		getNpc(): NPC | null;
		/**
		 * Get the {@link Player} this menu entry is targeting, if any.
		 * @return
		 */
		getPlayer(): Player | null;
		/**
		 * Get the {@link Actor} this menu entry is targeting, if any.
		 * @return
		 */
		getActor(): Actor | null;
	}
}
