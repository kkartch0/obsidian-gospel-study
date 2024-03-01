# Obsidian Gospel Study Plugin

An Obsidian plugin that allows for importing scripture verses or other quotes into an Obsidian note by simply pasting in the Gospel Library app share link (i.e. of the format \"https://www.churchofjesuschrist.org/study/*\")

This project utilizes Typescript for type checking and documentation. The repository depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing its functionality.

## First time developing plugins?

Quick starting guide for new plugin developers:

- Check if [someone has already developed a plugin for Gospel study](https://obsidian.md/plugins)! There might be an existing plugin similar enough that you can collaborate with.
- Make a copy of this repository as a template using the "Use this template" button (login to GitHub if you don't see it).
- Clone your repository to a local development folder. For convenience, you can place this folder in your `.obsidian/plugins/your-plugin-name` folder.
- Install NodeJS, then run `npm i` in the command line under your repository folder.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable the plugin in the settings window.
- For updates to the Obsidian API, run `npm update` in the command line under your repository folder.

## Releasing new versions

- Update `manifest.json` with new version number, such as `1.0.1`, and the minimum Obsidian version required for the latest release.
- Update `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so that older versions of Obsidian can download an older version of your plugin that's compatible.
- Create a new GitHub release using your new version number as the "Tag version". Use the exact version number, without a prefix `v`. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
- Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments. Note: The manifest.json file must be in two places, first in the root path of your repository and also in the release.
- Publish the release.

> You can simplify the version bump process by running `npm version patch`, `npm version minor`, or `npm version major` after manually updating `minAppVersion` in `manifest.json`.
> The command will bump the version in `manifest.json` and `package.json`, and add the entry for the new version to `versions.json`

## How to use

- Clone this repository.
- Ensure that your NodeJS version is at least v16 (`node --version`).
- Run `npm i` or `yarn` to install dependencies.
- Run `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint (optional)
- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code. 
- To use eslint with this project, make sure to install eslint from the terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project, use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`

## Funding URL

You can include funding URLs where people who use your plugin can financially support it.

The simple way is to set the `fundingUrl` field to your link in your `manifest.json` file:
