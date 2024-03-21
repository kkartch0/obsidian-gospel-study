import { GospelStudyPluginSettings } from "./GospelStudyPluginSettings";
import { ParagraphIdResult } from "./ParagraphIdResult";

/**
 * The data retrieved before parsing the study block. This will be passed to
 * all of the study block parsers.
 */
export interface StudyBlockParserData {
    /**
     * The raw content added to Obsidian by the user, that contains the Gospel Study URL.
     */
    rawContent: string;

    /**
     * The parsed URL from the raw content.
     */
    url: URL;

    /**
     * The resutls from the Paragraph ID Parser.
     */
    paragraphIDs: ParagraphIdResult;

    /**
     * The current plugin settings, used when formatting the output data.
     */
    settings: GospelStudyPluginSettings
}