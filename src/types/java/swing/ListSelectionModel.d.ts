declare namespace javax.swing {
	export interface ListSelectionModel {
		addListSelectionListener(listener: java.awt.event.ListSelectionListener): void;
		removeListSelectionListener(listener: java.awt.event.ListSelectionListener): void;
		getMinSelectionIndex(): number;
		getMaxSelectionIndex(): number;
		isSelectedIndex(index: number): boolean;
		clearSelection(): void;
		setSelectionInterval(index0: number, index1: number): void;
		getSelectedIndices(): number[];
	}

	export namespace ListSelectionModel {
		const SINGLE_SELECTION: number;
		const SINGLE_INTERVAL_SELECTION: number;
		const MULTIPLE_INTERVAL_SELECTION: number;
	}
}
