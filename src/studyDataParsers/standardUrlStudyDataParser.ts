import { StudyDataParser } from "src/models/StudyDataParser";
import { StudyDataParserResult } from "src/models/StudyDataParserResult";

/**
 * Declares a parser for the default ID format (e.g., p1,p3-p7,p9)
 */
export const standardUrlStudyDataParser: StudyDataParser = {
    isParseable(url: URL): boolean {
        const idParam = url.searchParams.get("id");
        const correctFormatRegex = /^(?:[a-zA-Z].*[,-])*[a-zA-Z][^,-]*$/;
        return !!idParam && correctFormatRegex.test(idParam);
    },

    parse(url: URL): StudyDataParserResult {
        const idParam = url.searchParams.get("id") || "";
        const paragraphIdItems = idParam.split(",");

        const displayParagraphIds = idParam.replace(/p/g, "").replace(/,/g, ", ");

        return {
            paragraphIdItems,
            displayParagraphIds,
            url
        };
    },
};