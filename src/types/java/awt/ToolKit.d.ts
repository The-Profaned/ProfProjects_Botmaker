declare namespace java.awt {
	export class Toolkit {
		/**
		 * Returns the default Toolkit instance.
		 */
		static getDefaultToolkit(): Toolkit;

		/**
		 * Returns the system clipboard.
		 */
		getSystemClipboard(): java.awt.datatransfer.Clipboard;

		sync(): void;
	}
}
