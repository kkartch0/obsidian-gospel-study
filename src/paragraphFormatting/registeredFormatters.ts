import { ParagraphFormatter } from "src/models/ParagraphFormatter";
import { fullyQualifyStudyLinksFormatter } from "./fullyQualifyStudyLinksFormatter";
import { removeNonUsefulTagsFormatter } from "./removeNonUsefulTagsFormatter";
import { removeFootnotesFormatter } from "./removeFootnotesFormatter";
import { removeScriptureReferenceLinksFormatter } from "./removeScriptureReferenceLinksFormatter";
import { escapeSquareBracketsFormatter } from "./escapeSquareBracketsFormatter";

export const registeredFormatters: ParagraphFormatter[] = [
    fullyQualifyStudyLinksFormatter,
    removeFootnotesFormatter,
    removeNonUsefulTagsFormatter,
    removeScriptureReferenceLinksFormatter,
    escapeSquareBracketsFormatter
]; 