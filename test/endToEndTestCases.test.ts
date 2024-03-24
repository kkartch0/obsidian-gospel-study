import fs from 'fs';
import yaml from '../node_modules/yaml/dist';

let fileNames: string[] = [];

// get list of file names in the "endToEndTestCases" directory
fileNames = fs.readdirSync('./test/endToEndTestCases');
console.log(fileNames);

describe('get study block text from url', () => {
    // for each file in the "endToEndTestCases" directory, create a test case
    fileNames.forEach((file) => {
        test(`run test case for ${file}`, async () => {
            // read the file
            const fileContents = fs.readFileSync(`./test/endToEndTestCases/${file}`, 'utf8');

            // parse to yaml
            const parsedFile = yaml.parse(fileContents);

            console.log(parsedFile);
        });
    });
});
