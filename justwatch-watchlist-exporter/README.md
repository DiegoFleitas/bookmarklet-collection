# JustWatch watchlist exporter

## Overview
This JavaScript bookmarklet scrapes media data from the JustWatch watchlist page. It gathers information about tv shows & movies listed on JustWatch pages and stores this data in the browser's `localStorage` for further use. The script operates by making GraphQL requests to fetch detailed information about each media item, and then saving it to `localStorage`. The script also converts this data into a CSV file compatible with SIMKL's format & once the data is processed, the script facilitates the download of this CSV file.

## Functionality
- **Fetch and Scrape**: Fetches detailed information about each media item using GraphQL and scrapes the relevant data.
- **Data Storage**: Stores the scraped data in an array within the browser's `localStorage`.
- **CSV Conversion**: Converts the stored data into a CSV format following SIMKL guidelines.
- **Download CSV**: Downloads the SIMKL ready CSV file.

## Pre-requisites
- The JustWatch website must be set to the English language to ensure the most complete and best available data is scraped.

## Usage Instructions
1. **Bookmark the Script**: Save the JavaScript code as a bookmark in your browser.
2. **Navigate to JustWatch**: Go to any JustWatch page after logging in.
3. **Execute the Bookmarklet**: Click on the saved bookmark while on the JustWatch page.
4. **View Results**: After the script finishes running, check `localStorage` for the key `watchlistData` to see the scraped media data.

## Data Scraped
The script extracts the following details for each media item:
- English Title
- Original Title
- IMDb ID
- Release Year
- Release Date
- Runtime
- Age Certification
- Media Type

## Notes
- **Data Consistency**: The script assumes a consistent data format from JustWatch.
- **Error Handling**: In its current form, the script does not include extensive error handling.
- **Browser Compatibility**: The script should be tested in various browsers for compatibility.
