import { textFragmentUrlStudyDataParser } from "../../src/studyDataParsing/textFragmentCase1UrlStudyDataParser";

describe("textFragmentCase1UrlStudyDataParser", () => {
    it("isParseable returns true for invalid study data", () => {
        // Arrange
        const studyData = "https://speeches.byu.edu/talks/dale-g-renlund/observation-reason-faith-and-revelation/#:~:text=Thank%20you%2C%20brothers%20and%20sisters%2C%20for%20being%20here.";

        // Act
        const result = textFragmentUrlStudyDataParser.isParseable(studyData);

        // Assert
        expect(result).toBe(true);
    });

    it("isParseable returns false for invalid study data", () => {
        // Arrange
        const studyData = "https://speeches.byu.edu/talks/dale-g-renlund/observation-reason-faith-and-revelation/#:~:text=These%20are%20the,easier%20for%C2%A0Martin%3F%E2%80%9D";

        // Act
        const result = textFragmentUrlStudyDataParser.isParseable(studyData);

        // Assert
        expect(result).toBe(false);
    });

    it("isParseable returns false for invalid study data", () => {
        // Arrange
        const studyData = "https://example.com";

        // Act
        const result = textFragmentUrlStudyDataParser.isParseable(studyData);

        // Assert
        expect(result).toBe(false);
    });

    it("parse returns expected study block data", () => {
        // Arrange
        const studyData = "https://speeches.byu.edu/talks/dale-g-renlund/observation-reason-faith-and-revelation/#:~:text=Thank%20you%2C%20brothers%20and%20sisters%2C%20for%20being%20here.";

        // Act
        const result = textFragmentUrlStudyDataParser.parse(studyData);

        // Assert
        const paragraphElement = document.createElement("p");
        paragraphElement.textContent = "Thank you, brothers and sisters, for being here.";
        const expectedParagraphElements = [paragraphElement];

        expect(result.paragraphElements).toEqual(expectedParagraphElements);
    });
});