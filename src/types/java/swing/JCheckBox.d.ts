declare namespace javax.swing {
	export class JCheckBox {
		constructor(label: string, selected?: boolean);
		getText(): string;
		setText(text: string): void;
		setSelected(selected: boolean): void;
		isSelected(): boolean;
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;
		addActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		removeActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		addFocusListener(listener: java.awt.event.FocusListener): void;
		removeFocusListener(listener: java.awt.event.FocusListener): void;
		setForeground(color: java.awt.Color): void;
		setBackground(color: java.awt.Color): void;
		setFont(font: java.awt.Font): void;
		setToolTipText(text: string): void;
	}
}

type JCheckBox = javax.swing.JCheckBox;
