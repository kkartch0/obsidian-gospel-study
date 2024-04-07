import { GospelStudyPluginSettings } from "./GospelStudyPluginSettings";

export interface ParagraphFormatter {
    isEnabled(settings: GospelStudyPluginSettings): boolean;

    format(paragraph: string): string;
}