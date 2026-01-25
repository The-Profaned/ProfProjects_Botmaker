declare namespace javax.swing {
	export class DefaultListModel {
		constructor();
		addElement(element: string): void;
		removeElement(element: string): void;
		removeElementAt(index: number): void;
		getElementAt(index: number): string;
		getSize(): number;
		clear(): void;
		addListDataListener(listener: (event: any) => void): void;
		removeListDataListener(listener: (event: any) => void): void;
	}
}

type DefaultListModel = javax.swing.DefaultListModel;
