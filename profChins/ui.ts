import { logger } from '../imports/logger.js';
import { getObjectIdGroups } from '../imports/object-ids.js';

// This will be passed in by the caller
let state: any;
let trapLocationsCache: net.runelite.api.coords.WorldPoint[];
let getTrapsLaid: () => number;
let getMaxTraps: () => number;
let getIsWebWalking: () => boolean;
const TILE_OVERLAY_INTERVAL: number = 2;
const PANEL_OVERLAY_INTERVAL: number = 2;

type PanelLine = {
	left: string;
	right: string;
	leftColor: java.awt.Color;
	rightColor: java.awt.Color;
};

type PanelCache = {
	lines: PanelLine[];
	shrink: boolean;
};

// UI Tracking Variables
export let currentAction = 'Idle';
export let totalChinsCaught = 0;
export let lastHunterXp = 0;
let botMakerLogOverlayReference: any = null;
let botMakerMainOverlayReference: any = null;

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, no-empty */
const overlay = {
	manager: (net.runelite.client.RuneLite.getInjector() as any).getInstance(
		net.runelite.client.ui.overlay.OverlayManager,
	),
	sub: [] as any[],
	subscribe(overlay: any): void {
		this.manager.add(overlay);
		this.sub.push(overlay);
	},

	unsubscribe(overlay: any): void {
		this.manager.remove(overlay);
		const index = this.sub.indexOf(overlay);
		if (index > -1) this.sub.splice(index, 1);
	},
	stop(): void {
		if (this.sub.length > 0) {
			this.sub.forEach((overlay) => {
				this.manager.remove(overlay);
			});
		}
		this.sub = [];
	},
	start(): void {
		overlayPanel.start();
		overlayTile.start();
	},
};

const overlayPanel = {
	panel: null as any,
	panelCache: null as PanelCache | null,
	override: {
		shrink: false,
		maxWidth: 0,
		panelComponent: null as any,
		render(graphics: any): any {
			if (!state) {
				return (this as any).super$render(graphics);
			}
			const shouldRefresh: boolean =
				state.gameTick % PANEL_OVERLAY_INTERVAL === 0;
			if (
				shouldRefresh ||
				!overlayPanel.panelCache ||
				overlayPanel.panelCache.shrink !== this.shrink
			) {
				const panelText1 = this.shrink ? 'Caught:' : 'Chins caught:';
				const trapsLaid = getTrapsLaid();
				const maxAllowed = getMaxTraps();
				const panelText2 = this.shrink ? 'Traps:' : 'Traps laid:';
				const stateText = this.shrink ? 'Action:' : 'Current Action:';
				overlayPanel.panelCache = {
					shrink: this.shrink,
					lines: [
						{
							left: panelText1,
							right: `${totalChinsCaught}`,
							leftColor: java.awt.Color.CYAN,
							rightColor: java.awt.Color.YELLOW,
						},
						{
							left: panelText2,
							right: `${trapsLaid}/${maxAllowed}`,
							leftColor: java.awt.Color.CYAN,
							rightColor: java.awt.Color.GREEN,
						},
						{
							left: stateText,
							right: currentAction,
							leftColor: java.awt.Color.CYAN,
							rightColor: java.awt.Color.GREEN,
						},
					],
				};
			}

			const cached = overlayPanel.panelCache;
			if (cached) {
				for (const line of cached.lines) {
					this.addText(
						graphics,
						this.panelComponent,
						line.left,
						line.right,
						line.leftColor,
						line.rightColor,
					);
				}
			}

			return (this as any).super$render(graphics);
		},

		addText(
			graphics: any,
			comp: any,
			left: string,
			right: string,
			leftColor: any,
			rightColor: any,
		): void {
			if (!comp) return;
			const l = left || '';
			const r = right || '';
			const lc = leftColor || java.awt.Color.WHITE;
			const rc = rightColor || java.awt.Color.WHITE;
			const lineWidth = graphics
				.getFontMetrics()
				.stringWidth(l + ' ' + r);
			if (lineWidth > this.maxWidth) {
				this.maxWidth = lineWidth;
				if (overlayPanel.panel) {
					overlayPanel.panel.setPreferredSize(
						new java.awt.Dimension(this.maxWidth + 20, 0),
					);
				}
			}
			if (
				overlayPanel.panel &&
				overlayPanel.panel.getPreferredSize().width < this.maxWidth
			) {
				overlayPanel.panel.setPreferredSize(
					new java.awt.Dimension(this.maxWidth + 20, 0),
				);
			}

			const builder =
				net.runelite.client.ui.overlay.components.LineComponent.builder();
			comp.getChildren().add(
				builder.left(l).right(r).leftColor(lc).rightColor(rc).build(),
			);
		},
	},
	toggleShrink(): void {
		this.override.shrink = !this.override.shrink;
		this.override.maxWidth = 0;
	},
	create(): any {
		const o = new (JavaAdapter as any)(
			net.runelite.client.ui.overlay.OverlayPanel,
			this.override,
		);
		o.setPosition(
			net.runelite.client.ui.overlay.OverlayPosition.ABOVE_CHATBOX_RIGHT,
		);
		o.setPriority(net.runelite.client.ui.overlay.OverlayPriority.MED);
		o.setResizable(true);
		o.setPreferredSize(new java.awt.Dimension(500, 200));
		o.addMenuEntry(
			net.runelite.api.MenuAction.RUNELITE_OVERLAY,
			'Shrink',
			'ProfChins panel',
			() => this.toggleShrink(),
		);
		o.addMenuEntry(
			net.runelite.api.MenuAction.RUNELITE_OVERLAY,
			'Disable',
			'ProfChins panel',
			() => this.remove(),
		);
		return o;
	},
	start(): void {
		this.panel = this.create();
		overlay.subscribe(this.panel);
	},
	remove(): void {
		overlay.unsubscribe(this.panel);
		this.panel = null;
	},
};

