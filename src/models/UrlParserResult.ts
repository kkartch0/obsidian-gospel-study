/**
 * The parsed results returned by a UrlParser.
 */
export interface UrlParserResult {
    /**
     * The list of paragraph IDs derived from a URL.
     */
    paragraphIdItems: string[];

    /**
     * A display version of the paragraph IDs derived from a URL.
     */
    displayParagraphIds: string;

    /**
     * The URL that was parsed.
     */
    url: URL;
}
