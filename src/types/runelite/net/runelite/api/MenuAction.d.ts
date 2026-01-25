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
	 * An enumeration of right-click menu actions.
	 */
	export class MenuAction {
		/**
		 * Menu action for using an item in your inventory on a tile object (GameObject or GroundObject).
		 */
		@Deprecated
		static ITEM_USE_ON_GAME_OBJECT: MenuAction;
		/**
		 * Menu action for using a widget on a tile object (GameObject or GroundObject).
		 */
		static WIDGET_TARGET_ON_GAME_OBJECT: MenuAction;
		/**
		 * First menu action for a game object.
		 */
		static GAME_OBJECT_FIRST_OPTION: MenuAction;
		/**
		 * Second menu action for a game object.
		 */
		static GAME_OBJECT_SECOND_OPTION: MenuAction;
		/**
		 * Third menu action for a game object.
		 */
		static GAME_OBJECT_THIRD_OPTION: MenuAction;
		/**
		 * Fourth menu action for a game object.
		 */
		static GAME_OBJECT_FOURTH_OPTION: MenuAction;
		/**
		 * Fifth menu action for a game object.
		 */
		static GAME_OBJECT_FIFTH_OPTION: MenuAction;

		/**
		 * Menu action for using an item in your inventory on an NPC.
		 */
		@Deprecated
		static ITEM_USE_ON_NPC: MenuAction;
		/**
		 * Menu action for using a widget on an NPC.
		 */
		static WIDGET_TARGET_ON_NPC: MenuAction;
		/**
		 * First menu action for an NPC.
		 */
		static NPC_FIRST_OPTION: MenuAction;
		/**
		 * Second menu action for an NPC.
		 */
		static NPC_SECOND_OPTION: MenuAction;
		/**
		 * Third menu action for an NPC.
		 */
		static NPC_THIRD_OPTION: MenuAction;
		/**
		 * Fourth menu action for an NPC.
		 */
		static NPC_FOURTH_OPTION: MenuAction;
		/**
		 * Fifth menu action for an NPC.
		 */
		static NPC_FIFTH_OPTION: MenuAction;

		/**
		 * Menu action for using an item on a player.
		 */
		@Deprecated
		static ITEM_USE_ON_PLAYER: MenuAction;
		/**
		 * Menu action for using a widget on a player.
		 */
		static WIDGET_TARGET_ON_PLAYER: MenuAction;

		/**
		 * Menu action for using an item on an item on the ground.
		 */
		@Deprecated
		static ITEM_USE_ON_GROUND_ITEM: MenuAction;
		/**
		 * Menu action for using a widget on an item on the ground.
		 */
		static WIDGET_TARGET_ON_GROUND_ITEM: MenuAction;
		/**
		 * First menu action for an item on the ground.
		 */
		static GROUND_ITEM_FIRST_OPTION: MenuAction;
		/**
		 * Second menu action for an item on the ground.
		 */
		static GROUND_ITEM_SECOND_OPTION: MenuAction;
		/**
		 * Third menu action for an item on the ground.
		 */
		static GROUND_ITEM_THIRD_OPTION: MenuAction;
		/**
		 * Fourth menu action for an item on the ground.
		 */
		static GROUND_ITEM_FOURTH_OPTION: MenuAction;
		/**
		 * Fifth menu action for an item on the ground.
		 */
		static GROUND_ITEM_FIFTH_OPTION: MenuAction;

		/**
		 * Menu action for walking.
		 */
		static WALK: MenuAction;

		/**
		 * Interaction with widget (type 1).
		 */
		static WIDGET_TYPE_1: MenuAction;
		/**
		 * Select the widget for targeting other widgets/entites etc.
		 * @see Client#getSelectedWidget()
		 */
		static WIDGET_TARGET: MenuAction;
		/**
		 * Performs an ifclose.
		 */
		static WIDGET_CLOSE: MenuAction;
		/**
		 * Interaction with widget (type 4).
		 */
		static WIDGET_TYPE_4: MenuAction;
		/**
		 * Interaction with widget (type 5).
		 */
		static WIDGET_TYPE_5: MenuAction;
		/**
		 * Performs a Continue
		 */
		static WIDGET_CONTINUE: MenuAction;
		/**
		 * Menu action when using an item on another item
		 */
		@Deprecated
		static ITEM_USE_ON_ITEM: MenuAction;
		/**
		 * Menu action when using a component on an item
		 */
		@Deprecated
		static WIDGET_USE_ON_ITEM: MenuAction;

		/**
		 * First menu action for an item.
		 */
		@Deprecated
		static ITEM_FIRST_OPTION: MenuAction;
		/**
		 * Second menu action for an item.
		 */
		@Deprecated
		static ITEM_SECOND_OPTION: MenuAction;
		/**
		 * Third menu action for an item.
		 */
		@Deprecated
		static ITEM_THIRD_OPTION: MenuAction;
		/**
		 * Fourth menu action for an item.
		 */
		@Deprecated
		static ITEM_FOURTH_OPTION: MenuAction;
		/**
		 * Fifth menu action for an item.
		 */
		@Deprecated
		static ITEM_FIFTH_OPTION: MenuAction;
		/**
		 * Menu action to use an item.
		 */
		@Deprecated
		static ITEM_USE: MenuAction;

		/**
		 * First menu action for a widget.
		 */
		static WIDGET_FIRST_OPTION: MenuAction;
		/**
		 * Second menu action for a widget.
		 */
		static WIDGET_SECOND_OPTION: MenuAction;
		/**
		 * Third menu action for a widget.
		 */
		static WIDGET_THIRD_OPTION: MenuAction;
		/**
		 * Fourth menu action for a widget.
		 */
		static WIDGET_FOURTH_OPTION: MenuAction;
		/**
		 * Fifth menu action for a widget.
		 */
		static WIDGET_FIFTH_OPTION: MenuAction;

		static PLAYER_FIRST_OPTION: MenuAction;
		static PLAYER_SECOND_OPTION: MenuAction;
		static PLAYER_THIRD_OPTION: MenuAction;
		static PLAYER_FOURTH_OPTION: MenuAction;
		static PLAYER_FIFTH_OPTION: MenuAction;
		static PLAYER_SIXTH_OPTION: MenuAction;
		static PLAYER_SEVENTH_OPTION: MenuAction;
		static PLAYER_EIGHTH_OPTION: MenuAction;

		/**
		 * Menu action for normal priority child component actions.
		 */
		static CC_OP: MenuAction;

		/**
		 * Using a widget on another widget
		 */
		static WIDGET_TARGET_ON_WIDGET: MenuAction;

		/**
		 * Submenu parent that is also a widget.
		 * see {@link #RUNELITE_SUBMENU}
		 */
		static RUNELITE_SUBMENU_WIDGET: MenuAction;

		/**
		 * Menu action for high priority runelite options
		 */
		static RUNELITE_HIGH_PRIORITY: MenuAction;

		/**
		 * Menu action triggered by examining an object.
		 */
		static EXAMINE_OBJECT: MenuAction;
		/**
		 * Menu action triggered by examining an NPC.
		 */
		static EXAMINE_NPC: MenuAction;
		/**
		 * Menu action triggered by examining item on ground.
		 */
		static EXAMINE_ITEM_GROUND: MenuAction;
		/**
		 * Menu action triggered by examining item in inventory.
		 */
		@Deprecated
		static EXAMINE_ITEM: MenuAction;
		/**
		 * Menu action triggered by canceling a menu.
		 */
		static CANCEL: MenuAction;
		/**
		 * Menu action for low priority child component actions.
		 */
		static CC_OP_LOW_PRIORITY: MenuAction;

		/**
		 * Menu action injected by runelite for its menu items.
		 */
		static RUNELITE: MenuAction;
		/**
		 * Menu action injected by runelite for overlay menu items.
		 */
		static RUNELITE_OVERLAY: MenuAction;
		/**
		 * Menu action for configuring runelite overlays.
		 */
		static RUNELITE_OVERLAY_CONFIG: MenuAction;
		/**
		 * Menu action injected by runelite for menu items which target
		 * a player and have its identifier set to a player index.
		 */
		static RUNELITE_PLAYER: MenuAction;
		/**
		 * Menu action for InfoBox menu entries
		 */
		static RUNELITE_INFOBOX: MenuAction;
		/**
		 * Parent menu of submenus
		 */
		static RUNELITE_SUBMENU: MenuAction;

		/**
		 * Menu action triggered when the id is not defined in this class.
		 */
		static UNKNOWN: MenuAction;

		getId(): number;

		toString(): string;

		static of(id: number): MenuAction;
	}
}
