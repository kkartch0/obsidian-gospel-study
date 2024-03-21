import { StudyBlockData } from "./StudyBlockData";
import { StudyBlockParserData } from "./StudyBlockParserData";

/**
 * Declares methods to be used for parsing the Study Block data
 * from given base data.
 */
export interface StudyBlockParser {
    /**
     * Returns true if this parser can handle the data as it currently stands.
     *
     * @param {Partial<StudyBlockParserData>} data - The base data parsed from the URL.
     * @returns {boolean} - Whether or not this parser can handle the current URL.
     */
    isParseable(data: Partial<StudyBlockParserData>): boolean;

    /**
     * Retrieves study block data given some base data parsed from the
     * URL, and merges it with data retrieved by other parsers.
     * @param {Partial<StudyBlockParserData>} data - The base parsed data available to all the study block parsers. 
     * @param {Partial<StudyBlockData>} lastBlock - The study block data provided by the last parser (or an empty object for the first one).
     * @returns {Promise<Partial<StudyBlockData>>} - The merged study block data.
     */
    mergeStudyBlock(
        data: Partial<StudyBlockParserData>,
        lastBlock: Partial<StudyBlockData>
    ): Promise<Partial<StudyBlockData>>;
}