declare namespace java.awt {
	export class FlowLayout {
		static LEFT: number;
		static CENTER: number;
		static RIGHT: number;
		static LEADING: number;
		static TRAILING: number;
		constructor(alignment?: number, hgap?: number, vgap?: number);
		getHgap(): number;
		setHgap(hgap: number): void;
		getVgap(): number;
		setVgap(vgap: number): void;
	}
}

type FlowLayout = java.awt.FlowLayout;
