/**
 * Retrieves active paragraph IDs from a URL string.
 * @param urlString - The URL string containing the 'id' parameter.
 * @returns An array of active paragraph IDs.
 * @example
 * // Example usage:
 * const urlString = "https://example.com/?id=p1,p3-p5";
 * const activeParagraphIds = getActiveParagraphIdsFromUrl(urlString);
 * console.log(activeParagraphIds); // Output: ['p1', 'p3', 'p4', 'p5']
 */
export function getActiveParagraphIdsFromUrl(urlString: string): string[] {
	const url = new URL(urlString);

	// Get the 'id' parameter from the URL
	const idParam = url.searchParams.get('id');

	// Split the 'id' parameter by commas if it is not null
	const idParts = idParam ? idParam.split(',') : [];
	console.debug("🚀 ~ file: main.helper.ts:9 ~ getActiveParagraphIdsFromUrl ~ idParts:", idParts);


	// Create an empty list to store the paragraph IDs
	const activeParagraphIds = [];

	// Loop over the parts of the 'id' parameter
	for (const part of idParts) {
		console.debug("🚀 ~ file: main.helper.ts:17 ~ getActiveParagraphIdsFromUrl ~ part:", part);

		// If the part contains a dash, it represents a range of paragraph IDs
		if (part.includes('-')) {
			// Split the part by the dash
			const [start, end] = part.split('-').map((n) => Number(n.replace('p', '')));
			console.debug("🚀 ~ file: main.helper.ts:23 ~ getActiveParagraphIdsFromUrl ~ end:", end);
			console.debug("🚀 ~ file: main.helper.ts:23 ~ getActiveParagraphIdsFromUrl ~ start:", start);

			// Loop over the range and add each paragraph ID to the list
			for (let i = start; i <= end; i++) {
				activeParagraphIds.push('p' + i);
			}
		} else {
			// If the part doesn't contain a dash, it represents a single paragraph ID
			activeParagraphIds.push('p' + Number(part.replace('p', '')));
		}
	}
	return activeParagraphIds;
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
export function removeFootnotesFromParagraph(text: string): string {
	const matches = text.matchAll(/<a class="study-note-ref" href="[^>]*"><sup class="marker">[^<]*<\/sup>([^<]*)<\/a>/g);
	console.debug("🚀 ~ file: main.helper.ts:45 ~ removeFootnotesFromParagraph ~ matches:", matches);

	for (const match of matches) {
		console.debug("🚀 ~ file: main.helper.ts:41 ~ removeFootnotesFromParagraph ~ match:", match);
		// group 0 is the whole match, group 1 is the footnote text
		text = text.replace(match[0], match[1]);
	}

	return text;
}

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
export function removePageBreaksFromParagraph(text: string): string {
	text = text.replace(/<span class="page-break" data-page=".*"><\/span>/g, '');
	return text;
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
export function createUrlTag(url: string): string {
	const urlObj = new URL(url);
	console.debug("🚀 ~ file: main.helper.ts:94 ~ getUrlTag ~ urlObj:", urlObj);

	const path = urlObj.pathname.replace('/study', 'study');
	const urlTag = `#${path}`;

	console.debug("🚀 ~ file: main.helper.ts:99 ~ getUrlTag ~ urlTag:", urlTag);
	return urlTag
}