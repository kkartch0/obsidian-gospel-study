export default class StudyBlock {
    title: string | undefined;

    paragraphs: string[] | undefined;

    url: string | undefined;

    referenceLink: string | undefined;

    tag: string | undefined;

    paragraphIds: string | undefined;

    /**
     * Converts the StudyBlock object to a string representation based on the specified format.
     * @param format - The format string used to generate the string representation.
     * @returns The string representation of the StudyBlock object.
     */
    toString(format: string): string {
        let injectedText = format;
        for (const key in this) {
            injectedText = injectedText.replace(new RegExp(`{{${key}}}`, 'g'), String(this[key]));
        }

        // {{paragraphs:\n\n>}} should be replaced with the paragraphs joined by "\n\n>"
        // {{paragraphs:(.*)}} should be replaced with the paragraphs joined by $1

        const paragraphsMatch = injectedText.match(/{{paragraphs:([^}]*)}}/);
        if (paragraphsMatch) {
            const paragraphsSeparator = paragraphsMatch[1];
            injectedText = injectedText.replace(new RegExp(`{{paragraphs:${paragraphsSeparator}}}`, 'g'), this.paragraphs?.join(paragraphsSeparator) || '');
        }

        return injectedText;
    }
}