import { App, Modal, Setting } from "obsidian";

export class UrlEntryModal extends Modal {
    result: string;
    onSubmit: (result: string) => void;

    constructor(app: App, { onSubmit }: { onSubmit: (result: string) => void }) {
        super(app);
        this.onSubmit = onSubmit;
        this.result = "";
    }

    onOpen(): void {
        const { contentEl } = this;

        // contentEl.createEl("h1", { text: "Enter the URL" });

        const urlInput = new Setting(contentEl)
            .addText(text => {
                text.setPlaceholder("Enter the URL")
                    .onChange((value) => {
                        this.result = value;
                        submitButton.setDisabled(value.length === 0);
                    });

                text.inputEl.style.width = "100%";

                return text;
            });

        const submitButton = new Setting(contentEl)
            .addButton(button => {
                button.setButtonText("Submit")
                    .setCta()
                    .setDisabled(true)
                    .onClick(() => {
                        this.close();
                        this.onSubmit(this.result);
                    });
            });

    }

    onClose(): void {
        let { contentEl } = this;
        contentEl.empty();
    }
}