/**
 * The parsed results returned by a ParagraphIDParser.
 */
export interface ParagraphIdResult {
    /**
     * The list of paragraph IDs derived from a URL.
     */
    paragraphIds: string[];

    /**
     * A display version of the paragraph IDs derived from a URL.
     */
    displayParagraphIds: string;
}