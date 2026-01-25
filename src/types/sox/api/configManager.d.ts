/// <reference path="../runelite/index.d.ts" />



/**
 * The configManager provides methods to get, set, and manage configuration values and profiles.
 */
declare const configManager: {

    /**
     * Constants for RuneScape profiles
     */
    RSPROFILE_DISPLAY_NAME: string;
    RSPROFILE_GROUP: string;
    RSPROFILE_TYPE: string;

    /**
     * Retrieves a configuration value as a string or object.
     * @param groupName - The configuration group name.
     * @param key - The configuration key.
     * @returns The configuration value as a string or null.
     * @overload
     */
    getConfiguration: {
        /**
        * Retrieves a configuration value as an object of the specified type.
        * @param groupName - The configuration group name.
        * @param key - The configuration key.
        * @returns The configuration value as an object.
        */
        (groupName: string, key: string): string | null;
        /**
         * Retrieves a configuration value as an object of the specified type.
         * @param groupName - The configuration group name.
         * @param key - The configuration key.
         * @param clazz - The class type to deserialize the value into.
         * @returns The configuration value as an object.
         * @overload
         */
        (groupName: string, key: string, clazz: Type): object;
        /**
         * Retrieves a configuration value for a specific profile as an object of the specified type.
         * @param groupName - The configuration group name.
         * @param profile - The profile name.
         * @param key - The configuration key.
         * @param type - The class type to deserialize the value into.
         * @returns The configuration value as an object.
         * @overload
         */
        (groupName: string, profile: string, key: string, type: Type): object;
    };

    /**
     * Sets a configuration value.
     * @param groupName - The configuration group name.
     * @param key - The configuration key.
     * @param value - The value to set.
     * @overload
     */
    setConfiguration: {
        (groupName: string, key: string, value: object | boolean | string): void;
        /**
         * Sets a configuration value for a specific profile.
         * @param groupName - The configuration group name.
         * @param profile - The profile name.
         * @param key - The configuration key.
         * @param value - The value to set.
         * @overload
         */
        (groupName: string, profile: string, key: string, value: object | string | boolean): void;
    };

    /**
     * Retrieves a RuneScape profile-specific configuration value as a string or object.
     * @param groupName - The configuration group name.
     * @param key - The configuration key.
     * @returns The configuration value as a string or null.
     * @overload
     */
    getRSProfileConfiguration: {
        (groupName: string, key: string): string | null;
        /**
         * Retrieves a RuneScape profile-specific configuration value as an object of the specified type.
         * @param groupName - The configuration group name.
         * @param key - The configuration key.
         * @param clazz - The class type to deserialize the value into.
         * @returns The configuration value as an object.
         * @overload
         */
        (groupName: string, key: string, clazz: Type): object;
    };

    /**
     * Sets a RuneScape profile-specific configuration value.
     * @param groupName - The configuration group name.
     * @param key - The configuration key.
     * @param value - The value to set.
     */
    setRSProfileConfiguration: (groupName: string, key: string, value: object) => void;

    /**
     * Retrieves the configuration for the specified class.
     * @param clazz - The class to retrieve configuration for.
     * @returns The configuration object.
     */
    getConfig: (clazz: Class) => object;

    /**
     * Retrieves the configuration descriptor for the given configuration proxy.
     * @param configurationProxy - The configuration proxy object.
     * @returns The configuration descriptor.
     */
    getConfigDescriptor: (configurationProxy: Config) => ConfigDescriptor;

    /**
     * Retrieves a list of configuration keys with the specified prefix.
     * @param prefix - The prefix to filter configuration keys.
     * @returns A list of configuration keys.
     */
    getConfigurationKeys: (prefix: string) => List;

    /**
     * Retrieves the current configuration profile.
     * @returns The current configuration profile.
     */
    getProfile: () => ConfigProfile;

    /**
     * Retrieves the RuneScape profile key.
     * @returns The RuneScape profile key as a string.
     */
    getRSProfileKey: () => string;

    /**
     * Retrieves a list of RuneScape profile configuration keys for the specified group, profile, and key prefix.
     * @param group - The configuration group name.
     * @param profile - The profile name.
     * @param keyPrefix - The key prefix to filter configuration keys.
     * @returns A list of configuration keys.
     */
    getRSProfileConfigurationKeys: (group: string, profile: string, keyPrefix: string) => List;

    /**
     * Retrieves a list of all RuneScape profiles.
     * @returns A list of RuneScape profiles.
     */
    getRSProfiles: () => List;

    /**
     * Constructs the full configuration key for the specified group, profile, and key.
     * @param groupName - The configuration group name.
     * @param profile - The profile name.
     * @param key - The configuration key.
     * @returns The full configuration key as a string.
     */
    getWholeKey: (groupName: string, profile: string, key: string) => string;

    /**
     * Imports and migrates configuration from a file to the target profile.
     * @param lock - The profile manager lock.
     * @param from - The source file to import from.
     * @param targetProfile - The target configuration profile.
     */
    importAndMigrate: (lock: ProfileManager.Lock, from: File, targetProfile: ConfigProfile) => void;

    /**
     * Indicates whether the configuration manager is currently loading.
     */
    isLoading: () => void;

    /**
     * Registers a callback to be invoked when a session is closed.
     * @param sessionClose - The session close event handler.
     */
    onSessionClose: (sessionClose: SessionClose) => void;

    /**
     * Registers a callback to be invoked when a session is opened.
     * @param sessionOpen - The session open event handler.
     */
    onSessionOpen: (sessionOpen: SessionOpen) => void;

    /**
     * Renames the specified configuration profile.
     * @param profile - The configuration profile to rename.
     * @param name - The new name for the profile.
     */
    renameProfile: (profile: ConfigProfile, name: string) => void;

    /**
     * Sends the current configuration to the server or other destination.
     */
    sendConfig: () => void;

    /**
     * Sets the default configuration for the specified proxy.
     * @param proxy - The configuration proxy object.
     * @param override - Whether to override existing values.
     */
    setDefaultConfiguration: (proxy: Config, override: boolean) => void;

    /**
     * Switches to the specified configuration profile.
     * @param profile - The configuration profile to switch to.
     */
    switchProfile: (profile: ConfigProfile) => void;

    /**
     * Toggles synchronization for the specified profile.
     * @param profile - The configuration profile.
     * @param sync - Whether to enable or disable synchronization.
     */
    toggleSync: (profile: ConfigProfile, sync: boolean) => void;

    /**
     * Unsets a configuration value.
     * @param groupName - The configuration group name.
     * @param key - The configuration key.
     * @overload
     */
    unsetConfiguration: {
        (groupName: string, key: string): void;
        /**
         * Unsets a configuration value for a specific profile.
         * @param groupName - The configuration group name.
         * @param profile - The profile name.
         * @param key - The configuration key.
         * @overload
         */
        (groupName: string, profile: string, key: string): void;
    };

    /**
     * Unsets a RuneScape profile-specific configuration value.
     * @param groupName - The configuration group name.
     * @param key - The configuration key.
     */
    unsetRSProfileConfiguration: (groupName: string, key: string) => void;
};
