import { GospelStudyPluginSettings } from "src/models/GospelStudyPluginSettings";
import { ParagraphFormatter } from "src/models/ParagraphFormatter";

/**
 * A paragraph formatter that removes paragraph markers from the input paragraph acording to the settings.
 */
export const paragraphMarkerFormatter: ParagraphFormatter = {
    isEnabled(settings: GospelStudyPluginSettings): boolean {
        return !settings.retainParagraphMarkers;
    },

    format(paragraph: string): string {
		const parser = new DOMParser();
		const doc = parser.parseFromString(paragraph, 'text/html');

        const paragraphMarkers = doc.querySelectorAll('.para-mark');

        paragraphMarkers.forEach((element): void => {
            element.remove();
        });

        paragraph = doc.body.innerHTML

        return paragraph;
    }
};