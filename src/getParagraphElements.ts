/**
 * Retrieves an array of paragraph elements from the document based on the provided paragraph ID items.
 *
 * @param document - The Document object to search within.
 * @param paragraphIdItems - An array of paragraph ID strings. Each string can either be a single paragraph ID or a range of paragraph IDs.
 * @returns An array of Element objects corresponding to the specified paragraph IDs.
 */
export function getParagraphElements(document: Document, paragraphIdItems: string[]): Element[] {
    const elementsWithIds = Array.from(document.querySelectorAll("[id]"));
    const paragraphElements: Element[] = [];

    paragraphIdItems.forEach((idItem) => {
        if (idItem.includes("-")) { // It is a range of paragraphs
            const rangeOfParagraphs = paragraphRangeToParagraphElements(idItem, elementsWithIds);
            paragraphElements.push(...rangeOfParagraphs);

        } else { // It is a single paragraph
            const paragraphElement = paragraphIdToParagraphElement(idItem, elementsWithIds);
            paragraphElements.push(paragraphElement);
        }
    });

    return paragraphElements;
}

/**
 * Finds and returns the paragraph element with the specified ID from a list of elements.
 *
 * @param idItem - The ID of the paragraph element to find.
 * @param elementsWithIds - An array of elements that contain IDs.
 * @returns The paragraph element with the specified ID.
 * @throws Will throw an error if no element with the specified ID is found.
 */
export function paragraphIdToParagraphElement(idItem: string, elementsWithIds: Element[]): Element {
    const paragraphElement = elementsWithIds.find((element) => element.id === idItem);

    if (!paragraphElement) {
        throw new Error(`Invalid paragraph ID: ${idItem}`);
    }
    return paragraphElement;
}

/**
 * Extracts a range of paragraph elements from a list of elements based on the provided range string.
 *
 * @param range - A string representing the range of paragraph elements, in the format "startId-endId".
 * @param elementsWithIds - An array of elements, each with an `id` property.
 * @returns An array of elements that fall within the specified range.
 * @throws Will throw an error if either the start or end ID is not found in the elements array.
 */
export function paragraphRangeToParagraphElements(range: string, elementsWithIds: Element[]): Element[] {
    const [startId, endId] = range.split("-");

    const startElementIndex = elementsWithIds.findIndex((element) => element.id === startId);
    const endElementIndex = elementsWithIds.findIndex((element) => element.id === endId);

    if (startElementIndex === -1 || endElementIndex === -1) {
        throw new Error(`Invalid paragraph range: ${range}`);
    }

    const paragraphElements = elementsWithIds.slice(startElementIndex, endElementIndex + 1);

    return paragraphElements;
}

