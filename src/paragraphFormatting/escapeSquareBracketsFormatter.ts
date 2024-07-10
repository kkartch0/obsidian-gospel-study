
import { ParagraphFormatter } from "src/models/ParagraphFormatter";

/**
 * Replaces all occurrences of "[" in the given text with "\[".
 *
 * @param text - The input text to be processed.
 * @returns The modified text with escaped "[".
 * @example
 * const inputText = "This paragraph [has] square brackets.";
 * const modifiedText = escapeSquareBracketsFormatter.format(inputText);
 * console.log(modifiedText);
 * // Output: "This paragraph \[has] square brackets."
 */
export const escapeSquareBracketsFormatter : ParagraphFormatter = {
	isEnabled(): boolean {
		return true;
	},

	format(paragraph: string): string {
        return paragraph.replace(/\[/g, "\\[");
	}
};