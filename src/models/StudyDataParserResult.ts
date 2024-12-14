/**
 * The parsed results returned by a StudyDataParser.
 */
export interface StudyDataParserResult {
    /**
     * The list of id items parsed from the URL.
     */
    paragraphIdItems: string[];

    /**
     * A display version of the paragraph IDs derived from a URL.
     */
    paragraphIdsString: string;

    /**
     * The URL that was parsed.
     */
    url: URL;
}
