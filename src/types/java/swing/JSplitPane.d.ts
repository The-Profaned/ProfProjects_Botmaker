declare namespace javax.swing {
	export class JSplitPane extends javax.swing.JComponent {
		// Split orientation constants
		static HORIZONTAL_SPLIT: number;
		static VERTICAL_SPLIT: number;

		constructor(orientation: number, leftComponent?: javax.swing.JComponent, rightComponent?: javax.swing.JComponent);

		setLeftComponent(comp: javax.swing.JComponent): void;
		setRightComponent(comp: javax.swing.JComponent): void;
		getLeftComponent(): javax.swing.JComponent;
		getRightComponent(): javax.swing.JComponent;

		setDividerLocation(location: number): void; // between 0.0 and 1.0 (relative) or pixels
		getDividerLocation(): number;

		setResizeWeight(weight: number): void; // 0.0 (favor left/top), 1.0 (favor right/bottom)

		setContinuousLayout(continuous: boolean): void;
		setOneTouchExpandable(expandable: boolean): void;
	}
}
