declare namespace java.awt {
	export class Color {
		constructor(hexString: string | number);
		constructor(
			/** 0.00 - 1.00 */
			r: number,
			/** 0.00 - 1.00 */
			g: number,
			/** 0.00 - 1.00 */
			b: number,
		);
		constructor(
			/** 0.00 - 1.00 */
			r: number,
			/** 0.00 - 1.00 */
			g: number,
			/** 0.00 - 1.00 */
			b: number,
			/** 0.00 - 1.00 */
			a: number,
		);

		static BLACK: Color;
		static BLUE: Color;
		static CYAN: Color;
		static DARK_GRAY: Color;
		static GRAY: Color;
		static GREEN: Color;
		static LIGHT_GRAY: Color;
		static MAGENTA: Color;
		static ORANGE: Color;
		static PINK: Color;
		static RED: Color;
		static WHITE: Color;
		static YELLOW: Color;

		getRed(): number;
		getGreen(): number;
		getBlue(): number;
		getAlpha(): number;

		/** Returns a brighter version of this color */
		brighter(): Color;

		/** Returns a darker version of this color */
		darker(): Color;

		static decode(hexString: string): Color;
		static getColor(name: string): Color;
	}
}

type Color = java.awt.Color;
