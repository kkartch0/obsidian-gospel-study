import { UrlParser } from "src/models/UrlParser";
import { UrlParserResult } from "src/models/UrlParserResult";

/**
 * Declares a parser for the default ID format (e.g., p1,p3-p7,p9)
 */
export const standardUrlParser: UrlParser = {
    isParseable(url: URL): boolean {
        const idParam = url.searchParams.get("id");
        const correctFormatRegex = /^(?:[a-zA-Z].*[,-])*[a-zA-Z][^,-]*$/;
        return !!idParam && correctFormatRegex.test(idParam);
    },

    parse(url: URL): UrlParserResult {
        const idParam = url.searchParams.get("id") || "";
        const paragraphIdItems = idParam.split(",");

        const displayParagraphIds = idParam.replace(/p/g, "").replace(/,/g, ", ");

        return {
            paragraphIdItems,
            displayParagraphIds,
            url
        };
    },
};

/**
* Converts a paragraph range string to an array of paragraph IDs.
* @param range - The paragraph range string in the format "startId-endId".
* @returns An array of paragraph IDs.
*/
function paragraphRangeToParagraphIds(range: string): string[] {
    const [startId, endId] = range.split("-");

    const start = Number(startId.replace("p", ""));
    const end = Number(endId.replace("p", ""));

    const paragraphIds: string[] = [];
    for (let i = start; i <= end; ++i) {
        paragraphIds.push(`p${i}`);
    }

    return paragraphIds;
}

/**
* Inserts hyphens between non-contiguous paragraphs in the activeParagraphIds array.
* @param activeParagraphIds - The array of paragraph IDs to insert hyphens into.
* @example 
* const activeParagraphIds = ['p1', 'p3', 'p5', 'p6', 'p7', 'p10'];
* insertEllipsesBetweenNonContiguousParagraphs(activeParagraphIds);
* console.log(activeParagraphIds); // Output: ['p1','-', 'p3', '-', 'p5', 'p6', 'p7', '-', 'p10']
*/
function insertHyphenBetweenNonContiguousParagraphs(activeParagraphIds: string[]) {
    for (let i = 0; i < activeParagraphIds.length - 1; ++i) {
        const currentId = activeParagraphIds[i];
        const nextId = activeParagraphIds[i + 1];
        const currentNumber = Number(currentId.replace("p", ""));
        const nextNumber = Number(nextId.replace("p", ""));

        const paragraphsAreNonContiguous = nextNumber - currentNumber > 1;
        if (paragraphsAreNonContiguous) {
            activeParagraphIds.splice(i + 1, 0, "-"); // Insert a hyphen between the paragraph ids
        }
    }
}

