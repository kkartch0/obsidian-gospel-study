import { requestUrl } from "obsidian";
import { UrlParserResult } from "./models/UrlParserResult";
import { StudyBlock } from "./studyBlock";

/**
 * Creates a new StudyBlock instance using the given URL parser result and plugin settings.
 * 
 * @param urlParserResult - The result of parsing a URL.
 * @param pluginSettings - The settings for the Gospel Study plugin.
 * @returns A Promise that resolves to a StudyBlock instance.
 */
export async function createStudyBlock(urlParserResult: UrlParserResult): Promise<StudyBlock> {
    const urlToRequest = urlParserResult.url.toString();

    const response = await requestUrl({
        url: urlToRequest, method: "GET", headers: {
            "cookie": "analytics_video_metadata_load=false"
        }
    });

    const parser = new DOMParser();
    const sourceDocument = parser.parseFromString(response.text, "text/html");
    const studyBlock = new StudyBlock(urlParserResult, sourceDocument);

    return studyBlock;
}
