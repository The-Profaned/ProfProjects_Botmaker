class JavaImporter {
	public modules: any[];

	constructor(...modules: any[]) {
		this.modules = modules;
	}
}

class JPanel {
	constructor(layout?: any);
	setOpaque(opaque: boolean): void;
	setLayout(layout: any): void;
	add(component: any, position?: string): void;
	remove(component: any): void;
	getComponents(): any[];
	getComponentCount(): number;
	getPreferredSize(): Dimension;
	setPreferredSize(size: Dimension): void;
	getMinimumSize(): Dimension;
	getMaximumSize(): Dimension;
	setBackground(color: any): void;
	setForeground(color: any): void;
	setBorder(border: any): void;
	getBorder(): any;
	repaint(): void;
	revalidate(): void;
	validate(): void;
	addMouseListener(listener: any): void;
	removeMouseListener(listener: any): void;
	addKeyListener(listener: any): void;
	removeKeyListener(listener: any): void;
}

/** Specifies window close behavior:
 * - `0`: DO_NOTHING_ON_CLOSE - The window ignores close requests.
 * - `1`: HIDE_ON_CLOSE - The window is hidden when closed.
 * - `2`: DISPOSE_ON_CLOSE - The window is closed and resources are released.
 * - `3`: EXIT_ON_CLOSE - The application exits when the window is closed.
 */

type JFrameCloseOperation = 0 | 1 | 2 | 3;

class JFrame {
	constructor(title?: string);
	setTitle(title: string): void;
	getTitle(): string;
	setSize(width: number, height: number): void;
	setDefaultCloseOperation(operation: JFrameCloseOperation): void;
	setVisible(visible: boolean): void;
	add(component: any, position?: string): void;
	setJMenuBar(menuBar: JMenuBar): void;
	getJMenuBar(): JMenuBar;
	pack(): void;
	setLocation(x: number, y: number): void;
	setLocationRelativeTo(component: any): void;
	setContentPane(contentPane: JPanel): void;
	getContentPane(): JPanel;
	setResizable(resizable: boolean): void;
	repaint(): void;
}

class BorderLayout {
	static NORTH: string = 'North';
	static SOUTH: string = 'South';
	static EAST: string = 'East';
	static WEST: string = 'West';
	static CENTER: string = 'Center';

	constructor(hgap?: number, vgap?: number);
	getHgap(): number;
	setHgap(hgap: number): void;
	getVgap(): number;
	setVgap(vgap: number): void;
}

class BoxLayout {
	static X_AXIS: number = 0;
	static Y_AXIS: number = 1;
	static LINE_AXIS: number = 2;
	static PAGE_AXIS: number = 3;

	constructor(target: JPanel, axis: number);
}

class FlowLayout {
	static LEFT: number = 0;
	static CENTER: number = 1;
	static RIGHT: number = 2;
	static LEADING: number = 3;
	static TRAILING: number = 4;

	constructor(alignment?: number, hgap?: number, vgap?: number);
	getHgap(): number;
	setHgap(hgap: number): void;
	getVgap(): number;
	setVgap(vgap: number): void;
}

class GradientPaint {
	constructor(x1: number, y1: number, color1: Color, x2: number, y2: number, color2: Color);
}

class Color {
	constructor(r: number, g: number, b: number);
	static PINK: Color;
	static GRAY: Color;
	static WHITE: Color;
	static BLACK: Color;
	static BLUE: Color;
	static GREEN: Color;
	static RED: Color;
	static LIGHT_GRAY: Color;
	static DARK_GRAY: Color;
	static ORANGE: Color;
	static CYAN: Color;
	static YELLOW: Color;
	static MAGENTA: Color;
}

class ActionListener {
	constructor(callback: (event: any) => void);
	actionPerformed(event: any): void;
}

class FocusListener {
	constructor(options: { focusGained?: (event: any) => void; focusLost?: (event: any) => void });
	focusGained(event: any): void;
	focusLost(event: any): void;
}

class FocusAdapter implements FocusListener {
	private focusGainedCallback?: (event: any) => void;
	private focusLostCallback?: (event: any) => void;

	constructor(options: { focusGained?: (event: any) => void; focusLost?: (event: any) => void }) {
		this.focusGainedCallback = options.focusGained;
		this.focusLostCallback = options.focusLost;
	}

	focusGained(event: any): void {
		if (this.focusGainedCallback) {
			this.focusGainedCallback(event);
		}
	}

