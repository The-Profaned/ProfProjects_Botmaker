declare namespace javax.swing {
	export interface Border {
		isBorderOpaque(): boolean;
		paintBorder(c: java.awt.Component, g: java.awt.Graphics, x: number, y: number, width: number, height: number): void;
	}
}
type Border = javax.swing.border.Border;
