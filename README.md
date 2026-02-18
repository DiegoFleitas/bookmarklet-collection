# Diego's Bookmarklet collection

A collection of old bookmarklets I wrote and still use once in a full moon. Most of them are not actively maintained and may not work as expected today.
Better placed on a repo than among the (too many) bookmarks on my browser (firefox).

## Live Bookmarklet Page

Visit [the live page](https://diegofleitas.github.io/bookmarklet-collection/) to see all bookmarklets and drag them to your bookmarks bar.

## Repo layout

- **Root:** One directory per bookmarklet. Each has `index.js` (the bookmarklet code) and optionally `README.md`.
- **docs/:** The GitHub Pages site (single `index.html`). The site is served from the `main` branch with source folder `/docs`.
- **.github/workflows/:** CI that checks the Pages entrypoint and that every bookmarklet dir has `index.js`.

## How discovery works

The live page fetches the repo directory list from the GitHub API (`GET .../git/trees/main?recursive=1`), keeps only **top-level** directories, and excludes `docs`, `.github`, and any name starting with `.`. The exclude list is defined once in `docs/index.html` (`EXCLUDED_DIRS`); CI reads it from there. For each remaining directory it loads `index.js` via [jsDelivr](https://www.jsdelivr.com/github) from `main` and builds a draggable link. No manual edit of `docs/index.html` is needed when adding or removing bookmarklets.

## Adding a bookmarklet

1. Create a new **root-level** directory, e.g. `my-bookmarklet/`.
2. Add `index.js` with the bookmarklet code (single line, no comments; use [Esprima](https://esprima.org/demo/validate.html) to validate).
3. Optionally add `README.md` describing what it does.
4. Push to `main`. The live page will pick it up automatically.

## Limitations

- **CSP and browser rules:** Many sites block `javascript:` bookmarks or restrict cross-origin scripts. Bookmarklets only run where the browser and site allow.
- **GitHub API:** Unauthenticated requests are limited (e.g. 60/hour). If the live page hits the limit, the list may not load until the window resets.
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
