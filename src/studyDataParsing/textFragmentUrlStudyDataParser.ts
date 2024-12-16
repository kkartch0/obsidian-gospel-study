/**
 * A study data parser for handling urls that contain text fragment highlights.
 * See: https://developer.mozilla.org/en-US/docs/Web/URI/Fragment/Text_fragments
 */
import { StudyDataParser } from "src/models/StudyDataParser";
import { StudyBlockData } from "src/models/StudyBlockData";
import { tryParseUrl } from "./tryParseUrl";

export const textFragmentUrlStudyDataParser: StudyDataParser = {
    isParseable(studyData: string): boolean {
        const url = tryParseUrl(studyData);
        if (!url) { return false; }
        if (!url.hash.includes(":~:text=")) { return false; }
        return true;
    },

    parse(studyData: string): Partial<StudyBlockData> {
        return {
        };
    },
};