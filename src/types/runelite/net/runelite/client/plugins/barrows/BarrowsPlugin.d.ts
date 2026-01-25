/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2018, Seth <Sethtroll3@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare namespace net.runelite.client.plugins.barrows {
export class BarrowsPlugin extends Plugin
{
	provideConfig(configManager: ConfigManager): BarrowsConfig;
	private startUp(): void;
	private shutDown(): void;
		// Restore widgets
	onConfigChanged(event: ConfigChanged): void;
	onGameStateChanged(event: net.runelite.api.events.GameStateChanged): void;
	onWidgetLoaded(event: net.runelite.api.events.WidgetLoaded): void;
	onBeforeRender(beforeRender: net.runelite.api.events.BeforeRender): void;
		// The barrows brothers and potential overlays have timers to unhide them each tick. Set them
		// hidden here instead of in the overlay, because if the overlay renders on the ABOVE_WIDGETS
		// layer due to being moved outside of the snap corner, it will be running after the overlays
		// had already been rendered.
	onWidgetClosed(widgetClosed: net.runelite.api.events.WidgetClosed): void;
	private startPrayerDrainTimer(): void;
	private stopPrayerDrainTimer(): void;
	private isInCrypt(): boolean;
	isBarrowsLoaded(): boolean;
}
}