import { UrlParser } from "src/models/UrlParser";
import { UrlParseResult } from "src/models/UrlParseResult";

type ParagraphItem = {
    paragraphId: string;
    paragraphNum: number;
};

type ParagraphResults = {
    paragraphIds: string[];
    lastParagraphNum: number;
}

/**
 * The regex which verifies whether the ID query parameter is in the correct format for this parser.
 */
const correctFormatRegex = /^(?:[a-z]+[0-9]+[,-])*[a-z]+[0-9]+$/;

/**
 * The regex that will parse out the paragraph numbers from the ID query parameter.
 */
const paragrahRegex = /([a-z]+[0-9]+)((?:-[a-z]+[0-9]+)?),?/g;

/**
 * The regex used to remove the prefixes from paragraph IDs.
 */
const paragraphDisplayText = /[a-z]/g;

/**
 * Retrieves the number from a paragraph ID.
 */
const numRegex = /\d+/;

/**
 * Retrieves the prefix of a paragraph ID.
 */
const prefixRegex = /\D+/;

/**
 * Retrieves the number from a paragraph ID.
 *
 * @param {string} currentId - The current paragraph ID that is being processed.
 * @returns {number} - The number from the given paragraph ID.
 */
function getNumber(currentId: string): number {
    return parseInt((currentId.match(numRegex) ?? ["0"])[0]);
}

/**
 * Retrieves the prefix from a paragraph ID.
 *
 * @param {string} currentId - The current paragraph ID that is being processed.
 * @returns {number} - The number from the given paragraph ID.
 */
function getPrefix(currentId: string): string {
    return (currentId.match(prefixRegex) ?? ["p"])[0];
}

/**
 * Takes a Regex result, and expands it if it represents a range of paragraph IDs. Intended to be used with the flatMap function.
 *
 * @param {RegExpMatchArray} result - One of the parse results from the id query parameter.
 * @returns {ParagraphItem | ParagraphItem[]} - Either a single or list of paragraph items resulting from the current parsed results.
 */
function expandParagraphIds(result: RegExpMatchArray): ParagraphItem | ParagraphItem[] {
    const firstNum = getNumber(result[1]);

    if (result[2] === '') {
        return {
            paragraphId: result[1],
            paragraphNum: firstNum
        } as ParagraphItem;
    }
    
    const prefix = getPrefix(result[1]);
    const secondNum = getNumber(result[2]);

    return Array.from({ length: secondNum - firstNum + 1 }, (_, i) => firstNum + i)
        .map(paragraphNum => ({
            paragraphId: `${prefix}${paragraphNum}`,
            paragraphNum
        }));
}

/**
 * Declares a parser for the default ID format (e.g., p1,p3-p7,p9)
 */
export const defaultUrlParser: UrlParser = {
    isParseable(url: URL): boolean {
        const idParam = url.searchParams.get("id");
        return !!idParam && correctFormatRegex.test(idParam);
    },

    getParagraphIDs(url: URL): UrlParseResult {
        const idParam = url.searchParams.get("id") ?? "";
        const displayParagraphIds = idParam.replace(paragraphDisplayText, "").replace(/,/g, ", ");

        const results = Array.from(idParam.matchAll(paragrahRegex));

        const expandedParagraphIds = results
            .flatMap(expandParagraphIds);

		let paragraphResults: ParagraphResults = {
			paragraphIds: [],
			lastParagraphNum: 0
		};

		for (const [index, currentParagraphIds] of expandedParagraphIds.entries()) {
			const newResults: string[] = [];

			if (index > 0 && currentParagraphIds.paragraphNum > paragraphResults.lastParagraphNum + 1) {
				newResults.push("-");
			}

			newResults.push(currentParagraphIds.paragraphId);

			paragraphResults = {
				paragraphIds: [
					...paragraphResults.paragraphIds,
					...newResults
				],
				lastParagraphNum: currentParagraphIds.paragraphNum
			}
		}

        return {
            paragraphIds: paragraphResults.paragraphIds,
            displayParagraphIds
        };
    },
};
