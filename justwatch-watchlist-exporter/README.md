# JustWatch watchlist exporter

## Overview

This JavaScript bookmarklet scrapes media data from the JustWatch watchlist page. It gathers information about TV shows and movies listed on JustWatch and stores this data in the browser's `localStorage` for further use. It then converts that data into a CSV file compatible with SIMKL and triggers a download.

## Functionality

- **Fetch and scrape**: Fetches detailed information about each media item using GraphQL and scrapes the relevant data.
- **Data storage**: Stores the scraped data in an array within the browser's `localStorage`.
- **CSV conversion**: Converts the stored data into a CSV format following SIMKL guidelines.
- **Download CSV**: Downloads a SIMKL‑ready CSV file.

## Pre-requisites

> [!NOTE]
> Set the JustWatch website to the **English** language to ensure the most complete and consistent data is scraped; other locales may return different or incomplete metadata.

## Usage

1. **Install the bookmarklet**: drag it from the [collection site](https://diegofleitas.github.io/bookmarklet-collection/) into your bookmarks bar, or create a new bookmark and paste the code from `index.js` as the URL.
2. **Navigate to JustWatch**: Log in and open your watchlist page (or the supported JustWatch view).
3. **Execute the bookmarklet**: Click the saved bookmark while on the JustWatch page.
4. **Download CSV**: After the script finishes, it will trigger a CSV download compatible with SIMKL. Raw scraped data is also available in `localStorage` under the key `watchlistData`.

## Data Scraped

- English Title
- Original Title
- IMDb ID
- Release Year
- Release Date
- Runtime
- Age Certification
- Media Type

## Notes

- **Data consistency**: The script assumes a stable JustWatch HTML and GraphQL schema. Major site changes can break scraping.
- **Error handling**: Error handling is intentionally minimal; check the browser console if something fails.
- **Browser compatibility**: The bookmarklet has been written for modern desktop browsers; other environments are not guaranteed to work.
