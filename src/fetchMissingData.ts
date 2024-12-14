import { requestUrl } from "obsidian";
import { StudyBlockData } from "./models/StudyBlockData";
import { getParagraphElements } from "./getParagraphElements";

/**
 * Creates a new StudyBlock instance using the given URL parser result and plugin settings.
 * 
 * @param studyData - The result of parsing a URL.
 * @param pluginSettings - The settings for the Gospel Study plugin.
 * @returns A Promise that resolves to a StudyBlock instance.
 */
export async function fetchMissingData(studyData: Partial<StudyBlockData>): Promise<Partial<StudyBlockData>> {
    if (!studyData.url || !studyData.paragraphIdItems) {
        return studyData as StudyBlockData;
    }

    const urlToRequest = studyData.url.toString();

    const response = await requestUrl({
        url: urlToRequest, method: "GET", headers: {
            "cookie": "analytics_video_metadata_load=false"
        }
    });

    const parser = new DOMParser();
    const sourceDocument = parser.parseFromString(response.text, "text/html");
    const paragraphElements = getParagraphElements(sourceDocument, studyData.paragraphIdItems);

    return {
        paragraphElements,
        title: sourceDocument.title,
    };
}
