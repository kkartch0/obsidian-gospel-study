import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlock } from "./studyBlock";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredUrlParsers } from "./urlParsers";

export async function getStudyBlockTextFromUrl(data: string, pluginSettings: GospelStudyPluginSettings): Promise<string | null> {
	const standardizedUrl = standardizeSearchParams(data);
	const url = new URL(standardizedUrl);

	// Find the first parser that can parse out this type of URL
	const urlParser = registeredUrlParsers.find(currentParser => currentParser.isParseable(url));

	// console.log(data, url.searchParams.get("id"), parser);

	// If no parser is found, return false.
	if (!parser) {
		return null;
	}

	const paragraphResult = parser.getParagraphIDs(url);

	const block = await StudyBlock.create(url, paragraphResult, pluginSettings);
	const blockText = block.toString(pluginSettings.studyBlockFormat);
	return blockText;
}
