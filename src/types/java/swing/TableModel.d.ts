declare namespace javax.swing.table {
	/**
	 * Model for table data.  Provides row/column counts and cell values.
	 */
	export interface TableModel {
		/** Returns the number of rows in the model */
		getRowCount(): number;
		/** Returns the number of columns in the model */
		getColumnCount(): number;
		/** Returns the value at the specified cell */
		getValueAt(row: number, column: number): any;
		/** (Optional) Returns the column name for display */
		getColumnName?(column: number): string;
		/** (Optional) Adds a listener for model changes */
		addTableModelListener?(listener: any): void;
		/** (Optional) Removes a listener for model changes */
		removeTableModelListener?(listener: any): void;
	}

	/**
	 * Default implementation of TableModel using a two-dimensional array.
	 */
	export class DefaultTableModel implements TableModel {
		constructor(data?: any[][], columnNames?: string[]);
		getRowCount(): number;
		getColumnCount(): number;
		getValueAt(row: number, column: number): any;
		setRowCount(rowCount: number): void;
		addRow(rowData: any[]): void;
	}
}

type TableModel = javax.swing.table.TableModel;
type DefaultTableModel = javax.swing.table.DefaultTableModel;
