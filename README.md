# Diego's bookmarklet collection

[![Docs / site check](https://github.com/diegofleitas/bookmarklet-collection/actions/workflows/pages-check.yml/badge.svg?branch=main)](https://github.com/diegofleitas/bookmarklet-collection/actions/workflows/pages-check.yml)

A small collection of bookmarklets I wrote and still use occasionally. Most are not actively maintained and may no longer work on every site.

**[Browse and install bookmarklets →](https://diegofleitas.github.io/bookmarklet-collection/)**

## How it works

The live page loads `docs/bookmarklet-integrity.json`, which lists each bookmarklet directory with a SHA-384 hash of its `index.js`. For each entry it fetches the script from jsDelivr and verifies the hash before rendering a draggable link. Modified or mismatched code is omitted.

> After editing any `index.js`, regenerate the manifest (`npm run update-integrity`) and commit it. CI will fail if the manifest is stale.

## Adding a bookmarklet

1. Create a root-level directory (e.g. `my-bookmarklet/`) with `index.js` as a single line.
2. Optionally add a `README.md` with usage notes.
3. Run `npm run update-integrity` and commit `docs/bookmarklet-integrity.json`.
4. Push to `main` — CI verifies sync, then the live page picks it up automatically.

Syntax check: [Esprima validator](https://esprima.org/demo/validate.html).
CDN cache stuck? Use the [jsDelivr purge tool](https://www.jsdelivr.com/tools/purge).

## Contributing

```bash
npm install
npm run update-integrity   # after editing any index.js
npm run verify-integrity
npm run lint
```

## Project structure

```
bookmarklet-collection/
├── <bookmarklet-name>/
│   ├── index.js       # bookmarklet code, single line
│   └── README.md      # usage notes (optional)
├── docs/
│   ├── index.html     # GitHub Pages static site
│   ├── bookmarklet-integrity.json  # SHA-384 manifest
│   └── styles.css
└── scripts/
    ├── update-integrity.js   # regenerate manifest
    └── verify-integrity.js   # verify manifest vs index.js files
```
