declare namespace javax.swing {
	export class JTextArea extends javax.swing.JComponent {
		constructor(rows?: number, columns?: number);
		constructor(text?: string, rows?: number, columns?: number);
		setText(text: string): void;
		getText(): string;
		setEditable(editable: boolean): void;
		isEditable(): boolean;
		setLineWrap(wrap: boolean): void;
		getLineWrap(): boolean;
		setWrapStyleWord(word: boolean): void;
		getWrapStyleWord(): boolean;
		insert(text: string, position: number): void;
		append(text: string): void;
		replaceRange(text: string, start: number, end: number): void;
		setRows(rows: number): void;
		getRows(): number;
		setColumns(columns: number): void;
		getColumns(): number;
		setMinimumSize(dimension: java.awt.Dimension): void;
		setMaximumSize(dimension: java.awt.Dimension): void;
		setPreferredSize(size: java.awt.Dimension): void;
		addFocusListener(listener: java.awt.event.FocusListener): void;
		addKeyListener(listener: java.awt.event.KeyListener): void;
		removeKeyListener(listener: java.awt.event.KeyListener): void;
	}
}

type JTextArea = javax.swing.JTextArea;
