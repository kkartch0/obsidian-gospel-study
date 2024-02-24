export function getActiveParagraphIdsFromUrl(urlString: string) {
	const url = new URL(urlString);

	// Get the 'id' parameter from the URL
	const idParam = url.searchParams.get('id');
	console.debug("🚀 ~ MyPlugin ~ idParam:", idParam)

	// Split the 'id' parameter by commas if it is not null
	const idParts = idParam ? idParam.split(',') : [];
	console.debug("🚀 ~ MyPlugin ~ idParts:", idParts)


	// Create an empty list to store the paragraph IDs
	const activeParagraphIds = [];

	// Loop over the parts of the 'id' parameter
	for (const part of idParts) {
		console.debug("🚀 ~ MyPlugin ~ part:", part)

		// If the part contains a dash, it represents a range of paragraph IDs
		if (part.includes('-')) {
			// Split the part by the dash
			const [start, end] = part.split('-').map((n) => Number(n.replace('p', '')));
			console.debug("🚀 ~ MyPlugin ~ end:", end)
			console.debug("🚀 ~ MyPlugin ~ start:", start)


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
 * replace all anchor tags in el.innerHTML that have class "study-note-ref" with their inner text (minus <sup> tag)
* for example <a class="study-note-ref" href="/study/scriptures/bofm/2-ne/6?lang=eng&amp;id=12#note11a" data-scroll-id="note11a"><sup class="marker">a</sup>perish</a> with perish
* <a class="note-ref" href="/study/general-conference/2023/10/11bednar?lang=eng#note3" data-scroll-id="note3"><sup class="marker">3</sup></a> should be removed.
*/
export function removeFootnotesFromParagraph(text: string): string {
	return text.replace(/<a[^<]*class="study-note-ref"[^<]* href="[^<]*"><sup class="marker">.?<\/sup>([^<]*)<\/a>/g, "$1");
}