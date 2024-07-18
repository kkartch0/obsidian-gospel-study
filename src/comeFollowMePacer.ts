import { requestUrl } from "obsidian";

export async function getTaskListFromUrl(urlToRequest: string): Promise<string> {
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
	let oneTaskPerDay = true;

	const taskList: string[] = [];

	paragraphsByDay.forEach((dayParagraphs, i) => {
		taskList.push(`Day ${i + 1}`);

		if (oneTaskPerDay) {
			const startId = dayParagraphs[0].id;
			const endId = dayParagraphs[dayParagraphs.length - 1].id;
			const readingUrl = `${urlToRequest}&id=${startId}-${endId}#${startId}`;

			taskList.push(`- [ ] [${title} (${startId}-${endId})](${readingUrl})`);

		} else {
			const dayTasks = dayParagraphs.forEach(paragraph => {
				const paragraphUrl = `${urlToRequest}&id=${paragraph.id}#${paragraph.id}`;
				const paragraphNumber = paragraph.id.replace("p", "");

				taskList.push(`- [ ] [${title} (${paragraphNumber}/${paragraphs.length})](${paragraphUrl})`);
			});
		}
	});

	return taskList.join("\n\n");
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