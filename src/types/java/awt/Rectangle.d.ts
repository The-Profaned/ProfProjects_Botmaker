declare namespace java.awt {
	export class Rectangle {
		constructor();
		constructor(x: number, y: number, width: number, height: number);
		contains(x: number, y: number): boolean;
		contains(point: java.awt.Point): boolean;
		intersects(r: java.awt.Rectangle): boolean;
		getBounds(): java.awt.Rectangle;
		getLocation(): java.awt.Point;
		getSize(): java.awt.Dimension;
		setLocation(x: number, y: number): void;
		setSize(width: number, height: number): void;
		x: number;
		y: number;
		width: number;
		height: number;
	}
}
