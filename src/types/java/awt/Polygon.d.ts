declare namespace java.awt {
	export class Polygon {
		constructor();
		constructor(xpoints: number[], ypoints: number[], npoints: number);
		addPoint(x: number, y: number): void;
		contains(x: number, y: number): boolean;
		contains(point: java.awt.Point): boolean;
		getBounds(): java.awt.Rectangle;
		getBoundingBox(): java.awt.Rectangle;
		npoints: number;
		xpoints: number[];
		ypoints: number[];
	}
}
