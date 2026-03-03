# YouTube auto‑playlist

## Overview

This bookmarklet builds an automatic playlist from all the YouTube videos it can find on the current page (typically a channel page or listing), including fallbacks for videos that cannot be embedded.

When run, it overlays a YouTube player on top of the current page and starts playing the generated playlist without navigating away.

## Usage

1. Create a new bookmark in your browser.
2. Paste the bookmarklet JavaScript as the bookmark's URL.
3. Navigate to a YouTube channel page or any page that lists multiple YouTube videos.
4. Click the bookmarklet.
5. Use the in‑page player to:
   - Start or pause playback.
   - Seek within the playlist.
   - Click the small arrow icon in the top‑left of the player to open the playlist in a new tab.

## Notes

> [!NOTE]
> The embedded player only supports a limited number of videos at once (about 40). If more videos are found, the script logs a direct `watch_videos` URL in the browser console for the remaining IDs.

- The script logs errors to the browser console for issues such as invalid parameters or unavailable videos.
- Playlist generation depends on how YouTube structures the current page; major layout changes on YouTube's side can break this bookmarklet.
