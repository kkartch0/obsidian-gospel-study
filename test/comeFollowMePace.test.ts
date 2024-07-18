import { requestUrl } from "obsidian";
import { cwd } from "process";

describe("comeFollowMePacer", () => {
	it("should make a list of paragraphs", async () => {
		const paragraphs = await getParagraphsFromUrl("https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng");

	});
});

async function getParagraphsFromUrl(urlToRequest: string) {
        const response = await requestUrl({
            url: urlToRequest, method: "GET", headers: {
                "cookie": "analytics_video_metadata_load=false"
            }
        });

		const parser = new DOMParser();
		const sourceDocument = parser.parseFromString(response.text, "text/html");

		// only select paragraphs with id matching the pattern "p\d+"
		const paragraphs = Array.from(sourceDocument.querySelectorAll("p[id^=p]"));
		const paragraphsByDay = divideIntoGroups(paragraphs);

		// print out paragraph ids for each day
		paragraphsByDay.forEach((day, i) => {
			console.log(`Day ${i + 1}:`);
			day.forEach(p => console.log(p.id));
		});
}

function divideIntoGroups(paragraphs: Element[]) {
	const totalParagraphs = paragraphs.length;
	const totalWholeParagraphsPerDay = Math.floor(totalParagraphs / 7);
	let remainingExtraParagraphs = totalParagraphs % 7;

	const paragraphsByDay = [];

	for (let i = 0; i < 7; i++) {
		const start = i * totalWholeParagraphsPerDay;

		let end = Math.min((i + 1) * totalWholeParagraphsPerDay, totalParagraphs);
		if (remainingExtraParagraphs > 0) {
			end++;
			remainingExtraParagraphs--;
		}

		const dayParagraphs = paragraphs.slice(start, end);
		paragraphsByDay.push(dayParagraphs);
	}

	return paragraphsByDay;
}

