# Steam group snooper

Extracts the profile URLs of members shown on a Steam group's **Members** tab and displays them in a popup for easy copying.

> [!WARNING]
> This script relies on the `linkFriend` CSS class from Steam's legacy group layout, which may no longer be active. If the bookmarklet returns no results, Steam has likely updated its HTML structure.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Open the **Members** tab of a Steam group.
3. Click the bookmarklet. Profile URLs appear in an alert box inside `<pre>` tags.

## Notes

- Steam paginates member lists for large groups; run the bookmarklet on each page separately.
- For a more reliable alternative, Steam exposes member data via the group's XML endpoint: `https://steamcommunity.com/groups/<groupname>/memberslistxml/?xml=1`.
