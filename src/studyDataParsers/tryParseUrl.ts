import { parseUrl } from "./parseUrl";

/**
 * Tries to parse the given study data string into a URL object.
 * If the parsing fails, it returns null.
 *
 * @param studyData - The study data string to be parsed.
 * @returns The parsed URL object if successful, otherwise null.
 */

export function tryParseUrl(studyData: string): URL | null {
    try {
        return parseUrl(studyData);
    } catch {
        return null;
    }
}
