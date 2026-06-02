# Steam group snooper

## Overview

This bookmarklet is meant to run on the **Members** tab of a Steam group. It extracts the profile URLs of members shown on the page and displays them in a preformatted block for easy copying.

It predates awareness of Steam's XML endpoint (`/memberslistxml/?xml=1`) and instead works directly against the rendered HTML.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Open the **Members** tab of a Steam group.
3. Click the bookmarklet.
4. Copy the profile URLs from the alert box (rendered inside `<pre>` tags) and paste them into a text file, spreadsheet, or script for further analysis.

## Notes

> [!WARNING]
> The script relies on the `linkFriend` CSS class from Steam's legacy group layout. This layout may no longer be active on Steam; if the bookmarklet returns no results, Steam has likely updated its HTML structure. For large groups, Steam paginates member lists; you may need to run the bookmarklet on each page.
