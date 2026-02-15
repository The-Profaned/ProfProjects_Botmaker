import { logger } from '../imports/logger.js';
import type { State } from '../imports/types.js';

type OverlayPanelAdapter = {
	panelComponent: net.runelite.client.ui.overlay.components.PanelComponent;
	super$render: (graphics: java.awt.Graphics2D) => java.awt.Dimension | null;
};

type PanelLine = {
	left: string;
	right: string;
	leftColor: java.awt.Color;
	rightColor: java.awt.Color;
};

type OverlayItem = {
	getClass?: () => { getName: () => string };
	getLayer?: () => net.runelite.client.ui.overlay.OverlayLayer;
	getPosition?: () => net.runelite.client.ui.overlay.OverlayPosition;
};

let state: State | null = null;
let currentAction = 'Idle';
let chinsThrown = 0;
let botMakerLogOverlayReference: net.runelite.client.ui.overlay.Overlay | null =
	null;
let botMakerMainOverlayReference: net.runelite.client.ui.overlay.Overlay | null =
	null;

const overlayManager = (
	net.runelite.client.RuneLite.getInjector() as {
		getInstance: (
			clazz: object,
		) => net.runelite.client.ui.overlay.OverlayManager;
	}
).getInstance(
	net.runelite.client.ui.overlay.OverlayManager,
) as net.runelite.client.ui.overlay.OverlayManager & {
	removeIf: (
		predicate: (overlay: net.runelite.client.ui.overlay.Overlay) => boolean,
	) => void;
};

const overlay = {
	sub: [] as net.runelite.client.ui.overlay.Overlay[],
	subscribe(overlayItem: net.runelite.client.ui.overlay.Overlay): void {
		overlayManager.add(overlayItem);
		this.sub.push(overlayItem);
	},
	unsubscribe(overlayItem: net.runelite.client.ui.overlay.Overlay): void {
		overlayManager.remove(overlayItem);
		const index = this.sub.indexOf(overlayItem);
		if (index > -1) this.sub.splice(index, 1);
	},
	stop(): void {
		if (this.sub.length > 0) {
			this.sub.forEach((overlayItem) => {
				overlayManager.remove(overlayItem);
			});
		}
		this.sub = [];
	},
	start(): void {
		overlayPanel.start();
	},
};

const overlayPanel = {
	panel: null as net.runelite.client.ui.overlay.OverlayPanel | null,
	override: {
		render(
			this: OverlayPanelAdapter,
			graphics: java.awt.Graphics2D,
		): java.awt.Dimension | null {
			if (!state) {
				return this.super$render(graphics);
			}
			if (!this.panelComponent) {
				return this.super$render(graphics);
			}
			const children =
				this.panelComponent.getChildren() as java.util.List<net.runelite.client.ui.overlay.components.LineComponent>;
			children.clear();

			const lines: PanelLine[] = [
				{
					left: 'State:',
					right: currentAction,
					leftColor: java.awt.Color.CYAN,
					rightColor: java.awt.Color.GREEN,
				},
				{
					left: 'Chins Thrown:',
					right: `${chinsThrown}`,
					leftColor: java.awt.Color.CYAN,
					rightColor: java.awt.Color.YELLOW,
				},
			];

			for (const line of lines) {
				const builder =
					net.runelite.client.ui.overlay.components.LineComponent.builder();
				const lineComponent = builder
					.left(line.left)
					.right(line.right)
					.leftColor(line.leftColor)
					.rightColor(line.rightColor)
					.build();
				children.add(lineComponent);
			}

			return this.super$render(graphics);
		},
	},
	create(): net.runelite.client.ui.overlay.OverlayPanel {
		const adapter = JavaAdapter as {
			new (
				clazz: object,
				impl: object,
			): net.runelite.client.ui.overlay.OverlayPanel;
		};
		const panel = new adapter(
			net.runelite.client.ui.overlay.OverlayPanel,
			this.override,
		);
		panel.setPosition(
			net.runelite.client.ui.overlay.OverlayPosition.ABOVE_CHATBOX_RIGHT,
		);
		panel.setPriority(net.runelite.client.ui.overlay.OverlayPriority.MED);
		panel.setPreferredSize(new java.awt.Dimension(220, 120));
		return panel;
	},
	start(): void {
		this.panel = this.create();
		overlay.subscribe(this.panel);
	},
	remove(): void {
		if (this.panel) {
			overlay.unsubscribe(this.panel);
		}
		this.panel = null;
	},
};

function disableBotMakerOverlay(): void {
	try {
		overlayManager.removeIf((overlayItem): boolean => {
			const item = overlayItem as OverlayItem;
			if (!item.getClass || !item.getLayer || !item.getPosition) {
				return false;
			}
			const overlayClass = item.getClass();
			if (!overlayClass) {
				return false;
			}
			const overlayName = overlayClass.getName();
			if (!overlayName || !overlayName.includes('plugins.botmaker')) {
				return false;
			}
			const layer = item.getLayer();
			const position = item.getPosition();
			if (
				layer ===
					net.runelite.client.ui.overlay.OverlayLayer.UNDER_WIDGETS &&
				position ===
					net.runelite.client.ui.overlay.OverlayPosition.TOP_LEFT
			) {
				botMakerLogOverlayReference = overlayItem;
				if (state) {
					logger(
						state,
						'all',
						'UI',
						'Disabling BotMaker log overlay',
					);
				}
				return true;
			}
			if (
				layer ===
					net.runelite.client.ui.overlay.OverlayLayer.UNDER_WIDGETS &&
				position ===
					net.runelite.client.ui.overlay.OverlayPosition.BOTTOM_LEFT
			) {
				botMakerMainOverlayReference = overlayItem;
				if (state) {
					logger(
						state,
						'all',
						'UI',
						'Disabling BotMaker main overlay',
					);
				}
				return true;
			}
			return false;
		});
	} catch (error) {
		if (state) {
			logger(
				state,
				'all',
				'UI',
				'Error disabling BotMaker overlay: ' + String(error),
			);
		}
	}
}

function enableBotMakerOverlay(): void {
	try {
		if (botMakerLogOverlayReference) {
			overlayManager.add(botMakerLogOverlayReference);
			botMakerLogOverlayReference = null;
		}
		if (botMakerMainOverlayReference) {
			overlayManager.add(botMakerMainOverlayReference);
			botMakerMainOverlayReference = null;
		}
	} catch (error) {
		if (state && error instanceof Error) {
			logger(
				state,
				'all',
				'UI',
				'Error enabling BotMaker overlay: ' + error.message,
			);
		}
	}
}

export function initializeUI(scriptState: State): void {
	state = scriptState;
}

export const profChinBurstUI = {
	get currentAction(): string {
		return currentAction;
	},
	set currentAction(value: string) {
		currentAction = value;
	},
	get chinsThrown(): number {
		return chinsThrown;
	},
	set chinsThrown(value: number) {
		chinsThrown = value;
	},
	start(): void {
		overlay.start();
	},
	stop(): void {
		overlay.stop();
	},
	disableBotMakerOverlay(): void {
		disableBotMakerOverlay();
	},
	enableBotMakerOverlay(): void {
		enableBotMakerOverlay();
	},
};
