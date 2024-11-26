# Gospel Study

Gospel Study is the ultimate Obsidian plugin for use alongside the [Latter-day Saint Gospel Library app](https://www.churchofjesuschrist.org/learn/mobile-applications/gospel-library?lang=eng). Simply paste the link from any selected Gospel Library content and the Gospel Study plugin will import the associated content. 

It is intended for this plugin to support importing *any* content from the Gospel Library app in *any* language. As long as the Gospel Library app has it, the Gospel Study plugin can import it! 

If you encounter any content that is not properly importing, please create an issue.

## Installing via BRAT

Install the [BRAT plugin](https://tfthacker.com/BRAT) via the Obsidian Plugin Browser and then add the beta repository "kkartch0/obsidian-gospel-study".

## Manually installing the plugin

- Copy over `main.js` and `manifest.json` to your vault `<VaultFolder>/.obsidian/plugins/gospel-study/`.


## Contributing

- Clone this repo.
- Make sure your NodeJS is at least v16 (`node --version`).
- `npm ci` to install dependencies.
- `npm run dev` to start compilation in watch mode.

For a more in-depth guide, visit the [Obsidian Developer Docs](https://docs.obsidian.md/Home).

## Architecture

This project uses Typescript to provide type checking and documentation. It depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing what it does.

For more information on the Obsidian API, see [Obsidian API documentation](https://github.com/obsidianmd/obsidian-api).

## Releasing new versions

> **Note:** This requires having permission to push directly to `main`.

On the main branch, run `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.

This command will:

1. bump version in `manifest.json` and `package.json`
2. add the entry for the new version to `versions.json`
3. create a commit with the updated files
4. add an annotated git tag of the version to the commit 

After running the above command, run `git push --tags` to push local changes to the remote. This will cause the GitHub "Release" action to create a new draft release including the built outputs. This release can then be finalized and released.