import { getStartDateFromTitle, getTaskListFromUrl } from "../src/comeFollowMePacer/comeFollowMePacer";

describe("comeFollowMePacer", () => {
	it("should make a list of tasks from the specified url", async () => {
		// Arrange
		// Act
		const taskList = await getTaskListFromUrl("https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng");

		// Assert
		const expectedText = `
- [ ] [Ideas for Learning at Home and at Church (p3-p3)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p3-p3#p3) ⏳ 2024-08-03
- [ ] [Ideas for Learning at Home and at Church (p4-p4)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p4-p4#p4) ⏳ 2024-08-04
- [ ] [Ideas for Learning at Home and at Church (p5-p5)](https://www.churchofjesuschrist.org/study/…t.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p20-p20#p20) ⏳ 2024-08-05
- [ ] [Ideas for Teaching Children (p21-p21)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p21-p21#p21) ⏳ 2024-08-06
- [ ] [Ideas for Teaching Children (p22-p22)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p22-p22#p22) ⏳ 2024-08-07
`
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