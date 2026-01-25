declare namespace javax.swing {
	export class JProgressBar {
		constructor();
		setMinimum(min: number): void;
		getMinimum(): number;
		setMaximum(max: number): void;
		getMaximum(): number;
		setValue(value: number): void;
		getValue(): number;
		setStringPainted(painted: boolean): void;
		isStringPainted(): boolean;
		setString(text: string): void;
		setIndeterminate(indeterminate: boolean): void;
		isIndeterminate(): boolean;
	}
}

type JProgressBar = javax.swing.JProgressBar;
