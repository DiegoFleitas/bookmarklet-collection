# YouTube auto‑playlist

Finds all YouTube video IDs on the current page and builds an in-page playlist, overlaying a YouTube player without navigating away.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Navigate to a YouTube channel page or any page containing multiple YouTube video links.
3. Click the bookmarklet. An embedded player appears and starts the playlist.
4. Use the player controls to play, pause, or seek. Click the arrow icon in the top-left corner to open the playlist in a new tab.

## Notes

> [!NOTE]
> The embedded player is limited to approximately 40 videos. For larger sets, the remaining video IDs are logged as a direct `watch_videos` URL in the browser console.

- Depends on how YouTube structures the current page; major layout changes can break video discovery.
