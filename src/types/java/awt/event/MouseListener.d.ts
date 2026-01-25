declare namespace java.awt.event {
	export class MouseListener {
		constructor(options: {
			mouseClicked?: (event: any) => void;
			mousePressed?: (event: any) => void;
			mouseReleased?: (event: any) => void;
			mouseEntered?: (event: any) => void;
			mouseExited?: (event: any) => void;
		});
	}
}
