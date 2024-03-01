import { requestUrl } from "obsidian";

import StudyBlock from "./StudyBlock";
import ParsedUrl from "./ParsedUrl";

export default class StudyBlockFactory {
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
	removePageBreaksFromParagraph(text: string): string {
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
	public removeFootnotesFromParagraph(text: string): string {
		const matches = text.matchAll(
			/<a class="study-note-ref" href="[^>]*"><sup class="marker">[^<]*<\/sup>([^<]*)<\/a>/g
		);
		for (const match of matches) {
			// group 0 is the whole match, group 1 is the footnote text
			text = text.replace(match[0], match[1]);
		}

		return text;
	}

	/**
	 * Retrieves the paragraphs from a document based on the provided URL and returns an array of strings.
	 * Each string represents the innerHTML of a paragraph element.
	 *
	 * @param doc - The document object to query for paragraphs.
	 * @param parsedUrl - The URL used to determine the active paragraphs.
	 * @returns An array of strings representing the innerHTML of the active paragraphs.
	 */
	public getBlockParagraphs(doc: Document, parsedUrl: ParsedUrl): string[] {
		const activeParagraphIds = parsedUrl.activeParagraphIds;
		const activeParagraphs: string[] = [];

		activeParagraphIds.forEach((id) => {
			if (id === "-") {
				activeParagraphs.push("…");
				return;
			}
			const el = doc.getElementById(id);
			if (!el) return;

			let innerHTML = this.removeFootnotesFromParagraph(el.innerHTML);
			innerHTML = this.removePageBreaksFromParagraph(innerHTML);

			activeParagraphs.push(innerHTML);
		});

		return activeParagraphs;
	}

	/**
	 * Converts a URL to a block in the editor.
	 * @param editor The editor instance.
	 * @param url The URL to convert.
	 * @returns A promise that resolves when the conversion is complete.
	 */
	public async createFromUrl(url: string): Promise<StudyBlock> {
		const parsedUrl = new ParsedUrl(url);

		return requestUrl(parsedUrl.standardizedUrl.toString()).then(
			(response) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(response.text, "text/html");

				const block = new StudyBlock();
				block.title = doc.title;
				block.paragraphs = this.getBlockParagraphs(doc, parsedUrl);
				block.tag = this.createUrlTag(url);
				block.url = url;

				const urlObject = new URL(url);
				let paragraphIdsString = urlObject.searchParams.get("id") ?? "";
				paragraphIdsString = paragraphIdsString.replace(/p/g, "");
				paragraphIdsString = paragraphIdsString.replace(/,/g, ", ");
				block.paragraphIdsString = paragraphIdsString;

				return block;
			}
		);
	}

	/**
	 * Creates a URL tag from the given URL.
	 *
	 * @param url The URL to create the tag from.
	 * @returns The URL tag.
	 *
	 * @example
	 * const url = "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/6?lang=eng&id=p11,p13-p16#p11";
	 * const urlTag = createUrlTag(url);
	 * // Returns "#study/scriptures/bofm/2-ne/6"
	 */

	createUrlTag(url: string): string {
		const urlObj = new URL(url);
		const path = urlObj.pathname.replace("/study", "study");
		const urlTag = `#${path}`;

		return urlTag;
	}
}
