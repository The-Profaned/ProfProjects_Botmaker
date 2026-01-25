/// <reference path="../../../../api/Point.d.ts" />
/// <reference path="../../../../../java/index.d.ts" />
declare namespace net.runelite.client.ui.overlay.components {
	export class LayoutableRenderableEntity extends RenderableEntity {
		getBounds(): Rectangle;
		setPreferredLocation(position: java.awt.Point): void;
		setPreferredSize(dimension: java.awt.Dimension): void;
	}
}
