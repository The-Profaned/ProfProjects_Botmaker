declare namespace javax.swing {
	export class JTextField extends JComponent {
		constructor(text?: string, columns?: number);
		setText(text: string): void;
		getText(): string;
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;
		setMaximumSize(size: java.awt.Dimension): void;
		addActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		removeActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		addFocusListener(listener: java.awt.event.FocusListener): void;
		removeFocusListener(listener: java.awt.event.FocusListener): void;
		getColumns(): number;
		setColumns(columns: number): void;
		getCaretPosition(): number;
		setCaretPosition(position: number): void;
		getSelectionStart(): number;
		setSelectionStart(index: number): void;
		getSelectionEnd(): number;
		setSelectionEnd(index: number): void;
	}
}

type JTextField = javax.swing.JTextField;
