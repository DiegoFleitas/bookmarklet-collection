# Add TMDb film to Letterboxd

## Overview

This bookmarklet helps you jump from a **TMDb** movie page to the corresponding **Letterboxd** film page (or film import view) for new titles.

When you run it on a TMDb movie page, it extracts the numeric TMDb movie ID from the URL, builds the appropriate Letterboxd URL, and opens it in a new tab.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Navigate to a TMDb movie page, for example:
   - `https://www.themoviedb.org/movie/NEW_ID`
3. Click the bookmarklet.
4. A new tab will open on Letterboxd for that movie or an import screen where you can add it to Letterboxd.

## Notes

- The exact Letterboxd URL that is opened depends on how Letterboxd handles TMDb IDs at the time; behavior may change if Letterboxd updates its import flow.
- This bookmarklet assumes a standard TMDb movie URL; localized or alternate URL patterns may not be recognized.
