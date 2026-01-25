declare namespace javax.swing {
	export class JMenuItem {
		constructor(label: string);
		addActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		removeActionListener(listener: (event: java.awt.event.ActionListener) => void): void;
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;
		setMnemonic(key: number): void;
	}
}

type JMenuItem = javax.swing.JMenuItem;
