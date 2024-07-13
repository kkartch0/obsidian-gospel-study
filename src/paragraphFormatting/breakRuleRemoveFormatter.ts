
import { ParagraphFormatter } from "src/models/ParagraphFormatter";

/**
 * A paragraph formatter that removes all <br> tags from the input paragraph.
 */
export const breakRuleRemoveFormatter: ParagraphFormatter = {
	isEnabled(): boolean {
		return true;
	},

	format(paragraph: string): string {
		const parser = new DOMParser();
		const doc = parser.parseFromString(paragraph, 'text/html');
		const elements = doc.querySelectorAll("br");
		elements.forEach((element) => { element.remove(); });

		return doc.body.innerHTML;
	}
};