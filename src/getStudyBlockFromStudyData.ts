import { fetchMissingData } from "./fetchMissingData";
import { createStudyBlock } from "./createStudyBlock";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { StudyBlockData } from "./models/StudyBlockData";
import { registeredStudyDataParsers } from "./studyDataParsing";

export async function getStudyBlockFromStudyData(studyData: string, pluginSettings: GospelStudyPluginSettings): Promise<string | null> {
	const studyBlockData = await getStudyBlockDataFromStudyData(studyData);
	if (!studyBlockData) {
		return null;
	}
	const studyBlock = createStudyBlock(studyBlockData, pluginSettings);
	return studyBlock;
}

export async function getStudyBlockDataFromStudyData(studyData: string): Promise<StudyBlockData | null> {

	const applicableStudyDataParsers = registeredStudyDataParsers.filter(currentParser => currentParser.isParseable(studyData));

	if (!applicableStudyDataParsers.length) {
		return null;
	}

	const studyBlockData: StudyBlockData = {
		paragraphIdItems: [],
		paragraphIdsString: "",
		paragraphElements: [],
		referenceLink: "",
		tag: "",
		title: "",
		url: undefined,
	};

	applicableStudyDataParsers.forEach(currentParser => {
		const parserResult = currentParser.parse(studyData);
		Object.assign(studyBlockData, parserResult);
	});

	if (studyBlockData.paragraphElements?.length === 0) {
		const fetchResult = await fetchMissingData(studyBlockData);
		Object.assign(studyBlockData, fetchResult);
	}

    studyBlockData.referenceLink = getReferenceLink(studyBlockData);
    studyBlockData.tag = getTag(studyBlockData);

	return studyBlockData;
}

function getReferenceLink(studyBlockData: StudyBlockData): string {
    let titleToUse = studyBlockData.title;
    if (studyBlockData.paragraphElements[0]?.outerHTML.includes('verse-number')) {
        titleToUse += `:${studyBlockData.paragraphIdsString}`;
    }
    return `[${titleToUse}](${studyBlockData.url})`;
}

function getTag(studyBlockData: StudyBlockData): string {
	if (!studyBlockData.url) {
		return "";
	}
    const path = studyBlockData.url.pathname.replace("/study", "study");
    return `#${path}`;
}