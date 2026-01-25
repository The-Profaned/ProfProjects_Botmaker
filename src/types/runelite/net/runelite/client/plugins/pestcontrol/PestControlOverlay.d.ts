/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 *  Copyright (c) 2017, Kronos <https://github.com/KronosDesign>
 *  Copyright (c) 2017, Adam <Adam@sigterm.info>
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 *  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.client.plugins.pestcontrol {
	export class PestControlOverlay extends Overlay {
		// Pest control game
		render(graphics: Graphics2D): java.awt.Dimension;
		// See if we are in a game or not
		private renderSpinners(graphics: Graphics2D): void;
		private renderPortalWidgets(graphics: Graphics2D): void;
		// Check for dead portals
		// display "ATK" overlay on recorded portals without shields
		// display "NEXT" overlay on predicted portals
		private renderProgressWidget(graphics: Graphics2D): void;
		private renderWidgetOverlay(graphics: Graphics2D, portal: Portal, text: string, color: java.awt.Color): void;
		// create one rectangle from two different widget bounds
		private static union(src1: Rectangle2D, src2: Rectangle2D): Rectangle2D;
		private renderAttack(graphics: Graphics2D, portal: PortalContext): void;
		private static isZero(widget: net.runelite.api.widgets.Widget): boolean;
	}
}
