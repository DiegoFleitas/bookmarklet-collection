javascript: (function () {
    // PRE: switch to ENG language on JustWatch website if not already
    // PRE: allow emergent windows on browser if popup appears
    async function openQuick(link) {
        let win = window.open(link, '_blank');
        await sleep(10000);
        if (win) {
            console.log("Window opened");
            // Inject the scrapeMovieData function into the new window
            let movieData = win.eval(`(${scrapeMovieData.toString()})();`);
            // Save to local storage
            let watchlistData = JSON.parse(localStorage.getItem("watchlistData") || "[]");
            watchlistData.push(movieData);
            localStorage.setItem("watchlistData", JSON.stringify(watchlistData));
            // Close tab
            win.close();
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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

    function downloadJsonFile(jsonData) {
        const jsonStr = JSON.stringify(jsonData, null, 2); // Converts JSON object to string, formatted with 2 spaces indentation
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const fileName = 'watchlist.json';

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        document.body.appendChild(link); // Append link to body
        link.click();
        document.body.removeChild(link); // Clean up
    }

    async function main() {
        var links = getLinks();
        console.log(links);
        for (let i = 0; i < links.length; i++) {
            console.log(links[i]);
            await openQuick(links[i]);
        }
        let watchlistData = localStorage.getItem("watchlistData")
        console.log(watchlistData);
        downloadJsonFile(JSON.parse(watchlistData));
    }

    function scrapeMovieData() {
        const out = [];
        const genreMap = new Map();
        const defaultClient = __APOLLO_STATE__.defaultClient;
    
        const keys = Object.keys(defaultClient).filter(k => k.match(/Movie.*content.*\)$/));
        const movieKey = keys.reduce((a, b) => Object.keys(defaultClient[a]).length > Object.keys(defaultClient[b]).length ? a : b);
        const movie = defaultClient[movieKey];
    
        const externalIds = Object.keys(defaultClient).filter(k => k.match(/Movie.*content.*\).externalIds$/));
        const imdbid = externalIds.length > 0 ? defaultClient[externalIds.find(k => "imdbId" in defaultClient[k])].imdbId : "";
    
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
        out.push({
            englishTitle: title,
            originalTitle: ogtitle,
            director: directors,
            imdbID: imdbid,
            releaseYear: movie.originalReleaseYear,
            releaseDate: movie.originalReleaseDate || "",
            runtime: duration,
            ageCertification: movie.ageCertification,
            genres: genres.sort()
        });
    
        return out;
    }

    main();
})()