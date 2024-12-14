import { StudyDataParser } from "src/models/StudyDataParser";
import { StudyDataParserResult } from "src/models/StudyDataParserResult";
import { parseStudyUrl } from "./parseStudyUrl";
import { tryParseStudyUrl } from "./tryParseStudyUrl";

export const numberOnlyUrlStudyDataParser: StudyDataParser = {
    isParseable(studyData: string): boolean {
        const url = tryParseStudyUrl(studyData);
        if (!url) {
            return false;
        }

        const idParam = url.searchParams.get("id");
        // https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12?lang=eng&id=4#p4
        const correctFormatRegex = /^(?:\d*[,-])*\d*$/;
        return !!idParam && correctFormatRegex.test(idParam);
    },

    parse(studyData: string): StudyDataParserResult {
        const url = parseStudyUrl(studyData);

        const idParam = url?.searchParams.get("id") || "";
        const idItems = idParam.split(",");

        // prepend "p" to each number
        // 1,3 => p1, p3
        // 1-3 => p1-p3
        // 1,3-7,9 => p1, p3-p7, p9
        const paragraphIdItems = idItems.map((idItem) => {
            const range = idItem.split("-");
            if (range.length === 1) {
                return `p${range[0]}`;
            } else {
                return `p${range[0]}-p${range[1]}`;
            }
        });

        const paragraphIdsString = idParam.replace(/,/g, ", ");

        return {
            paragraphIdItems,
            paragraphIdsString,
            url
        };
    },
};