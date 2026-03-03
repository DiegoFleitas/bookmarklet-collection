## Overview

This bookmarklet is meant to be run on the **ban list page** of a SourceBans++ installation (for example `https://www.skial.com/sourcebans/index.php?p=banlist`). SourceBans++ is an administration, ban, and communication management system for games using the Source engine.

The script finds links that look like Steam profile URLs for banned players, collects them, and displays them in a single list.

## Usage

1. Create a new bookmark in your browser.
2. Paste the bookmarklet JavaScript as the bookmark's URL.
3. Open a SourceBans++ ban list page.
4. Click the bookmarklet.
5. Copy the extracted Steam profile URLs from the alert/popup and use them as needed (for example, for further analysis or tooling).

## Notes

- The detection logic is based on link text/structure typical of SourceBans++ ban lists; heavily customized themes may not work.
- Be mindful of privacy and server rules when exporting or sharing ban lists.
