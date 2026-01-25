declare namespace java.awt {
	export class Container {
		add(comp: java.awt.Component, constraints?: any): java.awt.Component;
		remove(comp: java.awt.Component): void;
		removeAll(): void;
		setLayout(layout: java.awt.LayoutManager): void;
		validate(): void;
		repaint(): void;
	}
}

type Container = java.awt.Container;
