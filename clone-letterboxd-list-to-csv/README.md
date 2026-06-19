# Clone Letterboxd list to CSV

Extracts movie titles and URLs from a Letterboxd list page and downloads them as a CSV file.

The output CSV contains two columns: `LetterboxdURI` and `Title`. The `tmdbID` and `imdbID` columns are present in the header but intentionally left empty; the script only exports what the page directly provides.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Navigate to a Letterboxd page that lists movies (a list or diary page with poster thumbnails).
3. Click the bookmarklet. A CSV file downloads automatically. For list pages the filename matches the list slug; otherwise it falls back to `data.csv`.

## Notes

- The scraper depends on Letterboxd's current HTML structure; layout changes may break extraction.
- You can enrich the exported CSV afterward by filling in TMDb/IMDb IDs using your own tools or APIs.
