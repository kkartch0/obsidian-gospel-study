import { Plugin, Editor } from "obsidian";
import { GospelStudyPluginSettingTab } from "./gospelStudyPluginSettingTab";
import { DEFAULT_SETTINGS} from "./gospelStudyPluginSettings";
import { GospelStudyPluginSettings } from "./models/GospelStudyPluginSettings";
import { standardizeSearchParams } from "./studyUrlFormatting";
import { registeredParagraphParsers } from "./paragraphParser";
import { registeredStudyBlockParsers } from "./studyBlockParser";
import { StudyBlockData } from "./models/StudyBlockData";
import { StudyBlockParserData } from "./models/StudyBlockParserData";

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

		this.addSettingTab(new GospelStudyPluginSettingTab(this.app, this));

		this.registerEvent(
			this.app.workspace.on("editor-paste", this.onEditorPaste.bind(this))
		);
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

		if (!clipboardData?.contains("https://www.churchofjesuschrist.org/study/")) return;

		clipboard.stopPropagation();
		clipboard.preventDefault();

		const result = await this.onGospelLinkEvent(clipboardData, editor);

		console.log(result);
	}

	/**
	 * A handler for when a link is added to Obsidian. Can be used
	 * with clipboard or shared events.
	 *
	 * @param {string} data - The data 
	 * @param {Editor} editor - The current Obsidian editor.
	 * @returns {Promise<boolean>} - If an ID parser is found, returns true; otherwise, returns false.
	 */
	private async onGospelLinkEvent(data: string, editor: Editor): Promise<boolean> {
		const standardizedUrl = standardizeSearchParams(data);
		const url = new URL(standardizedUrl);

		// Find the first parser that can parse out this type of URL
		const parser = registeredParagraphParsers.find(currentParser => currentParser.isParseable(url));

		// If no parser is found, return false.
		if (!parser) {
			return false;
		}

		const paragraphIDs = parser.getParagraphIDs(url);

		const parserData = {
			rawContent: data,
			url,
			paragraphIDs,
			settings: this.settings
		} as Partial<StudyBlockParserData>;

		// Filter the study block parsers for only ones that can handle this data.
		const filteredParsers = registeredStudyBlockParsers
			.filter(blockParser => blockParser.isParseable(parserData));

		let studyBlock: Partial<StudyBlockData> = {};

		// Pass the data through all the applicable parsers to get the results.
		for (const blockParser of filteredParsers) {
			studyBlock = await blockParser.mergeStudyBlock(parserData, studyBlock);
		}

		// Format the study block template with the given data
		const blockText = this.formatBlockText(studyBlock, this.settings.studyBlockFormat);

		editor.replaceSelection(blockText);

		if (this.settings.copyCurrentNoteLinkAfterPaste === true) {
			this.copyCurrentNoteLinkToClipboard();
		}

		return true;
	}

	private formatBlockText(data: Partial<StudyBlockData>, format: string): string {
		let injectedText = format;

        const propertyNames = Object.keys(data);

        propertyNames.forEach((key: string): void => {
            const value = data[key as keyof StudyBlockData]; // Add type assertion to keyof StudyBlock
            if (typeof (value) !== 'string') {
                return; // skip function calls
            }

            injectedText = injectedText.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
        });

        const paragraphsMatch = injectedText.match(/{{paragraphs:([^}]*)}}/);
        if (paragraphsMatch) {
            const paragraphsSeparator = paragraphsMatch[1];
            injectedText = injectedText.replace(new RegExp(`{{paragraphs:${paragraphsSeparator}}}`, 'g'), data.paragraphs?.join(paragraphsSeparator) ?? '');
        }

        return injectedText;
	}
}
