declare namespace java.awt.event {
	export class KeyEvent {
		constructor(source: any, id: number, when: number, modifiers: number, keyCode: number, keyChar: string | number);

		// Event types
		static KEY_PRESSED: number;
		static KEY_RELEASED: number;
		static KEY_TYPED: number;

		// Common key codes
		static CHAR_UNDEFINED: number;
		static VK_UNDEFINED: number;
		static VK_ENTER: number;
		static VK_BACK_SPACE: number;
		static VK_TAB: number;
		static VK_CANCEL: number;
		static VK_CLEAR: number;
		static VK_SHIFT: number;
		static VK_CONTROL: number;
		static VK_ALT: number;
		static VK_ESCAPE: number;
		static VK_SPACE: number;
		static VK_LEFT: number;
		static VK_UP: number;
		static VK_RIGHT: number;
		static VK_DOWN: number;
		static VK_DELETE: number;

		// Alphabetic keys
		static VK_A: number;
		static VK_B: number;
		static VK_C: number;
		static VK_D: number;
		static VK_E: number;
		static VK_F: number;
		static VK_G: number;
		static VK_H: number;
		static VK_I: number;
		static VK_J: number;
		static VK_K: number;
		static VK_L: number;
		static VK_M: number;
		static VK_N: number;
		static VK_O: number;
		static VK_P: number;
		static VK_Q: number;
		static VK_R: number;
		static VK_S: number;
		static VK_T: number;
		static VK_U: number;
		static VK_V: number;
		static VK_W: number;
		static VK_X: number;
		static VK_Y: number;
		static VK_Z: number;

		// Numeric keys
		static VK_0: number;
		static VK_1: number;
		static VK_2: number;
		static VK_3: number;
		static VK_4: number;
		static VK_5: number;
		static VK_6: number;
		static VK_7: number;
		static VK_8: number;
		static VK_9: number;

		getKeyCode(): number; // Returns the key code of the event
		getKeyChar(): string; // Returns the character associated with the event
		isShiftDown(): boolean; // Checks if Shift is held
		isControlDown(): boolean; // Checks if Ctrl is held
		isAltDown(): boolean; // Checks if Alt is held
		isMetaDown(): boolean; // Checks if Meta (Cmd/Windows) is held
		consume(): void; // Prevents default behavior of the key event
	}
}

type KeyEvent = java.awt.event.KeyEvent;
