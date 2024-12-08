import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlock } from "./studyBlock";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredUrlParsers } from "./urlParsers";

export async function getStudyBlockTextFromUrl(data: string, pluginSettings: GospelStudyPluginSettings): Promise<string | null> {
	const block = await getStudyBlockFromUrl(data);
	if (!block) {
		return null;
	}
	const blockText = block.toString(pluginSettings);
	return blockText;
}

export async function getStudyBlockFromUrl(data: string): Promise<StudyBlock | null> {
	const standardizedUrl = standardizeSearchParams(data);
	const url = new URL(standardizedUrl);

	const urlParser = registeredUrlParsers.find(currentParser => currentParser.isParseable(url));

	if (!urlParser) {
		return null;
	}

	const urlParserResult = urlParser.parse(url);

	const block = await StudyBlock.create(urlParserResult);

	return block;
}
