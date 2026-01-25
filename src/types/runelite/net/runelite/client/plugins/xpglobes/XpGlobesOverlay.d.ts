/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Steve <steve.rs.dev@gmail.com>
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
declare namespace net.runelite.client.plugins.xpglobes {
	export class XpGlobesOverlay extends Overlay {
		render(graphics: Graphics2D): java.awt.Dimension;
		// The progress arc is drawn either side of the perimeter of the background. This value accounts for that
		// when calculating draw positions and overall size of the overlay
		// Get length of markers
		private getSkillProgress(startXp: number, currentXp: number, goalXp: number): number;
		private getSkillProgressRadius(startXp: number, currentXp: number, goalXp: number): number;
		private renderProgressCircle(
			graphics: Graphics2D,
			skillToDraw: XpGlobe,
			startXp: number,
			goalXp: number,
			x: number,
			y: number,
			bounds: Rectangle,
		): void;
		// If mouse is hovering the globe
		// Fill a darker overlay circle
		private drawProgressLabel(
			graphics: Graphics2D,
			globe: XpGlobe,
			startXp: number,
			goalXp: number,
			x: number,
			y: number,
		): void;
		// Convert to int just to limit the decimal cases
		private drawProgressArc(
			graphics: Graphics2D,
			x: number,
			y: number,
			w: number,
			h: number,
			radiusStart: number,
			radiusEnd: number,
			strokeWidth: number,
			color: java.awt.Color,
		): void;
		private drawEllipse(graphics: Graphics2D, x: number, y: number): Ellipse2D;
		private drawSkillImage(graphics: Graphics2D, xpGlobe: XpGlobe, x: number, y: number): void;
		private getScaledSkillIcon(xpGlobe: XpGlobe, orbSize: number): BufferedImage;
		// Cache the previous icon if the size hasn't changed
		private drawTooltip(mouseOverSkill: XpGlobe, goalXp: number): void;
		// reset the timer on XpGlobe to prevent it from disappearing while hovered over it
	}
}
