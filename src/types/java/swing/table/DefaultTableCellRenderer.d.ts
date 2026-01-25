/// <reference path="../JLabel.d.ts" />
/// <reference path="../JTable.d.ts" />
/// <reference path="../JComponent.d.ts" />
declare namespace javax.swing.table {
	export class DefaultTableCellRenderer extends JLabel {
		constructor();

		getTableCellRendererComponent(
			table: javax.swing.JTable,
			value: any,
			isSelected: boolean,
			hasFocus: boolean,
			row: number,
			column: number,
		): javax.swing.JComponent;
	}
}
type DefaultTableCellRenderer = javax.swing.table.DefaultTableCellRenderer;
