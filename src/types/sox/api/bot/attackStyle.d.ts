

declare namespace bot {
    interface attackStyle {
        /**
         * Sets the current attack style.
         * @param attackstyle - The array of attack style IDs to set.
         */
        setStyle: (attackStyle: number[]) => void;
    }

}
