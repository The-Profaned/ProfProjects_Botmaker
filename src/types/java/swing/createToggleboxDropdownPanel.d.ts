declare namespace javax.swing {
	export function createToggleboxDropdownPanel(options: {
		buttonLabel: string;
		variableNames?: string;
		dropdownItems: string[];
		layout?: java.awt.FlowLayout | java.awt.BorderLayout;
		position?: string;
		hasVariable?: boolean;
	}): JPanel;
}
