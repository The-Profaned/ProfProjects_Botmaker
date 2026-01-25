/// <reference path="../../../../../../../src/types/java/index.d.ts" />
/// <reference path="../../../../../../../src/types/runelite/index.d.ts" />
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

declare namespace net.runelite.client.config {
	/**
	 * The core profile type used by ConfigManager.
	 */
	export interface RuneScapeProfile {
		/** The display name of this profile */
		getName(): string;
		// …extend with other profile methods as needed…
	}

	/**
	 * Alias so your code can use ConfigProfile everywhere without changes
	 */
	export type ConfigProfile = RuneScapeProfile;

	export class ConfigManager {
		// ────── Profile Management ──────
		/** Switch to (or implicitly create) the given profile */
		switchProfile(newProfile: ConfigProfile): void;
		/** Rename an existing profile */
		renameProfile(profile: ConfigProfile, name: string): void;
		/** Enable or disable cloud-sync for a profile */
		toggleSync(profile: ConfigProfile, sync: boolean): void;
		/** Get the key of the current RuneScape profile */
		getRSProfileKey(): string;

		// ────── Session Events ──────
		/** Called when the client session opens (e.g. on login) */
		onSessionOpen(sessionOpen: SessionOpen): void;
		/** Called when the client session closes (e.g. on logout) */
		onSessionClose(sessionClose: SessionClose): void;

		// ────── Configuration Retrieval ──────
		/** Simple two-arg getter; returns raw string */
		getConfiguration(groupName: string, key: string): string;
		/** Typed two-arg getter; cast via the provided Type */
		getConfiguration<T>(groupName: string, key: string, clazz: Type): T;
		/** Four-arg getter: read from a non-current profile */
		getConfiguration<T>(groupName: string, profile: string, key: string, type: Type): T;
		/** Profile-specific getters */
		getRSProfileConfiguration(groupName: string, key: string): string;
		getRSProfileConfiguration<T>(groupName: string, key: string, clazz: Type): T;
		/** List keys under this group or profile */
		getConfigurationKeys(prefix: string): Array<string>;
		getRSProfileConfigurationKeys(group: string, profile: string, keyPrefix: string): Array<string>;
		/** Utility: combine group, profile, and key */
		static getWholeKey(groupName: string, profile: string, key: string): string;

		// ────── Configuration Setting ──────
		/** Simple two-arg setter; stores as string */
		setConfiguration(groupName: string, key: string, value: string): void;
		/** Typed two-arg setter; stores any serializable T */
		setConfiguration<T>(groupName: string, key: string, value: T): void;
		/** Four-arg setter: write into a non-current profile */
		setConfiguration(groupName: string, profile: string, key: string, value: string): void;
		setConfiguration<T>(groupName: string, profile: string, key: string, value: T): void;
		setRSProfileConfiguration<T>(groupName: string, key: string, value: T): void;

		// ────── Configuration Removal ──────
		unsetConfiguration(groupName: string, key: string): void;
		unsetConfiguration(groupName: string, profile: string, key: string): void;
		unsetRSProfileConfiguration(groupName: string, key: string): void;

		// ────── Profile Listing & Lookup ──────
		/** Returns all known profiles */
		getRSProfiles(): Array<RuneScapeProfile>;
		/** Internal helper to find (or create) a profile by name */
		private findRSProfile(
			profiles: Array<RuneScapeProfile>,
			accountHash: number,
			type: RuneScapeProfileType,
			displayName: string,
			create: boolean,
		): RuneScapeProfile;

		// ────── Migration & Internal Utilities ──────
		importAndMigrate(lock: ProfileManager.Lock, from: File, targetProfile: ConfigProfile): void;
		private migrate(): void;
		private static removeDuplicateProfiles(lock: ProfileManager.Lock): void;
		private static fixRsProfileName(lock: ProfileManager.Lock): void;
		private mergeRemoteProfiles(remoteProfiles: Array<Profile>): void;
		private syncRemote(lock: ProfileManager.Lock, profile: ConfigProfile, remoteProfiles: Array<Profile>): void;

		// ────── Core APIs ──────
		getConfig<T>(clazz: any): T;
		getConfigDescriptor(configurationProxy: Config): ConfigDescriptor;
		setDefaultConfiguration(proxy: T, override: boolean): void;
		stringToObject(str: string, type: Type): Record<string, any>;
		objectToString(object: Record<string, any>): string | null;
		private onClientShutdown(e: ClientShutdown): void;
		sendConfig(): void;
		private static updateProfile(lock: ProfileManager.Lock, profile: ConfigProfile): ConfigProfile;
		private saveConfiguration(lock: ProfileManager.Lock, profile: ConfigProfile, data: ConfigData): void;
		private static buildConfigPatch(profileName: string, patchChanges: Record<string, string>): ConfigPatch;

		// ────── Event Handlers ──────
		private updateRSProfile(): void;
		private onAccountHashChanged(ev: net.runelite.api.events.AccountHashChanged): void;
		private onWorldChanged(ev: net.runelite.api.events.WorldChanged): void;
		private onPlayerChanged(ev: net.runelite.api.events.PlayerChanged): void;
		private onRuneScapeProfileChanged(ev: RuneScapeProfileChanged): void;

		/** Split a config key into [group, (rsprofile.), key] */
		static splitKey(key: string): string[] | null;
	}
}
