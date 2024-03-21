import { ParagraphIDParser } from '../models/ParagraphIDParser';
import { paragraphIdDefaultParser } from './paragraphIdDefaultParser';

/**
 * Declares a registered list of ParagraphIDParsers. The first
 * parser in this array that can parse a given URL will be used,
 * so order in this array declares precedence of the parsers.
 */
export const registeredParagraphParsers: ParagraphIDParser[] = [
    paragraphIdDefaultParser
];