const overlayTile = {
	tiles: null as any,
	tileStates: new Map<string, { color: any; text: string }>(),
	override: {
		render(graphics: any): any {
			try {
				if (!state) {
					return null;
				}
				if (getIsWebWalking && getIsWebWalking()) {
					return null;
				}
				if (getTrapsLaid() === 0) {
					return null;
				}

				const shouldRefresh: boolean =
					state.gameTick % TILE_OVERLAY_INTERVAL === 0;
				const shakingTrapMap = shouldRefresh
					? new Map(
							bot.objects
								.getTileObjectsWithIds(
									getObjectIdGroups().boxTrap_Shaking,
								)
								.filter((o: any) => o && o.getWorldLocation())
								.map((o: any) => {
									const worldLoc = o.getWorldLocation();
									const key = `${worldLoc.getX()},${worldLoc.getY()}`;
									return [key, o] as [string, any];
								}),
						)
					: null;
				const failedTrapMap = shouldRefresh
					? new Map(
							bot.objects
								.getTileObjectsWithIds(
									getObjectIdGroups().boxTrap_Failed,
								)
								.filter((o: any) => o && o.getWorldLocation())
								.map((o: any) => {
									const worldLoc = o.getWorldLocation();
									const key = `${worldLoc.getX()},${worldLoc.getY()}`;
									return [key, o] as [string, any];
								}),
						)
					: null;
				const laidTrapMap = shouldRefresh
					? new Map(
							bot.objects
								.getTileObjectsWithIds(
									getObjectIdGroups().boxTrapLayed,
								)
								.filter((o: any) => o && o.getWorldLocation())
								.map((o: any) => {
									const worldLoc = o.getWorldLocation();
									const key = `${worldLoc.getX()},${worldLoc.getY()}`;
									return [key, o] as [string, any];
								}),
						)
					: null;

				trapLocationsCache.forEach((loc, index) => {
					try {
						const locKey = `${loc.getX()},${loc.getY()}`;
						let stateColor = java.awt.Color.GRAY;
						let stateText = `Box ${index + 1}`;

						if (shouldRefresh) {
							const shakingTrap =
								shakingTrapMap && shakingTrapMap.get(locKey);
							if (shakingTrap) {
								stateColor = java.awt.Color.GREEN;
								stateText = 'Caught!';
								overlayTile.tileStates.set(locKey, {
									color: stateColor,
									text: stateText,
								});
							} else {
								const failedTrap =
									failedTrapMap && failedTrapMap.get(locKey);
								if (failedTrap) {
									stateColor = java.awt.Color.RED;
									stateText = 'Reset';
									overlayTile.tileStates.set(locKey, {
										color: stateColor,
										text: stateText,
									});
								} else {
									const laidTrap =
										laidTrapMap && laidTrapMap.get(locKey);
									if (laidTrap) {
										stateColor = java.awt.Color.YELLOW;
										stateText = 'Active';
										overlayTile.tileStates.set(locKey, {
											color: stateColor,
											text: stateText,
										});
									} else {
										const cachedState =
											overlayTile.tileStates.get(locKey);
										if (cachedState) {
											if (
												cachedState.text ===
													'Caught!' ||
												cachedState.text === 'Reset'
											) {
												stateColor =
													java.awt.Color.GRAY;
												stateText = 'Laying...';
												overlayTile.tileStates.set(
													locKey,
													{
														color: stateColor,
														text: stateText,
													},
												);
											} else {
												stateColor = cachedState.color;
												stateText = cachedState.text;
											}
										} else {
											stateColor = java.awt.Color.GRAY;
											stateText = `Box ${index + 1}`;
										}
									}
								}
							}
						} else {
							const cachedState =
								overlayTile.tileStates.get(locKey);
							if (cachedState) {
								stateColor = cachedState.color;
								stateText = cachedState.text;
							}
						}

						this.drawTileOverlay(
							graphics,
							loc,
							stateColor,
							stateText,
						);
					} catch {
						// Continue to next location on error
					}
				});
			} catch {}
			return null;
		},
		drawTileOverlay(
			graphics: any,
			worldPoint: any,
			borderColor: any,
			text: string | null,
		): any {
			if (!graphics) return null;
			if (!worldPoint) return null;

			const wv = client.getTopLevelWorldView();
			if (!wv) return null;

			const lp = net.runelite.api.coords.LocalPoint.fromWorld(
				client,
				worldPoint,
			);
			if (!lp) return null;

			const polygon = net.runelite.api.Perspective.getCanvasTilePoly(
				client,
				lp,
			);
			if (polygon == null) return null;

			net.runelite.client.ui.overlay.OverlayUtil.renderPolygon(
				graphics,
				polygon,
				borderColor,
			);
			if (text == null) return null;
			const center = net.runelite.api.Perspective.getCanvasTextLocation(
				client,
				graphics,
				lp,
				text,
				0,
			);
			if (!center) return null;

			net.runelite.client.ui.overlay.OverlayUtil.renderTextLocation(
				graphics,
				center,
				text,
				borderColor,
			);
			return null;
		},
	},
	create(): any {
		const o = new (JavaAdapter as any)(
			net.runelite.client.ui.overlay.Overlay,
			this.override,
		);
		o.setPriority(net.runelite.client.ui.overlay.OverlayPriority.MED);
		o.setPosition(net.runelite.client.ui.overlay.OverlayPosition.DYNAMIC);
		o.setLayer(net.runelite.client.ui.overlay.OverlayLayer.ABOVE_SCENE);
		return o;
	},
	start(): void {
		this.tiles = this.create();
		overlay.subscribe(this.tiles);
	},
	remove(): void {
		overlay.unsubscribe(this.tiles);
		this.tiles = null;
	},
};

