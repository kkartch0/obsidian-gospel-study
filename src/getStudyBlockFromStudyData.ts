import { createStudyBlockData } from "./createStudyBlockData";
import { createStudyBlock } from "./createStudyBlock";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlockData } from "./models/StudyBlockData";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredUrlParsers } from "./urlParsers";

export async function getStudyBlockFromStudyData(data: string, pluginSettings: GospelStudyPluginSettings): Promise<string | null> {
	const studyBlockData = await getStudyBlockDataFromStudyData(data);
	if (!studyBlockData) {
		return null;
	}
	const studyBlock = createStudyBlock(studyBlockData, pluginSettings);
	return studyBlock;
}

export async function getStudyBlockDataFromStudyData(data: string): Promise<StudyBlockData | null> {
	const standardizedUrl = standardizeSearchParams(data);
	const url = new URL(standardizedUrl);

	const urlParser = registeredUrlParsers.find(currentParser => currentParser.isParseable(url));

	if (!urlParser) {
		return null;
	}

	const urlParserResult = urlParser.parse(url);

	const studyBlockData = await createStudyBlockData(urlParserResult);
	return studyBlockData;
}
