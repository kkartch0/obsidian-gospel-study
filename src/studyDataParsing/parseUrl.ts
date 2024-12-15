/**
 * Extracts a URL from the provided study data string.
 *
 * @param studyData - The string containing the study data which may include a study URL.
 * @returns The extracted URL as a URL object if found, otherwise throws an error.
 * @throws An error if no valid URL is found in the study data.
 */
export function parseUrl(studyData: string): URL {
    const urlRegex = /https?:\/\/.*/
    const urlMatch = studyData.match(urlRegex);
    if (!urlMatch) {
        throw new Error("No valid URL found in the study data.");
    }
    const matchedUrl = urlMatch[0];
    
    return new URL(matchedUrl);
}

