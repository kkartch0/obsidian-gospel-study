import { ParagraphFormatter } from "src/models/ParagraphFormatter";

/**
 * Removes footnotes from a paragraph of text.
 *
 * @param text - The input text containing footnotes.
 * @returns The modified text with footnotes removed.
 *
 * @example
 * const inputText = "This is a paragraph with a <a class='study-note-ref' href='#note1'><sup class='marker'>1</sup>footnote</a>."
 * const modifiedText = removeFootnotesFromParagraph(inputText);
 * console.log(modifiedText);
 * // Output: "This is a paragraph with a footnote."
 */
export const removeFootnotesFormatter: ParagraphFormatter = {
	isEnabled(): boolean {
		return true;
	},

	format(paragraph: string) {
		paragraph = paragraph.replace(
			/<a class="study-note-ref" href="[^>]*"><sup class="marker"[^>]*>[^<]*<\/sup>([^<]*)<\/a>/g,
			"$1"
		);

		return paragraph;
	}
}