declare namespace javax.swing.event {
	export class ChangeListener {
		constructor(callback: (event: any) => void);
		stateChanged(event: any): void;
	}
}
