import fs from 'fs';
import yaml from '../node_modules/yaml/dist';
import { getStudyBlockTextFromUrl } from '../src/getStudyBlockTextFromUrl';
import { DEFAULT_SETTINGS, STUDY_BLOCK_FORMAT_1, STUDY_BLOCK_FORMAT_2 } from '../src/defaultPluginSettings';
import { GospelStudyPluginSettings } from "../src/models/GospelStudyPluginSettings";

let fileNames: string[] = [];

// Skipping these files for now, since they use URL formats different from the default.
// TODO: Remove these from this array when a URL parser is created for these URL formats.
const skippedFiles = [
	"2nephi10.24.yaml",
	"2nephi22.2.yaml"
];

// get list of file names in the "endToEndTestCases" directory
fileNames = fs.readdirSync('./test/endToEndTestCases').filter(file => !skippedFiles.includes(file));
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

            const lookupTable : { [key:string] : string }= {
                "STUDY_BLOCK_FORMAT_1": STUDY_BLOCK_FORMAT_1,
                "STUDY_BLOCK_FORMAT_2": STUDY_BLOCK_FORMAT_2,
            };

            parsedFile.pluginSettings.studyBlockFormat = (lookupTable[parsedFile.pluginSettings.studyBlockFormat] 
                || parsedFile.pluginSettings.studyBlockFormat).trim();

            const pluginSettings = { ...DEFAULT_SETTINGS, ...parsedFile.pluginSettings };

            // Act
            const result = await getStudyBlockTextFromUrl(parsedFile.pastedText, pluginSettings);

            // Assert
            expect(result).toBe(parsedFile.expectedResult.trim());
        });
    });
});
