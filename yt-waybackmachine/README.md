# YouTube Wayback Machine

## Overview

This bookmarklet opens a YouTube video in the Internet Archive's Wayback Machine so you can quickly check archived versions of a given video.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Click the bookmarklet from any page.
3. When prompted, enter the YouTube video ID (the value after `v=` in the URL).
4. A new tab will open with the Wayback Machine's 2013 snapshot interface for that video.

## Notes

> [!NOTE]
> The bookmarklet targets a hardcoded July 2013 Wayback Machine snapshot URL. It always lands on the 2013 interface regardless of whether newer snapshots exist for the video.

- The Wayback Machine may not have snapshots for every video ID.
- This bookmarklet does not require you to be on a YouTube page when you trigger it; it only needs the video ID you provide.
