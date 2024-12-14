import { StudyDataParser } from "src/models/StudyDataParser";
import { parseStudyUrl } from "./parseStudyUrl";
import { tryParseStudyUrl } from "./tryParseStudyUrl";
import { StudyBlockData } from "src/models/StudyBlockData";

/**
 * Declares a parser for the default ID format (e.g., p1,p3-p7,p9)
 */
export const standardUrlStudyDataParser: StudyDataParser = {
    isParseable(studyData: string): boolean {
        const url = tryParseStudyUrl(studyData);
        if (!url) {
            return false;
        }

        const idParam = url.searchParams.get("id");
        const correctFormatRegex = /^(?:[a-zA-Z].*[,-])*[a-zA-Z][^,-]*$/;
        return !!idParam && correctFormatRegex.test(idParam);
    },

    parse(studyData: string): Partial<StudyBlockData> {
        const url = parseStudyUrl(studyData);

        const idParam = url.searchParams.get("id") || "";
        const paragraphIdItems = idParam.split(",");

        const paragraphIdsString = idParam.replace(/p/g, "").replace(/,/g, ", ");

        return {
            paragraphIdItems,
            paragraphIdsString,
            url
        };
    },
};