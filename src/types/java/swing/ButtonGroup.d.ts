declare namespace javax.swing {
	export class ButtonGroup {
		constructor();
		add(button: javax.swing.AbstractButton): void;
		remove(button: javax.swing.AbstractButton): void;
		getSelection(): javax.swing.ButtonModel | null;
		setSelection(model: javax.swing.ButtonModel | null): void;
		clearSelection(): void;
		getButtonCount(): number;
		getElements(): java.util.Enumeration<javax.swing.AbstractButton>;
		isSelected(model: javax.swing.ButtonModel): boolean;
	}
}

type ButtonGroup = javax.swing.ButtonGroup;

