import { Plugin, Editor } from "obsidian";
import { GospelStudyPluginSettingTab } from "./gospelStudyPluginSettingTab";
import { DEFAULT_SETTINGS, GospelStudyPluginSettings } from "./gospelStudyPluginSettings";
import { getStudyBlockTextFromUrl } from "./getStudyBlockTextFromUrl";
import { diffLines, Change } from "diff";

export default class GospelStudyPlugin extends Plugin {
	public settings!: GospelStudyPluginSettings;

	handledByPasteEvent!: boolean;
	previousContent!: string;

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

		this.handledByPasteEvent = false;

		this.registerEvent(
			this.app.workspace.on("editor-paste", this.onEditorPaste.bind(this))
		);

		this.previousContent = this.app.workspace.activeEditor?.editor?.getValue() || "";
		this.registerInterval(window.setInterval(this.checkForFileUpdates.bind(this), 1_000));
	}

	private async checkForFileUpdates() {
		if (this.handledByPasteEvent) {
			// ensure we don't try to handle the paste event again
			this.handledByPasteEvent = false;
			return;
		}

		const editor = this.app.workspace.activeEditor?.editor;
		if (!editor) return;

		console.log("editor changed");

		let currentContent = editor.getValue() || "";

		if (this.previousContent !== currentContent) {
			const diff = diffLines(this.previousContent, currentContent);
			const addedLines = diff.filter((part: Change) => part.added);

			const urlPattern = "(https://www.churchofjesuschrist.org/study/.*)";
			addedLines.forEach(async (part: Change) => {
				const match = part.value.match(urlPattern)
				if (match) {
					const url = match[0];
					const blockText = await getStudyBlockTextFromUrl(url, this.settings);

					currentContent = currentContent.replace(url, blockText);
					editor.setValue(currentContent);

					if (this.settings.copyCurrentNoteLinkAfterPaste === true) {
						this.copyCurrentNoteLinkToClipboard();
					}

					this.previousContent = editor.getValue() || "";
					this.handledByPasteEvent = false;
				}
			});
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

	/**
	 * Handles the paste event in the editor.
	 *
	 * @param clipboard - The clipboard event object.
	 * @param editor - The editor object.
	 * @returns A promise that resolves when the paste event is handled.
	 */
	private async onEditorPaste(
		clipboard: ClipboardEvent,
		editor: Editor
	): Promise<void> {
		if (clipboard.defaultPrevented) return;
		if (!navigator.onLine) return;

		const clipboardData = clipboard.clipboardData?.getData("text/plain");

		if (!clipboardData) return;
		if (
			!clipboardData.contains(
				"https://www.churchofjesuschrist.org/study/"
			)
		)
			return;

		clipboard.stopPropagation();
		clipboard.preventDefault();

		this.handledByPasteEvent = true;

		const blockText = await getStudyBlockTextFromUrl(clipboardData, this.settings);

		editor.replaceSelection(blockText);

		if (this.settings.copyCurrentNoteLinkAfterPaste === true) {
			this.copyCurrentNoteLinkToClipboard();
		}
	}
}
