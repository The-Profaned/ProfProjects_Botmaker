declare namespace java.awt.geom {
	class AffineTransform {
		constructor();
		constructor(m00: number, m10: number, m01: number, m11: number, m02: number, m12: number);

		static readonly TYPE_IDENTITY: number;
		static readonly TYPE_TRANSLATION: number;
		static readonly TYPE_UNIFORM_SCALE: number;
		static readonly TYPE_GENERAL_SCALE: number;
		static readonly TYPE_MASK_SCALE: number;
		static readonly TYPE_FLIP: number;
		static readonly TYPE_QUADRANT_ROTATION: number;
		static readonly TYPE_GENERAL_ROTATION: number;
		static readonly TYPE_MASK_ROTATION: number;
		static readonly TYPE_GENERAL_TRANSFORM: number;

		getScaleX(): number;
		getScaleY(): number;
		getTranslateX(): number;
		getTranslateY(): number;
		getShearX(): number;
		getShearY(): number;
		getDeterminant(): number;
		getType(): number;

		setToIdentity(): void;
		setTransform(tx: AffineTransform): void;
		setTransform(m00: number, m10: number, m01: number, m11: number, m02: number, m12: number): void;

		translate(tx: number, ty: number): void;
		scale(sx: number, sy: number): void;
		rotate(theta: number): void;
		rotate(theta: number, anchorx: number, anchory: number): void;
		shear(shx: number, shy: number): void;

		invert(): void;
		createInverse(): AffineTransform;

		concatenate(tx: AffineTransform): void;
		preConcatenate(tx: AffineTransform): void;

		transform(srcPt: java.awt.geom.Point2D, dstPt?: java.awt.geom.Point2D): java.awt.geom.Point2D;
		inverseTransform(srcPt: java.awt.geom.Point2D, dstPt?: java.awt.geom.Point2D): java.awt.geom.Point2D;

		clone(): AffineTransform;
	}
}
