import { moveLangParamToFrontOfSearchParams } from './studyUrlFormatting';

describe('moveLangParamToFrontOfSearchParams', () => {
    it('should move lang parameter to the front of search params', () => {
        // Arrange
        const url = 'https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?id=p33%23p33&lang=eng';

        // Act
        const result = moveLangParamToFrontOfSearchParams(url);

        // Assert
        const expectedUrl = 'https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?lang=eng&id=p33%23p33';
        expect(result).toEqual(expectedUrl);
    });

    it('should handle URLs without lang parameter', () => {
        // Arrange
        const url = 'https://example.com/?param1=value1&param2=value2';

        // Act
        const result = moveLangParamToFrontOfSearchParams(url);

        // Assert
        const expectedUrl = 'https://example.com/?param1=value1&param2=value2';
        expect(result).toEqual(expectedUrl);
    });

    it('should handle URLs without query parameters', () => {
        // Arrange
        const url = 'https://example.com/';

        // Act
        const result = moveLangParamToFrontOfSearchParams(url);

        // Assert
        const expectedUrl = 'https://example.com/';
        expect(result).toEqual(expectedUrl);
    });
});