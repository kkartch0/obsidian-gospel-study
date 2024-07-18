import { requestUrl } from "obsidian";

describe("comeFollowMePacer", () => {
	it("should make a list of paragraphs", () => {
		const paragraphs = getParagraphsFromUrl("https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng");

	});
});
async function getParagraphsFromUrl(urlToRequest: string) {
        const response = fetch(urlToRequest);

		const parser = new DOMParser();
		const sourceDocument = parser.parseFromString(response.text, "text/html");
		const paragraphs = sourceDocument.querySelectorAll("p");

		

}

