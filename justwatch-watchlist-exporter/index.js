javascript: (async function () {
    /* PRE: switch to ENG language on JustWatch website if not already */
    /* PRE: allow emergent windows on browser if popup appears */
    main();

    async function fetchAndParseData(link) {
        try {
            const response = await fetch(link);
            const html = await response.text();
            return parseApolloState(html);
        } catch (error) {
            console.error('Error fetching URL:', link, error);
            return null;
        }
    };

    function parseApolloState(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const scriptTags = Array.from(doc.querySelectorAll('script'));
        const apolloStateScript = scriptTags.find(script => script.textContent.includes('__APOLLO_STATE__'));
        if (!apolloStateScript) return null;
    
        const stateText = apolloStateScript.textContent;
        const stateJson = stateText.substring(stateText.indexOf('{'), stateText.lastIndexOf('}') + 1);
        const state = JSON.parse(stateJson);

        const defaultClient = state.defaultClient;
    
        const keys = Object.keys(defaultClient).filter(k => k.match(/Movie.*content.*\)$/));
        const movieKey = keys.reduce((a, b) => Object.keys(defaultClient[a]).length > Object.keys(defaultClient[b]).length ? a : b);
        const movie = defaultClient[movieKey];
    
        const externalIds = Object.keys(defaultClient).filter(k => k.match(/Movie.*content.*\).externalIds$/));
        const imdbid = externalIds.length > 0 ? defaultClient[externalIds.find(k => "imdbId" in defaultClient[k])].imdbId : "";
    
        const genreMap = new Map();
        const genreKeys = Object.keys(defaultClient).filter(k => k.match(/^Genre:/));
        genreKeys.forEach(genreKey => {
            const genreObj = defaultClient[genreKey];
            genreMap.set(genreObj.shortName, genreObj["slug({\"language\":\"en\"})"]);
        });
    
        const creditKeys = movie.credits.map(credit => credit.id);
        const directors = creditKeys.map(k => defaultClient[k]).filter(credit => credit.role === "DIRECTOR").map(credit => credit.name);
        directors.sort();
    
        const title = movie.title;
        const ogtitle = movie.originalTitle;
        const genres = movie.genres.map(genre => genreMap.get(defaultClient[genre.id].shortName));
    
        const duration = movie.runtime;
        return {
            englishTitle: title,
            originalTitle: ogtitle,
            director: directors,
            imdbID: imdbid,
            releaseYear: movie.originalReleaseYear,
            releaseDate: movie.originalReleaseDate || "",
            runtime: duration,
            ageCertification: movie.ageCertification,
            genres: genres.sort()
        };
    }

    function getLinks() {
        var output = [];
        document.querySelectorAll("h2.title-card-heading").forEach((e) => {
            if (e.parentNode.href) {
                output.push(e.parentNode.href);
            }
        });
        return output;
    }

    function jsonToCsv(jsonData) {
        const csvRows = [];
    
        /* SIMKL CSV format https:/*simkl.com/apps/import/csv/ */
        const headers = ["simkl_id", "TVDB_ID", "TMDB", "IMDB_ID", "MAL_ID", "Type", "Title", "Year", "LastEpWatched", "Watchlist", "WatchedDate", "Rating", "Memo"];
        csvRows.push(headers.join(','));
    
        /* Mapping JSON keys to CSV headers */
        jsonData.forEach(row => {
            console.log(row);
            const csvRow = headers.map(header => {
                let value = '';
    
                switch (header) {
                    case "IMDB_ID":
                        value = row.imdbID || '';
                        break;
                    case "Type":
                        value = "movie"; /* Assuming all are movies, adjust as needed */
                        break;
                    case "Title":
                        value = row.englishTitle || '';
                        break;
                    case "Year":
                        value = row.releaseYear || '';
                        break;
                    /* Add cases for other headers as needed */
                    default:
                        value = row[header] || ''; /* For headers that directly match JSON keys */
                }
    
                const escapedCell = ('' + value).replace(/"/g, '\\"'); /* Escape double quotes */
                return `"${escapedCell}"`;
            });
    
            csvRows.push(csvRow.join(','));
        });
    
        return csvRows.join('\n');
    }

    function downloadCsvFile(jsonData) {
        const csvData = jsonToCsv(jsonData); /* Convert JSON to CSV */
        console.log(csvData);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
    
        const fileName = 'watchlist.csv'; /* Change the file extension to .csv */
    
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        document.body.appendChild(link); /* Append link to body */
        link.click();
        document.body.removeChild(link); /* Clean up */
    }

    function clearWatchlistData() {
        localStorage.removeItem("watchlistData");
    }

    async function main() {
        clearWatchlistData();
        var links = getLinks();
        console.log(links);
        const movieDataPromises = links.map(fetchAndParseData);
        const allMovieData = (await Promise.all(movieDataPromises)).filter(data => data !== null);
    
        localStorage.setItem("watchlistData", JSON.stringify(allMovieData));
        console.log(allMovieData);
        downloadCsvFile(allMovieData);
    }
})()