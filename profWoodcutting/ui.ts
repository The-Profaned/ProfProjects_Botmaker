import type { WoodcuttingScriptState } from './State Manager/script-state.js';
import {
	MAGIC_TREE_OBJECT_ID,
	YEW_TREE_OBJECT_ID,
	CAMPHOR_TREE_OBJECT_ID,
	MAGIC_LOGS_ITEM_ID,
	YEW_LOGS_ITEM_ID,
	CAMPHOR_LOG_ID,
} from './State Manager/constants.js';

interface WoodcuttingStateWithUI extends WoodcuttingScriptState {
	uiCompleted?: boolean;
}

let startFrame: javax.swing.JFrame | null = null;

export enum TreeSelection {
	YEW = 'YEW',
	MAGIC = 'MAGIC',
	CAMPHOR = 'CAMPHOR',
}

const applyTreeSelection = (
	state: WoodcuttingStateWithUI,
	selection: TreeSelection,
): void => {
	switch (selection) {
		case TreeSelection.MAGIC: {
			state.activeTreeObjectId = MAGIC_TREE_OBJECT_ID;
			state.activeLogsItemId = MAGIC_LOGS_ITEM_ID;
			state.treeTypeName = 'Magic';
			break;
		}
		case TreeSelection.CAMPHOR: {
			state.activeTreeObjectId = CAMPHOR_TREE_OBJECT_ID;
			state.activeLogsItemId = CAMPHOR_LOG_ID;
			state.treeTypeName = 'Camphor';
			break;
		}
		case TreeSelection.YEW: {
			state.activeTreeObjectId = YEW_TREE_OBJECT_ID;
			state.activeLogsItemId = YEW_LOGS_ITEM_ID;
			state.treeTypeName = 'Yew';
			break;
		}
	}
};

const disposeStartFrame = (): void => {
	if (!startFrame) return;
	startFrame.dispose();
	startFrame = null;
};

const createStartFrame = (
	state: WoodcuttingStateWithUI,
): javax.swing.JFrame => {
	const frame = new javax.swing.JFrame('profWoodcutting - Tree Selection');
	frame.setDefaultCloseOperation(
		javax.swing.WindowConstants.DISPOSE_ON_CLOSE,
	);
	frame.setLayout(new java.awt.BorderLayout(10, 10));

	// Main panel
	const mainPanel = new javax.swing.JPanel();
	mainPanel.setLayout(
		new javax.swing.BoxLayout(mainPanel, javax.swing.BoxLayout.Y_AXIS),
	);
	mainPanel.setBorder(
		javax.swing.BorderFactory.createEmptyBorder(15, 15, 15, 15),
	);

	// Instructions label
	const instructionsLabel = new javax.swing.JLabel(
		'Select a tree location to cut:',
	);
	instructionsLabel.setFont(
		new java.awt.Font('SansSerif', java.awt.Font.BOLD, 14),
	);
	mainPanel.add(instructionsLabel);
	mainPanel.add(javax.swing.Box.createVerticalStrut(10));

	// Checkboxes for tree selection - all unchecked initially
	const yewCheckbox = new javax.swing.JCheckBox(
		'Woodcutting Guild Yew',
		false,
	);
	const magicCheckbox = new javax.swing.JCheckBox(
		'Woodcutting Guild Magic',
		false,
	);
	const camphorCheckbox = new javax.swing.JCheckBox(
		'Great Conch Camphor',
		false,
	);

	// Mutual exclusion logic - update state on selection change
	yewCheckbox.addActionListener(() => {
		if (yewCheckbox.isSelected()) {
			magicCheckbox.setSelected(false);
			camphorCheckbox.setSelected(false);
			applyTreeSelection(state, TreeSelection.YEW);
		}
	});

	magicCheckbox.addActionListener(() => {
		if (magicCheckbox.isSelected()) {
			yewCheckbox.setSelected(false);
			camphorCheckbox.setSelected(false);
			applyTreeSelection(state, TreeSelection.MAGIC);
		}
	});

	camphorCheckbox.addActionListener(() => {
		if (camphorCheckbox.isSelected()) {
			yewCheckbox.setSelected(false);
			magicCheckbox.setSelected(false);
			applyTreeSelection(state, TreeSelection.CAMPHOR);
		}
	});

	mainPanel.add(yewCheckbox);
	mainPanel.add(magicCheckbox);
	mainPanel.add(camphorCheckbox);
	mainPanel.add(javax.swing.Box.createVerticalStrut(15));

	// Start button
	const startButton = new javax.swing.JButton('Start Script');
	startButton.setFont(new java.awt.Font('SansSerif', java.awt.Font.BOLD, 12));
	startButton.setPreferredSize(new java.awt.Dimension(150, 40));
	startButton.addActionListener(() => {
		// If no tree was selected, default to Magic
		if (
			state.treeTypeName !== 'Yew' &&
			state.treeTypeName !== 'Magic' &&
			state.treeTypeName !== 'Camphor'
		) {
			applyTreeSelection(state, TreeSelection.MAGIC);
		}
		state.uiCompleted = true;
		log.print(`Tree selection: ${state.treeTypeName}. Starting script.`);
		disposeStartFrame();
	});

	// Center the button horizontally
	const buttonPanel = new javax.swing.JPanel();
	buttonPanel.setLayout(new java.awt.FlowLayout(java.awt.FlowLayout.CENTER));
	buttonPanel.add(startButton);

	mainPanel.add(buttonPanel);

	frame.add(mainPanel, java.awt.BorderLayout.CENTER);
	frame.pack();
	frame.setLocationRelativeTo(null);
	return frame;
};

export const woodcuttingUI = {
	initialize: (state: WoodcuttingStateWithUI): void => {
		if (state.uiCompleted) return;
		disposeStartFrame();
		startFrame = createStartFrame(state);
		startFrame.setVisible(true);
	},
	dispose: (): void => {
		disposeStartFrame();
	},
};
