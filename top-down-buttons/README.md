## Overview

This bookmarklet adds a small vertical set of buttons on the right edge of the page that let you quickly scroll:

- Up a page
- Back to the current resting position
- Down to the bottom

The buttons appear as semi‑transparent controls that stay fixed while you scroll.

## Usage

1. Create a new bookmark in your browser.
2. Paste the bookmarklet JavaScript from `index.js` as the bookmark's URL.
3. Visit any long webpage.
4. Click the bookmarklet to inject the scroll buttons.
5. Hover over the **up** or **down** buttons to auto‑scroll; click them to jump smoothly to the top or bottom.

## Notes

- The controls are injected using inline styles and image data URLs, so they do not depend on external assets.
- If a page has aggressive custom CSS or JavaScript, it may interfere with the placement or behavior of the buttons.