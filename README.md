# Diego's bookmarklet collection

[![Docs / site check](https://github.com/diegofleitas/bookmarklet-collection/actions/workflows/pages-check.yml/badge.svg?branch=main)](https://github.com/diegofleitas/bookmarklet-collection/actions/workflows/pages-check.yml)

A small collection of JavaScript bookmarklets for everyday browser tasks. Most are not actively maintained and may break if sites update their markup.

**[Browse and install bookmarklets →](https://diegofleitas.github.io/bookmarklet-collection/)**

## Bookmarklets

| Bookmarklet | Description |
| --- | --- |
| [Add TMDb film to Letterboxd](add-tmdb-film-to-letterboxd/) | Opens the Letterboxd entry for a TMDb movie page in a new tab |
| [Bypass article paywall](bypass-article-paywall/) | Sends the current URL through 1ft.io to attempt paywall bypass |
| [Clone Letterboxd list to CSV](clone-letterboxd-list-to-csv/) | Downloads movie titles and URLs from a Letterboxd list page as CSV |
| [Discord everyone tagger](discord-everyone-tagger/) | Collects visible member usernames and formats them as @mentions |
| [Discord swiper](discord-swiper/) | Collects rich member profile data from a Discord server (requires auth token) |
| [DOM change debugger](dom-change-debugger/) | Injects a `Spy` helper that pauses JS execution when a watched DOM element changes |
| [Find SourceBan](find-sourceban/) | Finds a player's ban entry on a SourceBans++ list by SteamID64 |
| [Form Filler](form-filler/) | Saves a form's field values into a new bookmarklet that refills them automatically |
| [JustWatch watchlist exporter](justwatch-watchlist-exporter/) | Exports your JustWatch watchlist to a SIMKL-compatible CSV |
| [Parse SourceBans](parse-sourcebans/) | Extracts all Steam profile URLs from a SourceBans++ ban list page |
| [Quick open SteamID UK](quick-open-steamiduk/) | Speeds up SteamID UK indexing by briefly opening each found profile in a new tab |
| [Steam group snooper](steam-group-snooper/) | Extracts member profile URLs from a Steam group's Members tab (legacy layout) |
| [Virtual scrollwheel](virtual-scrollwheel/) | Injects fixed scroll buttons (up / rest / down) on any long webpage |
| [YouTube auto‑playlist](yt-auto-playlist/) | Builds and plays an in-page playlist from YouTube videos found on the current page |
| [YouTube Wayback Machine](yt-waybackmachine/) | Opens a YouTube video in the Wayback Machine's 2013 archived snapshot |

## How it works

The live page fetches `docs/bookmarklet-integrity.json`, which maps each bookmarklet directory to a SHA-384 hash of its `index.js`. For each entry it fetches the script from jsDelivr CDN and verifies the hash client-side before rendering a draggable `javascript:` link. Code that fails verification is silently omitted.

> [!NOTE]
> The live page only serves code from the `main` branch. If changes look stale after pushing, purge the CDN cache at [jsdelivr.com/tools/purge](https://www.jsdelivr.com/tools/purge).

## Adding a bookmarklet

1. Create a root-level directory (e.g. `my-bookmarklet/`) containing `index.js` as a single `javascript:(function(){...})()` expression.
2. Optionally add a `README.md` with usage notes.
3. Run `pnpm run update-integrity` and commit `docs/bookmarklet-integrity.json`.
4. Push to `main`. CI verifies sync, and the live page picks it up automatically.

> [!TIP]
> Validate syntax before committing: [Esprima validator](https://esprima.org/demo/validate.html)

## Development

```bash
pnpm install
pnpm run update-integrity   # after editing any index.js
pnpm run verify-integrity
pnpm run lint
pnpm run dev                # serve docs/ locally
```

> [!IMPORTANT]
> After editing any `index.js`, always run `pnpm run update-integrity` and commit `docs/bookmarklet-integrity.json`. CI fails if the manifest is stale.

Requires Node ≥ 24 (see `.nvmrc`).

## Project structure

```text
bookmarklet-collection/
├── <bookmarklet-name>/
│   ├── index.js       # bookmarklet code, verbatim (no build step)
│   └── README.md      # usage notes (optional)
├── docs/
│   ├── index.html                  # GitHub Pages static site
│   ├── bookmarklet-integrity.json  # SHA-384 manifest
│   └── styles.css
└── scripts/
    ├── update-integrity.js   # regenerate manifest
    └── verify-integrity.js   # verify manifest vs index.js files
```
