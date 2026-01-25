declare namespace javax.swing.event {
	export class ListSelectionEvent {
		constructor(source: any, firstIndex: number, lastIndex: number, isAdjusting: boolean);

		getFirstIndex(): number;
		getLastIndex(): number;
		getValueIsAdjusting(): boolean;
		getSource(): any;
	}
}
