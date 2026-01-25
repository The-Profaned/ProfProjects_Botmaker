/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Lotto <https://github.com/devLotto>
 * Copyright (c) 2018, Henke <https://github.com/henke96>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.client.plugins.puzzlesolver {
	export class PuzzleSolverOverlay extends Overlay {
		render(graphics: Graphics2D): java.awt.Dimension;
		// Find the current state by looking at the current step and then the next 5 steps
		// If this is false, player has moved the empty tile
		// If looking at the next steps didn't find the current state,
		// see if we can find the current state in the 5 previous steps
		// Display the next 4 steps
		// Find the current blank tile position
		// Display the next 3 steps
		// Draw info box
		// Solve the puzzle if we don't have an up to date solution
		private getItemIds(container: ItemContainer, useNormalSolver: boolean): number[];
		// If blank is in the last position, items doesn't contain it, so let's add it manually
		private convertToSolverFormat(items: number[], useNormalSolver: boolean): number[];
		// The MM puzzle has gaps
		private cacheItems(items: number[]): void;
		private solve(items: number[], useNormalSolver: boolean): void;
		private getDownArrow(): BufferedImage;
		private getUpArrow(): BufferedImage;
		private getLeftArrow(): BufferedImage;
		private getRightArrow(): BufferedImage;
	}
}
