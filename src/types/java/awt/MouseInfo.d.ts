declare namespace java.awt {
	class MouseInfo {
		static getPointerInfo(): java.awt.PointerInfo;
	}

	class PointerInfo {
		getLocation(): java.awt.Point;
	}

	class Point {
		x: number;
		y: number;
		constructor(x: number, y: number);
	}
}
