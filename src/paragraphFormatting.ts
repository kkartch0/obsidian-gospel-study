import { GospelStudyPluginSettings } from "./gospelStudyPluginSettings";

/**
 * Retrieves the paragraphs with the specified ids from the document, formats, and then returns them.
 * 
 * @param document - The document object representing the HTML document.
 * @param activeParagraphIds - An array of active paragraph IDs.
 * @returns An array of formatted paragraphs.
 */
export function getFormattedParagraphs(document: Document, activeParagraphIds: string[], pluginSettings: GospelStudyPluginSettings): string[] {
	const activeParagraphs: string[] = [];

	activeParagraphIds.forEach((id) => {
		if (id === "-") { // Hyphen indicates that the next paragraph is not contiguous with the previous one, so we add an ellipsis.
			activeParagraphs.push("…");
			return;
		}
		const paragraphElement = document.getElementById(id);
		if (!paragraphElement) return;

		const formattedParagraph = formatParagraph(paragraphElement.innerHTML, pluginSettings);

		activeParagraphs.push(formattedParagraph);
	});
	return activeParagraphs;
}

/**
 * Formats a paragraph by applying various transformations based on the plugin settings.
 * 
 * @param paragraphHTML - The HTML content of the paragraph.
 * @param pluginSettings - The settings of the Gospel Study plugin.
 * @returns The formatted paragraph HTML.
 */
export function formatParagraph(paragraphHTML: string, pluginSettings: GospelStudyPluginSettings): string {
	paragraphHTML = removeFootnotesFromParagraph(paragraphHTML);
	paragraphHTML = removeNonUsefulTags(paragraphHTML);
	paragraphHTML = fullyQualifyStudyLinks(paragraphHTML);

	if (!pluginSettings.retainScriptureReferenceLinks) {
		paragraphHTML = removeScriptureReferenceLinks(paragraphHTML);
	}

	return paragraphHTML;
}

/**
 * Removes tags that are not useful/functional in the Obsidian context such as associated content, page breaks, and note references.
 * 
 * @param text - The input text containing HTML tags.
 * @returns The modified text with non-useful tags removed.
 */
function removeNonUsefulTags(text: string): string {
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, 'text/html');

	const tagsToRemove = ['span.page-break', 'span[title="Associated Content"]', 'a.note-ref'];

	tagsToRemove.forEach((tag) => {
		const elements = doc.querySelectorAll(tag);
		elements.forEach((element) => {
			element.remove();
		});
	});

	return doc.body.innerHTML;
}

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
function removeScriptureReferenceLinks(paragraphHTML: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(paragraphHTML, 'text/html');

	const referenceLinks = doc.querySelectorAll('a.scripture-ref');
	referenceLinks.forEach((element): void => {
		// Replace the scripture reference link with the text content of the link.
		element.replaceWith(element.textContent || '');
	});
	paragraphHTML = doc.body.innerHTML;
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
 * Replaces all occurrences of "/study/" in the given text with "https://www.churchofjesuschrist.org/study/".
 * 
 * @param text - The input text to be processed.
 * @returns The modified text with fully qualified study links.
 * @example
 * const inputText = "This is a paragraph with <a href='/study/scriptures/bofm/1-ne/1.1'>study link</a> and <a href='/study/scriptures/bofm/1-ne/2.1'>another study link</a>.";
 * const modifiedText = fullyQualifyStudyLinks(inputText);
 * console.log(modifiedText);
 * // Output: "This is a paragraph with <a href='https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/1.1'>study link</a> and <a href='https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/2.1'>another study link</a>."
 */
function fullyQualifyStudyLinks(text: string): string {
	return text.replace(/"\/study\//g, "\"https://www.churchofjesuschrist.org/study/");
}