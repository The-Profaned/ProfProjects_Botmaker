/// <reference path="./function/BooleanSupplier.d.ts" />

declare namespace java.util {
	export interface Collection<T> {
		size(): number;
		isEmpty(): boolean;
		contains(o: T): boolean;
		iterator(): Iterator<T>;
		toArray(): T[];
		add(e: T): boolean;
		remove(o: T): boolean;
		containsAll(c: Collection<T>): boolean;
		addAll(c: Collection<T>): boolean;
		removeAll(c: Collection<T>): boolean;
		retainAll(c: Collection<T>): boolean;
		clear(): void;
		equals(o: object): boolean;
		hashCode(): number;
		forEach(callback: (value: T) => void): void;
	}

	export interface Iterator<T> {
		hasNext(): boolean;
		next(): T;
		remove(): void;
	}

	export class Collections {
		static disjoint<T>(c1: Collection<T>, c2: Collection<T>): boolean;

		static checkedCollection<T>(c: Collection<T>, type: { new(): T }): Collection<T>

		static checkedList<T>(list: List<T>, type: { new(): T }): List<T>

		static checkedMap<K, V>(m: Map<K, V>, keyType: { new(): K }, valueType: { new(): V }): Map<K, V>

		static checkedSet<T>(s: Set<T>, type: { new(): T }): Set<T>
		static emptyList<T>(): List<T>

		static emptyMap<K, V>(): Map<K, V>
		static emptySet<T>(): Set<T>

		static singletonList<T>(item: T): List<T>

		static singletonMap<K, V>(key: K, value: V): Map<K, V>

		static singletonSet<T>(item: T): Set<T>

		static reverse<T>(list: List<T> | ArrayList<T>): void;
	}

	export interface List<T> implements Collection<T> {
		get(index: number): T;
		set(index: number, element: T): T;
		add(index: number, element: T): void;
		remove(index: number): T;
		indexOf(o: T): number;
		lastIndexOf(o: T): number;
		listIterator(): ListIterator<T>;
		subList(fromIndex: number, toIndex: number): List<T>;

		size(): number;
		isEmpty(): boolean;
		contains(o: T): boolean;
		iterator(): Iterator<T>;
		toArray(): T[];
		add(e: T): boolean;
		remove(o: T): boolean;
		containsAll(c: Collection<T>): boolean;
		addAll(c: Collection<T>): boolean;
		removeAll(c: Collection<T>): boolean;
		retainAll(c: Collection<T>): boolean;
		clear(): void;
		equals(o: object): boolean;
		hashCode(): number;
		forEach(callback: (value: T) => void): void;
	}

	export interface ListIterator<T> extends Iterator<T> {
		hasPrevious(): boolean;
		previous(): T;
		nextIndex(): number;
		previousIndex(): number;
		set(e: T): void;
		add(e: T): void;
	}

	export interface Set<T> extends Collection<E> {
		add(element: T): boolean;
		clear(): void;
		contains(element: T): boolean;
		isEmpty(): boolean;
		remove(element: T): boolean;
		size(): number;
		toArray(): T[];
	}

	export class LinkedList<T> {
		constructor();
		add(element: T): boolean;
		add(index: number, element: T): void;
		clear(): void;
		contains(o: T): boolean;
		get(index: number): T;
		indexOf(o: T): number;
		isEmpty(): boolean;
		remove(index: number): T;
		size(): number;
		toArray(): T[];
		poll(): T;
	}

	export class HashSet<T> implements Collection<T> {
		private items: T[];

		constructor();
		constructor(c: Collection<T>);

		add(item: T): void;

		remove(item: T): void;

		contains(item: T): boolean;

		size(): number;

		toArray(): T[];

		clear(): void;

		size(): number;
		isEmpty(): boolean;
		contains(o: T): boolean;
		iterator(): Iterator<T>;
		toArray(): T[];
		add(e: T): boolean;
		remove(o: T): boolean;
		containsAll(c: Collection<T>): boolean;
		addAll(c: Collection<T>): boolean;
		removeAll(c: Collection<T>): boolean;
		retainAll(c: Collection<T>): boolean;
		clear(): void;
		equals(o: object): boolean;
		hashCode(): number;
		forEach(callback: (value: T) => void): void;
	}

