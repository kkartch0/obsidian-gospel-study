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

		let innerHTML = formatParagraph(paragraphElement.innerHTML);

		activeParagraphs.push(innerHTML);
	});
	return activeParagraphs;
}

export function formatParagraph(paragraphHTML: string): string {
	paragraphHTML = removeFootnotesFromParagraph(paragraphHTML);
	paragraphHTML = removePageBreaksFromParagraph(paragraphHTML);
	paragraphHTML = removeRelatedContentFromParagraph(paragraphHTML);
	paragraphHTML = fullyQualifyStudyLinks(paragraphHTML);

	return paragraphHTML;
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
function removeFootnotesFromParagraph(text: string): string {
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
function removePageBreaksFromParagraph(text: string): string {
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, 'text/html');

	const elements = doc.querySelectorAll('span.page-break');
	elements.forEach((element) => {
		element.remove();
	});

	return doc.body.innerHTML;
}

/**
 * Removes related content elements from a paragraph of text.
 * 
 * @param text - The input text containing the paragraph.
 * @returns The modified text with the related content removed.
 * 
 * @example
 * const inputText = "This is a paragraph with <span title='Associated Content'><button><svg></svg>related content</button></span>.";
 * const modifiedText = removeRelatedContentFromParagraph(inputText);
 * console.log(modifiedText);
 * // Output: "This is a paragraph with ."
 */
function removeRelatedContentFromParagraph(text: string): string {
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, 'text/html');

	const elements = doc.querySelectorAll('span[title="Associated Content"]');
	elements.forEach((element) => {
		element.remove();
	});

	return doc.body.innerHTML;
}

/**
 * Replaces all occurrences of "/study/" in the given text with "https://www.churchofjesuschrist.org/study/".
 * 
 * @param text - The input text to be processed.
 * @returns The modified text with fully qualified study links.
 */
function fullyQualifyStudyLinks(text: string): string {
	return text.replace(/"\/study\//g, "\"https://www.churchofjesuschrist.org/study/");
}