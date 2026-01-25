declare namespace java.awt.datatransfer {
	/**
	 * simple class that implements Transferable and ClipboardOwner,
	 * providing the capability of transferring a string.
	 */
	export class StringSelection implements Transferable, ClipboardOwner {
		/**
		 * Creates a StringSelection object for the specified string.
		 */
		constructor(data: string);

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
		 */
		getTransferData(flavor: DataFlavor): any;

		/**
		 * ClipboardOwner callback: invoked when the clipboard contents change
		 * and this object is no longer the clipboard owner.
		 */
		lostOwnership(clipboard: Clipboard, contents: Transferable): void;
	}
}
