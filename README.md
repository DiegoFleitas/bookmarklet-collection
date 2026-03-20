# Diego's bookmarklet collection

[![Docs / site check](https://github.com/diegofleitas/bookmarklet-collection/actions/workflows/pages-check.yml/badge.svg?branch=main)](https://github.com/diegofleitas/bookmarklet-collection/actions/workflows/pages-check.yml)

A small collection of bookmarklets I wrote and still use occasionally. Most of them are not actively maintained and may no longer work on every site, but keeping them here is more practical than burying them in a long browser bookmarks list.

See [docs/frontend-design.md](docs/frontend-design.md) for the current frontend design direction and aesthetic details.

## Live bookmarklet page

Visit **[the live page](https://diegofleitas.github.io/bookmarklet-collection/)** to:

- **Browse all bookmarklets**
- **Read per-bookmarklet READMEs**
- **Drag bookmarklet links to your bookmarks bar**

## Repository layout

- **Root:** One directory per bookmarklet. Each contains an `index.js` (the bookmarklet code, single line) and optionally a `README.md` with usage notes.
- **docs/**: Static site (`index.html`) plus the integrity manifest (`bookmarklet-integrity.json`). The site is deployed from the `main` branch via GitHub Pages using the `docs/` folder as the published root.
- **scripts/**: Node scripts for maintaining the integrity manifest:
  - `update-integrity.js` regenerates `docs/bookmarklet-integrity.json`
  - `verify-integrity.js` checks that the manifest matches the current `index.js` files
- **.github/workflows/**: CI that ensures `docs/` and the integrity manifest stay in sync with the bookmarklets.

## How the page works

The live page loads `bookmarklet-integrity.json` from the same origin. That manifest lists each bookmarklet directory and the SHA‑384 hash of its `index.js`. For every entry the page:

1. Fetches the corresponding `index.js` from [jsDelivr](https://www.jsdelivr.com/github).
2. Verifies the SHA‑384 hash against the manifest.
3. Renders a draggable link for the bookmarklet plus an optional link to its README on GitHub.

There is no GitHub API usage; the page performs a single manifest fetch and then one script fetch per bookmarklet.

## Integrity model

Only bookmarklet code whose SHA‑384 hash matches the committed manifest (`docs/bookmarklet-integrity.json`) is displayed. If either the CDN or the repository were compromised and served modified code, the hash would not match and the link would be omitted.

> [!IMPORTANT]
> After editing any bookmarklet’s `index.js`, you **must** regenerate and commit the manifest (see **Adding a bookmarklet**). If the manifest is stale, CI will fail and the live page may hide or flag the affected bookmarklets.

## Quick start (contributors)

1. **Install dependencies**
   - `npm install`
2. **Update the integrity manifest after bookmarklet changes**
   - `npm run update-integrity`
3. **Optionally verify and lint**
   - `npm run verify-integrity`
   - `npm run lint`

## Adding a bookmarklet

1. Create a new **root-level** directory, e.g. `my-bookmarklet/`.
2. Add `index.js` with the bookmarklet code as a single line (no comments). You can use the [Esprima validator](https://esprima.org/demo/validate.html) to check syntax.
3. Optionally add a `README.md` describing what the bookmarklet does, how to use it, and any caveats.
4. Run `npm run update-integrity` (or `node scripts/update-integrity.js`) and commit the updated `docs/bookmarklet-integrity.json`.
5. Push to `main`. CI will fail if the manifest is out of sync with any `index.js`. Once CI passes, the live page will pick up the new bookmarklet automatically.

## Project scope

This is intentionally a small, lightweight bookmarklet collection plus a static GitHub Pages site. It uses a minimal Node toolchain (for integrity scripts and a simple CI check) rather than a full test suite or heavy frontend framework.

## Development tooling

- **Update integrity manifest:** `npm run update-integrity`
- **Verify integrity manifest matches bookmarklets:** `npm run verify-integrity`
- **Lint (optional):** `npm run lint` (ESLint, minimal config; legacy bookmarklet files are mostly ignored)
- **Format (optional):** `npm run format` (Prettier with a basic configuration)

## Limitations

- **CSP and browser rules:** Many sites block `javascript:` bookmarks or restrict cross‑origin scripts. Bookmarklets only run where both the browser and target site allow them.
- **jsDelivr cache:** After updating a bookmarklet, the CDN may serve an old copy for a while. Use the [jsDelivr cache purge tool](https://www.jsdelivr.com/tools/purge) if necessary (for example `https://cdn.jsdelivr.net/gh/diegofleitas/bookmarklet-collection@main/my-bookmarklet/index.js`).

## Hosting

The static site in the `docs/` folder on `main` is published via **GitHub Pages** at [https://diegofleitas.github.io/bookmarklet-collection/](https://diegofleitas.github.io/bookmarklet-collection/).
Note that the root GitHub Pages site at [https://diegofleitas.github.io](https://diegofleitas.github.io) is managed by a different repository; this project only owns the `/bookmarklet-collection/` subpath.

## Resources

- [JS Builder](http://subsimple.com/bookmarklets/jsbuilder.htm): A simple tool for creating and testing bookmarklets.
- [Esprima validator](https://esprima.org/demo/validate.html): JavaScript syntax validator to ensure your code parses correctly as a single line.
- [Purge jsDelivr CDN cache](https://www.jsdelivr.com/tools/purge): For forcing cache refreshes of bookmarklet URLs such as `https://cdn.jsdelivr.net/gh/diegofleitas/bookmarklet-collection@main/justwatch-watchlist-exporter/index.js`.
