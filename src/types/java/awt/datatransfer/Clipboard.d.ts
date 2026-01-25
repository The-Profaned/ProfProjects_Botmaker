declare namespace java.awt.datatransfer {
	/**
	 * The Clipboard class is a container for transferable data.
	 */
	export class Clipboard {
		/**
		 * Constructs a clipboard object.
		 * @param name The name of this clipboard object.
		 */
		constructor(name: string);

		/**
		 * Sets the current contents of the clipboard to the specified transferable object.
		 * @param contents The transferable object representing the clipboard content.
		 * @param owner The object that owns the clipboard content.
		 */
		setContents(contents: Transferable, owner: ClipboardOwner | null): void;

		/**
		 * Returns the current transferable object on the clipboard.
		 * @param requestor The object requesting the contents (often null).
		 */
		getContents(requestor: any): Transferable | null;

		/**
		 * Returns an array of DataFlavor objects indicating the flavors the data can be provided in.
		 */
		getAvailableDataFlavors(): DataFlavor[];

		/**
		 * Returns whether or not the specified DataFlavor is available on this clipboard.
		 */
		isDataFlavorAvailable(flavor: DataFlavor): boolean;

		/**
		 * Returns an object representing the current contents of this clipboard in the specified DataFlavor.
		 */
		getData(flavor: DataFlavor): any;
	}
}
