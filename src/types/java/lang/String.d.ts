declare namespace java.lang {
	export class String {
		constructor(value?: string);
		
		/**
		 * Converts this string to a new character array.
		 * @returns A newly allocated character array whose length is the length of this string and whose contents are initialized to contain the character sequence represented by this string.
		 */
		toCharArray(): string[];
		
		/**
		 * Encodes this String into a sequence of bytes using the named charset, storing the result into a new byte array.
		 * @param charsetName The name of a supported charset
		 * @returns The resultant byte array
		 * @throws UnsupportedEncodingException If the named charset is not supported
		 */
		getBytes(charsetName: string): number[];
		
		/**
		 * Encodes this String into a sequence of bytes using the platform's default charset, storing the result into a new byte array.
		 * @returns The resultant byte array
		 */
		getBytes(): number[];
		
		/**
		 * Returns the length of this string.
		 * @returns The length of the sequence of characters represented by this object.
		 */
		length(): number;
		
		/**
		 * Returns the char value at the specified index.
		 * @param index The index of the char value
		 * @returns The char value at the specified index of this string
		 * @throws StringIndexOutOfBoundsException If the index argument is negative or not less than the length of this string
		 */
		charAt(index: number): string;
		
		/**
		 * Returns a string that is a substring of this string.
		 * @param beginIndex The beginning index, inclusive
		 * @returns The specified substring
		 */
		substring(beginIndex: number): String;
		
		/**
		 * Returns a string that is a substring of this string.
		 * @param beginIndex The beginning index, inclusive
		 * @param endIndex The ending index, exclusive
		 * @returns The specified substring
		 */
		substring(beginIndex: number, endIndex: number): String;
		
		/**
		 * Compares this string to the specified object.
		 * @param anObject The object to compare this String against
		 * @returns true if the given object represents a String equivalent to this string, false otherwise
		 */
		equals(anObject: any): boolean;
		
		/**
		 * Compares this String to another String, ignoring case considerations.
		 * @param anotherString The String to compare this String against
		 * @returns true if the argument is not null and it represents an equivalent String ignoring case; false otherwise
		 */
		equalsIgnoreCase(anotherString: String): boolean;
		
		/**
		 * Returns a string representation of the object.
		 * @returns A string representation of the object
		 */
		toString(): string;
	}
}
