import { Plugin, requestUrl } from 'obsidian';
import { getActiveParagraphIdsFromUrl, removeFootnotesFromParagraph, removePageBreaksFromParagraph, createUrlTag } from 'main.helper';


export default class GospelStudyPlugin extends Plugin {
	/**
	 * Called when the plugin is loaded.
	 */
	async onload() {
		console.log('loading the plugin');

		this.registerEvent(this.app.workspace.on('editor-paste', async (clipboard, editor): Promise<void> => {
			console.debug('pasting');

			if (clipboard.defaultPrevented) return;
			console.debug('clipboardData', clipboard.clipboardData?.getData('text/plain'));

			if (!navigator.onLine) return;
			console.debug('online');

			const clipboardData = clipboard.clipboardData?.getData('text/plain');

			if (!clipboardData) return;
			if (!clipboardData.contains("https://www.churchofjesuschrist.org/study/")) return;

			console.debug("clipboardData is valid");

			clipboard.stopPropagation();
			clipboard.preventDefault();

			const block = await this.convertUrlToBlock(clipboardData);

			editor.replaceSelection(block);
		}));
	}

	/**
	 * Converts a URL to a block in the editor.
	 * @param editor The editor instance.
	 * @param url The URL to convert.
	 * @returns A promise that resolves when the conversion is complete.
	 */
	async convertUrlToBlock(url: string): Promise<string> {
		return requestUrl(url).then((response) => {
			// find all p.active-item elements
			const parser = new DOMParser();
			const doc = parser.parseFromString(response.text, "text/html");

			const paragraphs = doc.querySelectorAll('p');
			console.debug("🚀 ~ GospelStudyPlugin ~ paragraphs:", paragraphs);

			// Get the URL
			const activeParagraphIds = getActiveParagraphIdsFromUrl(url);
			console.debug("🚀 ~ GospelStudyPlugin ~ activeParagraphIds:", activeParagraphIds);

			let text = `#### [${doc.title}](${url})\n`;

			// Get paragraphs for the active paragraph IDs
			activeParagraphIds.forEach((id) => {
				if (id === "-") {
					text += "\n…\n";
					return;
				}
				const el = doc.getElementById(id);
				if (!el) return;

				let innerHTML = removeFootnotesFromParagraph(el.innerHTML);
				innerHTML = removePageBreaksFromParagraph(innerHTML);

				text += `\n${innerHTML}\n`;

			});

			text += `\n${createUrlTag(url)}`;

			return text;
		});
	}


	/**
	 * Generates a unique block ID using a random string.
	 * 
	 * @returns {string} The generated block ID.
	 */
	createBlockId(): string {
		return Math.random().toString(36);
	}

	/**
	 * Called when the plugin is being unloaded.
	 */
	onunload() {
		navigator.clipboard
		console.log('unloading plugin');
	}
}