declare namespace javax.swing {
	export class JPanel extends JComponent {
		constructor(layout?: any);
		setOpaque(opaque: boolean): void;
		setLayout(layout: any): void;
		add(component: any, position?: string): void;
		remove(component: any): void;
		getComponents(): any[];
		getComponentCount(): number;
		getPreferredSize(): java.awt.Dimension;
		setPreferredSize(size: java.awt.Dimension): void;
		getMinimumSize(): java.awt.Dimension;
		getMaximumSize(): java.awt.Dimension;
		setBackground(color: java.awt.Color): void;
		setForeground(color: any): void;
		setBorder(border: any): void;
		getBorder(): any;
		repaint(): void;
		revalidate(): void;
		validate(): void;
		addMouseListener(listener: (event: java.awt.event.MouseListener) => void): void;
		removeMouseListener(listener: (event: java.awt.event.MouseListener) => void): void;
		addKeyListener(listener: any): void; //TODO: Create KeyListener
		removeKeyListener(listener: any): void; //TODO: Create KeyListener
		setAlignmentX(alignment: number): void;
		getAlignmentX(): number;
		setAlignmentY(alignment: number): void;
		getAlignmentY(): number;
		removeAll(): void;
	}
}

type JPanel = javax.swing.JPanel;