	export class ArrayDeque<E> {
		constructor();

		add(element: E): boolean;
		addFirst(element: E): void;
		addLast(element: E): void;
		clear(): void;
		clone(): ArrayDeque<E>;
		contains(element: Object): boolean;
		isEmpty(): boolean;
		iterator(): Iterator<E>;
		offer(element: E): boolean;
		offerFirst(element: E): boolean;
		offerLast(element: E): boolean;
		peek(): E | null;
		peekFirst(): E | null;
		peekLast(): E | null;
		poll(): E | null;
		pollFirst(): E | null;
		pollLast(): E | null;
		remove(): E;
		removeFirst(): E;
		removeLast(): E;
		size(): number;
	}

	export interface Deque<e> extends Queue<E> {
		addFirst(e: E): void;
		addLast(e: E): void;
		offerFirst(e: E): boolean;
		offerLast(e: E): boolean;
		removeFirst(): E;
		removeLast(): E;
		pollFirst(): E;
		pollLast(): E;
		getFirst(): E;
		getLast(): E;
		peekFirst(): E;
		peekLast(): E;
		removeFirstOccurrence(o: Object): boolean;
		removeLastOccurrence(o: Object): boolean;
		add(e: E): boolean;
		offer(e: E): boolean;
		remove(): E;
		poll(): E;
		element(): E;
		peek(): E;
		push(e: E): void;
		pop(): E;
		iterator(): Iterator<E>;
		descendingIterator(): Iterator<E>;
	}

	export interface Queue<E> extends Collection<E> {
		add(e: E): boolean;
		offer(e: E): boolean;
		remove(): E;
		poll(): E;
		element(): E;
		peek(): E;
	}

	export class ArrayList<E> implements List<E> {
		size(): number;
		isEmpty(): boolean;
		contains(o: E): boolean;
		iterator(): Iterator<E>;
		toArray(): E[];
		add(e: E): boolean;
		remove(o: E): boolean;
		containsAll(c: Collection<E>): boolean;
		addAll(c: Collection<E>): boolean;
		removeAll(c: Collection<E>): boolean;
		retainAll(c: Collection<E>): boolean;
		clear(): void;
		get(index: number): E;
		set(index: number, element: E): E;
		add(index: number, element: E): void;
		remove(index: number): E;
		indexOf(o: E): number;
		lastIndexOf(o: E): number;
		listIterator(): ListIterator<E>;
		listIterator(index: number): ListIterator<E>;
		subList(fromIndex: number, toIndex: number): List<E>;
	}

	export class HashMap<K, V> implements Map<K, V> {
		constructor();
		constructor(initialCapacity: number);
		constructor(initialCapacity: number, loadFactor: number);
		constructor(m: Map<K, V>);

		// Methods from Map<K,V> interface
		size(): number;
		isEmpty(): boolean;
		containsKey(key: K): boolean;
		containsValue(value: V): boolean;
		get(key: K): V | null;
		put(key: K, value: V): V | null;
		remove(key: K): V | null; // Overload 1
		remove(key: K, value: V): boolean; // Overload 2
		putAll(m: Map<K, V>): void;
		clear(): void;
		keySet(): Set<K>;
		values(): Collection<V>;
		entrySet(): Set<Entry<K, V>>;
		equals(o: object): boolean;
		hashCode(): number;
		getOrDefault(key: K, defaultValue: V): V;
		forEach(action: (key: K, value: V) => void): void;
		replaceAll(func: (key: K, value: V) => V): void;
		putIfAbsent(key: K, value: V): V | null;
		replace(key: K, value: V): V | null; // Overload 1
		replace(key: K, oldValue: V, newValue: V): boolean; // Overload 2
		computeIfAbsent(key: K, mappingFunction: (key: K) => V | null): V | null;
		computeIfPresent(key: K, remappingFunction: (key: K, value: V) => V | null): V | null;
		compute(key: K, remappingFunction: (key: K, value: V | null) => V | null): V | null;
		merge(key: K, value: V, remappingFunction: (oldValue: V, newValue: V) => V | null): V | null;

		// HashMap specific methods (e.g., clone)
		clone(): HashMap<K, V>;
	}
}
