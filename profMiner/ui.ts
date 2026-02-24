import { RockType } from './State Manager/constants.js';
import type { MinerScriptState } from './State Manager/script-state.js';

interface MinerStateWithUI extends MinerScriptState {
	uiCompleted?: boolean;
}

let startFrame: javax.swing.JFrame | null = null;

const disposeStartFrame = (): void => {
	if (!startFrame) return;
	startFrame.dispose();
	startFrame = null;
};

const createStartFrame = (state: MinerStateWithUI): javax.swing.JFrame => {
	const frame = new javax.swing.JFrame('profMiner - Rock Selection');
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

	const instructionsLabel = new javax.swing.JLabel(
		'Select a rock type to mine:',
	);
	instructionsLabel.setFont(
		new java.awt.Font('SansSerif', java.awt.Font.BOLD, 14),
	);
	mainPanel.add(instructionsLabel);
	mainPanel.add(javax.swing.Box.createVerticalStrut(10));

	const ironCheckbox = new javax.swing.JCheckBox('Iron', false);
	const silverCheckbox = new javax.swing.JCheckBox('Silver', false);
	const softClayCheckbox = new javax.swing.JCheckBox('Soft Clay', false);

	const applySelection = (rockType: RockType): void => {
		state.selectedRockType = rockType;
	};

	const clearOtherSelections = (
		activeCheckbox: javax.swing.JCheckBox,
	): void => {
		if (activeCheckbox !== ironCheckbox) ironCheckbox.setSelected(false);
		if (activeCheckbox !== softClayCheckbox)
			softClayCheckbox.setSelected(false);
		if (activeCheckbox !== silverCheckbox)
			silverCheckbox.setSelected(false);
	};

	ironCheckbox.addActionListener(() => {
		if (!ironCheckbox.isSelected()) return;
		clearOtherSelections(ironCheckbox);
		applySelection(RockType.IRON);
	});

	silverCheckbox.addActionListener(() => {
		if (!silverCheckbox.isSelected()) return;
		clearOtherSelections(silverCheckbox);
		applySelection(RockType.SILVER);
	});

	softClayCheckbox.addActionListener(() => {
		if (!softClayCheckbox.isSelected()) return;
		clearOtherSelections(softClayCheckbox);
		applySelection(RockType.SOFT_CLAY);
	});

	mainPanel.add(ironCheckbox);
	mainPanel.add(silverCheckbox);
	mainPanel.add(softClayCheckbox);
	mainPanel.add(javax.swing.Box.createVerticalStrut(15));

	const startButton = new javax.swing.JButton('Start Script');
	startButton.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 12));
	startButton.setPreferredSize(new java.awt.Dimension(150, 40));
	startButton.addActionListener(() => {
		if (
			!ironCheckbox.isSelected() &&
			!softClayCheckbox.isSelected() &&
			!silverCheckbox.isSelected()
		) {
			log.print('[profMiner] Select a rock type before starting.');
			return;
		}

		state.uiCompleted = true;
		state.activeRockType = state.selectedRockType;
		let selectedRockLabel: string = 'Soft Clay';
		if (state.selectedRockType === RockType.IRON) {
			selectedRockLabel = 'Iron';
		} else if (state.selectedRockType === RockType.SILVER) {
			selectedRockLabel = 'Silver';
		}
		log.print(
			`[profMiner] Rock selection: ${selectedRockLabel}. Starting script.`,
		);
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

export const initializeMinerUI = (state: MinerStateWithUI): void => {
	if (state.uiCompleted) return;
	disposeStartFrame();
	startFrame = createStartFrame(state);
	startFrame.setVisible(true);
};

export const disposeMinerUI = (): void => {
	disposeStartFrame();
};
