## Overview

This bookmarklet is intended for use on the **ban list page** of a SourceBans++ installation (for example `https://www.skial.com/sourcebans/index.php?p=banlist`). Given a SteamID64, it finds the corresponding entry in the ban table and automatically opens its detail row.

It is useful when you already know a player's SteamID64 and want to quickly jump to their ban information in a long list.

## Usage

1. Create a new bookmark in your browser.
2. Paste the bookmarklet JavaScript as the bookmark's URL.
3. Open a SourceBans++ ban list page.
4. Click the bookmarklet.
5. When prompted for `longid`, enter the SteamID64 (for example `76561198065246891`).
6. The script will locate the row containing that ID and programmatically click the associated summary row so that the detailed ban information is expanded.

## Notes

> [!NOTE]
> The XPath used assumes the default SourceBans++ table structure (`tr.tbl_out` rows with SteamID links). Custom themes may break this behavior. This bookmarklet only searches the **current** page; if the ban entry is on another pagination page you’ll need to navigate there first.
