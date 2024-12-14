import { requestUrl } from "obsidian";
import { StudyBlockData } from "./models/StudyBlockData";
import { getParagraphElements } from "./getParagraphElements";

/**
 * Creates a new StudyBlock instance using the given URL parser result and plugin settings.
 * 
 * @param studyDataParserResult - The result of parsing a URL.
 * @param pluginSettings - The settings for the Gospel Study plugin.
 * @returns A Promise that resolves to a StudyBlock instance.
 */
export async function finalizeStudyBlockData(studyDataParserResult: Partial<StudyBlockData>): Promise<StudyBlockData> {
    if (!studyDataParserResult.url || !studyDataParserResult.paragraphIdItems) {
        return studyDataParserResult as StudyBlockData;
    }

    const urlToRequest = studyDataParserResult.url.toString();

    const response = await requestUrl({
        url: urlToRequest, method: "GET", headers: {
            "cookie": "analytics_video_metadata_load=false"
        }
    });

    const parser = new DOMParser();
    const sourceDocument = parser.parseFromString(response.text, "text/html");
    const paragraphElements = getParagraphElements(sourceDocument, studyDataParserResult.paragraphIdItems);

    const studyBlockData: Partial<StudyBlockData> = {
        ...studyDataParserResult,
        paragraphElements,
        referenceLink: "",
        tag: getTag(studyDataParserResult.url),
        title: sourceDocument.title,
    };

    studyBlockData.referenceLink = getReferenceLink(studyBlockData as StudyBlockData);

    return studyBlockData as StudyBlockData;
}

function getReferenceLink(studyBlock: StudyBlockData): string {
    let titleToUse = studyBlock.title;
    if (studyBlock.paragraphElements[0]?.outerHTML.includes('verse-number')) {
        titleToUse += `:${studyBlock.paragraphIdsString}`;
    }
    return `[${titleToUse}](${studyBlock.url})`;
}

function getTag(studyUrl: URL): string {
    const path = studyUrl.pathname.replace("/study", "study");
    return `#${path}`;
}