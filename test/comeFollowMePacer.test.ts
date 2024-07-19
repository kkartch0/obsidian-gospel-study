import { getStartDateFromTitle, getTaskListFromUrl } from "../src/comeFollowMePacer";

describe("comeFollowMePacer", () => {
	it("should make a list of tasks from the specified url", async () => {
		// Arrange
		// Act
		const taskList = await getTaskListFromUrl("https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng");

		// Assert
		const expectedText = `Day 1

- [ ] [Come Follow Me: July 15–21: “The Virtue of the Word of God.” Alma 30–31 (p1-p4)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p1-p4#p1)

Day 2

- [ ] [Come Follow Me: July 15–21: “The Virtue of the Word of God.” Alma 30–31 (p5-p7)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p5-p7#p5)

Day 3

- [ ] [Come Follow Me: July 15–21: “The Virtue of the Word of God.” Alma 30–31 (p8-p10)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p8-p10#p8)

Day 4

- [ ] [Come Follow Me: July 15–21: “The Virtue of the Word of God.” Alma 30–31 (p11-p13)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p11-p13#p11)

Day 5

- [ ] [Come Follow Me: July 15–21: “The Virtue of the Word of God.” Alma 30–31 (p14-p16)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p14-p16#p14)

Day 6

- [ ] [Come Follow Me: July 15–21: “The Virtue of the Word of God.” Alma 30–31 (p17-p19)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p17-p19#p17)

Day 7

- [ ] [Come Follow Me: July 15–21: “The Virtue of the Word of God.” Alma 30–31 (p20-p22)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p20-p22#p20)`

		expect(taskList).toBe(expectedText);
	});
});

describe("getStartDateFromTitle", () => {
	const cases = [
		["July 15–21: “The Virtue of the Word of God.” Alma 30–31", "July 15, 2024"],
		["July 29–August 4: “Look to God and Live.” Alma 36–38", "July 29, 2024"]
	];

	test.each(cases)("given title of '%s', returns start date of '%s'", (title, expectedStartDateString) => {
		// Arrange
		// Act
		const startDate = getStartDateFromTitle(title);

		// Assert
		const expectedStartDate = new Date(expectedStartDateString);
		expect(startDate).toStrictEqual(expectedStartDate);
	});
});