/**
 * Checks if the provided study data contains a study URL from the Church of Jesus Christ of Latter-day Saints.
 *
 * @param studyData - The study data as a string.
 * @returns `true` if the study data contains the study URL, otherwise `false`.
 */
export function containsStudyUrl(studyData: string): boolean {
    return studyData.includes("https://www.churchofjesuschrist.org/study/");
}