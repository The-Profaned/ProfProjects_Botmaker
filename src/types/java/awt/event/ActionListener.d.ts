declare namespace java.awt.event {
	export class ActionListener {
		constructor(callback: (event: any) => void);
		actionPerformed(event: any): void;
	}
}
