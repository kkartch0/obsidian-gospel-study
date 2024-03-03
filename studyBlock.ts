import StudyURL from "studyUrl";
import getFormattedParagraphs from "./paragraphFormatting";

export default class StudyBlock {
    private _paragraphIdsString: string | undefined;
    private _paragraphs: string[] | undefined;
    private _tag: string | undefined;
    private _url: StudyURL;
    private _sourceDocument: Document;
    private _referenceLink: string | undefined;

    private constructor(url: StudyURL, sourceDocument: Document) {
        this._url = url;
        this._sourceDocument = sourceDocument;
        url.getDocument().then((doc) => {
            this._sourceDocument = doc;
        });
    }

    public static async create(url: StudyURL): Promise<StudyBlock> {
        const sourceDocument = await url.getDocument();
        const studyBlock = new StudyBlock(url, sourceDocument);

        return studyBlock;
    }

    public get paragraphIdsString() {
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
    public get tag() {
        if (this._tag === undefined) {
            const path = this.url.pathname.replace("/study", "study");
            this._tag = `#${path}`;
        }
        return this._tag;
    }

    public get title(): string {
        return this._sourceDocument.title;
    }

    public get url(): URL {
        return this._url;
    }

    /**
     * Converts the StudyBlock object to a string representation based on the specified format.
     * @param format - The format string used to generate the string representation.
     * @returns The string representation of the StudyBlock object.
     */
    public toString(format: string): string {
        let injectedText = format;

        for (const key in this) {
            injectedText = injectedText.replace(new RegExp(`{{${key}}}`, 'g'), String(this[key]));
        }

        // injectedText = injectedText.replace(/{{referenceLink}}/g, this.referenceLink);

        const paragraphsMatch = injectedText.match(/{{paragraphs:([^}]*)}}/);
        if (paragraphsMatch) {
            const paragraphsSeparator = paragraphsMatch[1];
            injectedText = injectedText.replace(new RegExp(`{{paragraphs:${paragraphsSeparator}}}`, 'g'), this.paragraphs?.join(paragraphsSeparator) || '');
        }

        return injectedText;
    }
}