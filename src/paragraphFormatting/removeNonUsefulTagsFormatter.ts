import { ParagraphFormatter } from "src/models/ParagraphFormatter";

/**
 * Removes tags that are not useful/functional in the Obsidian context such as associated content, page breaks, and note references.
 *
 * @param text - The input text containing HTML tags.
 * @returns The modified text with non-useful tags removed.
 */
export const removeNonUsefulTagsFormatter: ParagraphFormatter = {
	isEnabled(): boolean {
		return true;
	},

	format(paragraph: string): string {
		const parser = new DOMParser();
		const doc = parser.parseFromString(paragraph, 'text/html');

		const tagsToRemove = ['span.page-break', 'span[title="Associated Content"]', 'a.note-ref'];

		tagsToRemove.forEach((tag) => {
			const elements = doc.querySelectorAll(tag);
			elements.forEach((element) => {
				element.remove();
			});
		});

		return doc.body.innerHTML;
	}
};

export default removeNonUsefulTagsFormatter;