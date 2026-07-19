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
| `pnpm run build -- yt-auto-playlist` | Build bookmarklet as single line, ready to copy into URL bar |

## Critical rules

- **After editing any `*/index.js`, run `pnpm run update-integrity` AND commit `docs/bookmarklet-integrity.json`.** CI fails if manifest is stale.
- **New bookmarklet**: create `<name>/index.js` (starts with `javascript:(function(){...})()`), optional `<name>/README.md`, then `pnpm run update-integrity`.
- **No build step** — JS is used verbatim.
- **ESLint intentionally ignores `**/index.js`** — bookmarklet files are not linted.
- **Node ≥ 24** (see `.nvmrc`).
- The live page fetches from `cdn.jsdelivr.net/gh/DiegoFleitas/bookmarklet-collection@main` — only `main` branch is served. Purge CDN cache at https://www.jsdelivr.com/tools/purge if stale.

## Writing bookmarklet JS

- **Never use `//` line comments.** `scripts/build.js` collapses all whitespace, so a `//` comment comments out the rest of the file and silently yields a broken bookmarklet. Use `/* */`. The build now parses its own output and fails loudly, but the comment still won't survive.
- **Assume a hostile CSP.** Bookmarklets execute in the host page's context, and hardened sites (YouTube, GitHub) enforce `require-trusted-types-for 'script'`:
  - Use `textContent`, never `innerHTML` — it's a Trusted Types sink. Reading `document.body.innerHTML` is fine; only writes are blocked.
  - `script.src = '<string>'` is also blocked. Wrap it in a policy, with a fallback for browsers without Trusted Types:
    `trustedTypes.createPolicy(name, { createScriptURL: s => s })`.
  - An error thrown inside a `catch` block masks the original error. Guard cleanup (`if (el && el.parentNode)`).
- Prefix injected element IDs and `@keyframes` names with the bookmarklet name — they share a namespace with the host page.
- ES6 is fine (arrow functions, spread, template literals). Backticks survive the `encodeURIComponent` round-trip in `docs/index.html`.

## Testing a change

Three separate caches serve stale bookmarklet code. Defeat all of them, or you will debug code you are not running:

1. **The saved bookmark** holds its own copy — re-drag it from the page after any change.
2. **jsDelivr** — `pnpm run purge-cdn -- <name>`, then wait 1–5 min for edge propagation.
3. **Browser HTTP cache** — `docs/index.html` self-heals by refetching with `cache: "reload"` when the hash mismatches; keep that retry.

Fastest loop: `pnpm run build -- <name>`, paste into the page console. Bypasses all three.

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
