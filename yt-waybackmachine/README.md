# YouTube Wayback Machine

Prompts for a YouTube video ID and opens the corresponding video in the Internet Archive's Wayback Machine, landing on a July 2013 archived snapshot of the YouTube player.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Click the bookmarklet from any page.
3. Enter the YouTube video ID (the value after `v=` in the URL, e.g. `dQw4w9WgXcQ`).
4. A new tab opens at the 2013 Wayback Machine snapshot for that video.

## Notes

> [!NOTE]
> The bookmarklet always targets a hardcoded July 2013 snapshot URL. It does not check whether newer snapshots exist for the video.

- The Wayback Machine may not have a snapshot for every video ID.
- Works from any page; you only need the video ID.
