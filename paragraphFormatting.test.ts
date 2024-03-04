import { removeFootnotesFromParagraph } from "./paragraphFormatting";

describe("removeFootnotesFromParagraph", () => {
	it("should remove footnotes from the paragraph", () => {
		// Arrange
		const input = 'This is a paragraph with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a>.';

		// Act
		const result = removeFootnotesFromParagraph(input);

		// Assert
		const expectedOutput = "This is a paragraph with footnote.";
		expect(result).toEqual(expectedOutput);
	});

	it("should remove multiple footnotes from the paragraph", () => {
		// Arrange
		const input =
			'This is a paragraph with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a> and <a class="study-note-ref" href="#"><sup class="marker">2</sup>another footnote</a>.';

		// Act
		const result = removeFootnotesFromParagraph(input);

		// Assert
		const expectedOutput =
			"This is a paragraph with footnote and another footnote.";
		expect(result).toEqual(expectedOutput);
	});

	it("should not remove other HTML tags from the paragraph", () => {
		// Arrange
		const input =
			'This is a <strong>paragraph</strong> with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a>.';

		// Act
		const result = removeFootnotesFromParagraph(input);

		// Assert
		const expectedOutput =
			"This is a <strong>paragraph</strong> with footnote.";
		expect(result).toEqual(expectedOutput);
	});

	it("should handle paragraphs without footnotes", () => {
		// Arrange
		const input = "This is a paragraph without any footnotes.";

		// Act
		const result = removeFootnotesFromParagraph(input);

		// Assert
		const expectedOutput = "This is a paragraph without any footnotes.";
		expect(result).toEqual(expectedOutput);
	});
});