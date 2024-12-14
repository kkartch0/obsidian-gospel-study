// import { Platform } from "obsidian";
import { StudyBlockData } from "src/models/StudyBlockData";
import { StudyDataParser } from "src/models/StudyDataParser";

export const androidStudyDataParser: StudyDataParser = {
    isParseable(studyData: string): boolean {
        // if (!Platform.isAndroidApp) return false;
        const segments = getSegments(studyData);

        if (segments.length < 3) return false;

        return true;
    },

    parse(studyData: string): Partial<StudyBlockData> {
        const [paragraphText, title, _] = getSegments(studyData);

        const paragraphElement = document.createElement("p");
        paragraphElement.textContent = paragraphText;

        const paragraphElements: Element[] = [paragraphElement];

        return {
            paragraphElements,
            title
        };
    },
};

function getSegments(studyData: string): string[] {
    return studyData.split("\n\n");
}