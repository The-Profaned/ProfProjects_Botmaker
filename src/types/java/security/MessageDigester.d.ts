declare namespace java.security {
    export class MessageDigester {
        /**
         * Returns the hash digest of a string using the specified algorithm.
         * @param content The input string to hash
         * @param algorithm The algorithm (e.g. "MD5", "SHA-1", "SHA-256")
         * @returns The digest as a hex string
         */
        static digest(content: string, algorithm?: string): string;
            // This is a type declaration file; implementation code is not allowed here.

    }
}