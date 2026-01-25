declare namespace java.awt.event {
	export interface WindowListener {
		windowOpened?(e: any): void;
		windowClosing?(e: any): void;
		windowClosed?(e: any): void;
		windowIconified?(e: any): void;
		windowDeiconified?(e: any): void;
		windowActivated?(e: any): void;
		windowDeactivated?(e: any): void;
	}

	export class WindowAdapter implements WindowListener {
		constructor(options: Partial<WindowListener>);
		windowOpened?(e: any): void;
		windowClosing?(e: any): void;
		windowClosed?(e: any): void;
		windowIconified?(e: any): void;
		windowDeiconified?(e: any): void;
		windowActivated?(e: any): void;
		windowDeactivated?(e: any): void;
	}
}

type WindowListener = java.awt.event.WindowListener;
type WindowAdapter = java.awt.event.WindowAdapter;
