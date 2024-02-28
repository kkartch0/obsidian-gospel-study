import { getActiveParagraphIdsFromUrl, removeFootnotesFromParagraph } from './main.helper';

// Add the import statement for 'describe' from the test runner
describe('GetActiveParagraphIdsFromUrl', () => {
    it('should return an array of active paragraph IDs', () => {
        const urlString = 'https://example.com?id=p1,p2-p5,p6';
        const expectedIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

        const result = getActiveParagraphIdsFromUrl(urlString);

        expect(result).toEqual(expectedIds);
    });

    it('should return an empty array if no active paragraph IDs are found', () => {
        const urlString = 'https://example.com';
        const expectedIds: string[] = [];

        const result = getActiveParagraphIdsFromUrl(urlString);

        expect(result).toEqual(expectedIds);
    });
});

describe('removeFootnotesFromParagraph', () => {
    it('should remove footnotes from the paragraph', () => {
        const input = 'This is a paragraph with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a>.';
        const expectedOutput = 'This is a paragraph with footnote.';

        const result = removeFootnotesFromParagraph(input);

        expect(result).toEqual(expectedOutput);
    });

    it('should remove multiple footnotes from the paragraph', () => {
        const input = 'This is a paragraph with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a> and <a class="study-note-ref" href="#"><sup class="marker">2</sup>another footnote</a>.';
        const expectedOutput = 'This is a paragraph with footnote and another footnote.';

        const result = removeFootnotesFromParagraph(input);

        expect(result).toEqual(expectedOutput);
    });

    it('should not remove other HTML tags from the paragraph', () => {
        const input = 'This is a <strong>paragraph</strong> with <a class="study-note-ref" href="#"><sup class="marker">1</sup>footnote</a>.';
        const expectedOutput = 'This is a <strong>paragraph</strong> with footnote.';

        const result = removeFootnotesFromParagraph(input);

        expect(result).toEqual(expectedOutput);
    });

    it('should handle paragraphs without footnotes', () => {
        const input = 'This is a paragraph without any footnotes.';
        const expectedOutput = 'This is a paragraph without any footnotes.';

        const result = removeFootnotesFromParagraph(input);

        expect(result).toEqual(expectedOutput);
    });
});
