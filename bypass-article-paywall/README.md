# Bypass article paywall

Strips client-side paywall overlays and reads the article through the Internet
Archive. If the archive has no copy, the bookmarklet can create one.

## What it does

1. Removes the paywall / registration overlay nodes (`#signupwall`,
   `.hard-paywall`, `.registration-wall`, Piano/TinyPass modals, …) and unlocks
   page scrolling — instantly, without any network request.
2. Asks the Wayback Machine for the best capture:
   - **paywalled page** → the capture nearest `article:published_time`, which is
     usually the pre-paywall copy with the full text;
   - **readable page** → the closest capture, refreshed with a debounced
     Save Page Now.
3. Opens that capture in raw mode (`id_`, no Wayback toolbar) in a new tab.
4. If Wayback has never archived the URL, that tab shows
   “The Wayback Machine has not archived that URL”. Run the bookmarklet once
   more on that page: it recognises the Wayback error and sends the original URL
   to Save Page Now, creating the capture.
5. On a `web.archive.org` page it only cleans: strips the site's wall and removes
   the Wayback toolbar. It never archives the archive.

## Notes

- Some sites (la diaria included) ship a CSP whose `connect-src` does not allow
  `archive.org`. Bookmarklets still run, but their `fetch` is blocked, so the
  lookup falls back to replaying the capture from the publication day. That is
  why a missing capture is detected on the Wayback error page rather than before
  opening the tab.
- A capture created by Save Page Now is fetched server-side: paywalled pages stay
  paywalled (truncated) in the archive. Creation preserves the URL, it cannot
  unlock the text.
- Always respect site terms of use and support publishers you value.
