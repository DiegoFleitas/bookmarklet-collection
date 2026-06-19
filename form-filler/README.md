# Form Filler

Scans the current page for form fields, captures their current values, and generates a new bookmarklet that will re-fill the form automatically on future visits.

Based on [`wearecontrast/FormFiller`](https://github.com/wearecontrast/FormFiller), modernized to use standard DOM APIs instead of jQuery.

## Usage

1. Navigate to the page containing the form you want to save.
2. Install this bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or paste the code from `index.js` as a bookmark URL.
3. Click the **Form Filler** bookmarklet on that page.
4. In the overlay, optionally enable **"Submit form after filling"**, adjust the name, then click **Save**.
5. Drag the generated **My bookmarklet** link to your bookmarks bar.
6. Return to the form later and click your generated bookmarklet to auto-fill the saved values.

## Field handling

- Fields are matched by `id` first, falling back to `name`.
- Excluded: hidden inputs, passwords, submit/button/file inputs.
- Checkboxes and radio buttons: only the options checked at save time are re-checked.
- Multi-select dropdowns: all selected options are preserved.

## Scope

The generated bookmarklet is scoped to the **host and path** where it was created. Running it on a different path prompts for confirmation; a different host causes a no-op.

## Security & privacy

> [!WARNING]
> Field values are stored directly in the bookmark's code. Anyone with access to your browser profile or synced bookmarks can read them.
>
> - Do not save passwords, 2FA codes, recovery keys, or other secrets.
> - Do not use on shared or public machines.
> - Always verify you are on the expected site before running a saved form-filler bookmark.
