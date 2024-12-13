import { requestUrl } from "obsidian";
import { UrlParserResult } from "./models/UrlParserResult";
import { StudyBlockData } from "./models/StudyBlockData";
import { getParagraphElements } from "./getParagraphElements";

/**
 * Creates a new StudyBlock instance using the given URL parser result and plugin settings.
 * 
 * @param urlParserResult - The result of parsing a URL.
 * @param pluginSettings - The settings for the Gospel Study plugin.
 * @returns A Promise that resolves to a StudyBlock instance.
 */
export async function createStudyBlockData(urlParserResult: UrlParserResult): Promise<StudyBlockData> {
    const urlToRequest = urlParserResult.url.toString();

    const response = await requestUrl({
        url: urlToRequest, method: "GET", headers: {
            "cookie": "analytics_video_metadata_load=false"
        }
    });

    const parser = new DOMParser();
    const sourceDocument = parser.parseFromString(response.text, "text/html");
    const paragraphElements = getParagraphElements(sourceDocument, urlParserResult.paragraphIdItems);

    const studyBlockData: StudyBlockData = {
        paragraphIdsString: urlParserResult.displayParagraphIds,
        paragraphElements,
        referenceLink: "",
        tag: getTag(urlParserResult),
        title: sourceDocument.title,
        url: urlParserResult.url.toString()
    };

    studyBlockData.referenceLink = getReferenceLink(studyBlockData);

    return studyBlockData;
}

function getReferenceLink(studyBlock: StudyBlockData): string {
    let titleToUse = studyBlock.title;
    if (studyBlock.paragraphElements[0]?.outerHTML.includes('verse-number')) {
        titleToUse += `:${studyBlock.paragraphIdsString}`;
    }
    return `[${titleToUse}](${studyBlock.url})`;
}

function getTag(urlParserResult: UrlParserResult): string {
    const path = urlParserResult.url.pathname.replace("/study", "study");
    return `#${path}`;
}