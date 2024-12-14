/**
 * Extracts a study URL from the provided study data string.
 *
 * @param studyData - The string containing the study data which may include a study URL.
 * @returns The extracted URL as a URL object if found, otherwise null.
 */
export function getStudyUrl(studyData: string): URL | null {
    const urlRegex = /https:\/\/www\.churchofjesuschrist\.org\/study\/.*/;
    const urlMatch = studyData.match(urlRegex);
    if (!urlMatch) {
        return null;
    }
    const url = new URL(urlMatch[0]);
    return url;
}