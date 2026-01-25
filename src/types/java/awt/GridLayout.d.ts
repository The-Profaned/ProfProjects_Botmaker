/// <reference path="./Component.d.ts" />
/// <reference path="./Container.d.ts" />
/// <reference path="./Dimension.d.ts" />

declare namespace java.awt {
	export class GridLayout {
		constructor();
		constructor(rows: number, cols: number);
		constructor(rows: number, cols: number, hgap: number, vgap: number);

		getRows(): number;
		setRows(rows: number): void;
		getColumns(): number;
		setColumns(cols: number): void;
		getHgap(): number;
		setHgap(hgap: number): void;
		getVgap(): number;
		setVgap(vgap: number): void;

		addLayoutComponent(name: string, comp: java.awt.Component): void;
		removeLayoutComponent(comp: java.awt.Component): void;
		preferredLayoutSize(parent: java.awt.Container): java.awt.Dimension;
		minimumLayoutSize(parent: java.awt.Container): java.awt.Dimension;
		layoutContainer(parent: java.awt.Container): void;

		toString(): string;
	}
}

type GridLayout = java.awt.GridLayout;
