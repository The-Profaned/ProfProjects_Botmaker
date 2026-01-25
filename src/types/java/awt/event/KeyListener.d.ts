declare namespace java.awt.event {
	export interface KeyListener {
		keyPressed?(event: java.awt.event.KeyEvent): void;
		keyReleased?(event: java.awt.event.KeyEvent): void;
		keyTyped?(event: java.awt.event.KeyEvent): void;
	}
}
