import { ParagraphFormatter } from "src/models/ParagraphFormatter";

/**
 * A paragraph formatter that removes all <br> tags from the input paragraph.
 */
export const strongEmToMarkdownFormatter: ParagraphFormatter = {
	isEnabled(): boolean {
		return true;
	},

	format(paragraph: string): string {
		const parser = new DOMParser();
		const doc = parser.parseFromString(paragraph, 'text/html');

        const strongElements = doc.querySelectorAll("strong");
        strongElements.forEach((element) => {
            element.outerHTML = `**${element.innerHTML}**`;
        });

        const emElements = doc.querySelectorAll("em");
        emElements.forEach((element) => {
            element.outerHTML = `*${element.innerHTML}*`;
        });

		return doc.body.innerHTML;
	}
};