/// <reference path="../runelite/index.d.ts" />

/**
 * Provides methods to schedule and invoke functions on the client thread.
 */
declare const clientThread: {
	/**
	 * Schedules the given BooleanSupplier to be invoked on the client thread.
	 * @param r - A Java BooleanSupplier to be executed.
	 */
	invoke: (r: java.util.func_tion.BooleanSupplier) => void;

	/**
	 * Schedules the given Runnable to be invoked at the end of the current tick on the client thread.
	 * @param r - A Java Runnable to be executed.
	 */
	invokeAtTickEnd: (r: java.lang.Runnable) => void;

	/**
	 * Schedules the given BooleanSupplier to be invoked later on the client thread.
	 * @param r - A Java BooleanSupplier to be executed.
	 */
	invokeLater: (r: java.util.func_tion.BooleanSupplier) => void;
};
