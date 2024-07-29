import { UrlParser } from "src/models/UrlParser";
import { UrlParserResult } from "src/models/UrlParserResult";

export const highlightLinkParser: UrlParser = {
    isParseable(url: URL): boolean {
        // Return true if the url contains :~:text=
        return url.href.includes(":~:text=");
    },
    parse(url: URL): UrlParserResult {
        const textParam = url.searchParams.get("text") || "";

        return {
            paragraphIds: [],
            displayParagraphIds: "",
            url
        };
    }
}