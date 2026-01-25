declare namespace javax.swing.event {
	/**
	 * Listens for changes to a Document (e.g., a JTextField's document).
	 */
	export interface DocumentListener {
		/** Fired when text is inserted into the document */
		insertUpdate?(e: any): void;
		/** Fired when text is removed from the document */
		removeUpdate?(e: any): void;
		/** Fired when an attribute or style changes */
		changedUpdate?(e: any): void;
	}

	/**
	 * Adapter class to let you implement only the methods you need.
	 * Usage: new DocumentAdapter({ insertUpdate: e => { ... } });
	 * THis will eventually be used for our searchBar.
	 */
	export class DocumentAdapter implements DocumentListener {
		constructor(options: Partial<DocumentListener>);
		insertUpdate(e: any): void;
		removeUpdate(e: any): void;
		changedUpdate(e: any): void;
	}
}

type DocumentListener = javax.swing.event.DocumentListener;
type DocumentAdapter = javax.swing.event.DocumentAdapter;
