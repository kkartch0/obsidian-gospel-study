# Gospel Study

Gospel Study is the ultimate Obsidian plugin for use alongside the Latter-day Saint Gospel Library app. Simply paste the link from any selected Gospel Library content and the Gospel Study plugin will import the associated content. 

It is intended for this plugin to support importing *any* content from the Gospel Library app in *any* language. As long as Gospel Library app has it, the Gospel Study plugin can import it! 

If you run into any content that is not properly importing please create an issue.

## Manually installing the plugin

- Copy over `main.js` and `manifest.json` to your vault `<VaultFolder>/.obsidian/plugins/gospel-study/`.

## Contributing

- Clone this repo.
- Make sure your NodeJS is at least v16 (`node --version`).
- `npm i` or `yarn` to install dependencies.
- `npm run dev` to start compilation in watch mode.

See https://github.com/obsidianmd/obsidian-api

## Architecture

This project uses Typescript to provide type checking and documentation. It depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing what it does.

## First time developing plugins?

Quick starting guide for new plugin devs:

- Clone this repo to a local development folder. For convenience, you can clone it to your `.obsidian/plugins/` folder in a *test vault* NOT your main vault.
- Install NodeJS, then run `npm ci` in the command line under your repo folder.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes are automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `npm update` in the command line under your repo folder.

## Releasing new releases

On the main branch, run `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.

This command will:

1. bump version in `manifest.json` and `package.json`
2. add the entry for the new version to `versions.json`
3. create a commit with the updated files
4. add an annotated git tag of the version to the commit 

After running the above command, run `git push --tags` to push local changes to the remote. This will cause the GitHub "Release" action to create a new draft release including the built outputs. This release can then be finalized and released.