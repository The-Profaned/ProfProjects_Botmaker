type JavaAdapterType = {
	<T extends object, O extends object>(
		superclass: new (...args: any[]) => T,
		overrides: O
	): T & O;

	new <T extends object, O extends object>(
		superclass: abstract new (...args: any[]) => T,
		overrides: O
	): T & O;
};

declare const JavaAdapter: JavaAdapterType;
