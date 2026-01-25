/// <reference path="./Runnable.d.ts" />
declare namespace java.lang {
	export class Thread {
		constructor(runnable: Runnable);
		start(): void;
		static sleep(millis: number): void;
	}

	export class Integer {
		static MAX_VALUE: number;
		static BYTES: number;
		static MIN_VALUE: number;
		static SIZE: number;
		static TYPE: string;
		static parseInt(s: string): number;
		static toHexString(i: number): string;
		static toString(i: number): string;
		static valueOf(i: number): Integer;
	}

	export interface Iterable<T> {
		iterator(): Iterator<T>;
		splitIterator(): SplitIterator<T>;
		/** This type might be wrong, it may be
		 *
		 * forEach(action: Consumer<T>): void;
		 */
		forEach(callback: (value: T) => void): void;
	}
}
