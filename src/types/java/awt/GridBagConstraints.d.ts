/// <reference path="./Insets.d.ts" />
declare namespace java.awt {
	export class GridBagConstraints {
		static RELATIVE: number;
		static REMAINDER: number;
		static NONE: number;
		static BOTH: number;
		static HORIZONTAL: number;
		static VERTICAL: number;
		static CENTER: number;
		static NORTH: number;
		static NORTHEAST: number;
		static EAST: number;
		static SOUTHEAST: number;
		static SOUTH: number;
		static SOUTHWEST: number;
		static WEST: number;
		static NORTHWEST: number;
		static PAGE_START: number;
		static PAGE_END: number;
		static LINE_START: number;
		static LINE_END: number;
		static FIRST_LINE_START: number;
		static FIRST_LINE_END: number;
		static LAST_LINE_START: number;
		static LAST_LINE_END: number;

		gridx: number;
		gridy: number;
		gridwidth: number;
		gridheight: number;
		weightx: number;
		weighty: number;
		anchor: number;
		fill: number;
		insets: java.awt.Insets;
		ipadx: number;
		ipady: number;

		constructor(
			gridx?: number,
			gridy?: number,
			gridwidth?: number,
			gridheight?: number,
			weightx?: number,
			weighty?: number,
			anchor?: number,
			fill?: number,
			insets?: java.awt.Insets,
			ipadx?: number,
			ipady?: number,
		);
	}
}

type GridBagConstraints = java.awt.GridBagConstraints;
