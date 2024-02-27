import { Plugin, requestUrl, Editor } from 'obsidian';
import {
	getActiveParagraphIdsFromUrl,
	removeFootnotesFromParagraph,
	removePageBreaksFromParagraph,
	createUrlTag,
	getObsidianFileUrl
} from 'main.helper';
import StudyBlock from 'StudyBlock';


export default class GospelStudyPlugin extends Plugin {
	/**
	 * Called when the plugin is loaded.
	 */
	async onload() {
		console.log('loading the plugin');
		this.registerEvent(this.app.workspace.on('editor-paste', this.onEditorPaste.bind(this)));
	}

	/**
	 * Called when the plugin is being unloaded.
	 */
	onunload() {
		navigator.clipboard
		console.log('unloading plugin');
	}

	/**
	 * Handles the paste event in the editor.
	 * 
	 * @param clipboard - The clipboard event object.
	 * @param editor - The editor object.
	 * @returns A promise that resolves when the paste event is handled.
	 */
	async onEditorPaste(clipboard: ClipboardEvent, editor: Editor): Promise<void> {
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

		const block = await getStudyBlockFromUrl(clipboardData);
		const blockText1 = block.toString("#### {{referenceLink}}\n\n{{paragraphs:\n\n}}\n\n{{tag}}");
		const blockText2 = block.toString("> [!gospel-study]\n> # {{referenceLink}}\n> {{paragraphs:\n>\n> }}\n>\n>{{tag}}");

		editor.replaceSelection(blockText1 + "\n\n" + blockText2);

		this.copyCurrentNoteLinkToClipboard()
	}

	/**
	 * Copies the link of the current note to the clipboard.
	 */
	copyCurrentNoteLinkToClipboard() {
		const activeFileName = this.app.workspace.getActiveFile()?.basename;
		console.debug("🚀 ~ file: main.ts:43 ~ GospelStudyPlugin ~ this.registerEvent ~ activeFileName:", activeFileName);

		if (!activeFileName) return;

		const vaultName = this.app.vault.getName();
		console.debug("🚀 ~ file: main.ts:45 ~ GospelStudyPlugin ~ this.registerEvent ~ vaultName:", vaultName);

		const fileUrl = getObsidianFileUrl(vaultName, activeFileName);
		console.debug("🚀 ~ file: main.ts:51 ~ GospelStudyPlugin ~ this.registerEvent ~ fileUrl:", fileUrl);

		navigator.clipboard.writeText(fileUrl);
	}
}

function getBlockParagraphs(doc: Document, url: string): string[] {
	const paragraphs = doc.querySelectorAll('p');
	console.debug("🚀 ~ GospelStudyPlugin ~ paragraphs:", paragraphs);

	const activeParagraphIds = getActiveParagraphIdsFromUrl(url);
	console.debug("🚀 ~ GospelStudyPlugin ~ activeParagraphIds:", activeParagraphIds);

	const activeParagraphs: string[] = [];

	activeParagraphIds.forEach((id) => {
		if (id === "-") {
			activeParagraphs.push("-");
			return;
		}
		const el = doc.getElementById(id);
		if (!el) return;

		let innerHTML = removeFootnotesFromParagraph(el.innerHTML);
		innerHTML = removePageBreaksFromParagraph(innerHTML);

		activeParagraphs.push(innerHTML);
	});

	return activeParagraphs;
}

/**
 * Converts a URL to a block in the editor.
 * @param editor The editor instance.
 * @param url The URL to convert.
 * @returns A promise that resolves when the conversion is complete.
 */
async function getStudyBlockFromUrl(url: string): Promise<StudyBlock> {
	return requestUrl(url).then((response) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(response.text, "text/html");

		const block = new StudyBlock();
		block.title = doc.title;
		block.paragraphs = getBlockParagraphs(doc, url);
		block.referenceLink = `[${block.title}](${url})`;
		block.tag = createUrlTag(url);
		block.url = url;

		return block;
	});
}