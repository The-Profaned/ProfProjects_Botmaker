declare namespace javax.swing {
	export class JSlider {
		constructor(orientation: number, min: number, max: number, value: number);
		setValue(value: number): void;
		getValue(): number;
		setMinimum(min: number): void;
		getMinimum(): number;
		setMaximum(max: number): void;
		getMaximum(): number;
		setMajorTickSpacing(tickSpacing: number): void;
		setMinorTickSpacing(tickSpacing: number): void;
		setPaintTicks(flag: boolean): void;
		setPaintLabels(flag: boolean): void;
		setSnapToTicks(flag: boolean): void;
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;
		addChangeListener(listener: (event: any) => void): void; //TODO: Create Change Listener Event
		removeChangeListener(listener: (event: any) => void): void; //TODO: Create Change Listener Event
		addFocusListener(listener: (event: java.awt.event.FocusListener) => void): void;
		removeFocusListener(listener: (event: java.awt.event.FocusListener) => void): void;
	}
}

type JSlider = javax.swing.JSlider;
