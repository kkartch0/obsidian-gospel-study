import { ParagraphIdResult } from "./ParagraphIdResult";

/**
 * Declares methods to be used for parsing paragraph IDs out of the given URL.
 */
export interface ParagraphIDParser {
    /**
     * Returns true if this parser can handle the format in the given URL; otherwise, returns false.
     *
     * @param {URL} url - The URL that is being added to Obsidian.
     * @returns {boolean} - Whether or not this parser can handle the format of the current URL.
     */
    isParseable(url: URL): boolean;

    /**
     * Parses the paragraph IDs from the given URL.
     *
     * @param {URL} url - The URL that is being added to Obsidian.
     * @returns {ParagraphIdResult} - The parse results, including the separated paragraph IDs and the display format for paragraph IDs.
     */
    getParagraphIDs(url: URL): ParagraphIdResult;
}