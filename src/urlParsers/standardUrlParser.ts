import { UrlParser } from "src/models/UrlParser";
import { UrlParserResult } from "src/models/UrlParserResult";

/**
 * Declares a parser for the default ID format (e.g., p1,p3-p7,p9)
 */
export const standardUrlParser: UrlParser = {
    isParseable(url: URL): boolean {
        const idParam = url.searchParams.get("id");
        const correctFormatRegex = /^(?:[a-zA-Z].*[,-])*[a-zA-Z][^,-]*$/;
        return !!idParam && correctFormatRegex.test(idParam);
    },

    parse(url: URL): UrlParserResult {
        const idParam = url.searchParams.get("id") || "";
        const paragraphIdItems = idParam.split(",");

        const displayParagraphIds = idParam.replace(/p/g, "").replace(/,/g, ", ");

        return {
            paragraphIdItems,
            displayParagraphIds,
            url
        };
    },
};