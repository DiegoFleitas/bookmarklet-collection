javascript: (async function () {
    main();

    async function fetchAndParseData(link) {
        try {
            const myHeaders = new Headers();
            myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0");
            myHeaders.append("Accept", "*/*");
            myHeaders.append("Accept-Language", "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3");
            myHeaders.append("Accept-Encoding", "gzip, deflate, br");
            myHeaders.append("Referer", "https://www.justwatch.com/");
            myHeaders.append("content-type", "application/json");
            myHeaders.append("Origin", "https://www.justwatch.com");
            myHeaders.append("Authorization", `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`);
            myHeaders.append("Host", "apis.justwatch.com");
            myHeaders.append("App-Version", "3.8.2-web-web");
            /* myHeaders.append("DEVICE-ID", `${document.cookie.replace(/(?:(?:^|.*;\s*)jw_id\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`); */
            /* myHeaders.append("Jw-Session", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWRpZW5jZSI6InNlc3Npb24iLCJleHAiOjMyMjY1MjU4NTYsImlhdCI6MTcxMjc5Nzg1NiwiaXNzdWVyIjoianVzdHdhdGNoIiwic3ViIjoiNkRMaTA2czVFZTJpTmRyMW1LU1ZsZyJ9.Qo2PxYh3ca57q7OMqmc0Y0An_MLhQQc5W-StCka7RhM"); */
            myHeaders.append("App-Version", "3.8.2-web-web");
            myHeaders.append("Origin", "https://www.justwatch.com");
            myHeaders.append("Sec-Fetch-Site", "same-site");
            myHeaders.append("Connection", "keep-alive");
            myHeaders.append("Sec-Fetch-Dest", "empty");
            myHeaders.append("Sec-Fetch-Mode", "cors");
            myHeaders.append("Sec-Fetch-Site", "same-site");

            const graphql = JSON.stringify({
                query: `
                    query GetTitleListV2(
                        $country: Country!, 
                        $titleListFilter: TitleFilter, 
                        $titleListSortBy: TitleListSortingV2! = LAST_ADDED, 
                        $titleListType: TitleListTypeV2!, 
                        $titleListAfterCursor: String, 
                        $watchNowFilter: WatchNowOfferFilter!, 
                        $first: Int! = 10, 
                        $language: Language!, 
                        $sortRandomSeed: Int! = 0, 
                        $profile: PosterProfile, 
                        $backdropProfile: BackdropProfile, 
                        $format: ImageFormat, 
                        $platform: Platform! = WEB, 
                        $includeOffers: Boolean = false
                    ) {
                        titleListV2(
                            after: $titleListAfterCursor
                            country: $country
                            filter: $titleListFilter
                            sortBy: $titleListSortBy
                            first: $first
                            titleListType: $titleListType
                            sortRandomSeed: $sortRandomSeed
                        ) {
                            totalCount
                            pageInfo {
                                startCursor
                                endCursor
                                hasPreviousPage
                                hasNextPage
                                __typename
                            }
                            edges {
                                ...WatchlistTitleGraphql
                                __typename
                            }
                            __typename
                        }
                    }
                    fragment WatchlistTitleGraphql on TitleListEdgeV2 {
                        cursor
                        node {
                            id
                            objectId
                            objectType
                            offerCount(country: $country, platform: $platform)
                            offers(country: $country, platform: $platform) @include(if: $includeOffers) {
                                id
                                presentationType
                                monetizationType
                                retailPrice(language: $language)
                                type
                                package {
                                    id
                                    packageId
                                    clearName
                                    __typename
                                }
                                standardWebURL
                                elementCount
                                deeplinkRoku: deeplinkURL(platform: ROKU_OS)
                                __typename
                            }
                            content(country: $country, language: $language) {
                                title
                                fullPath
                                originalReleaseYear
                                shortDescription
                                scoring {
                                    imdbScore
                                    imdbVotes
                                    tmdbScore
                                    tmdbPopularity
                                    __typename
                                }
                                externalIds {
                                    imdbId
                                    tmdbId
                                    __typename
                                }
                                posterUrl(profile: $profile, format: $format)
                                backdrops(profile: $backdropProfile, format: $format) {
                                    backdropUrl
                                    __typename
                                }
                                upcomingReleases(releaseTypes: [DIGITAL]) {
                                    releaseDate
                                    __typename
                                }
                                isReleased
                                __typename
                            }
                            likelistEntry {
                                createdAt
                                __typename
                            }
                            dislikelistEntry {
                                createdAt
                                __typename
                            }
                            watchlistEntryV2 {
                                createdAt
                                __typename
                            }
                            customlistEntries {
                                createdAt
                                __typename
                            }
                            watchNowOffer(country: $country, platform: $platform, filter: $watchNowFilter) {
                                id
                                standardWebURL
                                package {
                                    id
                                    packageId
                                    clearName
                                    __typename
                                }
                                retailPrice(language: $language)
                                retailPriceValue
                                currency
                                lastChangeRetailPriceValue
                                presentationType
                                monetizationType
                                availableTo
                                __typename
                            }
                            ... on Movie {
                                seenlistEntry {
                                    createdAt
                                    __typename
                                }
                                __typename
                            }
                            ... on Show {
                                tvShowTrackingEntry {
                                    createdAt
                                    __typename
                                }
                                seenState(country: $country) {
                                    seenEpisodeCount
                                    releasedEpisodeCount
                                    progress
                                    caughtUp
                                    lastSeenEpisodeNumber
                                    lastSeenSeasonNumber
                                    __typename
                                }
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                `,
                variables: {
                    "titleListSortBy": "LAST_ADDED",
                    "first": 20,
                    "sortRandomSeed": 0,
                    "platform": "WEB",
                    "includeOffers": false,
                    "titleListFilter": {
                        "ageCertifications": [],
                        "excludeGenres": [],
                        "excludeProductionCountries": [],
                        "objectTypes": ["MOVIE", "SHOW"],
                        "productionCountries": [],
                        "subgenres": [],
                        "genres": [],
                        "packages": [],
                        "excludeIrrelevantTitles": false,
                        "presentationTypes": [],
                        "monetizationTypes": [],
                        "includeTitlesWithoutUrl": true
                    },
                    "watchNowFilter": {
                        "packages": [],
                        "monetizationTypes": []
                    },
                    "language": "en-US",
                    "country": "US",
                    "titleListType": "WATCHLIST",
                    "titleListAfterCursor": ""
                }
            })
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: graphql,
                redirect: 'follow'
            };

            const response = await fetch("https://apis.justwatch.com/graphql", requestOptions);
            const data = await response.json();
            return data.data.titleListV2.edges.map(edge => {
                const media = edge.node.content;

                return {
                    englishTitle: media.title,
                    originalTitle: media.title,
                    imdbID: media.externalIds.imdbId,
                    releaseYear: media.originalReleaseYear,
                    releaseDate: "",
                    runtime: null,
                    ageCertification: null,
                    type: edge.node.objectType
                };
            });
        } catch (error) {
            console.error('Error fetching URL:', link, error);
            return null;
        }
    };

    function getLinks() {
        const output = [];
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
                        value = row.type || '';
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
        const movieData = await fetchAndParseData();

        if (movieData !== null) {
            localStorage.setItem("watchlistData", JSON.stringify(movieData));
            console.log(movieData);
            downloadCsvFile(movieData);
        }
    }
})()