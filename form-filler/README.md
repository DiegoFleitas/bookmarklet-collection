# Form Filler

## Overview

This bookmarklet scans the current page for form fields, then generates a custom bookmarklet that will automatically re‑fill those fields with their current values (and optionally submit the form).

It is based on the original `FormFiller.js` script from [`wearecontrast/FormFiller`](https://github.com/wearecontrast/FormFiller), adapted here to fit into this bookmarklet collection.

## Usage

1. Navigate to a page that contains the form you want to save.
2. Create a new bookmark and paste the code for this bookmarklet as the bookmark's URL, or drag it from the collection site into your bookmarks bar.
3. Click the **Form Filler** bookmarklet on that page.
4. In the overlay that appears:
   - Optionally enable **“Submit form after filling”**.
   - Adjust the generated bookmarklet name if you like.
   - Click **Save**.
5. Drag the generated **My bookmarklet** link to your bookmarks bar (or right‑click and bookmark it).
6. Later, return to the same form and click your generated bookmarklet to automatically fill in all the saved values (and submit, if enabled).

## Notes

- The generated bookmarklet uses `id` attributes where available, falling back to `name` attributes for form fields within the original form.
- Only visible, non‑password fields are included. Hidden, password, submit, button, and file inputs are intentionally ignored.
- For radio and checkbox groups, only the options that were checked when you created the bookmarklet will be re‑checked.
- For multi‑select dropdowns, all selected options are preserved.
- The generated bookmarklet is scoped to the **host and path** where it was created. If you run it on a different path on the same site, it will ask for confirmation; on a different host, it will no‑op.
- The implementation has been modernized and no longer injects jQuery from an external CDN; it uses standard browser DOM APIs instead.

## Security & privacy

- Avoid using this tool to store:
  - Passwords or authentication secrets.
  - One‑time codes (2FA), recovery keys, or other highly sensitive data.
  - Forms on shared or public machines.
- Generated bookmarklets store your field values directly in their code. Anyone with access to your browser profile (or synced bookmarks) could read those values.
- Always verify you are on the expected site before running a saved form‑filler bookmarklet; host‑scoping and prompts help, but they cannot protect against every phishing scenario.


