/// <reference path="../../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2017, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins.config {
	export class ConfigPanel extends PluginPanel {
		init(pluginConfig: PluginConfigurationDescriptor): void;
		private toggleSection(csd: ConfigSectionDescriptor, button: JButton, contents: JPanel): void;
		private rebuild(): void;
		// For whatever reason, the header extends out by a single pixel when closed. Adding a single pixel of
		// border on the right only affects the width when closed, fixing the issue.
		// Add listeners to each part of the header so that it's easier to toggle them
		// Reset non-config panel keys
		private createCheckbox(cd: ConfigDescriptor, cid: ConfigItemDescriptor): JCheckBox;
		private createIntSpinner(cd: ConfigDescriptor, cid: ConfigItemDescriptor): JSpinner;
		// Config may previously have been out of range
		private createDoubleSpinner(cd: ConfigDescriptor, cid: ConfigItemDescriptor): JSpinner;
		private createTextField(cd: ConfigDescriptor, cid: ConfigItemDescriptor): JTextComponent;
		private createColorPicker(cd: ConfigDescriptor, cid: ConfigItemDescriptor): java.awt.ColorJButton;
		private createDimension(cd: ConfigDescriptor, cid: ConfigItemDescriptor): JPanel;
		private createComboBox(cd: ConfigDescriptor, cid: ConfigItemDescriptor): JComboBox<Enum<?>>;
		// set renderer prior to calling box.getPreferredSize(), since it will invoke the renderer
		// to build components for each combobox element in order to compute the display size of the
		// combobox
		private createKeybind(cd: ConfigDescriptor, cid: ConfigItemDescriptor): HotkeyButton;
		private createNotification(cd: ConfigDescriptor, cid: ConfigItemDescriptor): JPanel;
		// button visibility is tied to the checkbox
		private createList(cd: ConfigDescriptor, cid: ConfigItemDescriptor): JList<Enum<?>>;
		private changeConfiguration(component: Component, cd: ConfigDescriptor, cid: ConfigItemDescriptor): void;
		getPreferredSize(): java.awt.Dimension;
		onPluginChanged(event: PluginChanged): void;
		private onExternalPluginsChanged(ev: ExternalPluginsChanged): void;
		private onProfileChanged(profileChanged: ProfileChanged): void;
		private createResetMenuItem(
			pluginConfig: PluginConfigurationDescriptor,
			configItemDescriptor: ConfigItemDescriptor,
		): JMenuItem;
		// To reset one item we'll just unset it and then apply defaults over the whole group
	}
}
