# Diego's Bookmarklet collection

A collection of old bookmarklets I wrote and still use once in a full moon. Most of them are not actively maintained and may not work as expected today.
Better placed on a repo than among the (too many) bookmarks on my browser (firefox).

## Live Bookmarklet Page

Visit [the live page](https://diegofleitas.github.io/bookmarklet-collection/) to see all bookmarklets and drag them to your bookmarks bar.

## Repo layout

- **Root:** One directory per bookmarklet. Each has `index.js` (the bookmarklet code) and optionally `README.md`.
- **docs/:** The GitHub Pages site (`index.html`) and the integrity manifest (`bookmarklet-integrity.json`). The site is served from the `main` branch with source folder `/docs`.
- **scripts/:** `update-integrity.js` regenerates the integrity manifest; `verify-integrity.js` is used by CI.
- **.github/workflows/:** CI checks that `docs/` and the integrity manifest are present and in sync with `index.js` files.

## How the page works

The live page loads `bookmarklet-integrity.json` (same origin). That manifest lists bookmarklet folder names and their SHA-384 hashes. For each entry it fetches `index.js` from [jsDelivr](https://www.jsdelivr.com/github), verifies the hash, and builds a draggable link. Each bookmarklet also gets a README link pointing to its GitHub README.md file (which may or may not exist). No GitHub API; one manifest fetch plus one script fetch per bookmarklet.

## Integrity

The page only embeds bookmarklet code whose SHA-384 hash matches the committed manifest (`docs/bookmarklet-integrity.json`). If the CDN or the repo were compromised, changed code would not match and the link would not be created. After editing any bookmarklet’s `index.js`, you must regenerate the manifest and commit it (see Adding a bookmarklet).

## Adding a bookmarklet

1. Create a new **root-level** directory, e.g. `my-bookmarklet/`.
2. Add `index.js` with the bookmarklet code (single line, no comments; use [Esprima](https://esprima.org/demo/validate.html) to validate).
3. Optionally add `README.md` describing what it does.
4. Run `npm run update-integrity` (or `node scripts/update-integrity.js`) and commit the updated `docs/bookmarklet-integrity.json`.
5. Push to `main`. The live page will pick it up automatically. CI will fail if the manifest is out of sync with any `index.js`.

## Project scope

This is intentionally a small, lightweight bookmarklet collection and static GitHub Pages site. It uses a minimal Node toolchain (integrity scripts and a simple CI check) rather than a full test suite or heavy frontend framework.

## Development tooling

- **Update integrity manifest:** `npm run update-integrity`
- **Verify integrity manifest matches bookmarklets:** `npm run verify-integrity`
- **Lint (optional):** `npm run lint` (uses ESLint with a minimal config, ignoring legacy bookmarklet files)
- **Format (optional):** `npm run format` (uses Prettier with a basic configuration)

## Limitations

- **CSP and browser rules:** Many sites block `javascript:` bookmarks or restrict cross-origin scripts. Bookmarklets only run where the browser and site allow.
- **jsDelivr cache:** After updating a bookmarklet, the CDN may serve an old copy. Use [Purge jsDelivr CDN cache](https://www.jsdelivr.com/tools/purge) if needed (e.g. `https://cdn.jsdelivr.net/gh/diegofleitas/bookmarklet-collection@main/my-bookmarklet/index.js`).

## GitHub Pages setup

In the repo **Settings → Pages**, set source to **Deploy from a branch**; branch **main**, folder **/docs**. The public URL stays `https://diegofleitas.github.io/bookmarklet-collection/`.

## Deprecating the gh-pages branch (after switch)

1. **Freeze:** Create a tag from current `gh-pages` for rollback, e.g. `git tag backup/gh-pages-$(date +%Y%m%d) gh-pages && git push origin backup/gh-pages-$(date +%Y%m%d)`.
2. **Validate:** Use the live site from `main`/`docs` for a short period; confirm listing, payloads, and a few bookmarklets work.
3. **Delete:** Remove the branch locally and on origin: `git push origin --delete gh-pages` (and delete local `gh-pages` if desired). The site is now served only from `main`/`docs`.

## Resources

- [JS Builder](http://subsimple.com/bookmarklets/jsbuilder.htm): A tool for creating and testing bookmarklets.
- [Esprima Validator](https://esprima.org/demo/validate.html): A JavaScript syntax validator to ensure your code is free of syntax errors. (This won't catch comments, remember you can't have those in a single-line bookmarklet :wink:)
- [Purge jsDelivr CDN cache](https://www.jsdelivr.com/tools/purge) ex: https://cdn.jsdelivr.net/gh/diegofleitas/bookmarklet-collection@main/justwatch-watchlist-exporter/index.js?1712802445207
