# JustWatch watchlist exporter

## Overview
This JavaScript bookmarklet is designed to scrape movie data from the JustWatch website. It's specifically tailored for gathering information about movies listed on JustWatch pages and storing this data in the browser's `localStorage` for further use or analysis. The script operates by opening each movie link in a new window, scraping relevant data, and then saving it to `localStorage`.

## Functionality
- **Open and Scrape**: Opens each JustWatch movie link in a new window and scrapes detailed information about the movie.
- **Data Storage**: Stores the scraped data in an array within the browser's `localStorage`.
- **Automatic Closure**: Closes each window automatically after scraping is done to streamline the process.

## Pre-requisites
- The JustWatch website must be set to the English language.
- The browser must allow pop-up windows, as the script opens new tabs/windows for each movie link.

## Usage Instructions
1. **Bookmark the Script**: Save the JavaScript code as a bookmark in your browser.
2. **Navigate to JustWatch**: Go to a JustWatch page with movie listings (e.g., genre page, search results).
3. **Execute the Bookmarklet**: Click on the saved bookmark while on the JustWatch page.
4. **View Results**: After the script finishes running, check `localStorage` for the key `watchlistData` to see the scraped movie data.

## Data Scraped
The script extracts the following details for each movie:
- English Title
- Original Title
- Directors
- IMDb ID
- Release Year
- Release Date
- Runtime
- Age Certification
- Genres

## Notes
- **Execution Time**: The script includes a delay to ensure each page loads fully. This may require adjustment based on internet speed.
- **Data Consistency**: The script assumes a consistent data format from JustWatch.
- **Error Handling**: In its current form, the script does not include extensive error handling.
- **Browser Compatibility**: The script should be tested in various browsers for compatibility.