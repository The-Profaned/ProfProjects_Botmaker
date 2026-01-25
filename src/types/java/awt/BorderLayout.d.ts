declare namespace java.awt {
	export class BorderLayout {
		static NORTH: string;
		static SOUTH: string;
		static EAST: string;
		static WEST: string;
		static CENTER: string;
		constructor(hgap?: number, vgap?: number);
		getHgap(): number;
		setHgap(hgap: number): void;
		getVgap(): number;
		setVgap(vgap: number): void;
	}
}

type BorderLayout = java.awt.BorderLayout;
