# JustWatch watchlist exporter

## Overview
This JavaScript bookmarklet scrapes movie data from the JustWatch watchlist page. It gathers information about movies listed on JustWatch pages and storing this data in the browser's `localStorage` for further use. The script operates by fetching each movie link html, scraping relevant data, and then saving it to `localStorage`. The script also converts this data into a CSV file compatible with SIMKL's format & once the data is processed, the script facilitates the download of this CSV file.

## Functionality
- **Open and Scrape**: Opens each JustWatch movie link in a new window and scrapes detailed information about the movie.
- **Data Storage**: Stores the scraped data in an array within the browser's `localStorage`.
- **CSV Conversion**: Converts the stored data into a CSV format following SIMKL guidelines.
- **Download CSV**: Downloads the SIMKL ready CSV file.

## Pre-requisites
- The JustWatch website must be set to the English language to ensure the most complete and best available data is scraped.

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