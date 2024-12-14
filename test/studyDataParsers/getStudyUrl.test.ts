import { getStudyUrl } from '../../src/studyDataParsers/getStudyUrl';

describe('getStudyUrl', () => {
    it('should return a URL object when a valid study URL is present in the string', () => {
        const studyData = 'Here is the link: https://www.churchofjesuschrist.org/study/some-study-material';
        const result = getStudyUrl(studyData);
        expect(result).not.toBeNull();
        expect(result?.href).toBe('https://www.churchofjesuschrist.org/study/some-study-material');
    });

    it('should return null when no study URL is present in the string', () => {
        const studyData = 'There is no valid URL here.';
        const result = getStudyUrl(studyData);
        expect(result).toBeNull();
    });

    it('should return null when the URL does not match the expected pattern', () => {
        const studyData = 'Here is a different link: https://www.example.com/study/some-study-material';
        const result = getStudyUrl(studyData);
        expect(result).toBeNull();
    });
});