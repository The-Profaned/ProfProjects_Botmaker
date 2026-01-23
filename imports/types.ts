// State type definition
export type State = {
    failureOrigin: string,
    failureCounts: Record<string, number>,
    debugEnabled: boolean;
    debugFullState: boolean;
    gameTick: number;
    lastFailureKey: string;
    mainState: string;
    scriptName: string;
    timeout: number;
    scriptInitalized?: boolean;
    sub_State: string;
    uiCompleted?: boolean;
    useStaminas?: boolean;
    bypassMouseClicks?: boolean;
}

// Location coordinates type definition
export type LocationCoordinates = {
    [location: string]: { 
        [subLocation: string]: [number, number, number]}
};
