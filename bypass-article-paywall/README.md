# Bypass article paywall

## Overview

This bookmarklet sends the current page URL through an article proxy service (`1ft.io`) that attempts to render a readable copy of the content, which can sometimes bypass soft paywalls or heavy overlay UIs.

When you trigger it, the browser navigates to a new URL on `1ft.io` with the current page URL passed as a query parameter.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Visit an article page.
3. Click the bookmarklet.
4. The page will reload on `1ft.io`, which will attempt to fetch and present the article content.

## Notes and ethics

> [!WARNING]
> This relies entirely on the behavior and availability of `1ft.io`; if the service is down or changes behavior, the bookmarklet may stop working. Always respect site terms of use, paywalls, and local laws. This script is intended for personal experimentation and convenience; support publishers you value.
