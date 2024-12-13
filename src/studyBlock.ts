import { getFormattedParagraphs } from "./paragraphFormatting";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { UrlParserResult } from "./models/UrlParserResult";

export class StudyBlock {
    private _paragraphs: string[] | undefined;
    private _referenceLink: string | undefined;
    private _tag: string | undefined;

    /**
     * Constructs a new instance of StudyBlock from the specified URL and source document.
     */
    public constructor(
        private _urlParserResult: UrlParserResult,
        private _sourceDocument: Document
    ) { }

    /**
     * Gets the string representation of the paragraph IDs excluding the "p" prefix.
     * 
     * @returns The string representation of the paragraph IDs.
     * @example
     * const studyURL = new StudyURL("https://example.com/?id=p1,p3-p5,p7");
     * console.log(studyURL.activeParagraphIdsString); // Output: "1, 3-5, 7"
     */
    public get paragraphIdsString(): string {
        return this._urlParserResult.displayParagraphIds;
    }

    /**
     * Gets the formatted paragraphs associated with the study block.
     */
    public get paragraphs(): string[] {
        return this._paragraphs || [];
    }

    /**
     * Gets the "reference link" which is a combination of the title, the URL, and (in the case of scripture references) the paragraphIdsString.
     * 
     * @returns The reference link as a string.
     * @example [1 Nephi 3:7, 15-16](https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/3?lang=eng&id=7,15-16#p7)
     * @example [Love Is Spoken Here](https://www.churchofjesuschrist.org/study/general-conference/2023/10/54gong?lang=eng&id=p19#p19)
     */
    public get referenceLink(): string {
        if (this._referenceLink === undefined) {
            let titleToUse = this.title;
            if (this.paragraphs[0]?.includes('verse-number')) {
                titleToUse += `:${this.paragraphIdsString}`;
            }
            this._referenceLink = `[${titleToUse}](${this.url})`;
        }
        return this._referenceLink;
    }

    /**
     * Gets the tag associated with the study block.
     * If the tag is not already set, it generates the tag based on the URL pathname.
     * @returns The tag of the study block.
     * @example
     * // Returns "#/study/John/3:16"
     * studyBlock.tag;
     */
    public get tag(): string {
        if (this._tag === undefined) {
            const path = this._urlParserResult.url.pathname.replace("/study", "study");
            this._tag = `#${path}`;
        }
        return this._tag;
    }

    /**
     * Gets the title of the StudyBlock.
     * @returns The title of the StudyBlock.
     */
    public get title(): string {
        return this._sourceDocument.title;
    }

    /**
     * Gets the URL of the StudyBlock.
     * @returns The URL of the StudyBlock.
     */
    public get url(): string {
        return this._urlParserResult.url.toString();
    }

    /**
     * Converts the StudyBlock object to a string representation based on the specified format.
     * @param format - The format string used to generate the string representation.
     * @returns The string representation of the StudyBlock object.
     */
    public toString(pluginSettings: GospelStudyPluginSettings): string {
        let injectedText = pluginSettings.studyBlockFormat;

        this._paragraphs = getFormattedParagraphs(this._sourceDocument, this._urlParserResult.paragraphIdItems, pluginSettings);

        const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        propertyNames.forEach((key: string): void => {
            const value = this[key as keyof StudyBlock]; // Add type assertion to keyof StudyBlock
            if (typeof (value) !== 'string') {
                return; // skip function calls
            }

            injectedText = injectedText.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
        });

        const paragraphsMatch = injectedText.match(/{{paragraphs:([^}]*)}}/);
        if (paragraphsMatch) {
            const paragraphsSeparator = paragraphsMatch[1];
            injectedText = injectedText.replace(new RegExp(`{{paragraphs:${paragraphsSeparator}}}`, 'g'), this.paragraphs?.join(paragraphsSeparator) || '');
        }

        return injectedText;
    }
}