	focusLost(event: any): void {
		if (this.focusLostCallback) {
			this.focusLostCallback(event);
		}
	}
}

class JComponent {
	static LEFT_ALIGNMENT: number = 0.0;
	static CENTER_ALIGNMENT: number = 0.5;
	static RIGHT_ALIGNMENT: number = 1.0;

	setAlignmentX(alignment: number): void;
	getAlignmentX(): number;
	setAlignmentY(alignment: number): void;
	getAlignmentY(): number;
}

class MouseListener {
	constructor(options: {
		mouseClicked?: (event: any) => void;
		mousePressed?: (event: any) => void;
		mouseReleased?: (event: any) => void;
		mouseEntered?: (event: any) => void;
		mouseExited?: (event: any) => void;
	});
}

class ItemListener {
	constructor(callback: (event: any) => void);
	itemStateChanged(event: any): void;
}

class ChangeListener {
	constructor(callback: (event: any) => void);
	stateChanged(event: any): void;
}

class JButton {
	constructor(label: string);

	setText(label: string): void;
	getText(): string;

	setIcon(icon: Icon): void;
	getIcon(): Icon | null;

	setEnabled(enabled: boolean): void;
	isEnabled(): boolean;

	addActionListener(listener: ActionListener): void;
	removeActionListener(listener: ActionListener): void;
	getActionListeners(): ActionListener[];

	addFocusListener(listener: FocusListener): void;
	removeFocusListener(listener: FocusListener): void;
	getFocusListeners(): FocusListener[];

	setToolTipText(text: string): void;
	getToolTipText(): string;

	setMnemonic(mnemonic: number): void;
	getMnemonic(): number;

	setBackground(color: Color): void;
	getBackground(): Color;
}

class JLabel extends JComponent {
	constructor(text: string);

	setText(text: string): void;
	getText(): string;

	setIcon(icon: Icon): void;
	getIcon(): Icon | null;

	setHorizontalAlignment(alignment: number): void;
	getHorizontalAlignment(): number;
	setVerticalAlignment(alignment: number): void;
	getVerticalAlignment(): number;

	setToolTipText(text: string): void;
	getToolTipText(): string;

	/** Sets the horizontal alignment within its parent. */
	setAlignmentX(alignment: number): void;
	/** Gets the horizontal alignment within its parent. */
	getAlignmentX(): number;
	/** Sets the vertical alignment within its parent. */
	setAlignmentY(alignment: number): void;
	/** Gets the vertical alignment within its parent. */
	getAlignmentY(): number;
}

class JTextField {
	constructor(text?: string, columns?: number);

	setText(text: string): void;
	getText(): string;

	setEnabled(enabled: boolean): void;
	isEnabled(): boolean;

	setMaximumSize(size: Dimension): void;

	addActionListener(listener: ActionListener): void;
	removeActionListener(listener: ActionListener): void;
	addFocusListener(listener: FocusListener): void;
	removeFocusListener(listener: FocusListener): void;

	getColumns(): number;
	setColumns(columns: number): void;

	getCaretPosition(): number;
	setCaretPosition(position: number): void;
	getSelectionStart(): number;
	setSelectionStart(index: number): void;
	getSelectionEnd(): number;
	setSelectionEnd(index: number): void;
}

class JCheckBox {
	constructor(label: string, selected?: boolean);

	getText(): string;
	setText(text: string): void;

	setSelected(selected: boolean): void;
	isSelected(): boolean;

	setEnabled(enabled: boolean): void;
	isEnabled(): boolean;

	addActionListener(listener: ActionListener): void;
	removeActionListener(listener: ActionListener): void;
	addFocusListener(listener: FocusListener): void;
	removeFocusListener(listener: FocusListener): void;
}

class JComboBox {
	constructor(items: string[]);

	setSelectedItem(item: string): void;
	getSelectedItem(): string;
	setSelectedIndex(index: number): void;
	getSelectedIndex(): number;

	setEnabled(enabled: boolean): void;
	isEnabled(): boolean;

	addActionListener(listener: ActionListener): void;
	removeActionListener(listener: ActionListener): void;
	addFocusListener(listener: FocusListener): void;
	removeFocusListener(listener: FocusListener): void;

	addItem(item: string): void;
	removeItem(item: string): void;
	removeAllItems(): void;
	getItemCount(): number;
	getItemAt(index: number): string;
}

class JSlider {
	constructor(orientation: number, min: number, max: number, value: number);

