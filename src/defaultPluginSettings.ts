import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { registeredStudyBlockFormatOptions } from "./studyBlockFormats";

export const DEFAULT_SETTINGS: GospelStudyPluginSettings = {
	studyBlockFormat: registeredStudyBlockFormatOptions[0].formatString,
	copyCurrentNoteLinkAfterPaste: true,
	retainScriptureReferenceLinks: true,
	retainNonBreakingSpaces: false,
	customStudyBlockFormat: ""
};

