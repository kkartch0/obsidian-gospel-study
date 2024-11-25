import { ParagraphFormatter } from "src/models/ParagraphFormatter";
import { GospelStudyPluginSettings } from "src/models/GospelStudyPluginSettings";
import { registeredFormatters } from "./registeredFormatters";
/**
 * Retrieves the paragraphs with the specified ids from the document, formats, and then returns them.
 * 
 * @param document - The document object representing the HTML document.
 * @param paragraphIdItems - An array of active paragraph IDs.
 * @returns An array of formatted paragraphs.
 */
export function getFormattedParagraphs(document: Document, paragraphIdItems: string[], pluginSettings: GospelStudyPluginSettings): string[] {
	const paragraphElements: Element[] = [];

	const enabledFormatters = registeredFormatters.filter((formatter: ParagraphFormatter) => formatter.isEnabled(pluginSettings));

	const elementsWithIds = Array.from(document.querySelectorAll("[id]"));

	paragraphIdItems.forEach((idItem) => {
		if (idItem.includes("-")) { // It is a range of paragraphs
			const rangeOfParagraphs = paragraphRangeToParagraphElements(idItem, elementsWithIds);
			paragraphElements.push(...rangeOfParagraphs);

		} else { // It is a single paragraph
			const paragraphElement = paragraphIdToParagraphElement(idItem, elementsWithIds);
			paragraphElements.push(paragraphElement);
		}
	});

	const paragraphs: string[] = [];
	paragraphElements.forEach((paragraphElement) => {
		const formattedParagraph = formatParagraph(paragraphElement.innerHTML, enabledFormatters);
		paragraphs.push(formattedParagraph);
	});

	return paragraphs;
}


function paragraphIdToParagraphElement(idItem: string, elementsWithIds: Element[]): Element {
	const paragraphElement = elementsWithIds.find((element) => element.id === idItem);

	if (!paragraphElement) {
		throw new Error(`Invalid paragraph ID: ${idItem}`);
	}
	return paragraphElement;
}

/**
 * Formats a paragraph by applying various transformations based on the plugin settings.
 * 
 * @param paragraph- The HTML content of the paragraph.
 * @param pluginSettings - The settings of the Gospel Study plugin.
 * @returns The formatted paragraph HTML.
 */
export function formatParagraph(paragraph: string, enabledFormatters: ParagraphFormatter[]): string {
	enabledFormatters.forEach((formatter) => {
		paragraph = formatter.format(paragraph);
	});

	return paragraph;
}



/**
* Converts a paragraph range string to an array of paragraph IDs.
* @param range - The paragraph range string in the format "startId-endId".
* @returns An array of paragraph IDs.
*/
function paragraphRangeToParagraphElements(range: string, elementsWithIds: Element[]): Element[] {
	const [startId, endId] = range.split("-");

	const startElementIndex = elementsWithIds.findIndex((element) => element.id === startId);
	const endElementIndex = elementsWithIds.findIndex((element) => element.id === endId);

	if (startElementIndex === -1 || endElementIndex === -1) {
		throw new Error(`Invalid paragraph range: ${range}`);
	}

	const paragraphElements = elementsWithIds.slice(startElementIndex, endElementIndex + 1);

	return paragraphElements;
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
