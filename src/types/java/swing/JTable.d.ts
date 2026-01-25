declare namespace javax.swing {
	export class JTable extends javax.swing.JComponent {
		constructor(modelOrData: javax.swing.table.DefaultTableModel | any[][], columnNames?: string[]);
		getModel(): any;
		setModel(model: any): void;
		getRowCount(): number;
		getColumnCount(): number;
		getSelectedRow(): number;
		getSelectedRows(): number[];
		setSelectionMode(mode: number): void;
		getSelectionMode(): number;
		setFillsViewportHeight(flag: boolean): void;
		getFillsViewportHeight(): boolean;
		addMouseListener(listener: (event: any) => void): void;
		removeMouseListener(listener: (event: any) => void): void;
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;
		setRowHeight(height: number): void;
		getSelectionModel(): javax.swing.ListSelectionModel;
		getValueAt(row: number, column: number): string | number | boolean;
		setBackground(color: java.awt.Color): void;
		setForeground(color: java.awt.Color): void;
		getColumnModel(): javax.swing.table.TableColumnModel;
	}
}

type JTable = javax.swing.JTable;
