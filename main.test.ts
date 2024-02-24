import { GetActiveParagraphIdsFromUrl } from './main';
import { describe } from 'jest';

// Add the import statement for 'describe' from the test runner
describe('GetActiveParagraphIdsFromUrl', () => {
    it('should return an array of active paragraph IDs', () => {
        const urlString = 'https://example.com?id=p1,p2-p5,p6';
        const expectedIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

        const result = GetActiveParagraphIdsFromUrl(urlString);

        expect(result).toEqual(expectedIds);
    });

    it('should return an empty array if no active paragraph IDs are found', () => {
        const urlString = 'https://example.com';
        const expectedIds: string[] = [];

        const result = GetActiveParagraphIdsFromUrl(urlString);

        expect(result).toEqual(expectedIds);
    });
});