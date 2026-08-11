# Screenshots

These images are exported from `docs/mockups/` in
[LDKTC/App-DraconDex](https://github.com/LDKTC/App-DraconDex) — static
design references for the v3 module-tree UI, rendered as 1440x900 PNGs.
They are not live captures of a running build, but they reflect the same
UI strings and layout as the shipped app (see `electron/src/renderer/i18n.js`
and `docs/Architec.md` in that repo).

| file | source mockup |
|---|---|
| shell.png | `01-shell.png` |
| manager.png | `08-manager.png` |
| inspector.png | `09-detail.png` |
| classifier.png | `21-classifier-grid.png` |
| locator.png | `03-locator.png` |
| chronicler.png | `04-chronicler.png` |
| wanderer.png | `10-wanderer.png` |
| narrator.png | `11-narrator.png` |
| author.png | `12-author.png` |
| scribe.png | `06-scribe-chat.png` |
| drafter.png | `13-drafter.png` |
| viewer.png | `14-viewer.png` |
| connector.png | `15-connector.png` |
| sketcher.png | `28-sketcher.png` |
| designer.png | `31-designer.png` |

There is no `collector.png` — that module kind has no dedicated screen by
design (it's an empty folder that only groups children).

## Theme mockups

The `theme-*.png` files are the same source mockup (the Classifier screen)
re-skinned with each palette from `docs/mockups/build.js`'s `THEME_VARS`, used
for the "Theme mockups" carousel on `index.html`. `midnight` is the app's
default theme and is already shown throughout the module-tree screenshots
above, so there is no `theme-midnight.png`.

| file | theme |
|---|---|
| theme-daylight.png | daylight (one of the app's three built-in themes) |
| theme-moonlight.png | moonlight (one of the app's three built-in themes) |
| theme-redEclipse.png | redEclipse (bundled preset) |
| theme-clearSky.png | clearSky (bundled preset) |
| theme-atDusk.png | atDusk (bundled preset) |
| theme-clearAurora.png | clearAurora (bundled preset) |
| theme-rainbow.png | rainbow (bundled preset) |
