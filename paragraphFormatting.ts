/**
 * Retrieves the paragraphs with the specified ids from the document, formats, and then returns them.
 * 
 * @param document - The document object representing the HTML document.
 * @param activeParagraphIds - An array of active paragraph IDs.
 * @returns An array of formatted paragraphs.
 */
export function getFormattedParagraphs(document: Document, activeParagraphIds: string[]): string[] {
	const activeParagraphs: string[] = [];
	
	activeParagraphIds.forEach((id) => {
		if (id === "-") { // Hyphen indicates that the next paragraph is not contiguous with the previous one, so we add an ellipsis.
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
	text = text.replace(
		/<a class="study-note-ref" href="[^>]*"><sup class="marker">[^<]*<\/sup>([^<]*)<\/a>/g,
		"$1"
	);

	return text;
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
