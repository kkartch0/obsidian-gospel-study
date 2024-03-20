
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

		it("should return correct active paragraph IDs for children's song books links when given range of paragraphs", () => {
			// Arrange
			const urlString = "https://www.churchofjesuschrist.org/study/manual/childrens-songbook/a-childs-prayer?lang=eng&id=figure1_p3-figure1_p6#figure1_p3";
			const testSubject = new StudyURL(urlString);

			// Act
			const result = testSubject.activeParagraphIds;

			// Assert
			const expectedIds = ["figure1_p3", "figure1_p4", "figure1_p5", "figure2_p6"];
			expect(result).toEqual(expectedIds);
		});

		it("should return correct active paragraph IDs for children's song books links when given separated paragraphs", () => {
			// Arrange
			const urlString = "https://www.churchofjesuschrist.org/study/manual/childrens-songbook/a-childs-prayer?lang=eng&id=figure1_p3,figure1_p4#figure1_p3";
			const testSubject = new StudyURL(urlString);

			// Act
			const result = testSubject.activeParagraphIds;

			// Assert
			const expectedIds = ["figure1_p3", "figure1_p4"];
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
