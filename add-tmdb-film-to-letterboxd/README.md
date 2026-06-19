# Add TMDb film to Letterboxd

When run on a TMDb movie page, this bookmarklet extracts the numeric TMDb ID from the URL, constructs the corresponding Letterboxd film URL, and opens it in a new tab. Depending on the title, it lands on the film page or Letterboxd's import view.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Navigate to a TMDb movie page, e.g. `https://www.themoviedb.org/movie/12345`.
3. Click the bookmarklet. A new tab opens on the corresponding Letterboxd page.

## Notes

- Behavior depends on how Letterboxd handles TMDb IDs at the time; the destination may change if Letterboxd updates its import flow.
- Only standard TMDb movie URLs are recognized; localized or alternate URL patterns may not be parsed correctly.
