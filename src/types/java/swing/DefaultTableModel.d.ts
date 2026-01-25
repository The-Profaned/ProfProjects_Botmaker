declare namespace javax.swing.table {
	export class DefaultTableModel {
		constructor(data: any[][], columnNames: any[]);
		constructor(columnNames: any[], rowCount: number);
		getRowCount(): number;
		getColumnCount(): number;
		getValueAt(row: number, column: number): any;
		setValueAt(value: any, row: number, column: number): void;
		addRow(rowData: any[]): void;
		removeRow(row: number): void;
		addTableModelListener(listener: (event: any) => void): void;
		removeTableModelListener(listener: (event: any) => void): void;
		getDataVector(): any[];
	}
}

type DefaultTableModel = javax.swing.table.DefaultTableModel;
