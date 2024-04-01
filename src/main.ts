import { Plugin, Editor, View, MarkdownView } from "obsidian";
import { GospelStudyPluginSettingTab } from "./gospelStudyPluginSettingTab";
import { DEFAULT_SETTINGS } from "./defaultPluginSettings";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { getStudyBlockTextFromUrl } from "./getStudyBlockTextFromUrl";

export default class GospelStudyPlugin extends Plugin {
	public settings!: GospelStudyPluginSettings;

	/**
	 * Used for locking the handling of the editor-change event to prevent infinite loops. 
	 */
	handlingEvent!: boolean;

	/**
	 * Loads the plugin settings from the data store.
	 * If no settings are found, the default settings are used.
	 * @returns A promise that resolves when the settings are loaded.
	 */
	public async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	/**
	 * Called when the plugin is loaded.
	 */
	public async onload() {
		console.log("loading the plugin");

		await this.loadSettings();

		this.addSettingTab(new GospelStudyPluginSettingTab(this.app, this));

		this.handlingEvent = false;

		this.registerEvent(
			this.app.workspace.on("editor-change", this.checkForUnresolvedStudyUrl.bind(this))
		);
	}

	/**
	 * Checks for unresolved study URLs in the editor content and replaces them with their corresponding study block text.
	 * @param editor - The editor instance.
	 * @param _info - Additional information (not used in this method).
	 */
	private async checkForUnresolvedStudyUrl(editor: Editor, _info: any) {
		if (this.handlingEvent) return;

		this.handlingEvent = true;

		let currentContent = editor.getValue() || "";

		const urlPattern : RegExp = /^ *(https:\/\/www.churchofjesuschrist.org\/study\/[^\s\)]*) *$/gm;
		const match = currentContent.match(urlPattern)

		if (!match) { 
			this.handlingEvent = false;
			return;
		}

		const promises = match.map(async (url) => {
			const blockText = await getStudyBlockTextFromUrl(url, this.settings);
			return { url, blockText };

		});

		const urlResolves = await Promise.all(promises);

		urlResolves.forEach(({ url, blockText }) => {
			currentContent = currentContent.replace(url, blockText);
		});

		editor.setValue(currentContent);

		this.scrollToBottom();

		if (this.settings.copyCurrentNoteLinkAfterPaste === true) {
			this.copyCurrentNoteLinkToClipboard();
		}

		this.handlingEvent = false;
	}

	/**
	 * Scrolls the active Markdown view to the bottom.
	 */
	private scrollToBottom() {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			view.currentMode.applyScroll(view.editor.lastLine());
		}
	}

	/**
	 * Called when the plugin is being unloaded.
	 */
	public onunload() {
		navigator.clipboard;
		console.log("unloading plugin");
	}

	/**
	 * Saves the plugin settings.
	 * @returns A promise that resolves when the settings are saved.
	 */
	public async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	/**
	 * Copies the link of the current note to the clipboard.
	 */
	private copyCurrentNoteLinkToClipboard() {
		const activeFileName = this.app.workspace.getActiveFile()?.basename;

		if (!activeFileName) return;

		const vaultName = this.app.vault.getName();
		const fileUrl = this.getObsidianFileUrl(vaultName, activeFileName);

		navigator.clipboard.writeText(fileUrl);
	}

	/**
	 * Returns the Obsidian file URL for the given vault name and file name.
	 * @param vaultName - The name of the Obsidian vault.
	 * @param fileName - The name of the file within the vault.
	 * @returns The Obsidian file URL.
	 */
	private getObsidianFileUrl(vaultName: string, fileName: string): string {
		vaultName = encodeURIComponent(vaultName);
		fileName = encodeURIComponent(fileName);
		const obsidianUrl = `obsidian://open?vault=${vaultName}&file=${fileName}`;
		return obsidianUrl;
	}
}
