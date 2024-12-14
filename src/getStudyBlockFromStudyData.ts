import { createStudyBlockData } from "./createStudyBlockData";
import { createStudyBlock } from "./createStudyBlock";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlockData } from "./models/StudyBlockData";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredStudyDataParsers } from "./studyDataParsers";

export async function getStudyBlockFromStudyData(studyData: string, pluginSettings: GospelStudyPluginSettings): Promise<string | null> {
	const studyBlockData = await getStudyBlockDataFromStudyData(studyData);
	if (!studyBlockData) {
		return null;
	}
	const studyBlock = createStudyBlock(studyBlockData, pluginSettings);
	return studyBlock;
}

export async function getStudyBlockDataFromStudyData(studyData: string): Promise<StudyBlockData | null> {
	const standardizedUrl = standardizeSearchParams(studyData);
	const url = new URL(standardizedUrl);

	const studyDataParser = registeredStudyDataParsers.find(currentParser => currentParser.isParseable(url));

	if (!studyDataParser) {
		return null;
	}

	const studyDataParserResult = studyDataParser.parse(url);

	const studyBlockData = await createStudyBlockData(studyDataParserResult);
	return studyBlockData;
}
