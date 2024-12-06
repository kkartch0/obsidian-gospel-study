import { ParagraphFormatter } from "src/models/ParagraphFormatter";
import { fullyQualifyStudyLinksFormatter } from "./fullyQualifyStudyLinksFormatter";
import { removeNonUsefulTagsFormatter } from "./removeNonUsefulTagsFormatter";
import { removeFootnotesFormatter } from "./removeFootnotesFormatter";
import { removeScriptureReferenceLinksFormatter } from "./removeScriptureReferenceLinksFormatter";
import { escapeSquareBracketsFormatter } from "./escapeSquareBracketsFormatter";
import { breakRuleRemoveFormatter } from "./breakRuleRemoveFormatter";
import { strongEmToMarkdownFormatter } from "./strongEmToMarkdownFormatter";
import { nonBreakingSpaceFormatter } from "./nonBreakingSpaceFormatter";
import { paragraphMarkerFormatter } from "./paragraphMarkerFormatter";

export const registeredFormatters: ParagraphFormatter[] = [
    fullyQualifyStudyLinksFormatter,
    removeFootnotesFormatter,
    removeNonUsefulTagsFormatter,
    removeScriptureReferenceLinksFormatter,
    escapeSquareBracketsFormatter,
    breakRuleRemoveFormatter,
    strongEmToMarkdownFormatter,
    nonBreakingSpaceFormatter,
    paragraphMarkerFormatter
]; 