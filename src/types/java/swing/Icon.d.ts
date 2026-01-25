declare namespace javax.swing {
	export interface Icon {
		paintIcon(c: java.awt.Component, g: java.awt.Graphics2D, x: number, y: number): void;

		getIconWidth(): number;

		getIconHeight(): number;
	}
}

type Icon = javax.swing.Icon;
