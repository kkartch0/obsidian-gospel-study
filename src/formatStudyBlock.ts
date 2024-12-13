import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { getFormattedParagraphs } from "./paragraphFormatting";
import { StudyBlock } from "./studyBlock";

    /**
     * Converts the StudyBlock object to a string representation based on the specified format.
     * @param format - The format string used to generate the string representation.
     * @returns The string representation of the StudyBlock object.
     */
    export function formatStudyBlock(studyBlock: StudyBlock, pluginSettings: GospelStudyPluginSettings): string {
        let injectedText = pluginSettings.studyBlockFormat;

        const formattedParagraphs:string[] = getFormattedParagraphs(studyBlock.paragraphElements, pluginSettings);

        const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(studyBlock));
        propertyNames.forEach((key: string): void => {
            const value = studyBlock[key as keyof StudyBlock]; // Add type assertion to keyof StudyBlock
            if (typeof (value) !== 'string') {
                return; // skip function calls
            }

            injectedText = injectedText.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
        });

        const paragraphsMatch = injectedText.match(/{{paragraphs:([^}]*)}}/);
        if (paragraphsMatch) {
            const paragraphsSeparator = paragraphsMatch[1];
            injectedText = injectedText.replace(new RegExp(`{{paragraphs:${paragraphsSeparator}}}`, 'g'), formattedParagraphs?.join(paragraphsSeparator) || '');
        }

        return injectedText;
    }