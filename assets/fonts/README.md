# Fonts

Self-hosted webfonts — no CDN calls, no build step. Both are SIL Open Font
License 1.1, split into Latin + Thai subsets only (the two scripts this site
actually uses) and fetched via `fonts.googleapis.com`'s `css2` endpoint,
which is how Google Fonts publishes the individual `.woff2` files.

| family | files | used for |
|---|---|---|
| Kanit ("Kanit Display" in CSS) | `kanit-{600,700}-{latin,thai}.woff2` | headings, the wordmark, eyebrows |
| IBM Plex Sans Thai ("Plex Sans Thai" in CSS) | `plex-sans-thai-{400,500,600,700}-{latin,thai}.woff2` | body copy, in both scripts |

`@font-face` rules with `unicode-range` live at the top of
`assets/css/site.css` — the browser only downloads the subset a page
actually needs (e.g. a Latin-only page skips the Thai files).
