# Discord swiper

## Overview

This bookmarklet collects and displays rich information about members of a Discord server when used in the Discord web client. It can show:

- User IDs
- Usernames and discriminators
- Avatars
- Connected accounts
- Mutual guilds

## Usage

1. **Prepare your Discord client**
   
   > [!IMPORTANT]
   > Enable **Developer Mode** in Discord (`User Settings → Advanced → Developer Mode`) and capture a valid `Authorization` header from a request to `https://discord.com/api` before running this bookmarklet.
   >
   > Set that token in the script at the referenced line before minifying / building the bookmarklet, otherwise profile requests will fail with `401 Unauthorized`.

2. **Install the bookmarklet**
   - Create a new bookmark in your browser.
   - Paste the bookmarklet JavaScript as the bookmark's URL.

3. **Run it**
   - Open the Discord web client and navigate to a server's members list.
   - Click the bookmarklet.
   - The script will scroll through the members list, gather data, and display it in a modal.

## Warnings

> [!WARNING]
> This script makes authenticated calls to Discord's API in ways that may violate Discord's Terms of Service. Use it **at your own risk**, sparingly, and only on accounts and servers you control or have explicit permission to analyze.

> [!WARNING]
> **Storing your Discord authentication token in a bookmark is dangerous.** Any website you visit while the bookmark exists in your browser bar could potentially read it via browser extension APIs or bookmark sync services. Anyone with physical access to your device or browser profile can extract it. Consider using a runtime prompt for the token instead of embedding it permanently.
