/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Tomas Slusny <slusnucky@gmail.com>
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
declare namespace net.runelite.client.ui {
	/**
	 * Grid layout implementation with support for cells with unequal size.
	 *
	 * See https://www.javaworld.com/article/2077486/core-java/java-tip-121--flex-your-grid-layout.html
	 */
	export class DynamicGridLayout extends GridLayout {
		preferredLayoutSize(parent: Container): java.awt.Dimension;
		minimumLayoutSize(parent: Container): java.awt.Dimension;
		layoutContainer(parent: Container): void;
		// scaling factors
		// calculate dimensions for all components + apply scaling
		// Apply new bounds to all child components
		/**
		 * Calculate outer size of the layout based on it's children and sizer
		 * @param parent parent component
		 * @param sizer functioning returning dimension of the child component
		 * @return outer size
		 */
		private calculateSize(parent: Container, sizer: any): java.awt.Dimension;
		// Calculate dimensions for all components
		// Calculate total width and height of the layout
		// Apply insets and horizontal and vertical gap to layout
	}
}
