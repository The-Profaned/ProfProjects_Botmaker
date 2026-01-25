/// <reference path="../../../../api/Point.d.ts" />
/// <reference path="../../../../../java/index.d.ts" />

declare namespace net.runelite.client.ui.overlay.components {
	export class TextComponent {
		render(graphics: Graphics2D): java.awt.Dimension;
		setFont(font: any): void; //Java.awt.Font
		setColor(color: java.awt.Color): void;
		setOutline(outline: boolean): void;
		setPosition(position: java.awt.Point): void;
		setText(text: string): void;
	}
}
