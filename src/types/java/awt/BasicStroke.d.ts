declare namespace java.awt {
	export class BasicStroke {
		constructor(width: number, cap?: number, join?: number, miterlimit?: number, dash?: number[], dash_phase?: number);
		getLineWidth(): number;
		getEndCap(): number;
		getLineJoin(): number;
		getMiterLimit(): number;
		getDashArray(): number[];
		getDashPhase(): number;
	}
}
