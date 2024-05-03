import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlock } from "./studyBlock";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredUrlParsers } from "./urlParsers";

export async function getStudyBlockTextFromUrl(data: string, pluginSettings: GospelStudyPluginSettings): Promise<string | null> {
	const standardizedUrl = standardizeSearchParams(data);
	const url = new URL(standardizedUrl);

	const urlParser = registeredUrlParsers.find(currentParser => currentParser.isParseable(url));

	if (!urlParser) {
		return null;
	}

	const urlParserResult = urlParser.parse(url);

	const block = await StudyBlock.create(urlParserResult, pluginSettings);
	const blockText = block.toString(pluginSettings.studyBlockFormat);

	return blockText;
}
