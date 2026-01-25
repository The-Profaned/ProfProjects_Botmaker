interface Consumer<T> {
	accept(item: T): void;
	andThen(after: Consumer<T>): Consumer<T>;
}
