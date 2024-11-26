import { GospelStudyPluginSettings } from "src/models/GospelStudyPluginSettings";
import { ParagraphFormatter } from "src/models/ParagraphFormatter";

/**
 * A paragraph formatter that removes all "&nbsp;" tags from the input paragraph.
 */
export const nonBreakingSpaceFormatter: ParagraphFormatter = {
	isEnabled(settings: GospelStudyPluginSettings): boolean {
		return !settings.retainNonBreakingSpaces;
	},

	format(paragraph: string): string {
        paragraph = paragraph.replace(/&nbsp;/g, " ");
        return paragraph;
	}
};