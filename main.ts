import { Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {
	async onload() {
		console.log('loading the plugin');

		this.registerEvent(this.app.workspace.on('editor-paste', async (clipboard, editor): Promise<void> => {
			if (clipboard.defaultPrevented) return;

			if (!navigator.onLine) return;

			const clipboardData = clipboard.clipboardData?.getData('text/plain');

			if (!clipboardData) return;
			if (!clipboardData.contains("https://churchofjesuschrist.org")) return;

			console.log(clipboardData);
		}));

	}

	onunload() {
		navigator.clipboard
		console.log('unloading plugin');
	}
}