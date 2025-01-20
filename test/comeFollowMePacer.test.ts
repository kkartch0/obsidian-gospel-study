import { getTaskListFromUrl } from "../src/comeFollowMePacer/comeFollowMePacer";

describe("comeFollowMePacer", () => {
	it("should make a list of tasks from the specified url", async () => {
		// Arrange
		const dateProvider = { today: () => new Date(2025, 0, 20) };

		// Act
		const taskList = await getTaskListFromUrl(
			"https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng", 
			dateProvider
		);

		// Assert
		const expectedText = `
- [ ] [Ideas for Learning at Home and at Church (p3-p5)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p3-p5#p3) ⏳ 2025-01-20
- [ ] [Ideas for Learning at Home and at Church (p6-p7)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p6-p7#p6) ⏳ 2025-01-21
- [ ] [Ideas for Learning at Home and at Church (p8-p9)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p8-p9#p8) ⏳ 2025-01-22
- [ ] [Ideas for Learning at Home and at Church (p10-p11)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p10-p11#p10) ⏳ 2025-01-23
- [ ] [Ideas for Learning at Home and at Church (p12-p13)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p12-p13#p12) ⏳ 2025-01-24
- [ ] [Ideas for Learning at Home and at Church (p14-p15)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p14-p15#p14) ⏳ 2025-01-25
- [ ] [Ideas for Learning at Home and at Church (p16-p17)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p16-p17#p16) ⏳ 2025-01-26

- [ ] [Ideas for Teaching Children (p18-p18)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p18-p18#p18) ⏳ 2025-01-20
- [ ] [Ideas for Teaching Children (p19-p19)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p19-p19#p19) ⏳ 2025-01-21
- [ ] [Ideas for Teaching Children (p20-p20)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p20-p20#p20) ⏳ 2025-01-22
- [ ] [Ideas for Teaching Children (p21-p21)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p21-p21#p21) ⏳ 2025-01-23
- [ ] [Ideas for Teaching Children (p22-p22)](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/29?lang=eng&id=p22-p22#p22) ⏳ 2025-01-24`;

		expect(taskList).toEqual(expectedText);
	});
});