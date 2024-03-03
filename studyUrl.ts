import { requestUrl } from "obsidian";

export default class StudyURL extends URL {
	private _activeParagraphIds: string[] | undefined;
	private _html: Document | undefined;

	/**
	 * Constructs a ParsedUrl object from the specified URL string.
	 */
	constructor(url: string) {
		url = url.trim();
		url = url.replace(/%23/g, "#");

		super(url);
	}

	/**
	 * Gets the active paragraph IDs from the URL.
	 * 
	 * // Example usage:
	 * const parsedUrl = new ParsedUrl("https://example.com/?id=p1,p3-p5");
	 * const activeParagraphIds = parsedUrl.activeParagraphIds;
	 * console.log(activeParagraphIds); // Output: ['p1', 'p3', 'p4', 'p5']
	 */
	public get activeParagraphIds(): string[] {
		if (this._activeParagraphIds === undefined) {
			this._activeParagraphIds = this.getActiveParagraphIds();
		}
		return this._activeParagraphIds;
	}

	public async getDocument(): Promise<Document> {
		if (this._html === undefined) {
			const response = await requestUrl(this.toString());
			const parser = new DOMParser();
			this._html = parser.parseFromString(response.text, "text/html");
		}

		return this._html;
	}

	private getActiveParagraphIds(): string[] {
		// Get the 'id' parameter from the URL
		const idParam = this.searchParams.get("id");

		// Split the 'id' parameter by commas if it is not null
		const idParts = idParam ? idParam.split(",") : [];

		// Create an empty list to store the paragraph IDs
		const activeParagraphIds = [];

		// Loop over the parts of the 'id' parameter
		let previousPartNumber = -1;

		for (let part of idParts) {
			if (!part.includes("p")) {
				part = `p${part}`;
			}

			// If the part contains a dash, it represents a range of paragraph IDs
			if (part.includes("-")) {
				// Split the part by the dash
				const [start, end] = part
					.split("-")
					.map((n) => Number(n.replace("p", "")));

				if (previousPartNumber > -1 && start - previousPartNumber > 1) {
					activeParagraphIds.push("-");
				}

				// Loop over the range and add each paragraph ID to the list
				for (let i = start; i <= end; i++) {
					activeParagraphIds.push("p" + i);
				}

				previousPartNumber = end;
			} else {
				const currentPartNumber = Number(part.replace("p", ""));
				if (
					previousPartNumber > -1 &&
					currentPartNumber - previousPartNumber > 1
				) {
					activeParagraphIds.push("-");
				}

				// If the part doesn't contain a dash, it represents a single paragraph ID
				activeParagraphIds.push(part);
				previousPartNumber = currentPartNumber;
			}
		}
		return activeParagraphIds;
	}
}