	setValue(value: number): void;
	getValue(): number;
	setMinimum(min: number): void;
	getMinimum(): number;
	setMaximum(max: number): void;
	getMaximum(): number;

	setMajorTickSpacing(tickSpacing: number): void;
	setMinorTickSpacing(tickSpacing: number): void;
	setPaintTicks(flag: boolean): void;
	setPaintLabels(flag: boolean): void;
	setSnapToTicks(flag: boolean): void;

	setEnabled(enabled: boolean): void;
	isEnabled(): boolean;

	addChangeListener(listener: (event: any) => void): void;
	removeChangeListener(listener: (event: any) => void): void;
	addFocusListener(listener: FocusListener): void;
	removeFocusListener(listener: FocusListener): void;
}
class Dimension {
	constructor(width: number, height: number);

	getWidth(): number;
	getHeight(): number;
	setWidth(width: number): void;
	setHeight(height: number): void;
}

class JMenuBar {
	constructor();

	add(menu: JMenu): void;
	remove(menu: JMenu): void;
	getMenu(index: number): JMenu;
	getMenuCount(): number;
}

class JMenu {
	constructor(label: string);

	add(item: JMenuItem): void;
	remove(item: JMenuItem): void;
	getItem(index: number): JMenuItem;
	getItemCount(): number;

	addSeparator(): void;
	setMnemonic(key: number): void;
}

class JMenuItem {
	constructor(label: string);

	addActionListener(listener: ActionListener): void;
	removeActionListener(listener: ActionListener): void;

	setEnabled(enabled: boolean): void;
	isEnabled(): boolean;

	setMnemonic(key: number): void;
}

class JList {
	constructor(items: string[]);

	getSelectedValue(): string;
	getSelectedValuesList(): string[];

	setSelectionMode(mode: number): void;
	getSelectionMode(): number;

	addListSelectionListener(listener: (event: any) => void): void;
	removeListSelectionListener(listener: (event: any) => void): void;

	setCellRenderer(renderer: (value: any, index: number, isSelected: boolean, cellHasFocus: boolean) => any): void;
	getCellRenderer(): any;

	setModel(model: any): void;
	getModel(): any;

	setEnabled(enabled: boolean): void;
	isEnabled(): boolean;
}

class JScrollPane {
	constructor(component: any);

	setViewportView(component: any): void;
	getViewportView(): any;

	setVerticalScrollBarPolicy(policy: number): void;
	getVerticalScrollBarPolicy(): number;
	setHorizontalScrollBarPolicy(policy: number): void;
	getHorizontalScrollBarPolicy(): number;

	getVerticalScrollBar(): any;
	getHorizontalScrollBar(): any;
}

class JTabbedPane {
	constructor();

	addTab(title: string, component: any): void;
	removeTabAt(index: number): void;

	setSelectedIndex(index: number): void;
	getSelectedIndex(): number;

	getTabCount(): number;
	getTitleAt(index: number): string;
	setTitleAt(index: number, title: string): void;

	addChangeListener(listener: (event: any) => void): void;
	removeChangeListener(listener: (event: any) => void): void;
}

class JProgressBar {
	constructor();

	setMinimum(min: number): void;
	getMinimum(): number;
	setMaximum(max: number): void;
	getMaximum(): number;
	setValue(value: number): void;
	getValue(): number;

	setStringPainted(painted: boolean): void;
	isStringPainted(): boolean;
	setString(text: string): void;

	setIndeterminate(indeterminate: boolean): void;
	isIndeterminate(): boolean;
}
class JToolBar {
	constructor();

	add(component: any): void;
	remove(component: any): void;

	setFloatable(floatable: boolean): void;
	isFloatable(): boolean;

	addSeparator(size?: Dimension): void;

	setOrientation(orientation: number): void;
	getOrientation(): number;
}

function CustomPanel(): JPanel;

const JFrame_DO_NOTHING_ON_CLOSE: 0;
const JFrame_HIDE_ON_CLOSE: 1;
const JFrame_DISPOSE_ON_CLOSE: 2;
const JFrame_EXIT_ON_CLOSE: 3;

/* Remove soon */
function createToggleboxDropdownPanel(options: {
	buttonLabel: string;
	variableNames?: string;
	dropdownItems: string[];
	layout?: FlowLayout | BorderLayout;
	position?: string;
	hasVariable?: boolean;
}): JPanel;

const botInfo: {
	botName: string;
	version: string;
};
