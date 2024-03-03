export default function getFormattedParagraphs(document: Document, activeParagraphIds: string[]): string[] {
	const activeParagraphs: string[] = [];

	activeParagraphIds.forEach((id) => {
		if (id === "-") {
			activeParagraphs.push("…");
			return;
		}
		const paragraphElement = document.getElementById(id);
		if (!paragraphElement) return;

		let innerHTML = removeFootnotesFromParagraph(paragraphElement.innerHTML);
		innerHTML = removePageBreaksFromParagraph(innerHTML);

		activeParagraphs.push(innerHTML);
	});

	return activeParagraphs;
}
/**
 * Removes page breaks from a paragraph of text.
 *
 * @param text - The input text containing page breaks.
 * @returns The modified text with page breaks removed.
 *
 * @example
 * const inputText = "This is a paragraph.<span class='page-break' data-page='1'></span>This is another paragraph.";
 * const modifiedText = removePageBreaksFromParagraph(inputText);
 * console.log(modifiedText);
 * // Output: "This is a paragraph.This is another paragraph."
 */

export function removePageBreaksFromParagraph(text: string): string {
	text = text.replace(
		/<span class="page-break" data-page=".*"><\/span>/g,
		""
	);
	return text;
}

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
export function removeFootnotesFromParagraph(text: string): string {
	const matches = text.matchAll(
		/<a class="study-note-ref" href="[^>]*"><sup class="marker">[^<]*<\/sup>([^<]*)<\/a>/g
	);
	for (const match of matches) {
		// group 0 is the whole match, group 1 is the footnote text
		text = text.replace(match[0], match[1]);
	}

	return text;
}