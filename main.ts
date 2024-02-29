import { Plugin, requestUrl, Editor } from 'obsidian';
import {
	getActiveParagraphIdsFromUrl,
	removeFootnotesFromParagraph,
	removePageBreaksFromParagraph,
	createUrlTag,
	getObsidianFileUrl
} from 'main.helper';
import StudyBlock from 'StudyBlock';
import { GospelStudySettingsTab, DEFAULT_SETTINGS, GospelStudyPluginSettings } from './GospelStudySettingsTab';


export default class GospelStudyPlugin extends Plugin {
	public settings!: GospelStudyPluginSettings;

	/**
	 * Called when the plugin is loaded.
	 */
	public async onload() {
		console.log('loading the plugin');

		await this.loadSettings();

		this.addSettingTab(new GospelStudySettingsTab(this.app, this));

		this.registerEvent(this.app.workspace.on('editor-paste', this.onEditorPaste.bind(this)));
	}

	/**
	 * Loads the plugin settings from the data store.
	 * If no settings are found, the default settings are used.
	 * @returns A promise that resolves when the settings are loaded.
	 */
	public async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	/**
	 * Saves the plugin settings.
	 * @returns A promise that resolves when the settings are saved.
	 */
	public async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	/**
	 * Called when the plugin is being unloaded.
	 */
	public onunload() {
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
	private async onEditorPaste(clipboard: ClipboardEvent, editor: Editor): Promise<void> {
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

		const block = await getStudyBlockFromUrl(clipboardData.trim());
		const blockText = block.toString(this.settings.studyBlockFormat);

		editor.replaceSelection(blockText);

		if (this.settings.copyCurrentNoteLinkAfterPaste === true) {
			this.copyCurrentNoteLinkToClipboard();
		}
	}

	/**
	 * Copies the link of the current note to the clipboard.
	 */
	private copyCurrentNoteLinkToClipboard() {
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

/**
 * Retrieves the paragraphs from a document based on the provided URL and returns an array of strings.
 * Each string represents the innerHTML of a paragraph element.
 *
 * @param doc - The document object to query for paragraphs.
 * @param url - The URL used to determine the active paragraphs.
 * @returns An array of strings representing the innerHTML of the active paragraphs.
 */
function getBlockParagraphs(doc: Document, url: string): string[] {
	const paragraphs = doc.querySelectorAll('p');
	console.debug("🚀 ~ GospelStudyPlugin ~ paragraphs:", paragraphs);

	const activeParagraphIds = getActiveParagraphIdsFromUrl(url);
	console.debug("🚀 ~ GospelStudyPlugin ~ activeParagraphIds:", activeParagraphIds);

	const activeParagraphs: string[] = [];

	activeParagraphIds.forEach((id) => {
		if (id === "-") {
			activeParagraphs.push("…");
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
		block.tag = createUrlTag(url);
		block.url = url;

		const urlObject = new URL(url);
		let paragraphIdsString = urlObject.searchParams.get('id') ?? "";
		paragraphIdsString = paragraphIdsString.replace(/p/g, '');
		paragraphIdsString = paragraphIdsString.replace(/,/g, ', ');
		block.paragraphIdsString = paragraphIdsString;

		return block;
	});
}