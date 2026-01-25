declare namespace java.awt.datatransfer {
	/**
	 * Defines the interface for classes that can provide data
	 * to be transferred via clipboard or drag-and-drop operations.
	 */
	export interface Transferable {
		/**
		 * Returns an array of DataFlavor objects indicating the flavors
		 * in which the data can be provided.
		 */
		getTransferDataFlavors(): DataFlavor[];

		/**
		 * Returns whether or not the specified data flavor is supported.
		 */
		isDataFlavorSupported(flavor: DataFlavor): boolean;

		/**
		 * Returns the transfer data in the requested flavor.
		 * @param flavor The requested flavor for the data.
		 */
		getTransferData(flavor: DataFlavor): any;
	}
}
