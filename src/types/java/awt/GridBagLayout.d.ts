declare namespace java.awt {
	export class GridBagLayout {
		constructor();
		addLayoutComponent(name: string, comp: any): void;
		removeLayoutComponent(comp: any): void;
		layoutContainer(parent: any): void;
		getLayoutAlignmentX(target: any): number;
		getLayoutAlignmentY(target: any): number;
		invalidateLayout(target: any): void;
	}
}

type GridBagLayout = java.awt.GridBagLayout;
