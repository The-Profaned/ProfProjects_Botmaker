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
	export class ScriptEvent {
		/**
		 * Gets the widget the {@link #WIDGET_ID} and {@link #WIDGET_INDEX} args
		 * are substituted with
		 */
		getSource(): net.runelite.api.widgets.Widget;
		/**
		 * Sets the widget the {@link #WIDGET_ID} and {@link #WIDGET_INDEX} args
		 * are substituted with. This is useful for running widget listeners
		 *
		 * @see Widget#getOnLoadListener()
		 */
		setSource(widget: net.runelite.api.widgets.Widget): ScriptEvent;
		/**
		 * Arguments passed to the script. Index 0 is the script being run and is not an argument.
		 * @return
		 */
		getArguments(): Record<string, any>[];
		/**
		 * Gets the menu op of the event
		 *
		 * @return the menu op
		 */
		getOp(): number;
		/**
		 * Set the menu op of the event
		 *
		 * @param op
		 */
		setOp(op: number): ScriptEvent;
		/**
		 * Gets the target of the menu option
		 *
		 * @return the target
		 * @see net.runelite.api.events.MenuOptionClicked
		 */
		getOpbase(): string;
		/**
		 * Parent relative x coordinate for mouse related events
		 */
		getMouseX(): number;
		/**
		 * Parent relative y coordinate for mouse related events
		 */
		getMouseY(): number;
		/**
		 * Jagex typed keycode
		 *
		 * @return
		 */
		getTypedKeyCode(): number;
		/**
		 * Get the typed character, ascii.
		 *
		 * @return
		 */
		getTypedKeyChar(): number;
		/**
		 * Executes a cs2 script specified by this event
		 *
		 * This method must be ran on the client thread and is not reentrant
		 */
		run(): void;
	}
}
