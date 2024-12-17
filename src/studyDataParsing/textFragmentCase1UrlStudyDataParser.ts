/**
 * A study data parser for handling urls that contain text fragment highlights.
 * See: https://developer.mozilla.org/en-US/docs/Web/URI/Fragment/Text_fragments
 */
import { StudyDataParser } from "src/models/StudyDataParser";
import { StudyBlockData } from "src/models/StudyBlockData";
import { tryParseUrl } from "./tryParseUrl";
import { parseUrl } from "./parseUrl";

export const textFragmentUrlStudyDataParser: StudyDataParser = {
    isParseable(studyData: string): boolean {
        const url = tryParseUrl(studyData);
        if (!url) { return false; }
        if (!url.hash.includes(":~:text=")) { return false; }

        const fragmentText:string = url.hash.split(":~:text=")[1];
        if (!fragmentText) { return false; }

        if (fragmentText.includes(",") || fragmentText.includes("-")) { return false; }

        return true;
    },

    parse(studyData: string): Partial<StudyBlockData> {
        const url = parseUrl(studyData);

        const text = url.hash.split(":~:text=")[1];

        const decodedText = decodeURIComponent(text);

        const paragraphElement = document.createElement("p");
        paragraphElement.textContent = decodedText;

        return {
            paragraphElements: [paragraphElement],
            url
        };
    },
};