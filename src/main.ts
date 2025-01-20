import { Plugin, Editor, Notice } from "obsidian";
import { GospelStudyPluginSettingTab } from "./gospelStudyPluginSettingTab";
import { DEFAULT_SETTINGS } from "./defaultPluginSettings";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { getStudyBlockFromStudyData } from "./getStudyBlockFromStudyData";
import { getTaskListFromUrl } from "./comeFollowMePacer/comeFollowMePacer";
import { UrlEntryModal } from "./comeFollowMePacer/urlEntryModal";

export default class GospelStudyPlugin extends Plugin {
	public settings!: GospelStudyPluginSettings;

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

		const studyPluginTab = new GospelStudyPluginSettingTab(this.app, this);
		await studyPluginTab.initSampleStudyBlockText();

		this.addSettingTab(studyPluginTab);

		this.registerEvent(
			this.app.workspace.on("editor-paste", this.onEditorPaste.bind(this))
		);

		this.addCommand({
			id: 'generate-come-follow-me-tasks',
			name: 'Generate Come Follow Me Study Tasks',
			editorCallback: async (editor: Editor) => {
				// launch modal for entering URL
				let url = "";
				const urlEntryModal = new UrlEntryModal(this.app, {
					onSubmit: async (result: string) => {
						const taskList = await getTaskListFromUrl(result, { today: () => new Date() });
						editor.replaceSelection(taskList);
					}
				});

				urlEntryModal.open();
			}
		});
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

		try {
			const blockText = await getStudyBlockFromStudyData(clipboardData, this.settings);

			if (blockText) {
				editor.replaceSelection(blockText);

				if (this.settings.copyCurrentNoteLinkAfterPaste === true) {
					this.copyCurrentNoteLinkToClipboard();
				}
			} else {
				throw new Error();
			}
		} catch (error) {
			const failureMessage = "Failed to retrieve study block from pasted content.";
			new Notice(`${failureMessage}: ${error}`);
			console.error(error);
			editor.replaceSelection(clipboardData);
		}
	}

}
