# Find SourceBan

Finds a specific player's ban entry on a SourceBans++ ban list page by SteamID64, then automatically clicks the row to expand the detailed ban information.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Open a SourceBans++ ban list page (e.g. `https://www.skial.com/sourcebans/index.php?p=banlist`).
3. Click the bookmarklet.
4. When prompted, enter the player's SteamID64 (e.g. `76561198065246891`).
5. The script locates the matching row and clicks to expand the ban details.

## Notes

> [!NOTE]
> The XPath used matches the default SourceBans++ table structure (`tr.tbl_out` rows with SteamID links). Custom themes may break detection. The script only searches the **current page**; navigate to the correct pagination page first if the entry is not there.
