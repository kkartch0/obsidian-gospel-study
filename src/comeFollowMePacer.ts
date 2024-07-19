import { requestUrl } from "obsidian";

export async function getTaskListFromUrl(urlToRequest: string): Promise<string> {
	const response = await requestUrl({
		url: urlToRequest, method: "GET", headers: {
			"cookie": "analytics_video_metadata_load=false"
		}
	});

	const parser = new DOMParser();
	const sourceDocument = parser.parseFromString(response.text, "text/html");

	const startDate = getStartDateFromTitle(sourceDocument.title);
	const title = `Come Follow Me: ${sourceDocument.title}`;

	// endDate is startDate + 7 days
	const endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + 6);

	// only select paragraphs with id matching the pattern "p\d+"
	const sections = Array.from(sourceDocument.querySelectorAll(".body-block > section"));

	const taskList: string[] = [];

	sections.forEach(section => {
		taskList.push(createTaskListFromSection(section, urlToRequest));
	});

	return taskList.join("\n\n");
}

/// Function that gets the start date from the title of a Come Follow Me chapter /// e.g. given 'July 15–21: “The Virtue of the Word of God.” Alma 30–31', return start date of July 15
/// given 'July 28–August 4: “Look to God and Live.” Alma 36–38', return start date of July 29
export function getStartDateFromTitle(title: string): Date {
	const dateRangeString = title.split(":")[0];
	const startDateString = dateRangeString.split("–")[0].trim();
	const startDate = new Date(`${startDateString}, 2024`);

	return startDate;
}

function createTaskListFromSection(section: Element, urlToRequest: string): string {
	const paragraphs = Array.from(section.querySelectorAll("p[id^=p]"));
	const title = section.querySelector("h2")?.textContent;

	const paragraphsByDay = divideIntoGroups(paragraphs);

	// print out paragraph ids for each day
	let oneTaskPerDay = true;

	const taskList: string[] = [];

	paragraphsByDay.forEach((dayParagraphs, i) => {
		taskList.push(`Day ${i + 1}`);

		if (oneTaskPerDay) {
			if (dayParagraphs.length == 0) return;

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