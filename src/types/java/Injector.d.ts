interface Injector {
	getInstance<T>(javaClass: Clazz<T> | null): T;
}

interface Clazz<T> extends Function {
	new (...args: any[]): T;
}
