declare namespace java.awt.event {
	export abstract class KeyAdapter implements java.awt.event.KeyListener {
		keyPressed?(event: java.awt.event.KeyEvent): void;
		keyReleased?(event: java.awt.event.KeyEvent): void;
		keyTyped?(event: java.awt.event.KeyEvent): void;
	}
}

type KeyAdapter = java.awt.event.KeyAdapter;
