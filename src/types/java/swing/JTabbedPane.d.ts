declare namespace javax.swing {
	export class JTabbedPane {
		constructor();

		// Tab control
		addTab(title: string, component: any): void;
		removeTabAt(index: number): void;
		setSelectedIndex(index: number): void;
		getSelectedIndex(): number;
		getTabCount(): number;
		getTitleAt(index: number): string;
		setTitleAt(index: number, title: string): void;

		// Change listeners
		addChangeListener(listener: (event: any) => void): void;
		removeChangeListener(listener: (event: any) => void): void;

		// Tab placement
		setTabPlacement(placement: number): void;
		getTabPlacement(): number;

		// Optional appearance methods (optional, but nice to include)
		setFont(font: java.awt.Font): void;
		setBackground(color: java.awt.Color): void;
		setForeground(color: java.awt.Color): void;
	}

	// Static constants for tab placement
	namespace JTabbedPane {
		const TOP: number;
		const LEFT: number;
		const BOTTOM: number;
		const RIGHT: number;
	}
}
