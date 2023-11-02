[Bookmarklet Source](index.js)(Right-click to save as a bookmark, or drag to bookmark bar)

This JavaScript bookmarklet helps users quickly generate a CSV file of movie information from a Letterboxd page. When activated, it extracts movie URLs and titles from the current page and compiles this data into a CSV file which is then automatically downloaded to the user's device.
Usage

    Create a new bookmark in your browser.
    Copy the provided JavaScript code and paste it into the URL field of the bookmark.
    Navigate to a Letterboxd page containing movie posters.
    Click the bookmarklet to run the script.
    Once the script has run, a CSV file named data.csv will be downloaded to your device.

The CSV file will contain columns for LetterboxdURI, tmdbID, imdbID, and Title, though tmdbID and imdbID will be left empty as the script does not extract these values.
