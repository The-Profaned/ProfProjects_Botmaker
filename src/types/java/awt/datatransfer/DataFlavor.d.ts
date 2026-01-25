declare namespace java.awt.datatransfer {
	/**
	 * Represents the type of data to be transferred via clipboard or drag and drop.
	 */
	export class DataFlavor {
		/**
		 * Creates a DataFlavor from a MIME type and a human-readable name.
		 */
		constructor(mimeType: string, humanPresentableName?: string);

		/**
		 * Returns the MIME type string for this DataFlavor.
		 */
		getMimeType(): string;

		/**
		 * Returns the human presentable name for the data format.
		 */
		getHumanPresentableName(): string;

		/**
		 * Sets the human presentable name for the data format.
		 */
		setHumanPresentableName(name: string): void;

		/**
		 * Compares the MIME type of this DataFlavor to another's.
		 */
		isMimeTypeEqual(mimeType: string): boolean;

		// Additional methods from the DataFlavor class can be added here if needed.
	}
}
