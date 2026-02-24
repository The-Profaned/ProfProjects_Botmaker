export enum GlassMakeMode {
	CRAFT_ONLY = 'craft-only',
	CRAFT_PLUS_SPORES = 'craft-plus-spores',
	SPORES_ONLY = 'spores-only',
}

export const BANK_OBJECT_ID: number = 30796;
export const ROWBOAT_OBJECT_ID: number = 30919;
export const ANCHOR_ROPE_OBJECT_ID: number = 30948;

export const GLASSBLOWING_PIPE_ITEM_ID: number = 1785;
export const MOLTEN_GLASS_ITEM_ID: number = 1775;
export const SEAWEED_SPORE_ITEM_ID: number = 21490;

export const BANK_DEPOSIT_WIDGET_ID: number = 786473;
export const BANK_DEPOSIT_WIDGET_IDENTIFIER: number = 1;
export const BANK_DEPOSIT_WIDGET_OPCODE: number = 57;
export const BANK_DEPOSIT_WIDGET_PARAM0: number = -1;

export const ROWBOAT_CONTINUE_WIDGET_ID: number = 14352385;
export const ROWBOAT_CONTINUE_WIDGET_IDENTIFIER: number = 0;
export const ROWBOAT_CONTINUE_WIDGET_OPCODE: number = 30;
export const ROWBOAT_CONTINUE_WIDGET_PARAM0: number = 1;

export const GLASS_PIPE_USE_WIDGET_ID: number = 9764864;
export const GLASS_PIPE_USE_IDENTIFIER: number = 0;
export const GLASS_PIPE_USE_OPCODE: number = 25;
export const GLASS_PIPE_USE_PARAM0: number = 0;

export const MOLTEN_GLASS_USE_WIDGET_ID: number = 9764864;
export const MOLTEN_GLASS_USE_IDENTIFIER: number = 0;
export const MOLTEN_GLASS_USE_OPCODE: number = 58;
export const MOLTEN_GLASS_USE_PARAM0: number = 1;

export const TARGET_MOLTEN_GLASS_SEAWEED_MODE: number = 26;
export const TARGET_MOLTEN_GLASS_NORMAL_MODE: number = 27;

export const ISLAND_ARRIVAL_TILE = {
	x: 3732,
	y: 10281,
	plane: 1,
};

export const BANK_RETURN_TILE = {
	x: 3764,
	y: 3899,
	plane: 0,
};

export const SELECTED_MODE: GlassMakeMode = GlassMakeMode.CRAFT_ONLY;
