import { StudyDataParser } from "src/models/StudyDataParser";
import { parseUrl } from "./parseUrl";
import { StudyBlockData } from "src/models/StudyBlockData";
import { containsStudyUrl } from "./containsStudyUrl";
import { standardizeSearchParams } from "../../src/standardizeSearchParams";

export const numberOnlyUrlStudyDataParser: StudyDataParser = {
    isParseable(studyData: string): boolean {
        if(!containsStudyUrl(studyData)) { return false; }

        let url = parseUrl(studyData);
        url = standardizeSearchParams(url);

        const idParam = url.searchParams.get("id");
        // https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12?lang=eng&id=4#p4
        const correctFormatRegex = /^(?:\d*[,-])*\d*$/;

        return !!idParam && correctFormatRegex.test(idParam);
    },

    parse(studyData: string): Partial<StudyBlockData> {
        let url = parseUrl(studyData);
        url = standardizeSearchParams(url);

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