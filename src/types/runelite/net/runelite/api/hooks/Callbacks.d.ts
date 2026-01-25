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
declare namespace net.runelite.api.hooks {
	/**
	 * Interface of callbacks the injected client uses to send events
	 */
	export class Callbacks {
		/**
		 * Post an event. See the events in net.runelite.api.events.
		 *
		 * @param event the event
		 */
		post(event: Record<string, any>): void;
		/**
		 * Post a deferred event, which gets delayed until the next cycle.
		 *
		 * @param event the event
		 */
		postDeferred(event: Record<string, any>): void;
		/**
		 * Called at the beginning of each tick
		 */
		tick(): void;
		/**
		 * Called at the end of each tick
		 */
		tickEnd(): void;
		/**
		 * Called each frame
		 */
		frame(): void;
		/**
		 * Called each server tick
		 */
		serverTick(): void;
		/**
		 * Called after the scene is drawn.
		 */
		drawScene(): void;
		/**
		 * Called after logic that is drawing 2D objects is processed.
		 */
		drawAboveOverheads(): void;
		/**
		 * Client top-most draw method, rendering over top of most of game interfaces.
		 *
		 * @param mainBufferProvider the main buffer provider
		 * @param graphics           the graphics
		 * @param x                  the x
		 * @param y                  the y
		 */
		draw(
			mainBufferProvider: MainBufferProvider,
			graphics: Graphics,
			x: number,
			y: number,
		): void;
		/**
		 * Called after an interface has been drawn
		 * @param interfaceId the interface id
		 * @param widgetItems Widget items within the interface
		 */
		drawInterface(
			interfaceId: number,
			widgetItems: Array<net.runelite.api.widgets.WidgetItem>,
		): void;
		/**
		 * Called after a widget layer has been drawn
		 * @param layer The layer
		 * @param widgetItems Widget items within the layer
		 */
		drawLayer(
			layer: net.runelite.api.widgets.Widget,
			widgetItems: Array<net.runelite.api.widgets.WidgetItem>,
		): void;
		/**
		 * Mouse pressed event. If this event will be consumed it will not be propagated further to client.
		 *
		 * @param mouseEvent the mouse event
		 * @return the mouse event
		 */
		mousePressed(mouseEvent: MouseEvent): MouseEvent;
		/**
		 * Mouse released event. If this event will be consumed it will not be propagated further to client.
		 *
		 * @param mouseEvent the mouse event
		 * @return the mouse event
		 */
		mouseReleased(mouseEvent: MouseEvent): MouseEvent;
		/**
		 * Mouse clicked event. If this event will be consumed it will not be propagated further to client.
		 *
		 * @param mouseEvent the mouse event
		 * @return the mouse event
		 */
		mouseClicked(mouseEvent: MouseEvent): MouseEvent;
		/**
		 * Mouse entered event. If this event will be consumed it will not be propagated further to client.
		 *
		 * @param mouseEvent the mouse event
		 * @return the mouse event
		 */
		mouseEntered(mouseEvent: MouseEvent): MouseEvent;
		/**
		 * Mouse exited event. If this event will be consumed it will not be propagated further to client.
		 *
		 * @param mouseEvent the mouse event
		 * @return the mouse event
		 */
		mouseExited(mouseEvent: MouseEvent): MouseEvent;
		/**
		 * Mouse dragged event. If this event will be consumed it will not be propagated further to client.
		 *
		 * @param mouseEvent the mouse event
		 * @return the mouse event
		 */
		mouseDragged(mouseEvent: MouseEvent): MouseEvent;
		/**
		 * Mouse moved event. If this event will be consumed it will not be propagated further to client.
		 *
		 * @param mouseEvent the mouse event
		 * @return the mouse event
		 */
		mouseMoved(mouseEvent: MouseEvent): MouseEvent;
		/**
		 * Mouse wheel moved event. If this event will be consumed it will not be propagated further to client.
		 *
		 * @param event the event
		 * @return the mouse wheel event
		 */
		mouseWheelMoved(event: MouseWheelEvent): MouseWheelEvent;
		/**
		 * Key pressed event.
		 *
		 * @param keyEvent the key event
		 */
		keyPressed(keyEvent: KeyEvent): void;
		/**
		 * Key released event.
		 *
		 * @param keyEvent the key event
		 */
		keyReleased(keyEvent: KeyEvent): void;
		/**
		 * Key typed event.
		 *
		 * @param keyEvent the key event
		 */
		keyTyped(keyEvent: KeyEvent): void;
		/**
		 * Called to test if a renderable should be drawn this frame
		 * @param renderable the renderable
		 * @param drawingUi if this is the 2d ui, such as hp bars or hitsplats
		 * @return false to prevent drawing
		 */
		draw(renderable: Renderable, drawingUi: boolean): boolean;
		/**
		 * Called when a client error occurs
		 * @param message
		 * @param reason
		 */
		error(message: string, reason: Throwable): void;
		/**
		 * Called when the client wants to open a URL
		 * @param url
		 */
		openUrl(url: string): void;
		/**
		 * Returns if the current runelite client is outdated or not
		 *
		 * @return
		 */
		isRuneLiteClientOutdated(): boolean;
	}
}
