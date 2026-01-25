declare namespace java.awt.event {
	export class FocusListener {
		constructor(options: { focusGained?: (event: any) => void; focusLost?: (event: any) => void });
		focusGained(event: any): void;
		focusLost(event: any): void;
	}

	export class FocusAdapter implements FocusListener {
		private focusGainedCallback?: (event: any) => void;
		private focusLostCallback?: (event: any) => void;
		constructor(options: { focusGained?: (event: any) => void; focusLost?: (event: any) => void });
		focusGained(event: any): void;
		focusLost(event: any): void;
	}
}
