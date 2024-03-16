
import { StudyURL } from "../src/studyUrl";

describe("StudyURL", () => {

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
