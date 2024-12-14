import { parseStudyUrl } from "./parseStudyUrl";

/**
 * Tries to parse the given study data string into a URL object.
 * If the parsing fails, it returns null.
 *
 * @param studyData - The study data string to be parsed.
 * @returns The parsed URL object if successful, otherwise null.
 */

export function tryParseStudyUrl(studyData: string): URL | null {
    try {
        return parseStudyUrl(studyData);
    } catch {
        return null;
    }
}
