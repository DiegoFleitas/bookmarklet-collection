# Discord everyone tagger

Scans the currently visible member list in the Discord web client, collects all visible usernames, and displays them as `@mention` strings split across multiple alert dialogs to respect Discord's 2000-character message limit.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Open the Discord web client and navigate to the relevant server/channel so the member list is visible.
3. Click the bookmarklet and wait while it scrolls and collects usernames.
4. Copy the mentions from each alert dialog and paste them into Discord messages as needed.

## Notes

> [!WARNING]
> Mass-mentioning users can be disruptive and may violate Discord server rules or Discord's Terms of Service. Use this script sparingly and only where you have explicit permission.
