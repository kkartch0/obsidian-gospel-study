import fs from 'fs';
import yaml from '../node_modules/yaml/dist';
import { getStudyBlockTextFromUrl } from '../src/getStudyBlockTextFromUrl';
import { DEFAULT_SETTINGS, GospelStudyPluginSettings } from '../src/gospelStudyPluginSettings';

let fileNames: string[] = [];

// get list of file names in the "endToEndTestCases" directory
fileNames = fs.readdirSync('./test/endToEndTestCases');
console.log(fileNames);

interface EndToEndTestCase {
    pastedText: string;
    pluginSettings: GospelStudyPluginSettings;
    expectedResult: string;
}

describe('get study block text from url', () => {
    // for each file in the "endToEndTestCases" directory, create a test case
    fileNames.forEach((file) => {
        test(`run test case for ${file}`, async () => {
            // Arrange
            const fileContents = fs.readFileSync(`./test/endToEndTestCases/${file}`, 'utf8');
            const parsedFile = yaml.parse(fileContents) as EndToEndTestCase;
            const pluginSettings = { DEFAULT_SETTINGS, ...parsedFile.pluginSettings };

            // Act
            const result = await getStudyBlockTextFromUrl(parsedFile.pastedText, pluginSettings);

            // Assert
            expect(result).toBe(parsedFile.expectedResult);
        });
    });
});
