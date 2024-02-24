import { Editor, Plugin, requestUrl } from 'obsidian';

export default class MyPlugin extends Plugin {
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

		// fetch content from URL using fetch API

		requestUrl(url).then((response) => {
			// find all p.active-item elements
			//const parser = new DOMParser();
			//const doc = parser.parseFromString(response.text, "text/html");

			// Get the URL
			const activeParagraphIds = this.GetActiveParagraphIdsFromUrl(url);
			console.debug("🚀 ~ MyPlugin ~ activeParagraphIds:", activeParagraphIds)

			// 





			// create a new block with the fetched content
			// editor.replaceSelection(`#### [${doc.title}](${url})\n`);
			// paragraphs.forEach((p) => {
			// 	editor.replaceSelection(`\n${p.innerHTML}\n`);
			// });

			// editor.replaceSelection(`\n#study/general-conference/2023/10/42freeman`);
		});

		// const response = await fetch(url, { mode: "no-cors" });
		// const text = await response.text();
		// console.log(text);

		// const browser = await puppeteer.launch({ headless: "new"});
		// const page = await browser.newPage();

		// await page.goto(url, { waitUntil: 'domcontentloaded' });

		// const pageTitle = await page.title();
		// const titleLink = `#### [${pageTitle}](${url})\n`;

		// let text = titleLink;

		// const paragraphs = await page.$$eval('p.active-item', paragraphs => paragraphs.map(p => p.innerHTML));
		// paragraphs.forEach((innerHTML, index) => {
		// 	innerHTML = innerHTML.replace("/study/", "https://churchofjesuschrist.org/study/");
		// 	text += `\n${innerHTML}\n`;
		// });

		// const tag = "\n#study/general-conference/2023/10/42freeman";
		// text += tag;

		// console.log(text);
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