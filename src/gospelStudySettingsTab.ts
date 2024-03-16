import GospelStudyPlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface GospelStudyPluginSettings {
	copyCurrentNoteLinkAfterPaste: boolean;
	studyBlockFormat: string;
}

export const STUDY_BLOCK_FORMAT_1 =
	"> [!gospel-study]\n> # {{referenceLink}}\n> {{paragraphs:\n>\n> }}\n>\n>{{tag}}";

export const STUDY_BLOCK_FORMAT_2 =
	"#### {{referenceLink}}\n\n{{paragraphs:\n\n}}\n\n{{tag}}";

export const DEFAULT_SETTINGS: Partial<GospelStudyPluginSettings> = {
	studyBlockFormat: STUDY_BLOCK_FORMAT_1,
	copyCurrentNoteLinkAfterPaste: true
};

export class GospelStudySettingsTab extends PluginSettingTab {
	public plugin: GospelStudyPlugin;

	public constructor(app: App, plugin: GospelStudyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	public display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Study Block Format")
			.setDesc("The format used to generate the study block.")
			.addDropdown((dropdown) => {
				dropdown
					.addOption(STUDY_BLOCK_FORMAT_1, "Default 1")
					.addOption(STUDY_BLOCK_FORMAT_2, "Default 2")
					.onChange(async (value) => {
						this.plugin.settings.studyBlockFormat = value;
						await this.plugin.saveSettings();
						this.display();
					});

				if (
					this.plugin.settings.studyBlockFormat !==
						STUDY_BLOCK_FORMAT_1 &&
					this.plugin.settings.studyBlockFormat !==
						STUDY_BLOCK_FORMAT_2
				) {
					// custom format
					dropdown.addOption(
						this.plugin.settings.studyBlockFormat,
						"Custom"
					);
				} else {
					dropdown.addOption("", "Custom Format");
				}
				dropdown.setValue(this.plugin.settings.studyBlockFormat);

				return dropdown;
			});

		new Setting(containerEl)
			.setName("Current Format String")
			.setDesc("The format string used to generate the study block.")
			.addTextArea((text) => {
				text.setPlaceholder("Enter the format string")
					.setValue(this.plugin.settings.studyBlockFormat)
					.onChange(async (value) => {
						this.plugin.settings.studyBlockFormat = value;
						await this.plugin.saveSettings();
					});

				text.inputEl.style.width = "100%";
				text.inputEl.style.height = "150px";
				text.inputEl.style.resize = "none";

                text.inputEl.addEventListener("focusout", () => {
                    this.display();
                });

				return text;
			});

		new Setting(containerEl)
		.setName("Copy Current Note Link After Paste")
		.setDesc("Copy the current note link to the clipboard after pasting a study block.")
		.addToggle((toggle) => {	
			toggle.setValue(this.plugin.settings.copyCurrentNoteLinkAfterPaste)
				.onChange(async (value) => {
					this.plugin.settings.copyCurrentNoteLinkAfterPaste = value;
					await this.plugin.saveSettings();
				});

			return toggle;
		});
	}
}
