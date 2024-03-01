import StudyBlockFactory from "./StudyBlockFactory";

describe("StudyBlockFactory", () => {
	let studyBlockFactory: StudyBlockFactory;

	beforeEach(() => {
		studyBlockFactory = new StudyBlockFactory();
	});

	describe("removeFootnotesFromParagraph", () => {
		it("should remove footnotes from the paragraph", () => {
			const input =
				'This is a paragraph with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a>.';
			const expectedOutput = "This is a paragraph with footnote.";

			const result =
				studyBlockFactory.removeFootnotesFromParagraph(input);

			expect(result).toEqual(expectedOutput);
		});

		it("should remove multiple footnotes from the paragraph", () => {
			const input =
				'This is a paragraph with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a> and <a class="study-note-ref" href="#"><sup class="marker">2</sup>another footnote</a>.';
			const expectedOutput =
				"This is a paragraph with footnote and another footnote.";

			const result =
				studyBlockFactory.removeFootnotesFromParagraph(input);

			expect(result).toEqual(expectedOutput);
		});

		it("should not remove other HTML tags from the paragraph", () => {
			const input =
				'This is a <strong>paragraph</strong> with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a>.';
			const expectedOutput =
				"This is a <strong>paragraph</strong> with footnote.";

			const result =
				studyBlockFactory.removeFootnotesFromParagraph(input);

			expect(result).toEqual(expectedOutput);
		});

		it("should handle paragraphs without footnotes", () => {
			const input = "This is a paragraph without any footnotes.";
			const expectedOutput = "This is a paragraph without any footnotes.";

			const result =
				studyBlockFactory.removeFootnotesFromParagraph(input);

			expect(result).toEqual(expectedOutput);
		});
	});
});
