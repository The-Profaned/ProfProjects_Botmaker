declare namespace java.awt {
	export class Point {
		constructor(x: number, y: number);
		getX(): number;
		getY(): number;
		setLocation(x: number, y: number): void;
	}
}
