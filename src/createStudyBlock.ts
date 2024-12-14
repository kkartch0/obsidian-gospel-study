import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { getFormattedParagraphs } from "./paragraphFormatting";
import { StudyBlockData } from "./models/StudyBlockData";

/**
 * Converts the StudyBlock object to a string representation based on the specified format.
 * @param format - The format string used to generate the string representation.
 * @returns The string representation of the StudyBlock object.
 */
export function createStudyBlock(studyBlockData: StudyBlockData, pluginSettings: GospelStudyPluginSettings): string {
    let injectedText = pluginSettings.studyBlockFormat;

    const formattedParagraphs: string[] = getFormattedParagraphs(studyBlockData.paragraphElements, pluginSettings);

    const propertyNames = Object.keys(studyBlockData);

    propertyNames.forEach((key: string): void => {
        const value = studyBlockData[key as keyof StudyBlockData];
        injectedText = injectedText.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    });

    const paragraphsMatch = injectedText.match(/{{paragraphs:([^}]*)}}/);
    if (paragraphsMatch) {
        const paragraphsSeparator = paragraphsMatch[1];
        injectedText = injectedText.replace(new RegExp(`{{paragraphs:${paragraphsSeparator}}}`, 'g'), formattedParagraphs?.join(paragraphsSeparator) || '');
    }

    return injectedText;
}