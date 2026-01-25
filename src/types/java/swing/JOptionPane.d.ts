/// <reference path="../awt/Component.d.ts" />

declare namespace javax.swing {
	class JOptionPane {
		// Constants
		static YES_NO_OPTION: number;
		static YES_OPTION: number;
		static NO_OPTION: number;

		static WARNING_MESSAGE: number;
		static QUESTION_MESSAGE: number;
		static INFORMATION_MESSAGE: number;
		static ERROR_MESSAGE: number;
		static PLAIN_MESSAGE: number;

		// Static methods
		static showConfirmDialog(
			parentComponent: java.awt.Component | null,
			message: any,
			title?: string,
			optionType?: number,
			messageType?: number,
		): number;

		static showMessageDialog(
			parentComponent: java.awt.Component | null,
			message: any,
			title?: string,
			messageType?: number,
		): void;

		static showInputDialog(
			parentComponent: java.awt.Component | null,
			message: any,
			title?: string,
			messageType?: number,
		): string | null;
	}
}
