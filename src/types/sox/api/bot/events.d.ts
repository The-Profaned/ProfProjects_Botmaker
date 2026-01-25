/// <reference path="../../../runelite/index.d.ts" />

declare namespace bot {
	/**
	 * Interface for handling game events
	 * Extends RuneLite's EventBus to provide event subscription capabilities
	 */
	interface events extends net.runelite.client.eventbus.EventBus {
		/**
		 * Posts an event to the event bus, notifying all registered subscribers.
		 * @param event - The event object to be posted.
		 */
		post: (event: Object) => void;

		/**
		 * Registers a subscriber function to listen for events of the specified class.
		 * @param clazz - The class of the event to subscribe to.
		 * @param subFn - The subscriber function to be called when the event is posted.
		 * @param priority - The priority of the subscriber; higher values are called first.
		 * @returns The created Subscriber instance.
		 */
		register: (clazz: Class, subFn: Function, priority: number) => net.runelite.client.eventbus.Subscriber;

		/**
		 * Unregisters a previously registered subscriber function.
		 * @param object - The subscriber function to be unregistered.
		 */
		unregister: (object: Function) => void;

		/**
		 * Unregisters all event handlers that have been registered
		 * Useful for cleaning up event listeners when terminating a bot
		 */
		unregisterAll: () => void;
	}
}
