

declare namespace bot {
    /**
     * Interface for interacting with UI widgets
     * Provides methods to interact with game interface elements
     */
    interface widgets {
        /**
         * Handles dialogue interactions
         */
        handleDialogue: (dialogues: []) => boolean;

        /**
         * Interacts with a specified widget using its ID and parameters
         * @param packedWidgetId The packed ID of the widget to interact with
         * @param identifier The identifier for the interaction
         * @param opcode The operation code for the interaction
         * @param p0 The first parameter for the interaction
         * @param p1 The second parameter for the interaction (optional)
         */

        interactSpecifiedWidget: (
            packedWidgetId: number,
            identifier: number,
            opcode: number,
            p0: number,
            p1?: number
        ) => void;

        /**
         * Interacts with a widget by matching its text content
         * @param text The text to search for in widgets
         */
        interactWidgetText: (text: string) => void;
    }
}
