declare namespace javax.swing {
	export abstract class AbstractButton extends javax.swing.JComponent {
		setText(text: string): void;
		getText(): string;
		setIcon(icon: Icon): void;
		getIcon(): Icon | null;
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;
		addActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		removeActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		setSelected(selected: boolean): void;
		isSelected(): boolean;
		setMnemonic(mnemonic: number): void;
		getMnemonic(): number;
		setToolTipText(text: string): void;
		getToolTipText(): string;
		setModel(model: javax.swing.ButtonModel): void;
		getModel(): javax.swing.ButtonModel;
		setActionCommand(cmd: string): void;
		getActionCommand(): string;
	}
}

type AbstractButton = javax.swing.AbstractButton;
