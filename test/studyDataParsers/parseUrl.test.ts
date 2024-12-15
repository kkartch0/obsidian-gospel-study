import { parseUrl } from '../../src/studyDataParsing/parseUrl';

describe('parseUrl', () => {
    it('should extract a valid study URL from the study data string', () => {
        const studyData = 'Here is a study link: https://www.churchofjesuschrist.org/study/12345';
        const result = parseUrl(studyData);
        expect(result).toBeInstanceOf(URL);
        expect(result.href).toBe('https://www.churchofjesuschrist.org/study/12345');
    });

    it('should throw an error if no valid URL is found in the study data', () => {
        const studyData = 'This string does not contain a valid URL.';
        expect(() => parseUrl(studyData)).toThrow('No valid URL found in the study data.');
    });
});