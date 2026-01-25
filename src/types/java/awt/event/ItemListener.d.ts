declare namespace java.awt.event {
	export class ItemListener {
		constructor(callback: (event: any) => void);
		itemStateChanged(event: any): void;
	}
	export class ItemAdapter implements ItemListener {
		private _itemStateChangedCallback?: (event: any) => void;
		constructor(callback?: (event: any) => void);
		itemStateChanged(event: any): void;
	}
}
