declare namespace java {
	namespace lang {
		export class Object {
			constructor();
			equals(obj: Record<string, any>): boolean;
			hashCode(): number;
			toString(): string;
			getClass(): java.lang.Class<any>;
			notify(): void;
			notifyAll(): void;
			wait(timeout?: number, nanos?: number): void;
		}

		export class Class<T = any> extends Object {
			asSubclass<U>(clazz: Class<U>): Class<U>;
			cast<U>(obj: any): U;
			desiredAssertionStatus(): boolean;
			static forName(className: string): Class<any>;
			static forName(name: string, initialize: boolean, loader: any): Class<any>;
			getAnnotatedInterfaces(): any[];
			getAnnotatedSuperclass(): any;
			getAnnotation<A extends any>(annotationClass: Class<A>): A | null;
			getAnnotations(): any[];
			getAnnotationsByType<A extends any>(annotationClass: Class<A>): A[];
			getCanonicalName(): string;
			getClasses(): Class<any>[];
			getClassLoader(): any;
			getComponentType(): Class<any>;
			getConstructor<U>(...parameterTypes: Class<any>[]): any;
			getConstructors(): any[];
			getDeclaredAnnotation<A extends any>(annotationClass: Class<A>): A | null;
			getDeclaredAnnotations(): any[];
			getDeclaredAnnotationsByType<A extends any>(annotationClass: Class<A>): A[];
			getDeclaredClasses(): Class<any>[];
			getDeclaredConstructor<U>(...parameterTypes: Class<any>[]): any;
			getDeclaredConstructors(): any[];
			getDeclaredField(name: string): java.lang.reflect.Field;
			getDeclaredFields(): java.lang.reflect.Field[];
			getDeclaredMethod(name: string, ...parameterTypes: Class<any>[]): java.lang.reflect.Method;
			getDeclaredMethods(): java.lang.reflect.Method[];
			getDeclaringClass(): Class<any>;
			getEnclosingClass(): Class<any>;
			getEnclosingConstructor(): any;
			getEnclosingMethod(): java.lang.reflect.Method;
			getEnumConstants<U>(): U[] | null;
			getField(name: string): java.lang.reflect.Field;
			getFields(): java.lang.reflect.Field[];
			getGenericInterfaces(): any[];
			getGenericSuperclass(): any;
			getInterfaces(): Class<any>[];
			getMethod(name: string, ...parameterTypes: Class<any>[]): java.lang.reflect.Method;
			getMethods(): java.lang.reflect.Method[];
			getModifiers(): number;
			getName(): string;
			getPackage(): any;
			getProtectionDomain(): any;
			getResource(name: string): any;
			getResourceAsStream(name: string): any;
			getSigners(): any[];
			getSimpleName(): string;
			getSuperclass<U>(): Class<U>;
			getTypeName(): string;
			getTypeParameters(): any[];
			isAnnotation(): boolean;
			isAnnotationPresent(annotationClass: Class<any>): boolean;
			isAnonymousClass(): boolean;
			isArray(): boolean;
			isAssignableFrom(cls: Class<any>): boolean;
			isEnum(): boolean;
			isInstance(obj: any): boolean;
			isInterface(): boolean;
			isLocalClass(): boolean;
			isMemberClass(): boolean;
			isPrimitive(): boolean;
			isSynthetic(): boolean;
			newInstance<U>(): U;
			toGenericString(): string;
			toString(): string;
		}

		export namespace reflect {
			export class Field extends java.lang.Object {
				get(obj: any): any;
				getBoolean(obj: any): boolean;
				getByte(obj: any): number;
				getChar(obj: any): string;
				getDouble(obj: any): number;
				getFloat(obj: any): number;
				getInt(obj: any): number;
				getLong(obj: any): number;
				getShort(obj: any): number;
				set(obj: any, value: any): void;
				setBoolean(obj: any, value: boolean): void;
				setByte(obj: any, value: number): void;
				setChar(obj: any, value: string): void;
				setDouble(obj: any, value: number): void;
				setFloat(obj: any, value: number): void;
				setInt(obj: any, value: number): void;
				setLong(obj: any, value: number): void;
				setShort(obj: any, value: number): void;
				getDeclaringClass(): java.lang.Class<any>;
				getName(): string;
				getType(): java.lang.Class<any>;
				getModifiers(): number;
				isAccessible(): boolean;
				setAccessible(flag: boolean): void;
				isEnumConstant(): boolean;
				isSynthetic(): boolean;
				getAnnotation<A extends any>(annotationClass: java.lang.Class<A>): A | null;
				getAnnotations(): any[];
				getDeclaredAnnotations(): any[];
				getGenericType(): any;
				toString(): string;
			}

			export class Method extends java.lang.Object {
				invoke(obj: any, ...args: any[]): any;
				getDeclaringClass(): java.lang.Class<any>;
				getName(): string;
				getParameterTypes(): java.lang.Class<any>[];
				getReturnType(): java.lang.Class<any>;
				getModifiers(): number;
				getParameterCount(): number;
				isAccessible(): boolean;
				setAccessible(flag: boolean): void;
				isVarArgs(): boolean;
				isSynthetic(): boolean;
				isBridge(): boolean;
				isDefault(): boolean;
				getGenericParameterTypes(): any[];
				getGenericReturnType(): any;
				getGenericExceptionTypes(): any[];
				getExceptionTypes(): java.lang.Class<any>[];
				getAnnotation<A extends any>(annotationClass: java.lang.Class<A>): A | null;
				getAnnotations(): any[];
				getDeclaredAnnotations(): any[];
				getParameterAnnotations(): any[][];
				toString(): string;
				toGenericString(): string;
			}
		}
	}
}
