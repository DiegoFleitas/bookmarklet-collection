# AGENTS.md

## Commands (use `pnpm`, not `npm`)

| Command | Purpose |
|---------|---------|
| `pnpm run update-integrity` | Regenerate `docs/bookmarklet-integrity.json` after editing any `index.js` |
| `pnpm run verify-integrity` | Verify manifest matches all `index.js` files (CI runs this) |
| `pnpm run lint` | ESLint |
| `pnpm run format` | Prettier --write |
| `pnpm run dev` | Serve `docs/` locally via `npx serve` |
| `pnpm run purge-cdn` | Purge all files under jsDelivr CDN for `main` branch |
| `pnpm run purge-cdn -- yt-auto-playlist` | Purge just `yt-auto-playlist/index.js` on CDN |
| | **Note:** Purge completes in seconds at jsDelivr, but edge propagation (CF + FY) takes 1–5 min. |

## Critical rules

- **After editing any `*/index.js`, run `pnpm run update-integrity` AND commit `docs/bookmarklet-integrity.json`.** CI fails if manifest is stale.
- **New bookmarklet**: create `<name>/index.js` (starts with `javascript:(function(){...})()`), optional `<name>/README.md`, then `pnpm run update-integrity`.
- **No build step** — JS is used verbatim.
- **ESLint intentionally ignores `**/index.js`** — bookmarklet files are not linted.
- **Node ≥ 24** (see `.nvmrc`).
- The live page fetches from `cdn.jsdelivr.net/gh/DiegoFleitas/bookmarklet-collection@main` — only `main` branch is served. Purge CDN cache at https://www.jsdelivr.com/tools/purge if stale.

## Architecture

- Each bookmarklet is a root-level directory with `index.js` (+ optional `README.md`).
- `docs/bookmarklet-integrity.json` maps directory name → SHA-384 hash of its `index.js`.
- `docs/index.html` (GitHub Pages) fetches manifest, loads each `index.js` from jsDelivr CDN, verifies hash via `crypto.subtle`, renders draggable `javascript:` links.
- Scripts in `scripts/` run in Node (`env: node`). Inline JS in `docs/` runs in browser (`env: browser`).

## Git

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`, `perf:`, `test:`.
- Keep subject under 72 chars, lowercase after colon, no trailing period.
- Stage only relevant files — never `git add .` or `git add -A`.
- Inspect `git status`, `git diff`, and recent commits before staging.
- Write body (if any) wrapped at 72 chars, blank line between subject and body.

## Skills

Design skills live in `.agents/skills/` — 18 skills for UX review, animation, color, onboarding, etc.
