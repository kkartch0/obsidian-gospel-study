import { createStudyBlockData } from "./createStudyBlockData";
import { createStudyBlock } from "./createStudyBlock";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlockData } from "./models/StudyBlockData";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredUrlParsers } from "./urlParsers";

export async function getStudyBlockFromStudyData(data: string, pluginSettings: GospelStudyPluginSettings): Promise<string | null> {
	const block = await getStudyBlockDataFromStudyData(data);
	if (!block) {
		return null;
	}
	const blockText = createStudyBlock(block, pluginSettings);
	return blockText;
}

export async function getStudyBlockDataFromStudyData(data: string): Promise<StudyBlockData | null> {
	const standardizedUrl = standardizeSearchParams(data);
	const url = new URL(standardizedUrl);

	const urlParser = registeredUrlParsers.find(currentParser => currentParser.isParseable(url));

	if (!urlParser) {
		return null;
	}

	const urlParserResult = urlParser.parse(url);

	const block = await createStudyBlockData(urlParserResult);

	return block;
}
