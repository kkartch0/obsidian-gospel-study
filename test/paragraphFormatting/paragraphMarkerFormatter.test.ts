import { DEFAULT_SETTINGS } from "../../src/defaultPluginSettings";
import { paragraphMarkerFormatter } from "../../src/paragraphFormatting/paragraphMarkerFormatter";
import { GospelStudyPluginSettings } from "../../src/models/GospelStudyPluginSettings";

describe('paragraphMarkerFormatter', () => {
    describe('isEnabled', () => {
        it('should return true if retainParagraphMarkers is false', () => {
            const settings: GospelStudyPluginSettings = { ...DEFAULT_SETTINGS, retainParagraphMarkers: false };
            expect(paragraphMarkerFormatter.isEnabled(settings)).toBe(true);
        });

        it('should return false if retainParagraphMarkers is true', () => {
            const settings: GospelStudyPluginSettings = { ...DEFAULT_SETTINGS, retainParagraphMarkers: true };
            expect(paragraphMarkerFormatter.isEnabled(settings)).toBe(false);
        });
    });

    describe('format', () => {
        it('should remove paragraph markers from the input paragraph', () => {
            // Arrange
            const inputParagraph = '<p>This is a paragraph.<span class="para-mark">¶</span></p>';

            // Act
            const result = paragraphMarkerFormatter.format(inputParagraph);

            // Assert
            const expectedOutput = '<p>This is a paragraph.</p>';
            expect(result).toBe(expectedOutput);
        });

        it('should return the same paragraph if there are no paragraph markers', () => {
            // Arrange
            const inputParagraph = '<p>This is a paragraph.</p>';

            // Act
            const result = paragraphMarkerFormatter.format(inputParagraph)

            // Assert
            expect(result).toBe(inputParagraph);
        });
    });
});