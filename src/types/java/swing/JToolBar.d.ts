declare namespace javax.swing {
	export class JToolBar {
		constructor();
		add(component: any): void;
		remove(component: any): void;
		setFloatable(floatable: boolean): void;
		isFloatable(): boolean;
		addSeparator(size?: java.awt.Dimension): void;
		setOrientation(orientation: number): void;
		getOrientation(): number;
	}
}

type JToolBar = javax.swing.JToolBar;