function disableBotMakerOverlay(): void {
	try {
		const manager = overlay.manager;
		if (!manager) {
			return;
		}
		manager.removeIf((overlayItem: any): boolean => {
			try {
				if (!overlayItem || !overlayItem.getClass) {
					return false;
				}
				const overlayClass = overlayItem.getClass();
				if (!overlayClass) {
					return false;
				}
				const overlayName = overlayClass.getName() as string;
				if (!overlayName || !overlayName.includes('plugins.botmaker')) {
					return false;
				}
				const layer = overlayItem.getLayer();
				const position = overlayItem.getPosition();
				if (
					layer ===
						net.runelite.client.ui.overlay.OverlayLayer
							.UNDER_WIDGETS &&
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
						net.runelite.client.ui.overlay.OverlayLayer
							.UNDER_WIDGETS &&
					position ===
						net.runelite.client.ui.overlay.OverlayPosition
							.BOTTOM_LEFT
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
			} catch {
				return false;
			}
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
		const manager = overlay.manager;
		if (!manager) return;
		if (botMakerLogOverlayReference) {
			manager.add(botMakerLogOverlayReference);
			botMakerLogOverlayReference = null;
		}
		if (botMakerMainOverlayReference) {
			manager.add(botMakerMainOverlayReference);
			botMakerMainOverlayReference = null;
		}
	} catch (error) {
		logger(
			state,
			'all',
			'UI',
			'Error enabling BotMaker overlay: ' + String(error),
		);
	}
}

// Initialize UI with required dependencies
export function initializeUI(
	scriptState: any,
	traps: net.runelite.api.coords.WorldPoint[],
	getTrapsLaidFunction: () => number,
	getMaxTrapsFunction: () => number,
	getIsWebWalkingFunction: () => boolean,
): void {
	state = scriptState;
	trapLocationsCache = traps;
	getTrapsLaid = getTrapsLaidFunction;
	getMaxTraps = getMaxTrapsFunction;
	getIsWebWalking = getIsWebWalkingFunction;
}

// Export the UI interface
export const profChinsUI = {
	get currentAction(): string {
		return currentAction;
	},
	set currentAction(value: string) {
		currentAction = value;
	},

	get totalChinsCaught(): number {
		return totalChinsCaught;
	},
	set totalChinsCaught(value: number) {
		totalChinsCaught = value;
	},

	get lastHunterXp(): number {
		return lastHunterXp;
	},
	set lastHunterXp(value: number) {
		lastHunterXp = value;
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
