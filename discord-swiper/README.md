# Discord swiper

Collects rich profile data for members of a Discord server directly from the Discord API. For each visible member it can surface:

- User ID, username, and discriminator
- Avatar
- Connected accounts
- Mutual guilds

## Prerequisites

> [!IMPORTANT]
> Before running this bookmarklet:
>
> 1. Enable **Developer Mode** in Discord (`User Settings → Advanced → Developer Mode`).
> 2. Capture a valid `Authorization` header from any request to `https://discord.com/api` (e.g. via DevTools → Network).
> 3. Click the bookmarklet on the Discord web client and paste that header value into the prompt. It is used for that run only and is never stored in the bookmark.
>
> Without step 2, all profile API requests return `401 Unauthorized`.

## Usage

1. Install the bookmarklet: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. Open the Discord web client and navigate to a server's members list.
3. Click the bookmarklet. The script scrolls through the member list, gathers profile data, and displays it in a modal.

## Warnings

> [!WARNING]
> This script makes authenticated calls to Discord's internal API in ways that likely violate Discord's Terms of Service. Use it **at your own risk**, only on accounts and servers you control or have explicit permission to analyze.

> [!WARNING]
> **This bookmarklet only runs on `discord.com` / `canary.discord.com`.** It refuses any other origin, because it talks to Discord's API with your own session.
>
> **Do not embed your Discord auth token in a bookmark permanently.** Synced bookmarks, browser profiles, and installed extensions can expose it. Anyone with physical access to your device can extract it. That is why the token is requested at run time instead.
