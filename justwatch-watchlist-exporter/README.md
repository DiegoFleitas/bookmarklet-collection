# JustWatch watchlist exporter

Scrapes your JustWatch watchlist using GraphQL and downloads the data as a SIMKL-compatible CSV.

## Exported fields

| Field | Source |
| --- | --- |
| English title | JustWatch API |
| Original title | JustWatch API |
| IMDb ID | JustWatch API |
| Release year | JustWatch API |
| Release date | JustWatch API |
| Runtime | JustWatch API |
| Age certification | JustWatch API |
| Media type (movie/show) | JustWatch API |

Raw scraped data is also stored in `localStorage` under the key `watchlistData` for further inspection.

## Usage

> [!NOTE]
> Set JustWatch to the **English** language before running. Other locales may return incomplete or differently structured metadata.

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Log in to JustWatch and open your watchlist page.
3. Click the bookmarklet. The script fetches data via GraphQL and triggers a CSV download when complete.

## Notes

- Depends on JustWatch's current GraphQL schema; major API changes can break the export.
- Error handling is minimal; check the browser console if something goes wrong.
- Tested on modern desktop browsers only.
