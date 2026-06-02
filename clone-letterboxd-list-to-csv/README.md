# Clone Letterboxd list to CSV

## Overview

This bookmarklet generates a CSV file of movie information from a Letterboxd page. When activated, it extracts movie URLs and titles from the current page and downloads them as a CSV file.

The output CSV contains columns for:

- `LetterboxdURI`
- `Title`

`tmdbID` and `imdbID` columns are not currently populated; the script only exports the Letterboxd URL and title.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Navigate to a Letterboxd page that lists movies (for example, a list or diary page with posters).
3. Click the bookmarklet.
4. A CSV file will be downloaded to your device containing one row per movie found. For list pages, the filename matches the list slug; otherwise it falls back to `data.csv`.

## Notes

- The scraper logic depends on Letterboxd’s current HTML structure; layout changes can break extraction.
- You can enrich the CSV afterward by filling in TMDb/IMDb IDs using your own tools or APIs.
