declare namespace javax.swing {
	export class BorderFactory {
		static createEmptyBorder(top?: number, left?: number, bottom?: number, right?: number): javax.swing.Border;
		static createLineBorder(color: java.awt.Color, thickness?: number, rounded?: boolean): javax.swing.Border;
		static createCompoundBorder(border?: javax.swing.Border, outerBorder?: javax.swing.Border): javax.swing.Border;

		static createRaisedBevelBorder(): javax.swing.Border;
		static createLoweredBevelBorder(): javax.swing.Border;
		static createEtchedBorder(
			etchType?: number,
			highlight?: java.awt.Color,
			shadow?: java.awt.Color,
		): javax.swing.Border;
		static createTitledBorder(title: string): javax.swing.Border;
	}
}

type BorderFactory = javax.swing.BorderFactory;
