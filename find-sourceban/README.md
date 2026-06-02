# Find SourceBan

## Overview

This bookmarklet is intended for use on the **ban list page** of a SourceBans++ installation (for example `https://www.skial.com/sourcebans/index.php?p=banlist`). Given a SteamID64, it finds the corresponding entry in the ban table and automatically opens its detail row.

It is useful when you already know a player's SteamID64 and want to quickly jump to their ban information in a long list.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Open a SourceBans++ ban list page.
3. Click the bookmarklet.
4. When prompted for `longid`, enter the SteamID64 (for example `76561198065246891`).
5. The script will locate the row containing that ID and programmatically click the associated summary row so that the detailed ban information is expanded.

## Notes

> [!NOTE]
> The XPath used assumes the default SourceBans++ table structure (`tr.tbl_out` rows with SteamID links). Custom themes may break this behavior. This bookmarklet only searches the **current** page; if the ban entry is on another pagination page you’ll need to navigate there first.
