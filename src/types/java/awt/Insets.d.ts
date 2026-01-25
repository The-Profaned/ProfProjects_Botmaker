declare namespace java.awt {
	export class Insets {
		/** The inset from the top edge. */
		top: number;
		/** The inset from the left edge. */
		left: number;
		/** The inset from the bottom edge. */
		bottom: number;
		/** The inset from the right edge. */
		right: number;
		/**
		 * Creates and initializes a new Insets object with the specified top, left,
		 * bottom, and right insets.
		 * @param top    the inset from the top edge
		 * @param left   the inset from the left edge
		 * @param bottom the inset from the bottom edge
		 * @param right  the inset from the right edge
		 */
		constructor(top: number, left: number, bottom: number, right: number);
		/**
		 * Returns a string representation of this Insets object,
		 * e.g. "java.awt.Insets[top=2,left=3,bottom=4,right=5]"
		 */
		toString(): string;
	}
}

type Insets = java.awt.Insets;
