import { requestUrl } from "obsidian";
import { StudyBlockData } from "src/models/StudyBlockData";
import { StudyBlockParser } from "src/models/StudyBlockParser";
import { StudyBlockParserData } from "src/models/StudyBlockParserData";
import { getFormattedParagraphs } from "src/paragraphFormatting";

/**
 * Retrieves the formatted link title for the reference link.
 * @param {Document} currentDocument - The document retrieved from the given URL.
 * @param {string} firstParagraph - The first formatted paragraph from the document.
 * @param {string} displayParagraphs - The list of paragraph IDs, formatted for display.
 * @returns {string} - The formatted title for the reference link.
 */
function getLinkTitle(currentDocument: Document, firstParagraph: string, displayParagraphs: string): string {
    const documentTitle = currentDocument.title;

    if (firstParagraph?.contains('verse-number')) {
        return `${documentTitle}:${displayParagraphs}`;
    }

    return documentTitle;
}

/**
 * Retrieves the document from the given URL, and parses out study block data from there.
 */
export const remoteStudyBlockParser: StudyBlockParser = {
    isParseable(data: Partial<StudyBlockParserData>): boolean {
        return !!data.url && !!data.paragraphIDs && !!data.settings;
    },
    async mergeStudyBlock(data: Partial<StudyBlockParserData>, lastBlock: Partial<StudyBlockData>): Promise<Partial<StudyBlockData>> {
        if (data.url && data.paragraphIDs && data.settings) {
            const response = await requestUrl(data.url.toString());
            const parser = new DOMParser();
            const currentDocument = parser.parseFromString(response.text, "text/html");
            const paragraphs = getFormattedParagraphs(currentDocument, data.paragraphIDs.paragraphIds, data.settings);
            const displayParagraphIds = data.paragraphIDs.displayParagraphIds;
            const linkTitle = getLinkTitle(currentDocument, paragraphs[0], displayParagraphIds);

            return {
                paragraphIdsString: data.paragraphIDs.displayParagraphIds,
                paragraphs: paragraphs,
                referenceLink: `[${linkTitle}](${data.url})`,
                tag: `#${data.url.pathname.replace("/study", "study")}`,
                title: currentDocument.title,
                url: data.url.toString()
            };
        }

        return lastBlock;
    }
};