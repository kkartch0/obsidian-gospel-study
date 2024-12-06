import { STUDY_BLOCK_FORMAT_1, STUDY_BLOCK_FORMAT_2 } from "./defaultPluginSettings";
import GospelStudyPlugin from "./main";
import { App, MarkdownRenderer, PluginSettingTab, Setting } from "obsidian";
import { StudyBlock } from "./studyBlock";
import { getStudyBlockFromUrl } from "./getStudyBlockTextFromUrl";

export class GospelStudyPluginSettingTab extends PluginSettingTab {
	public plugin: GospelStudyPlugin;
	formats: string[];
	studyBlock!: StudyBlock | null;

	public constructor(app: App, plugin: GospelStudyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.formats = [STUDY_BLOCK_FORMAT_1, STUDY_BLOCK_FORMAT_2];

	}

	public async initSampleStudyBlockText() {
		this.studyBlock = await getStudyBlockFromUrl("https://www.churchofjesuschrist.org/study/scriptures/nt/john/3?lang=eng&id=p16-p17#p16", this.plugin.settings);
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
					.addOption(this.plugin.settings.customStudyBlockFormat, "Custom")
					.onChange(async (value) => {
						this.plugin.settings.studyBlockFormat = value;
						await this.plugin.saveSettings();
						this.display();
					})
					.setValue(this.plugin.settings.studyBlockFormat);

				return dropdown;
			});

		const studyBlockFormatPreviewDiv = containerEl.createDiv();
		studyBlockFormatPreviewDiv.addClass('markdown-rendered');

		this.renderBlockFormatPreview(studyBlockFormatPreviewDiv);

		const formatStringTextArea = containerEl.createEl("textarea");
		formatStringTextArea.style.width = "100%";
		formatStringTextArea.style.height = "150px";
		formatStringTextArea.style.resize = "none";
		formatStringTextArea.value = this.plugin.settings.studyBlockFormat;

		// on change, update the format string
		formatStringTextArea.addEventListener("input", async (event) => {
			const target = event.target as HTMLTextAreaElement;
			this.plugin.settings.studyBlockFormat = target.value;
			if (!this.formats.some(format => format === target.value)) {
				this.plugin.settings.customStudyBlockFormat = target.value;
			}
			await this.plugin.saveSettings();

			// Update the Markdown content
			this.renderBlockFormatPreview(studyBlockFormatPreviewDiv);
		});

		formatStringTextArea.addEventListener("focusout", () => {
			this.display();
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

		new Setting(containerEl)
			.setName("Retain Scripture Reference Links")
			.setDesc('If enabled, scripture reference links (e.g.<a class="scripture-ref" href="https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/21.12?lang=eng#p12">2&nbsp;Nephi 21:12</a>) will be retained, otherwise the hyperlink will be removed and only the text (e.g. "2 Nephi 21:12") will remain.')
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.retainScriptureReferenceLinks)
					.onChange(async (value) => {
						this.plugin.settings.retainScriptureReferenceLinks = value;
						await this.plugin.saveSettings();
					});

				return toggle;
			});

		new Setting(containerEl)
			.setName("Retain Non-Breaking Spaces")
			.setDesc('If enabled, non-breaking spaces (e.g. "&nbsp;") will be retained, otherwise they will be removed.')
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.retainNonBreakingSpaces)
					.onChange(async (value) => {
						this.plugin.settings.retainNonBreakingSpaces = value;
						await this.plugin.saveSettings();
					});

				return toggle;
			});

		new Setting(containerEl)
			.setName("Retain Paragraph Markers")
			.setDesc('If enabled, paragraph markers ("¶") will be retained, otherwise they will be removed.')
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.retainParagraphMarkers)
					.onChange(async (value) => {
						this.plugin.settings.retainParagraphMarkers = value;
						await this.plugin.saveSettings();
					});

				return toggle;
			});
	}

	private renderBlockFormatPreview(parentDiv: HTMLDivElement) {
		parentDiv.empty();
		MarkdownRenderer.render(
			this.app,
			this.studyBlock?.toString(this.plugin.settings.studyBlockFormat) ?? "",
			parentDiv,
			'',
			this.plugin
		);
	}
}
