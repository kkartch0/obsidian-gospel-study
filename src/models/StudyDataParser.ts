import { StudyDataParserResult } from "./StudyDataParserResult";

/**
 * Declares methods to be used for parsing paragraph IDs out of the given URL.
 */
export interface StudyDataParser {
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
     * @returns {StudyDataParserResult} - The parse results, including the separated paragraph IDs and the display format for paragraph IDs.
     */
    parse(url: URL): StudyDataParserResult;
}
