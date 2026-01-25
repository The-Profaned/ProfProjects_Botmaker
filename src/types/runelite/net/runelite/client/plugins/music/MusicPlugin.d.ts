/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2019, Anthony Chen <https://github.com/achencoms>
 * Copyright (c) 2019, Adam <Adam@sigterm.info>
 * Copyright (c) 2020, Sean Dewar <https://github.com/seandewar>
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
declare namespace net.runelite.client.plugins.music {
export class MusicPlugin extends Plugin
{
	private startUp(): void;
					// Reload the scene to remove ambient sounds
	private shutDown(): void;
				// Reload the scene to reapply ambient sounds
	getConfig(configManager: ConfigManager): MusicConfig;
	onGameStateChanged(gameStateChanged: net.runelite.api.events.GameStateChanged): void;
			// Reset music filter on logout
	onWidgetLoaded(widgetLoaded: net.runelite.api.events.WidgetLoaded): void;
			// Reset filter state as the widget has been reloaded.
			// It is too early here to call updateFilter()
	private addMusicButtons(): void;
		//Creation of the search and toggle status buttons
	onVarClientIntChanged(varClientIntChanged: net.runelite.api.events.VarClientIntChanged): void;
	onVolumeChanged(volumeChanged: net.runelite.api.events.VolumeChanged): void;
	onConfigChanged(configChanged: ConfigChanged): void;
					// Reload the scene to reapply ambient sounds
	private isOnMusicTab(): boolean;
	private isChatboxOpen(): boolean;
	private getChatboxInput(): string;
	private toggleStatus(): void;
	private openSearch(): void;
	private closeSearch(): void;
	private updateFilter(input: string): void;
	private updateList(scrollContainer: net.runelite.api.widgets.Widget, musicList: net.runelite.api.widgets.Widget, filter: string): void;
		// Original music track list has a little offset
static MusicState =
{
NOT_FOUND = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
FOUND = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
ALL = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
int = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
String = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
int = {
/** CAUTION - NOT PERFECTLY TYPED YET */
getId(): number { return 0; },
toString(): string { return ""; } },
}
/** TBD-1 */
// export class Slider
/** TBD-1 */
// export class SettingsSideSlider extends Slider
			// emulate [proc,settings_update_icon]
			// Set name + no tooltip; we have our own for ops
/** TBD-1 */
// export class SettingsSlider extends Slider
			// calling settings_init will do teardown for us
	private onPostStructComposition(ev: net.runelite.api.events.PostStructComposition): void;
	private onScriptPreFired(ev: net.runelite.api.events.ScriptPreFired): void;
			// we have to set the var to our value so toplevel_redraw doesn't try to set
			// the volume to what vanilla has stored
/** TBD-1 */
// export class Channel
				// Use the vanilla value
				// the varps are known by the engine and it requires they are stored so
				// 0 = max and 4 = muted
				// readd our 1 offset for unknown's place
			// muted with saved restore point
			// 0 is used for unknown, so config values are 1 away from zero
				// muted without a reset value
	private updateMusicOptions(): void;
	private teardownMusicOptions(): void;
		// the side panel uses this too, so it has to run before they get shut down
	private resetSettingsWindow(): void;
			// [clientscript, settings_init]
	private onBeforeRender(ev: net.runelite.api.events.BeforeRender): void;
	onClientTick(event: net.runelite.api.events.ClientTick): void;
	onAreaSoundEffectPlayed(areaSoundEffectPlayed: net.runelite.api.events.AreaSoundEffectPlayed): void;
	onSoundEffectPlayed(soundEffectPlayed: net.runelite.api.events.SoundEffectPlayed): void;
	onAmbientSoundEffectCreated(ev: net.runelite.api.events.AmbientSoundEffectCreated): void;
}
}