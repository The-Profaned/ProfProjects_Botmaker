declare namespace javax.swing {
	export class JButton extends javax.swing.JComponent {
		constructor(label: string);
		setText(label: string): void;
		getText(): string;
		setIcon(icon: Icon): void;
		getIcon(): Icon | null;
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;
		addActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		addMouseListener(listener: java.awt.event.MouseListener): void;
		removeActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		getActionListeners(): java.awt.event.ActionListener[];
		addFocusListener(listener: java.awt.event.FocusListener): void;
		removeFocusListener(listener: java.awt.event.FocusListener): void;
		getFocusListeners(): java.awt.event.FocusListener[];
		setToolTipText(text: string): void;
		getToolTipText(): string;
		setMnemonic(mnemonic: number): void;
		getMnemonic(): number;
		setBackground(color: java.awt.Color): void;
		getBackground(): java.awt.Color;
		setForeground(color: java.awt.Color): void;
		setBorderPainted(painted: boolean): void;
		setFocusPainted(painted: boolean): void;
		setContentAreaFilled(filled: boolean): void;
		setBorder(border: javax.swing.border.Border): void;
		setMargin(insets: java.awt.Insets): void;
		setPreferredSize(dimension: java.awt.Dimension): void;
		setMinimumSize(dimension: java.awt.Dimension): void;
		setMaximumSize(dimension: java.awt.Dimension): void;
		setFont(font: java.awt.Font): void;
	}
}

type JButton = javax.swing.JButton;
