declare namespace java.io {
	export class FileWriter {
		/**
		 * append: true for append, false for overwrite
		 */
		constructor(filePath: string, append: boolean);

		write(data: string): void;
		close(): void;
	}
}
