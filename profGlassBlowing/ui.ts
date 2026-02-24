import { GlassMakeMode } from './State Manager/constants.js';
import type { GlassMakeState } from './State Manager/script-state.js';

interface GlassStateWithUI extends GlassMakeState {
	uiCompleted?: boolean;
}

let startFrame: javax.swing.JFrame | null = null;

const disposeStartFrame = (): void => {
	if (!startFrame) return;
	startFrame.dispose();
	startFrame = null;
};

const getModeLabel = (mode: GlassMakeMode): string => {
	if (mode === GlassMakeMode.CRAFT_PLUS_SPORES) return 'Craft + Spores';
	if (mode === GlassMakeMode.SPORES_ONLY) return 'Spores only';
	return 'Craft Only';
};

const createStartFrame = (state: GlassStateWithUI): javax.swing.JFrame => {
	const frame = new javax.swing.JFrame('profGlassBlowing - Start Options');
	frame.setDefaultCloseOperation(
		javax.swing.WindowConstants.DISPOSE_ON_CLOSE,
	);
	frame.setLayout(new java.awt.BorderLayout(10, 10));

	const mainPanel = new javax.swing.JPanel();
	mainPanel.setLayout(
		new javax.swing.BoxLayout(mainPanel, javax.swing.BoxLayout.Y_AXIS),
	);
	mainPanel.setBorder(
		javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15),
	);

	const instructions = new javax.swing.JLabel('Choose your mode:');
	instructions.setFont(
		new java.awt.Font('SansSerif', java.awt.Font.BOLD, 14),
	);
	mainPanel.add(instructions);
	mainPanel.add(javax.swing.Box.createVerticalStrut(8));

	mainPanel.add(javax.swing.Box.createVerticalStrut(10));

	const craftOnlyCheckbox = new javax.swing.JCheckBox('Craft Only', true);
	const craftAndSporesCheckbox = new javax.swing.JCheckBox(
		'Craft + Spores',
		false,
	);
	const sporesOnlyCheckbox = new javax.swing.JCheckBox('Spores Only', false);

	const applySelection = (mode: GlassMakeMode): void => {
		state.selectedMode = mode;
	};

	craftOnlyCheckbox.addActionListener(() => {
		if (!craftOnlyCheckbox.isSelected()) return;
		craftAndSporesCheckbox.setSelected(false);
		sporesOnlyCheckbox.setSelected(false);
		applySelection(GlassMakeMode.CRAFT_ONLY);
	});

	craftAndSporesCheckbox.addActionListener(() => {
		if (!craftAndSporesCheckbox.isSelected()) return;
		craftOnlyCheckbox.setSelected(false);
		sporesOnlyCheckbox.setSelected(false);
		applySelection(GlassMakeMode.CRAFT_PLUS_SPORES);
	});

	sporesOnlyCheckbox.addActionListener(() => {
		if (!sporesOnlyCheckbox.isSelected()) return;
		craftOnlyCheckbox.setSelected(false);
		craftAndSporesCheckbox.setSelected(false);
		applySelection(GlassMakeMode.SPORES_ONLY);
	});

	mainPanel.add(craftOnlyCheckbox);
	mainPanel.add(craftAndSporesCheckbox);
	mainPanel.add(sporesOnlyCheckbox);

	const lockWarning = new javax.swing.JLabel(
		'For crafting modes, lock Glassblowing pipe (+ Seaweed spore for Craft + Spores).',
	);
	lockWarning.setFont(
		new java.awt.Font('SansSerif', java.awt.Font.PLAIN, 12),
	);
	mainPanel.add(javax.swing.Box.createVerticalStrut(8));
	mainPanel.add(lockWarning);
	mainPanel.add(javax.swing.Box.createVerticalStrut(15));

	const startButton = new javax.swing.JButton('Start Script');
	startButton.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 12));
	startButton.setPreferredSize(new java.awt.Dimension(150, 40));
	startButton.addActionListener(() => {
		if (
			!craftOnlyCheckbox.isSelected() &&
			!craftAndSporesCheckbox.isSelected() &&
			!sporesOnlyCheckbox.isSelected()
		) {
			log.print('[profGlassBlowing] Select a mode before starting.');
			return;
		}

		state.uiCompleted = true;
		const selectedModeLabel: string = getModeLabel(state.selectedMode);
		log.print(`[profGlassBlowing] Mode selected: ${selectedModeLabel}.`);
		disposeStartFrame();
	});

	const buttonPanel = new javax.swing.JPanel();
	buttonPanel.setLayout(new java.awt.FlowLayout(java.awt.FlowLayout.CENTER));
	buttonPanel.add(startButton);
	mainPanel.add(buttonPanel);

	frame.add(mainPanel, java.awt.BorderLayout.CENTER);
	frame.pack();
	frame.setLocationRelativeTo(null);
	return frame;
};

export const initializeGlassMakeUI = (state: GlassStateWithUI): void => {
	if (state.uiCompleted && startFrame) return;
	if (state.uiCompleted && !startFrame) {
		state.uiCompleted = false;
	}
	disposeStartFrame();
	startFrame = createStartFrame(state);
	startFrame.setVisible(true);
};

export const disposeGlassMakeUI = (): void => {
	disposeStartFrame();
};
