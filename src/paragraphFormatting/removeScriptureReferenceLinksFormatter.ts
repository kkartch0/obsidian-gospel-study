import { GospelStudyPluginSettings } from "src/models/GospelStudyPluginSettings";
import { ParagraphFormatter } from "src/models/ParagraphFormatter";

/**
 * Removes scripture reference links (e.g. <a class="scripture-ref">Some Reference</a>) from the given paragraph by replacing them with their text content.
 *
 * @param paragraphHTML - The HTML string representing the paragraph.
 * @returns The modified paragraph HTML with scripture reference links removed.
 * @example
 * const inputText = "This is a paragraph with a <a class='scripture-ref'>scripture reference</a>."
 * const modifiedText = removeScriptureReferenceLinks(inputText);
 * console.log(modifiedText);
 * // Output: "This is a paragraph with a scripture reference."
 */
export const removeScriptureReferenceLinksFormatter: ParagraphFormatter = {
	isEnabled(settings: GospelStudyPluginSettings): boolean {
		return !settings.retainScriptureReferenceLinks;
	},

	format(paragraph: string): string {

		const parser = new DOMParser();
		const doc = parser.parseFromString(paragraph, 'text/html');

		const referenceLinks = doc.querySelectorAll('a.scripture-ref');
		referenceLinks.forEach((element): void => {
			// Replace the scripture reference link with the text content of the link.
			element.replaceWith(element.textContent || '');
		});
		paragraph = doc.body.innerHTML;
		return paragraph;
	}
}