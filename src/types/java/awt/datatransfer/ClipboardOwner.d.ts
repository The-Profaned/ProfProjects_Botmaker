declare namespace java.awt.datatransfer {
	/**
	 * Defines the interface for classes that will be notified when they
	 * no longer own the clipboard contents.
	 */
	export interface ClipboardOwner {
		/**
		 * Notifies the owner that it no longer owns the clipboard contents. (According to stackoverflow)
		 * @param clipboard The clipboard that is no longer owned.
		 * @param contents The contents which this owner had placed on the clipboard.
		 */
		lostOwnership(clipboard: Clipboard, contents: Transferable): void;
	}
}
