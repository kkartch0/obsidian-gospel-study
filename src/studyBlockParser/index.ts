import { StudyBlockParser } from "src/models/StudyBlockParser";
import { remoteStudyBlockParser } from "./remoteStudyBlockParser";

/**
 * Declares a list of registered study block parsers. The results of one parser
 * are fed into the next one, and merged together by that parser. This allows for
 * multiple approaches to be used to retrieve the data. For example, sometimes the
 * shared text from the reference only includes part of a paragraph. One parser can be
 * used to retrieve that, and another parser can retrieve the remainder of the needed
 * data.
 */
export const registeredStudyBlockParsers: StudyBlockParser[] = [
    remoteStudyBlockParser
];