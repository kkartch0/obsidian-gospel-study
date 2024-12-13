import { ParagraphFormatter } from "src/models/ParagraphFormatter";
import { GospelStudyPluginSettings } from "src/models/GospelStudyPluginSettings";
import { registeredFormatters } from "./registeredFormatters";

/**
 * Retrieves and formats paragraphs from a document based on provided paragraph IDs items and plugin settings.
 *
 * @param document - The document object containing the paragraph elements.
 * @param paragraphIdItems - An array of paragraph ID items such as ["p1", "p2", "p3-p5"].
 * @param pluginSettings - The settings for the Gospel Study plugin, used to determine which formatters are enabled.
 * @returns An array of formatted paragraph strings.
 */
export function getFormattedParagraphs(paragraphElements: Element[], pluginSettings: GospelStudyPluginSettings): string[] {
	const enabledFormatters = registeredFormatters.filter((formatter: ParagraphFormatter) => formatter.isEnabled(pluginSettings));
	const paragraphs: string[] = [];

	paragraphElements.forEach((paragraphElement) => {
		const formattedParagraph = formatParagraph(paragraphElement.innerHTML, enabledFormatters);
		paragraphs.push(formattedParagraph);
	});

	return paragraphs;
}


/**
 * Formats a paragraph by applying various transformations based on the plugin settings.
 * 
 * @param paragraph- The HTML content of the paragraph.
 * @param pluginSettings - The settings of the Gospel Study plugin.
 * @returns The formatted paragraph HTML.
 */
export function formatParagraph(paragraph: string, enabledFormatters: ParagraphFormatter[]): string {
	enabledFormatters.forEach((formatter) => {
		paragraph = formatter.format(paragraph);
	});

	return paragraph;
}

