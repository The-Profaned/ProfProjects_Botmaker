/// <reference path="../../../../api/Point.d.ts" />
/// <reference path="../../../../../java/index.d.ts" />
declare namespace net.runelite.client.ui.overlay.components {
	export class LineComponentBuilder {
		constructor() : LineComponentBuilder;
		bounds(bounds: Rectangle): LineComponentBuilder;
		build(): LineComponent;
		left(left: string): LineComponentBuilder;
		leftColor(leftColor: java.awt.Color): LineComponentBuilder;
		leftFont(leftFont: any): LineComponentBuilder;
		preferredLocation(preferredLocation: net.runelite.api.Point): LineComponentBuilder;
		preferredSize(preferredSize: java.awt.Dimension): LineComponentBuilder;
		right(right: string): LineComponentBuilder;
		rightColor(rightColor: java.awt.Color): LineComponentBuilder;
		rightFont(rightFont: any): LineComponentBuilder;
		toString(): string;
	}

	export class LineComponent {
		builder(): LineComponentBuilder;
		static builder(): LineComponentBuilder;
		getBounds(): Rectangle;
		render(graphics: Graphics2D): java.awt.Dimension;
		setLeft(left: string): void;
		setLeftColor(leftColor: java.awt.Color): void;
		setLeftFont(leftFont: any): void;
		setPreferredLocation(preferredLocation: net.runelite.api.Point): void;
		setPreferredSize(preferredSize: java.awt.Dimension): void;
		setRight(right: string): void;
		setRightColor(rightColor: java.awt.Color): void;
		setRightFont(rightFont: any): void;
	}
}
