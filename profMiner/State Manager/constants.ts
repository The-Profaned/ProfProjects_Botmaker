export type Coordinate = {
	x: number;
	y: number;
	plane: number;
};

export enum RockType {
	SOFT_CLAY = 'soft-clay',
	IRON = 'iron',
	SILVER = 'silver',
}

export type RockConfig = {
	name: string;
	objectId: number;
	anchor: Coordinate;
	locations: Coordinate[];
	action: string;
};

export const SELECTED_ROCK_TYPE: RockType = RockType.SOFT_CLAY;

export const ROCK_CONFIGS: Record<RockType, RockConfig> = {
	[RockType.SOFT_CLAY]: {
		name: 'Soft clay rocks',
		objectId: 36210,
		anchor: { x: 3295, y: 12444, plane: 0 },
		locations: [
			{ x: 3295, y: 12443, plane: 0 },
			{ x: 3294, y: 12444, plane: 0 },
		],
		action: 'Mine',
	},
	[RockType.IRON]: {
		name: 'Iron rocks',
		objectId: 36203,
		anchor: { x: 3304, y: 12446, plane: 0 },
		locations: [
			{ x: 3304, y: 12447, plane: 0 },
			{ x: 3305, y: 12446, plane: 0 },
			{ x: 3303, y: 12446, plane: 0 },
		],
		action: 'Mine',
	},
	[RockType.SILVER]: {
		name: 'Silver rocks',
		objectId: 36205,
		anchor: { x: 3307, y: 12442, plane: 0 },
		locations: [
			{ x: 3307, y: 12442, plane: 0 },
			{ x: 3307, y: 12444, plane: 0 },
			{ x: 3306, y: 12441, plane: 0 },
			{ x: 3305, y: 12440, plane: 0 },
			{ x: 3303, y: 12442, plane: 0 },
			{ x: 3304, y: 12443, plane: 0 },
			{ x: 3303, y: 12444, plane: 0 },
		],
		action: 'Mine',
	},
};

export const DEPOSIT_BOX_OBJECT_ID: number = 36219;
export const DEPOSIT_BOX_ACTION: string = 'Deposit';
export const DEPOSIT_WIDGET_ID: number = 12582942;
export const DEPOSIT_WIDGET_IDENTIFIER: number = 1;
export const DEPOSIT_WIDGET_OPCODE: number = 57;
export const DEPOSIT_WIDGET_PARAM0: number = -1;

export const MAX_DEPOSIT_OPEN_ATTEMPTS: number = 8;
export const MAX_DEPOSIT_ACTION_ATTEMPTS: number = 8;
