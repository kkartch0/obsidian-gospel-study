/**
 * A type including all of the supported replacement data for a study block.
 */
export interface StudyBlockData {
    /**
     * The display format for paragraph IDs.
     */
    paragraphIdsString: string;

    /**
     * A list of formatted paragraphs.
     */
    paragraphs: string[];

    /**
     * A link to the referenced URL.
     */
    referenceLink: string;

    /**
     * A tag that can be used to easily find references in Obsidian.
     */
    tag: string;

    /**
     * The title of the reference
     */
    title: string;

    /**
     * A string representation of the original URL.
     */
    url: string;
}