/// <reference path="./JComponent.d.ts" />
/// <reference path="../awt/Dimension.d.ts" />

declare namespace javax.swing {
	export class JComboBox extends javax.swing.JComponent {
		constructor(items?: string[]);
		
		// Selection methods
		setSelectedItem(item: string): void;
		getSelectedItem(): string;
		setSelectedIndex(index: number): void;
		getSelectedIndex(): number;
		
		// Item management
		addItem(item: string): void;
		removeItem(item: string): void;
		removeAllItems(): void;
		getItemCount(): number;
		getItemAt(index: number): string;
		
		// Event listeners
		addActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		removeActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		addFocusListener(listener: (event: java.awt.event.FocusListener) => void): void;
		removeFocusListener(listener: (event: java.awt.event.FocusListener) => void): void;
		
		// Inherited from JComponent but commonly used
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;
		setPreferredSize(size: java.awt.Dimension): void;
		setMinimumSize(dimension: java.awt.Dimension): void;
		setMaximumSize(dimension: java.awt.Dimension): void;
	}
}

type JComboBox = javax.swing.JComboBox;
