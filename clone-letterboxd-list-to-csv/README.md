## Overview

This bookmarklet generates a CSV file of movie information from a Letterboxd page. When activated, it extracts movie URLs and titles from the current page and downloads them as a CSV file.

The output CSV contains columns for:

- `LetterboxdURI`
- `Title`

`tmdbID` and `imdbID` columns are not currently populated; the script only exports the Letterboxd URL and title.

## Usage

1. Create a new bookmark in your browser.
2. Copy the JavaScript code from `index.js` and paste it into the bookmark's URL field.
3. Navigate to a Letterboxd page that lists movies (for example, a list or diary page with posters).
4. Click the bookmarklet.
5. A CSV file will be downloaded to your device containing one row per movie found. For list pages, the filename matches the list slug; otherwise it falls back to `data.csv`.

## Notes

- The scraper logic depends on Letterboxd’s current HTML structure; layout changes can break extraction.
- You can enrich the CSV afterward by filling in TMDb/IMDb IDs using your own tools or APIs.
