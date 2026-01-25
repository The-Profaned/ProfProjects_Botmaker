/// <reference path="../awt/Component.d.ts" />
/// <reference path="../awt/Container.d.ts" />
/// <reference path="../awt/Point.d.ts" />
/// <reference path="../awt/Rectangle.d.ts" />
/// <reference path="../awt/Dimension.d.ts" />
/// <reference path="./JComponent.d.ts" />

declare namespace javax.swing {
	export class SwingUtilities {
		// Event dispatch thread methods
		static isEventDispatchThread(): boolean;
		static invokeLater(doRun: () => void): void;
		static invokeAndWait(doRun: () => void): void;

		// Component tree methods
		static getWindowAncestor(c: java.awt.Component): java.awt.Component | null;
		static getRootPane(c: java.awt.Component): javax.swing.JComponent | null;
		static getRoot(c: java.awt.Component): java.awt.Component | null;
		static isDescendingFrom(a: java.awt.Component, b: java.awt.Component): boolean;
		static getDeepestComponentAt(parent: java.awt.Component, x: number, y: number): java.awt.Component | null;

		// Coordinate conversion methods
		static convertPoint(source: java.awt.Component, p: java.awt.Point, destination: java.awt.Component): java.awt.Point;
		static convertPoint(
			source: java.awt.Component,
			x: number,
			y: number,
			destination: java.awt.Component,
		): java.awt.Point;
		static convertPointToScreen(p: java.awt.Point, c: java.awt.Component): void;
		static convertPointFromScreen(p: java.awt.Point, c: java.awt.Component): void;
		static convertRectangle(
			source: java.awt.Component,
			aRectangle: java.awt.Rectangle,
			destination: java.awt.Component,
		): java.awt.Rectangle;

		// Layout and sizing methods
		static calculateInnerArea(c: javax.swing.JComponent, r: java.awt.Rectangle): java.awt.Rectangle;
		static getLocalBounds(aComponent: java.awt.Component): java.awt.Rectangle;

		// Painting methods
		static updateComponentTreeUI(c: java.awt.Component): void;
		static paintComponent(
			g: any,
			c: java.awt.Component,
			p: java.awt.Container,
			x: number,
			y: number,
			w: number,
			h: number,
		): void;
		static paintComponent(g: any, c: java.awt.Component, p: java.awt.Container, r: java.awt.Rectangle): void;

		// Mouse event methods
		static isLeftMouseButton(anEvent: any): boolean;
		static isMiddleMouseButton(anEvent: any): boolean;
		static isRightMouseButton(anEvent: any): boolean;

		// Utility methods
		static computeStringWidth(fm: any, str: string): number;
		static layoutCompoundLabel(
			c: javax.swing.JComponent,
			fm: any,
			text: string,
			icon: any,
			verticalAlignment: number,
			horizontalAlignment: number,
			verticalTextPosition: number,
			horizontalTextPosition: number,
			viewR: java.awt.Rectangle,
			iconR: java.awt.Rectangle,
			textR: java.awt.Rectangle,
			textIconGap: number,
		): string;
		static layoutCompoundLabel(
			fm: any,
			text: string,
			icon: any,
			verticalAlignment: number,
			horizontalAlignment: number,
			verticalTextPosition: number,
			horizontalTextPosition: number,
			viewR: java.awt.Rectangle,
			iconR: java.awt.Rectangle,
			textR: java.awt.Rectangle,
			textIconGap: number,
		): string;

		// Window methods
		static windowForComponent(c: java.awt.Component): java.awt.Component | null;
		static isValidComponent(c: java.awt.Component): boolean;

		// String utility methods
		static computeStringWidth(text: string): number;
		static getStringBounds(text: string): java.awt.Rectangle;
	}
}

type SwingUtilities = javax.swing.SwingUtilities;
