
import { StudyURL } from "./studyUrl";

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
		it("should include hyphens in array of returned active paragraph IDs when ids are non-contiguous", () => {
			// Arrange
			const urlString = "https://example.com/?id=p1,p3-p5,p7";
			const testSubject = new StudyURL(urlString);

			// Act
			const result = testSubject.activeParagraphIds;

			// Assert
			const expectedIds = ["p1", "-", "p3", "p4", "p5", "-", "p7"];
			expect(result).toEqual(expectedIds);
		});

		it("should return an empty array if no active paragraph IDs are found", () => {
			// Arrange
			const urlString = "https://example.com";
			const testSubject = new StudyURL(urlString);

			// Act
			const result = testSubject.activeParagraphIds;

			// Assert
			const expectedIds: string[] = [];
			expect(result).toEqual(expectedIds);
		});
	});
});
