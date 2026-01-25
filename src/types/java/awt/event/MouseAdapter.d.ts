declare namespace java.awt.event {
	export abstract class MouseAdapter {
		mouseClicked?(e: MouseEvent): void;
		mousePressed?(e: MouseEvent): void;
		mouseReleased?(e: MouseEvent): void;
		mouseEntered?(e: MouseEvent): void;
		mouseExited?(e: MouseEvent): void;
	}
}

type MouseAdapter = java.awt.event.MouseAdapter;
