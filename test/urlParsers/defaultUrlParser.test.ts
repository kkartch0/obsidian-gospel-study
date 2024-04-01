import { UrlParseResult } from "src/models/UrlParseResult";
import { defaultUrlParser } from "../../src/urlParsers/defaultUrlParser";

describe("defaultUrlParser", () => {
	let url: URL;

	describe("isParseable", () => {
		let parseableResult: boolean;

		const act = () => {
			parseableResult = defaultUrlParser.isParseable(url);
		};

		describe("a number-only paragraph ID", () => {
			beforeEach(() => {
				url = new URL("https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=eng&id=2#p2");

				act();
			});

			it("should not be parseable", () => {
				expect(parseableResult).toBe(false);
			});
		});

		describe("a URL without an ID parameter", () => {
			beforeEach(() => {
				url = new URL("https://www.churchofjesuschrist.org/study/general-conference/2023/10/43parrella.p20?lang=eng#p20");

				act();
			});

			it("should not be parseable", () => {
				expect(parseableResult).toBe(false);
			});
		});

		describe("a URL with an ID parameter", () => {
			beforeEach(() => {
				url = new URL("https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&id=p8");

				act();
			});

			it("should be parseable", () => {
				expect(parseableResult).toBe(true);
			});
		});

		describe("a URL with a range of paragraphs", () => {
			beforeEach(() => {
				url = new URL("https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2#p1");

				act();
			});

			it("should be parseable", () => {
				expect(parseableResult).toBe(true);
			});
		});

		describe("a URL with multiple ranges of paragraphs", () => {
			beforeEach(() => {
				url = new URL("https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2,p4,p6-p9#p1");

				act();
			});

			it("should be parseable", () => {
				expect(parseableResult).toBe(true);
			});
		});
	});

	describe("getParagraphIds", () => {
		let parseResult: UrlParseResult;

		const act = () => {
			parseResult = defaultUrlParser.getParagraphIDs(url);
		};

		describe("a URL with a single ID", () => {
			beforeEach(() => {
				url = new URL("https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&id=p8");

				act();
			});

			it("should retrieve the paragraph ID", () => {
				expect(parseResult.paragraphIds).toStrictEqual(["p8"]);
			});

			it("should format the number from the ID", () => {
				expect(parseResult.displayParagraphIds).toBe("8");
			});
		});

		describe("a URL with a range of IDs", () => {
			beforeEach(() => {
				url = new URL("https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p4#p1");

				act();
			});

			it("should retrieve all the paragraph IDs", () => {
				expect(parseResult.paragraphIds).toStrictEqual(["p1", "p2", "p3", "p4"]);
			});

			it("should format the range with a hyphen", () => {
				expect(parseResult.displayParagraphIds).toBe("1-4");
			});
		});

		describe("a URL with multiple ranges of IDs", () => {
			beforeEach(() => {
				url = new URL("https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2,p4,p6-p9#p1");

				act();
			});

			it("should retrieve all the paragraph IDs", () => {
				expect(parseResult.paragraphIds).toStrictEqual(["p1", "p2", "-", "p4", "-", "p6", "p7", "p8", "p9"]);
			});

			it("should format all the ranges, separated by commas.", () => {
				expect(parseResult.displayParagraphIds).toBe("1-2, 4, 6-9");
			});
		});
	});
});
