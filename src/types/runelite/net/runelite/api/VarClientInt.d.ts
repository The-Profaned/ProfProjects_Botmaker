/// <reference path="../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../src/types/runelite/index.d.ts" />
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
declare namespace net.runelite.api {
	/**
	 * Client side only, content-developer integers
	 *
	 * VarCInts are stored entirely in memory, or locally on a user's
	 * machine in the preferences2.dat file depending on how Jagex
	 * configured the variable
	 */
	export class VarClientInt {
		static readonly TOOLTIP_TIMEOUT: number = 1;

		/**
		 * 0 = no tooltip displayed
		 * 1 = tooltip displaying
		 */
		static readonly TOOLTIP_VISIBLE: number = 2;

		/**
		 * Current message layer mode
		 * @see net.runelite.api.vars.InputType
		 */
		static readonly INPUT_TYPE: number = 5;

		/**
		 * The game sets this to the same value as {@link #CAMERA_ZOOM_RESIZABLE_VIEWPORT}
		 */
		static readonly CAMERA_ZOOM_FIXED_VIEWPORT: number = 73;
		static readonly CAMERA_ZOOM_RESIZABLE_VIEWPORT: number = 74;

		static readonly MEMBERSHIP_STATUS: number = 103;

		static readonly INVENTORY_TAB: number = 171;

		/**
		 * time to block keypresses til
		 */
		static readonly BLOCK_KEYPRESS: number = 187;

		static readonly WORLD_MAP_SEARCH_FOCUSED: number = 190;
	}
}