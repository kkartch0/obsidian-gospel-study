import { StudyDataParser } from "src/models/StudyDataParser";
import { parseUrl } from "./parseUrl";
import { StudyBlockData } from "src/models/StudyBlockData";
import { containsStudyUrl } from "./containsStudyUrl";
import { standardizeSearchParams } from "../../src/standardizeSearchParams";

/**
 * Declares a parser for the default ID format (e.g., p1,p3-p7,p9)
 */
export const standardUrlStudyDataParser: StudyDataParser = {
    isParseable(studyData: string): boolean {
        if (!containsStudyUrl(studyData)) { return false; }

        let url = parseUrl(studyData);
        url = standardizeSearchParams(url);

        const idParam = url.searchParams.get("id");
        const correctFormatRegex = /^(?:[a-zA-Z].*[,-])*[a-zA-Z][^,-]*$/;

        return !!idParam && correctFormatRegex.test(idParam);
    },

    parse(studyData: string): Partial<StudyBlockData> {
        let url = parseUrl(studyData);
        url = standardizeSearchParams(url);

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