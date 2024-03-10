import {
	removeFootnotesFromParagraph,
	removePageBreaksFromParagraph,
	removeRelatedContentFromParagraph
} from "./paragraphFormatting";

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

describe("removeRelatedContentFromParagraph", () => {
	it("should remove related content from the paragraph", () => {
		// Arrange
		const input = '<span class="iconPointer-OKie_ icon-eLakR icon-ieVZ1" data-pointer-type="media" data-scroll-id="p1" title="Associated Content"><button aria-label="Associated Content" class="iconPointerButton-Z_d47"><svg class="sc-vl6hp0-0 iOmaky Icon-Sax6y" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation"> <path fill="currentColor" d="M21.523 8.984l.014 12.478H6.028L6.023 8.977l15.5.007zm-17-.772v14c0 .414.335.75.75.75h17a.75.75 0 00.75-.75v-14a.75.75 0 00-.75-.75h-17a.75.75 0 00-.75.75zm11.624 7.32c.242-.342.638-.334.88.01l2.853 4.041c.245.347.106.629-.33.629H8.089c-.418 0-.566-.286-.335-.634l3.99-6.018c.233-.35.606-.355.843.003l2.398 3.616 1.162-1.647zm2.428-2.32a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.477 1.026a.75.75 0 01.885.434l.033.096 1.314 4.905h-1.547l-1.015-3.77L2.173 6.694l1.349 5.028v5.804L.526 6.344A.75.75 0 01.96 5.46l.096-.033 16.42-4.4zm-2.86 3.613a1.5 1.5 0 011.841 1.823h-2.906a1.5 1.5 0 011.065-1.823z"> </path></svg></button></span><span class="verse-number">1 </span>And it came to pass that after we had come down into the wilderness unto our father, behold, he was filled with joy, and also my mother, Sariah, was exceedingly glad, for she truly had mourned because of us.';

		// Act
		const result = removeRelatedContentFromParagraph(input);

		// Assert
		const expectedOutput = '<span class="verse-number">1 </span>And it came to pass that after we had come down into the wilderness unto our father, behold, he was filled with joy, and also my mother, Sariah, was exceedingly glad, for she truly had mourned because of us.';
		expect(result).toEqual(expectedOutput);

	});
});


describe("removePageBreaksFromParagraph", () => {
	it("should remove multiple page breaks from the paragraph", () => {
		// Arrange
		const input =
			'This is a paragraph with <span class="page-break" data-page="page1"></span>page break and <span class="page-break"></span>another page break.';

		// Act
		const result = removePageBreaksFromParagraph(input);

		// Assert
		const expectedOutput =
			"This is a paragraph with page break and another page break.";
		expect(result).toEqual(expectedOutput);
	});
});