import { textFragmentUrlStudyDataParser } from "../../src/studyDataParsing/textFragmentUrlStudyDataParser";

describe("textFragmentUrlStudyDataParser", () => {
    it("isParseable returns true for valid study data", () => {
        // Arrange
        const studyData = "https://speeches.byu.edu/talks/dale-g-renlund/observation-reason-faith-and-revelation/#:~:text=These%20are%20the,easier%20for%C2%A0Martin%3F%E2%80%9D";

        // Act
        const result = textFragmentUrlStudyDataParser.isParseable(studyData);

        // Assert
        expect(result).toBe(true);
    });

    it("isParseable returns false for invalid study data", () => {
        // Arrange
        const studyData = "https://example.com";

        // Act
        const result = textFragmentUrlStudyDataParser.isParseable(studyData);

        // Assert
        expect(result).toBe(false);
    });
});