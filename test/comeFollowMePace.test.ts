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

		const title = `Come Follow Me: ${sourceDocument.title}`;

		// only select paragraphs with id matching the pattern "p\d+"
		const paragraphs = Array.from(sourceDocument.querySelectorAll("p[id^=p]"));
		const paragraphsByDay = divideIntoGroups(paragraphs);

		// print out paragraph ids for each day
		let oneTaskPerDay = false;

		paragraphsByDay.forEach((dayParagraphs, i) => {
			console.log(`Day ${i + 1}:`);

			if (oneTaskPerDay) {
				const readingUrl = `"${urlToRequest}&id=${dayParagraphs[0].id}-${dayParagraphs[dayParagraphs.length - 1].id}#${dayParagraphs[0].id}"`;
				console.log(`  Reading URL: ${readingUrl}`);
			} else {
				const dayTasks = dayParagraphs.map(paragraph => {
					const paragraphUrl = `${urlToRequest}&id=${paragraph.id}#${paragraph.id}`;
					const paragraphNumber = paragraph.id.replace("p", "");

					return `- [ ] [${title} (${paragraphNumber}/${paragraphs.length})](${paragraphUrl})`;
				});

				console.log(dayTasks.join("\n"));
			}
		});
}

function divideIntoGroups(paragraphs: Element[]) {
	const totalParagraphs = paragraphs.length;
	const totalWholeParagraphsPerDay = Math.floor(totalParagraphs / 7);
	let remainingExtraParagraphs = totalParagraphs % 7;

	const paragraphsByDay = [];

	let start = 0;
	let end = totalWholeParagraphsPerDay;

	for (let i = 0; i < 7; i++) {
		if (remainingExtraParagraphs > 0) {
			end++;
			remainingExtraParagraphs--;
		}

		const dayParagraphs = paragraphs.slice(start, end);
		paragraphsByDay.push(dayParagraphs);

		start += (end - start);
		end = Math.min(end + totalWholeParagraphsPerDay, totalParagraphs);
	}

	return paragraphsByDay;
}

