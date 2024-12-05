import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";

export const STUDY_BLOCK_FORMAT_1 = "> [!gospel-study]\n> # {{referenceLink}}\n> {{paragraphs:\n>\n> }}\n>\n>{{tag}}";

export const STUDY_BLOCK_FORMAT_2 = "> {{paragraphs:\n>\n> }}\n>\n> {{referenceLink}}\n\n{{tag}}";

export const DEFAULT_SETTINGS: GospelStudyPluginSettings = {
	studyBlockFormat: STUDY_BLOCK_FORMAT_1,
	copyCurrentNoteLinkAfterPaste: true,
	retainScriptureReferenceLinks: true,
	retainNonBreakingSpaces: false,
	customStudyBlockFormat: ""
};

