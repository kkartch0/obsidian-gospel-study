import { ParagraphFormatter } from "src/models/ParagraphFormatter";

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
export const fullyQualifyStudyLinksFormatter: ParagraphFormatter = {
	isEnabled(): boolean {
		return true;
	},

	format(paragraph: string): string {
		return paragraph.replace(/"\/study\//g, "\"https://www.churchofjesuschrist.org/study/");
	}
};