/// <reference path="../../../../api/Point.d.ts" />
/// <reference path="../../../../../java/index.d.ts" />
declare namespace net.runelite.client.ui.overlay.components {
	export class TitleComponentBuilder {
		constructor() : TitleComponentBuilder;
		bounds(bounds: Rectangle): TitleComponentBuilder;
		build(): TitleComponent;
		color(color: java.awt.Color): TitleComponentBuilder;
		preferredLocation(preferredLocation: net.runelite.api.Point): TitleComponentBuilder;
		preferredSize(preferredSize: java.awt.Dimension): TitleComponentBuilder;
		text(text: string): TitleComponentBuilder;
		toString(): string;
	}

	export class TitleComponent {
		builder(): TitleComponentBuilder;
		static builder(): TitleComponentBuilder;
		getBounds(): Rectangle;
		build(): TitleComponent;
		setColor(color: java.awt.Color): void;
		setPreferredLocation(preferredLocation: net.runelite.api.Point): void;
		setPreferredSize(preferredSize: java.awt.Dimension): void;
		setText(text: string): void;
	}
}
