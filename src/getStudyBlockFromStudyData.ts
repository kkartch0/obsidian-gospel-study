import { createStudyBlockData } from "./createStudyBlockData";
import { createStudyBlock } from "./createStudyBlock";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlockData } from "./models/StudyBlockData";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredStudyDataParsers } from "./studyDataParsers";

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

	const studyDataParser = registeredStudyDataParsers.find(currentParser => currentParser.isParseable(url));

	if (!studyDataParser) {
		return null;
	}

	const studyDataParserResult = studyDataParser.parse(url);

	const studyBlockData = await createStudyBlockData(studyDataParserResult);
	return studyBlockData;
}
