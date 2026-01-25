declare namespace java.awt {
	export class Dimension {
		/**
		 * Constructs a Dimension and initializes it to 0, 0.
		 */
		constructor();

		/**
		 * Constructs a Dimension and initializes it to the specified width and height.
		 * @param width the specified width
		 * @param height the specified height
		 */
		constructor(width: number, height: number);

		/**
		 * The width dimension; negative values can be used.
		 */
		width: number;

		/**
		 * The height dimension; negative values can be used.
		 */
		height: number;

		/**
		 * Sets the size of this Dimension object to the specified width and height.
		 * @param width the new width for the Dimension object
		 * @param height the new height for the Dimension object
		 */
		setSize(width: number, height: number): void;

		/**
		 * Gets the size of this Dimension object.
		 * @return the size of this Dimension, a new instance of Dimension with the same width and height
		 */
		getSize(): java.awt.Dimension;

		/**
		 * Checks whether two dimension objects have equal values.
		 */
		equals(obj: any): boolean;

		/**
		 * Returns the hash code for this Dimension.
		 * @return a hash code for this Dimension
		 */
		hashCode(): number;

		/**
		 * Returns a string representation of the values of this Dimension's height and width fields.
		 * @return a string representation of this Dimension, including the values of its height and width fields
		 */
		toString(): string;
	}
}
