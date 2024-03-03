
import StudyURL from "./studyUrl";

describe("StudyURL", () => {
	describe("constructor", () => {
		it("should trim the URL", () => {
			// Arrange
			const url = "   https://example.com   ";

			// Act
			const testSubject = new StudyURL(url);

			// Assert
			const expected = "https://example.com/";
			expect(testSubject.href).toEqual(expected);
		});

		it("should replace %23 with # in the URL", () => {
			// Arrange
			const url = "https://example.com/%23section";

			// Act
			const testSubject = new StudyURL(url);

			// Assert
			const expected = "https://example.com/#section";
			expect(testSubject.href).toEqual(expected);
		});
	});

	describe("activeParagraphIds", () => {
		it("should return an array of active paragraph IDs", () => {
			// Arrange
			const urlString = "https://example.com/?id=p1,p2-p5,p6";
			const parsedUrl = new StudyURL(urlString);

			// Act
			const result = parsedUrl.activeParagraphIds;

			// Assert
			const expectedIds = ["p1", "p2", "p3", "p4", "p5", "p6"];
			expect(result).toEqual(expectedIds);
		});

		it("should return an empty array if no active paragraph IDs are found", () => {
			// Arrange
			const urlString = "https://example.com";
			const parsedUrl = new StudyURL(urlString);

			// Act
			const result = parsedUrl.activeParagraphIds;

			// Assert
			const expectedIds: string[] = [];
			expect(result).toEqual(expectedIds);
		});
	});
});
