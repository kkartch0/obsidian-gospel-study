import { DEFAULT_SETTINGS } from "../src/gospelStudyPluginSettings";
import {
	formatParagraph
} from "../src/paragraphFormatting";

describe("formatParagraph", () => {
	it("should remove footnotes from the paragraph", () => {
		// Arrange
		const input =
			'This is a paragraph with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a> and <a class="study-note-ref" href="#"><sup class="marker">2</sup>another footnote</a>.';

		// Act
		const result = formatParagraph(input, DEFAULT_SETTINGS);

		// Assert
		const expectedOutput =
			"This is a paragraph with footnote and another footnote.";
		expect(result).toEqual(expectedOutput);
	});

	it("should remove related content from the paragraph", () => {
		// Arrange
		const input = '<span class="iconPointer-OKie_ icon-eLakR icon-ieVZ1" data-pointer-type="media" data-scroll-id="p1" title="Associated Content"><button aria-label="Associated Content" class="iconPointerButton-Z_d47"><svg class="sc-vl6hp0-0 iOmaky Icon-Sax6y" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation"> <path fill="currentColor" d="M21.523 8.984l.014 12.478H6.028L6.023 8.977l15.5.007zm-17-.772v14c0 .414.335.75.75.75h17a.75.75 0 00.75-.75v-14a.75.75 0 00-.75-.75h-17a.75.75 0 00-.75.75zm11.624 7.32c.242-.342.638-.334.88.01l2.853 4.041c.245.347.106.629-.33.629H8.089c-.418 0-.566-.286-.335-.634l3.99-6.018c.233-.35.606-.355.843.003l2.398 3.616 1.162-1.647zm2.428-2.32a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.477 1.026a.75.75 0 01.885.434l.033.096 1.314 4.905h-1.547l-1.015-3.77L2.173 6.694l1.349 5.028v5.804L.526 6.344A.75.75 0 01.96 5.46l.096-.033 16.42-4.4zm-2.86 3.613a1.5 1.5 0 011.841 1.823h-2.906a1.5 1.5 0 011.065-1.823z"> </path></svg></button></span><span class="verse-number">1 </span>And it came to pass that after we had come down into the wilderness unto our father, behold, he was filled with joy, and also my mother, Sariah, was exceedingly glad, for she truly had mourned because of us.';

		// Act
		const result = formatParagraph(input, DEFAULT_SETTINGS);

		// Assert
		const expectedOutput = '<span class="verse-number">1 </span>And it came to pass that after we had come down into the wilderness unto our father, behold, he was filled with joy, and also my mother, Sariah, was exceedingly glad, for she truly had mourned because of us.';
		expect(result).toEqual(expectedOutput);

	});
  
	it("should remove page breaks from the paragraph", () => {
		// Arrange
		const input =
			'This is a paragraph with <span class="page-break" data-page="page1"></span>page break and <span class="page-break"></span>another page break.';

		// Act
		const result = formatParagraph(input, DEFAULT_SETTINGS);

		// Assert
		const expectedOutput =
			"This is a paragraph with page break and another page break.";
		expect(result).toEqual(expectedOutput);
	});

	it("should fully qualify study links in the text", () => {
		// Arrange
		const input = 'This is a paragraph with <a href="/study/scriptures/bofm/1-ne/1.1"><sup class="marker">1</sup>study link</a> and <a href="/study/scriptures/bofm/1-ne/2.1"><sup class="marker">2</sup>another study link</a>.';

		// Act
		const result = formatParagraph(input, DEFAULT_SETTINGS);

		// Assert
		const expectedOutput = 'This is a paragraph with <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/1.1"><sup class="marker">1</sup>study link</a> and <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/2.1"><sup class="marker">2</sup>another study link</a>.';
		expect(result).toEqual(expectedOutput);
	});

	it("should not modify links that are already fully qualified", () => {
		// Arrange
		const input = 'This is a paragraph with <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/1.1"><sup class="marker">1</sup>study link</a> and <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/2.1"><sup class="marker">2</sup>another study link</a>.';

		// Act
		const result = formatParagraph(input, DEFAULT_SETTINGS);

		// Assert
		const expectedOutput = 'This is a paragraph with <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/1.1"><sup class="marker">1</sup>study link</a> and <a href="https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/2.1"><sup class="marker">2</sup>another study link</a>.';
		expect(result).toEqual(expectedOutput);
	});

	it("should remove scripture reference links if the setting to retain them is disabled", () => {
		// Arrange
		const input = 'See <a class="scripture-ref" href="https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/21?lang=eng">2&nbsp;Nephi 21–22</a> and <a class="scripture-ref" href="https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/21.12?lang=eng#p12">2&nbsp;Nephi 21:12</a> for more information.';

		// Act
		const result = formatParagraph(input, {
			...DEFAULT_SETTINGS,
			retainScriptureReferenceLinks: false,
		});

		// Assert
		const expectedOutput = 'See 2&nbsp;Nephi 21–22 and 2&nbsp;Nephi 21:12 for more information.';
		expect(result).toEqual(expectedOutput);
	});

	it('should remove note-ref tags from the paragraph', () => {
		// Arrange
		const input = 'Help carry His love to His children, and some of it will splash on you.<a class="note-ref" href="/study/general-conference/2023/10/13daines?lange=eng#note30" data-scroll-id="note30"><sup class="marker">30</sup></a>';

		// Act
		const result = formatParagraph(input, DEFAULT_SETTINGS);

		// Assert
		const expectedOutput = 'Help carry His love to His children, and some of it will splash on you.';
		expect(result).toEqual(expectedOutput);

	});
});