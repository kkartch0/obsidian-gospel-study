import { ParagraphFormatter } from "src/models/ParagraphFormatter";
import { GospelStudyPluginSettings } from "src/models/GospelStudyPluginSettings";
import fs from 'fs';

/**
 * Retrieves the paragraphs with the specified ids from the document, formats, and then returns them.
 * 
 * @param document - The document object representing the HTML document.
 * @param paragraphIds - An array of active paragraph IDs.
 * @returns An array of formatted paragraphs.
 */
export function getFormattedParagraphs(document: Document, paragraphIds: string[], pluginSettings: GospelStudyPluginSettings): string[] {
	const paragraphs: string[] = [];
	const enabledFormatters = getEnabledFormatters(pluginSettings);

	paragraphIds.forEach((id) => {
		if (id === "-") { // Hyphen indicates that the next paragraph is not contiguous with the previous one, so we add an ellipsis.
			paragraphs.push("…");
			return;
		}
		const paragraphElement = document.getElementById(id);
		if (!paragraphElement) return;

		const formattedParagraph = formatParagraph(paragraphElement.innerHTML, enabledFormatters);

		paragraphs.push(formattedParagraph);
	});
	return paragraphs;
}

/**
 * Imports all formatters and adds formatters that are enabled based on the plugin settings.
 * 
 * @param pluginSettings - The settings of the Gospel Study plugin.
 * @returns An array of enabled formatters.
 */
function getEnabledFormatters(pluginSettings: GospelStudyPluginSettings): ParagraphFormatter[] {
    const files = fs.readdirSync('src/paragraphFormatting');
    const formatterPromises = files.filter(file => file.endsWith('Formatter.ts')).map(async file => {
        const formatter = await import(`src/paragraphFormatting/${file}`) as ParagraphFormatter;
        if (formatter.isEnabled(pluginSettings)) {
            return formatter;
        }
        return null;
    });

	let enabledFormatters: ParagraphFormatter[] = [];
    Promise.all(formatterPromises).then(formatters => { 
		enabledFormatters = formatters.filter(formatter => formatter !== null) as ParagraphFormatter[];
	});

    return enabledFormatters;
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
