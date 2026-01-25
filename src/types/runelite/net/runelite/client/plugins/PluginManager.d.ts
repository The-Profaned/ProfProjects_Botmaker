/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
/*
 * Copyright (c) 2016-2017, Adam <Adam@sigterm.info>
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
declare namespace net.runelite.client.plugins {
	export class PluginManager {
		/**
		 * Base package where the core plugins are
		 */
		onProfileChanged(profileChanged: ProfileChanged): void;
		private refreshPlugins(): void;
		getPluginConfigProxy(plugin: Plugin): Config;
		getPluginConfigProxies(plugins: Collection<Plugin>): Array<Config>;
		loadDefaultPluginConfiguration(plugins: Collection<Plugin>): void;
		startPlugins(): void;
		loadCorePlugins(): void;
		loadSideLoadPlugins(): void;
		loadPlugins(plugins: any, onPluginLoaded: any): Array<Plugin>;
		// also disable the plugin from autostarting later
		// Build plugin graph
		startPlugin(plugin: Plugin): boolean;
		// plugins always start in the EDT
		stopPlugin(plugin: Plugin): boolean;
		// plugins always stop in the EDT
		setPluginEnabled(plugin: Plugin, enabled: boolean): void;
		isPluginEnabled(plugin: Plugin): boolean;
		private instantiate(scannedPlugins: Array<Plugin>, clazz: any): Plugin;
		// Create a module for each dependency
		// Create a parent injector containing all of the dependencies
		// With only one dependency we can simply use its injector
		// Create injector for the module
		// Since the plugin itself is a module, it won't bind itself, so we'll bind it here
		add(plugin: Plugin): void;
		remove(plugin: Plugin): void;
		getPlugins(): Collection<Plugin>;
		private schedule(plugin: Plugin): void;
		private unschedule(plugin: Plugin): void;
		/**
		 * Topologically sort a graph. Uses Kahn's algorithm.
		 *
		 * @param graph - A directed graph
		 * @param <T>   - The type of the item contained in the nodes of the graph
		 * @return - A topologically sorted list corresponding to graph.
		 * <p>
		 * Multiple invocations with the same arguments may return lists that are not equal.
		 */
		static topologicalSort(graph: Graph<T>): List<T>;
		conflictsForPlugin(plugin: Plugin): Array<Plugin>;
	}
}
