declare namespace java.awt {
	class Font {
		constructor(name: string, style: number, size: number);

		static PLAIN: number;
		static BOLD: number;
		static ITALIC: number;

		getName(): string;
		getStyle(): number;
		getSize(): number;
		getFamily(): string;
		isBold(): boolean;
		isItalic(): boolean;
		isPlain(): boolean;

		deriveFont(style: number): Font;
		deriveFont(size: number): Font;
		deriveFont(style: number, size: number): Font;

		toString(): string;
		equals(obj: any): boolean;
	}
}
