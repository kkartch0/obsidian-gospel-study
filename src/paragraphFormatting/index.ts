import { ParagraphFormatter } from "src/models/ParagraphFormatter";
import { GospelStudyPluginSettings } from "src/models/GospelStudyPluginSettings";
import { registeredFormatters } from "./registeredFormatters";

/**
 * Retrieves and formats paragraphs from a document based on provided paragraph IDs items and plugin settings.
 *
 * @param document - The document object containing the paragraph elements.
 * @param paragraphIdItems - An array of paragraph ID items such as ["p1", "p2", "p3-p5"].
 * @param pluginSettings - The settings for the Gospel Study plugin, used to determine which formatters are enabled.
 * @returns An array of formatted paragraph strings.
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


/**
 * Finds and returns the paragraph element with the specified ID from a list of elements.
 *
 * @param idItem - The ID of the paragraph element to find.
 * @param elementsWithIds - An array of elements that contain IDs.
 * @returns The paragraph element with the specified ID.
 * @throws Will throw an error if no element with the specified ID is found.
 */
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
 * Extracts a range of paragraph elements from a list of elements based on the provided range string.
 *
 * @param range - A string representing the range of paragraph elements, in the format "startId-endId".
 * @param elementsWithIds - An array of elements, each with an `id` property.
 * @returns An array of elements that fall within the specified range.
 * @throws Will throw an error if either the start or end ID is not found in the elements array.
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