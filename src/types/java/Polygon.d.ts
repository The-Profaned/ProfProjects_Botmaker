/// <reference path="Rectangle.d.ts" />

interface Polygon extends Shape {
	protected Rectangle: bounds;

	constructor(): void;
	constructor(xpoints: number[], ypoints: number[], npoints: number): void;

	npoints: number;
	xpoints: number[];
	ypoints: number[];
}
