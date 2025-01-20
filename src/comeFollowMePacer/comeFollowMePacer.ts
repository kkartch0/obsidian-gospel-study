import { requestUrl } from "obsidian";

export async function getTaskListFromUrl(urlToRequest: string, dateProvider: { today: () => Date; }): Promise<string> {
	const response = await requestUrl({
		url: urlToRequest, method: "GET", headers: {
			"cookie": "analytics_video_metadata_load=false"
		}
	});

	const parser = new DOMParser();
	const sourceDocument = parser.parseFromString(response.text, "text/html");

	const title = `Come Follow Me: ${sourceDocument.title}`;

	const startDate = dateProvider.today();
	// endDate is the sunday following the start date
	const endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));

	// only select paragraphs with id matching the pattern "p\d+"
	const sections = Array.from(sourceDocument.querySelectorAll(".body-block > section"));

	const taskList: string[] = [];

	sections.forEach(section => {
		const sectionTaskList = createTaskListFromSection(section, urlToRequest, startDate, endDate);
		taskList.push(sectionTaskList);
	});

	return taskList.join("\n\n");
}

function createTaskListFromSection(section: Element, urlToRequest: string, startDate: Date, endDate: Date): string {
	const paragraphs = Array.from(section.querySelectorAll("p[id^=p]"));
	const title = section.querySelector("h2")?.textContent?.trim();

	const remainingDays = endDate.getDate() - startDate.getDate() + 1; // + 1 includes today
	const paragraphsByDay = divideIntoGroups(paragraphs, remainingDays);

	// print out paragraph ids for each day
	const oneTaskPerDay = true;

	const taskList: string[] = [];

	const scheduledDate = new Date(startDate);

	paragraphsByDay.forEach((dayParagraphs, i) => {
		if (oneTaskPerDay) {
			if (dayParagraphs.length == 0) return;

			const startId = dayParagraphs[0].id;
			const endId = dayParagraphs[dayParagraphs.length - 1].id;
			const readingUrl = `${urlToRequest}&id=${startId}-${endId}#${startId}`;

			taskList.push(`- [ ] [${title} (${startId}-${endId})](${readingUrl}) ⏳ ${scheduledDate.toLocaleDateString('en-CA')}`);

		} else {
			const dayTasks = dayParagraphs.forEach(paragraph => {
				const paragraphUrl = `${urlToRequest}&id=${paragraph.id}#${paragraph.id}`;
				const paragraphNumber = paragraph.id.replace("p", "");

				taskList.push(`- [ ] [${title} (${paragraphNumber}/${paragraphs.length})](${paragraphUrl}) ⏳ ${scheduledDate.toLocaleDateString('en-CA')}`);
			});
		}

		scheduledDate.setDate(scheduledDate.getDate() + 1);
	});

	return taskList.join("\n");
}

function divideIntoGroups(paragraphs: Element[], numberOfGroups: number) {
	const totalParagraphs = paragraphs.length;
	const totalWholeParagraphsPerDay = Math.floor(totalParagraphs / numberOfGroups);
	let remainingExtraParagraphs = totalParagraphs % numberOfGroups;

	const paragraphsByDay = [];

	let start = 0;
	let end = totalWholeParagraphsPerDay;

	for (let i = 0; i < numberOfGroups; i++) {
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