import { ParagraphFormatter } from "src/models/ParagraphFormatter";
import fs from 'fs';

export let registeredFormatters: ParagraphFormatter[] = []; 

/**
 * Imports all formatters (i.e. files that end with "Formatter.ts") and assigns them to registeredFormatters.
 * 
 * @param pluginSettings - The settings of the Gospel Study plugin.
 * @returns An array of enabled formatters.
 */
async function loadInAllFormatters() {
    const files = fs.readdirSync('src/paragraphFormatting');
    const formatterPromises = files.filter(file => file.endsWith('Formatter.ts')).map(async file => {
        const module = await import(`./${file}`);
        const formatter = module.default as ParagraphFormatter;
        return formatter;
    });

    registeredFormatters = await Promise.all(formatterPromises);
}


loadInAllFormatters();