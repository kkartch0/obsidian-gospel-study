import { standardizeSearchParams } from "../../src/studyUrlFormatting";

/**
 * Extracts a study URL from the provided study data string.
 *
 * @param studyData - The string containing the study data which may include a study URL.
 * @returns The extracted URL as a URL object if found, otherwise null.
 */
export function parseStudyUrl(studyData: string): URL {
    const urlRegex = /https:\/\/www\.churchofjesuschrist\.org\/study\/.*/;
    const urlMatch = studyData.match(urlRegex);
    if (!urlMatch) {
        throw new Error("No valid URL found in the study data.");
    }

    const matchedUrl = urlMatch[0];
    const url = standardizeSearchParams(matchedUrl);
    
    return new URL(url);
}

