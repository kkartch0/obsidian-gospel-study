import { GospelStudyPluginSettings } from "./gospelStudyPluginSettings";
import { StudyBlock } from "./studyBlock";
import { StudyURL } from "./studyUrl";

export async function getStudyBlockTextFromUrl(clipboardData: string, pluginSettings: GospelStudyPluginSettings): Promise<string> {
	const studyUrl = new StudyURL(clipboardData);
	const block = await StudyBlock.create(studyUrl, pluginSettings);
	const blockText = block.toString(pluginSettings.studyBlockFormat);
	return blockText;
}
