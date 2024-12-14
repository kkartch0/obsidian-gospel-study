import { StudyDataParserResult } from "src/models/StudyDataParserResult";
import { standardUrlStudyDataParser } from "../../src/studyDataParsers/standardUrlStudyDataParser";

describe("standardStudyDataParser", () => {
	let studyData: string;

	describe("isParseable", () => {
		let parseableResult: boolean;

		const act = () => {
			parseableResult = standardUrlStudyDataParser.isParseable(studyData);
		};

		describe("a number-only paragraph ID", () => {
			beforeEach(() => {
				studyData = "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=eng&id=2#p2";

				act();
			});

			it("should not be parseable", () => {
				expect(parseableResult).toBe(false);
			});
		});

		describe("a URL without an ID parameter", () => {
			beforeEach(() => {
				studyData = "https://www.churchofjesuschrist.org/study/general-conference/2023/10/43parrella.p20?lang=eng#p20";

				act();
			});

			it("should not be parseable", () => {
				expect(parseableResult).toBe(false);
			});
		});

		describe("a URL with an ID parameter", () => {
			beforeEach(() => {
				studyData = "https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&id=p8";

				act();
			});

			it("should be parseable", () => {
				expect(parseableResult).toBe(true);
			});
		});

		describe("a URL with a range of paragraphs", () => {
			beforeEach(() => {
				studyData = "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2#p1";

				act();
			});

			it("should be parseable", () => {
				expect(parseableResult).toBe(true);
			});
		});

		describe("a URL with multiple ranges of paragraphs", () => {
			beforeEach(() => {
				studyData = "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2,p4,p6-p9#p1";

				act();
			});

			it("should be parseable", () => {
				expect(parseableResult).toBe(true);
			});
		});
	});

	describe("parse", () => {
		let parseResult: StudyDataParserResult;

		const act = () => {
			parseResult = standardUrlStudyDataParser.parse(studyData);
		};

		describe("a URL with a single ID", () => {
			beforeEach(() => {
				studyData = "https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&id=p8";

				act();
			});

			it("should retrieve the paragraph ID", () => {
				expect(parseResult.paragraphIdItems).toStrictEqual(["p8"]);
			});

			it("should format the number from the ID", () => {
				expect(parseResult.paragraphIdsString).toBe("8");
			});
		});

		describe("a URL with a range of IDs", () => {
			beforeEach(() => {
				studyData = "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p4#p1";

				act();
			});

			it("should retrieve all the paragraph IDs", () => {
				expect(parseResult.paragraphIdItems).toStrictEqual(["p1-p4"]);
			});

			it("should format the range with a hyphen", () => {
				expect(parseResult.paragraphIdsString).toBe("1-4");
			});
		});

		describe("a URL with multiple ranges of IDs", () => {
			beforeEach(() => {
				studyData = "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2,p4,p6-p9#p1";

				act();
			});

			it("should retrieve all the paragraph IDs", () => {
				expect(parseResult.paragraphIdItems).toStrictEqual(["p1-p2", "p4", "p6-p9"]);
			});

			it("should format all the ranges, separated by commas.", () => {
				expect(parseResult.paragraphIdsString).toBe("1-2, 4, 6-9");
			});
		});
	});
});
