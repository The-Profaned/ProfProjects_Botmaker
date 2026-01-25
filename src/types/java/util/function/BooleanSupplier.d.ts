/**
 * Represents a supplier of boolean-valued results.
 * This is a functional interface whose functional method is getAsBoolean().
 *
 */
declare namespace java.util.func_tion {
	export interface BooleanSupplier {
		/**
		 * Gets a result.
		 * @returns a boolean result
		 */
		getAsBoolean(): boolean;
	}
}
