import { requestUrl } from "obsidian";
import { moveLangParamToFrontOfSearchParams, replacePercent23WithHash } from "./studyUrlFormatting";

/**
 * Represents a study URL (i.e. of the format "https://churchofjesuschrist.org/study/*"). This class extends the 
 * built-in URL class by providing additional functionality for standardizing the format, interpreting URL params, 
 * and requesting the associated html document.
 */
export class StudyURL extends URL {
	private _activeParagraphIds: string[] | undefined;
	private _html: Document | undefined;

	/**
	 * Constructs an instance of StudyUrl from the specified URL string.
	 * @param url - The URL string.
	 */
	public constructor(url: string) {
		url = url.trim();

		url = moveLangParamToFrontOfSearchParams(url);

		super(url);
	}


	/**
	 * Gets the active paragraph IDs from the URL.
	 * 
	 * @example
	 * const parsedUrl = new StudyURL("https://example.com/?id=p1,p3-p5,p7");
	 * const activeParagraphIds = parsedUrl.activeParagraphIds;
	 * console.log(activeParagraphIds); // Output: ['p1', '-', 'p3', 'p4', 'p5', '-', 'p7']
	 */
	public get activeParagraphIds(): string[] {
		if (this._activeParagraphIds === undefined) {
			this._activeParagraphIds = this.getActiveParagraphIds();
		}
		return this._activeParagraphIds;
	}

	/**
	 * Retrieves the document associated with the study URL.
	 * If the document has not been fetched yet, it makes a request to the URL and parses the response into an HTML document.
	 * Subsequent calls to this method will return the cached HTML document.
	 * 
	 * @returns A promise that resolves to the HTML document.
	 */
	public async getAssociatedDocument(): Promise<Document> {
		if (this._html === undefined) {
			const response = await requestUrl(this.toString());
			const parser = new DOMParser();
			this._html = parser.parseFromString(response.text, "text/html");
		}

		return this._html;
	}

	/**
	 * Retrieves the active paragraph IDs based on the search parameters.
	 * @returns An array of active paragraph IDs.
	 */
	private getActiveParagraphIds(): string[] {
		const idParam = this.searchParams.get("id");
		const idParts = idParam ? idParam.split(",") : [];
		const activeParagraphIds: string[] = [];

		for (let part of idParts) {
			if (part.includes("-")) { // It is a range of paragraphs
				const paragraphIdsInRange = this.paragraphRangeToParagraphIds(part);
				activeParagraphIds.push(...paragraphIdsInRange);
			} else { // It is a single paragraph
				if (!part.contains('p')) { // sometimes the url does not have the 'p' prefix and just has the number
					part = `p${part}`;  // the p prefix is important for the rest of the code to work so we add it here
				}

				activeParagraphIds.push(part);
			}
		}

		this.insertHyphenBetweenNonContiguousParagraphs(activeParagraphIds);

		return activeParagraphIds;
	}

	/**
	 * Inserts hyphens between non-contiguous paragraphs in the activeParagraphIds array.
	 * @param activeParagraphIds - The array of paragraph IDs to insert hyphens into.
	 * @example 
	 * const activeParagraphIds = ['p1', 'p3', 'p5', 'p6', 'p7', 'p10'];
	 * this.insertEllipsesBetweenNonContiguousParagraphs(activeParagraphIds);
	 * console.log(activeParagraphIds); // Output: ['p1','-', 'p3', '-', 'p5', 'p6', 'p7', '-', 'p10']
	 */
	private insertHyphenBetweenNonContiguousParagraphs(activeParagraphIds: string[]): void {
		activeParagraphIds.sort();
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

	/**
	 * Converts a paragraph range string to an array of paragraph IDs.
	 * @param range - The paragraph range string in the format "startId-endId".
	 * @returns An array of paragraph IDs.
	 */
	private paragraphRangeToParagraphIds(range: string): string[] {
		const [startId, endId] = range.split("-");

		const start = Number(startId.replace("p", ""));
		const end = Number(endId.replace("p", ""));

		const paragraphIds: string[] = [];

		for (let i = start; i <= end; ++i) {
			paragraphIds.push(`p${i}`);
		}

		return paragraphIds;
	}
}
