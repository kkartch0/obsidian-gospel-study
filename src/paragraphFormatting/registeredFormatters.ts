import { ParagraphFormatter } from "src/models/ParagraphFormatter";
import fs from 'fs';

export let registeredFormatters: ParagraphFormatter[] = []; 

/**
 * Imports all formatters and adds formatters that are enabled based on the plugin settings.
 * 
 * @param pluginSettings - The settings of the Gospel Study plugin.
 * @returns An array of enabled formatters.
 */
async function loadInAllFormatters(): Promise<ParagraphFormatter[]> {
    const files = fs.readdirSync('src/paragraphFormatting');
    const formatterPromises = files.filter(file => file.endsWith('Formatter.ts')).map(async file => {
        const formatter = await import(`./${file}`) as ParagraphFormatter;
        return formatter;
    });

    const loadedFormatters = await Promise.all(formatterPromises);
    return loadedFormatters;
}

async function loadFormatters() {
    registeredFormatters = await loadInAllFormatters();
}

loadFormatters();
