declare namespace javax.swing {
	export class BoxLayout {
		static X_AXIS: number;
		static Y_AXIS: number;
		static LINE_AXIS: number;
		static PAGE_AXIS: number;
		constructor(target: JPanel, axis: number);
	}
}

type BoxLayout = javax.swing.BoxLayout;
