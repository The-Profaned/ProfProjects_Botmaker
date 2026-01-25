

declare namespace bot {

    interface web {

        /**
         * Reads a string from the web
         * Whitelisted URLs: github.com, pastebin
         * @param requestURL The URL to read the string from
         * @returns The string read from the web
         */
        readString(requestURL: string): string;
    }
}
