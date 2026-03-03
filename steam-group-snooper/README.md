## Overview

This bookmarklet is meant to run on the **Members** tab of a Steam group. It extracts the profile URLs of members shown on the page and displays them in a preformatted block for easy copying.

It predates awareness of Steam's XML endpoint (`/memberslistxml/?xml=1`) and instead works directly against the rendered HTML.

## Usage

1. Create a new bookmark in your browser.
2. Paste the bookmarklet JavaScript as the bookmark's URL.
3. Open the **Members** tab of a Steam group.
4. Click the bookmarklet.
5. Copy the profile URLs from the alert box (rendered inside `<pre>` tags) and paste them into a text file, spreadsheet, or script for further analysis.

## Notes

> [!NOTE]
> The script looks for elements with the `linkFriend` class, which is how Steam structures member links in the legacy layout; newer layouts may not be compatible. For large groups, Steam paginates member lists; you may need to run the bookmarklet on each page.
