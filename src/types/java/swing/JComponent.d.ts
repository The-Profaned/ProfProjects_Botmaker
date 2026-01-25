/// <reference path="../awt/Component.d.ts" />
/// <reference path="../awt/Container.d.ts" />
/// <reference path="../awt/Dimension.d.ts" />
/// <reference path="../awt/Font.d.ts" />
/// <reference path="../awt/Color.d.ts" />
/// <reference path="../awt/Graphics2D.d.ts" />
/// <reference path="../awt/Insets.d.ts" />

declare namespace javax.swing {
	export abstract class JComponent extends java.awt.Container {
		// Alignment constants
		static LEFT_ALIGNMENT: number;
		static CENTER_ALIGNMENT: number;
		static RIGHT_ALIGNMENT: number;
		static TOP_ALIGNMENT: number;
		static BOTTOM_ALIGNMENT: number;

		// Size and layout methods
		setPreferredSize(dimension: java.awt.Dimension): void;
		getPreferredSize(): java.awt.Dimension;
		setMinimumSize(dimension: java.awt.Dimension): void;
		getMinimumSize(): java.awt.Dimension;
		setMaximumSize(dimension: java.awt.Dimension): void;
		getMaximumSize(): java.awt.Dimension;
		setSize(width: number, height: number): void;
		setSize(dimension: java.awt.Dimension): void;
		getSize(): java.awt.Dimension;
		getWidth(): number;
		getHeight(): number;

		// Alignment methods
		setAlignmentX(alignment: number): void;
		getAlignmentX(): number;
		setAlignmentY(alignment: number): void;
		getAlignmentY(): number;

		// Appearance methods
		setFont(font: java.awt.Font): void;
		getFont(): java.awt.Font;
		setForeground(color: java.awt.Color): void;
		getForeground(): java.awt.Color;
		setBackground(color: java.awt.Color): void;
		getBackground(): java.awt.Color;
		setOpaque(isOpaque: boolean): void;
		isOpaque(): boolean;

		// Border and insets
		setBorder(border: any): void;
		getBorder(): any;
		getInsets(): java.awt.Insets;

		// Painting methods
		paint(g: java.awt.Graphics2D): void;
		paintComponent(g: java.awt.Graphics2D): void;
		paintBorder(g: java.awt.Graphics2D): void;
		paintChildren(g: java.awt.Graphics2D): void;
		repaint(): void;
		repaint(x: number, y: number, width: number, height: number): void;

		// Visibility and state
		setVisible(visible: boolean): void;
		isVisible(): boolean;
		setEnabled(enabled: boolean): void;
		isEnabled(): boolean;

		// Tooltip
		setToolTipText(text: string): void;
		getToolTipText(): string;

		// Layout validation
		revalidate(): void;
		validate(): void;
		invalidate(): void;

		// Focus methods
		requestFocus(): void;
		requestFocusInWindow(): boolean;
		isFocusOwner(): boolean;

		// Client properties
		putClientProperty(key: any, value: any): void;
		getClientProperty(key: any): any;
	}
}

type JComponent = javax.swing.JComponent;
