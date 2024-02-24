import { Editor, Plugin } from 'obsidian';
import puppeteer from 'puppeteer';

export default class MyPlugin extends Plugin {
	/**
	 * Called when the plugin is loaded.
	 */
	async onload() {
		console.log('loading the plugin');

		this.registerEvent(this.app.workspace.on('editor-paste', async (clipboard, editor): Promise<void> => {
			console.log('pasting');

			if (clipboard.defaultPrevented) return;

			if (!navigator.onLine) return;

			const clipboardData = clipboard.clipboardData?.getData('text/plain');

			if (!clipboardData) return;
			if (!clipboardData.contains("https://churchofjesuschrist.org/study/")) return;

			clipboard.stopPropagation();
			clipboard.preventDefault();

			this.convertUrlToBlock(editor, clipboardData);
		}));

	}

	/**
	 * Converts a URL to a block in the editor.
	 * @param editor The editor instance.
	 * @param url The URL to convert.
	 * @returns A promise that resolves when the conversion is complete.
	 */
	async convertUrlToBlock(editor: Editor, url: string): Promise<void> {
		const pasteId = `Fetching content#${this.createBlockId()}`;

		editor.replaceSelection(pasteId);

		/// Fetch the content from the URL
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		await page.goto(url, { waitUntil: 'domcontentloaded' });

		const pageTitle = await page.title();
		const titleLink = `#### [${pageTitle}](${url})\n`;

		let text = titleLink;

		const paragraphs = await page.$$eval('p.active-item', paragraphs => paragraphs.map(p => p.innerHTML));
		paragraphs.forEach((innerHTML, index) => {
			innerHTML = innerHTML.replace("/study/", "https://churchofjesuschrist.org/study/");
			text += `\n${innerHTML}\n`;
		});

		const tag = "\n#study/general-conference/2023/10/42freeman";
		text += tag;

		console.log(text);
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