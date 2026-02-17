// State type definition
export type State = {
	failureOrigin: string;
	failureCounts: Record<string, number>;
	debugEnabled: boolean;
	debugFullState: boolean;
	gameTick: number;
	lastFailureKey: string;
	mainState: string;
	subState: string;
	scriptName: string;
	timeout: number;
	scriptInitalized?: boolean;
	uiCompleted?: boolean;
	useStaminas?: boolean;
	bypassMouseClicks?: boolean;
	lastFoodEatTick?: number;
	lastFoodDelay?: number;
	lastPotionDrinkTick?: number;
	bankWalkInitiated?: boolean;
	isAtBankLocation?: boolean;
	bankOpenAttemptTick?: number;
	lastLoggedSource?: string;
};

// Location coordinates type definition
export type LocationCoordinates = {
	[location: string]: {
		[subLocation: string]: [number, number, number];
	};
};

// Ground Items API type definition
export interface GroundItem {
	getWorldLocation(): { getX(): number; getY(): number };
}

export interface GroundItemsAPI {
	getTileItemsWithIds(ids: number[]): GroundItem[];
}
