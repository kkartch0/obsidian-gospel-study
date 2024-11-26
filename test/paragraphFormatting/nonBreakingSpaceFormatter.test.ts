import { DEFAULT_SETTINGS } from "../../src/defaultPluginSettings";
import { nonBreakingSpaceFormatter } from "../../src/paragraphFormatting/nonBreakingSpaceFormatter";

describe("nonBreakingSpaceFormatter", () => {
    describe("isEnabled", () => {
        it("should return true if the settings do not retain non-breaking spaces", () => {
            // Arrange
            const settings = { ...DEFAULT_SETTINGS, retainNonBreakingSpaces: false };

            // Act
            const result = nonBreakingSpaceFormatter.isEnabled(settings);

            // Assert
            expect(result).toBe(true);
        });

        it("should return false if the settings retain non-breaking spaces", () => {
            // Arrange
            const settings = { ...DEFAULT_SETTINGS, retainNonBreakingSpaces: true };

            // Act
            const result = nonBreakingSpaceFormatter.isEnabled(settings);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe("format", () => {
        it("should remove all non-breaking spaces from the paragraph", () => {
            // Arrange
            const input = "This is a paragraph with&nbsp;non-breaking&nbsp;spaces.";

            // Act
            const result = nonBreakingSpaceFormatter.format(input);

            // Assert
            const expectedOutput = "This is a paragraph with non-breaking spaces.";
            expect(result).toEqual(expectedOutput);
        });
    });
});