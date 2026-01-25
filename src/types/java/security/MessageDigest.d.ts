declare namespace java.security {
    export class MessageDigest {
        /**
         * Returns a MessageDigest object that implements the specified digest algorithm.
         * @param algorithm The name of the algorithm requested (e.g., "MD5", "SHA-1", "SHA-256")
         * @returns A MessageDigest object implementing the specified algorithm
         * @throws NoSuchAlgorithmException if the algorithm is not available
         */
        static getInstance(algorithm: string): MessageDigest;

        /**
         * Updates the digest using the specified byte.
         * @param input The byte with which to update the digest
         */
        update(input: number): void;

        /**
         * Updates the digest using the specified array of bytes.
         * @param input The array of bytes with which to update the digest
         */
        update(input: number[]): void;

        /**
         * Updates the digest using the specified array of bytes, starting at the specified offset.
         * @param input The array of bytes
         * @param offset The offset to start from in the array of bytes
         * @param len The number of bytes to use, starting at offset
         */
        update(input: number[], offset: number, len: number): void;

        /**
         * Updates the digest using the specified ByteBuffer.
         * @param input The ByteBuffer with which to update the digest
         */
        update(input: any): void; // ByteBuffer type would be defined elsewhere

        /**
         * Completes the hash computation by performing final operations such as padding.
         * @returns The array of bytes for the resulting hash value
         */
        digest(): number[];

        /**
         * Completes the hash computation by performing final operations such as padding.
         * @param input The input to be padded before the final operations
         * @returns The array of bytes for the resulting hash value
         */
        digest(input: number[]): number[];

        /**
         * Completes the hash computation by performing final operations such as padding.
         * @param input The input to be padded before the final operations
         * @param offset The offset to start from in the input array
         * @param len The number of bytes to use, starting at offset
         * @returns The array of bytes for the resulting hash value
         */
        digest(input: number[], offset: number, len: number): number[];

        /**
         * Returns a string that identifies the algorithm, independent of implementation details.
         * @returns The name of the algorithm
         */
        getAlgorithm(): string;

        /**
         * Returns the length of the digest in bytes, or 0 if this operation is not supported.
         * @returns The length of the digest in bytes, or 0 if this operation is not supported
         */
        getDigestLength(): number;

        /**
         * Resets the digest for further use.
         */
        reset(): void;

        /**
         * Returns a clone if the implementation is cloneable.
         * @returns A clone if the implementation is cloneable
         * @throws CloneNotSupportedException if the implementation is not cloneable
         */
        clone(): MessageDigest;

        /**
         * Returns a string representation of this message digest object.
         * @returns A string representation of this object
         */
        toString(): string;
    }
}