declare namespace javax.swing {
	export class JLabel extends JComponent {
		constructor(text: string);
		setText(text: string): void;
		getText(): string;
		setIcon(icon: Icon): void;
		getIcon(): Icon | null;
		setHorizontalAlignment(alignment: number): void;
		getHorizontalAlignment(): number;
		setVerticalAlignment(alignment: number): void;
		getVerticalAlignment(): number;
		setToolTipText(text: string): void;
		getToolTipText(): string;
		setAlignmentX(alignment: number): void;
		getAlignmentX(): number;
		setAlignmentY(alignment: number): void;
		getAlignmentY(): number;
		setPreferredSize(size: java.awt.Dimension): void;
		setMinimumSize(dimension: java.awt.Dimension): void;
		setMaximumSize(dimension: java.awt.Dimension): void;
		setFont(font: java.awt.Font): void;
		setForeground(color: java.awt.Color): void;
		setBackground(color: java.awt.Color): void;
	}
}

type JLabel = javax.swing.JLabel;
