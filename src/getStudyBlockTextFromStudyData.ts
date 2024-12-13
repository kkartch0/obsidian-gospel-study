import { createStudyBlock } from "./createStudyBlock";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlock } from "./studyBlock";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredUrlParsers } from "./urlParsers";

export async function getStudyBlockTextFromStudyData(data: string, pluginSettings: GospelStudyPluginSettings): Promise<string | null> {
	const block = await getStudyBlockFromStudyData(data);
	if (!block) {
		return null;
	}
	const blockText = block.toString(pluginSettings);
	return blockText;
}

export async function getStudyBlockFromStudyData(data: string): Promise<StudyBlock | null> {
	const standardizedUrl = standardizeSearchParams(data);
	const url = new URL(standardizedUrl);

	const urlParser = registeredUrlParsers.find(currentParser => currentParser.isParseable(url));

	if (!urlParser) {
		return null;
	}

	const urlParserResult = urlParser.parse(url);

	const block = await createStudyBlock(urlParserResult);

	return block;
}
