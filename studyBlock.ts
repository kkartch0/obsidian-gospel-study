import StudyURL from "studyUrl";
import getFormattedParagraphs from "./paragraphFormatting";

export default class StudyBlock {
    private _paragraphIdsString: string | undefined;
    private _paragraphs: string[] | undefined;
    private _referenceLink: string | undefined;
    private _sourceDocument: Document;
    private _tag: string | undefined;
    private _url: StudyURL;

    public static async create(url: StudyURL): Promise<StudyBlock> {
        const sourceDocument = await url.getDocument();
        const studyBlock = new StudyBlock(url, sourceDocument);

        return studyBlock;
    }

    private constructor(url: StudyURL, sourceDocument: Document) {
        this._url = url;
        this._sourceDocument = sourceDocument;
        url.getDocument().then((doc) => {
            this._sourceDocument = doc;
        });
    }

    public get paragraphIdsString(): string {
        if (this._paragraphIdsString === undefined) {
            let idsString = this._url.searchParams.get("id") ?? "";
            idsString = idsString.replace(/p/g, "");
            idsString = idsString.replace(/,/g, ", ");

            this._paragraphIdsString = idsString;
        }

        return this._paragraphIdsString;
    }

    public get paragraphs(): string[] {
        if (this._paragraphs === undefined) {
            this._paragraphs = getFormattedParagraphs(this._sourceDocument, this._url.activeParagraphIds);
        }
        return this._paragraphs || [];
    }

    public get referenceLink(): string {
        if (this._referenceLink === undefined) {
            let titleToUse = this.title;
            if (this.paragraphs[0].contains('verse-number')) {
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
     */
    public get tag(): string {
        if (this._tag === undefined) {
            const path = this._url.pathname.replace("/study", "study");
            this._tag = `#${path}`;
        }
        return this._tag;
    }

    public get title(): string {
        return this._sourceDocument.title;
    }

    public get url(): string {
        return this._url.toString();
    }

    /**
     * Converts the StudyBlock object to a string representation based on the specified format.
     * @param format - The format string used to generate the string representation.
     * @returns The string representation of the StudyBlock object.
     */
    public toString(format: string): string {
        let injectedText = format;

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