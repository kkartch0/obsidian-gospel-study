import { GospelStudyPluginSettings } from "./GospelStudyPluginSettings";

/**
 * Represents a paragraph formatter.
 */
export interface ParagraphFormatter {

    /**
     * Determines if the formatter is enabled based on the settings.
     * @param settings - The plugin settings.
     * @returns A boolean indicating if the formatter is enabled.
     */
    isEnabled(settings: GospelStudyPluginSettings): boolean;

    /**
     * Formats the paragraph.
     * @param paragraph - The paragraph to be formatted.
     * @returns The formatted paragraph.
     */
    format(paragraph: string): string;
}