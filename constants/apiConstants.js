/**
 * The routes and search params mentioned here are for Next.js api routes
 * and for external ( backend ) APIs
 */
const API_CONSTANTS = {
    PODCASTS_SEARCH: "http://podcasts-platform.us-east-1.elasticbeanstalk.com/podcasts/search/",
    EPISODES_LOOKUP: "http://podcasts-platform.us-east-1.elasticbeanstalk.com/podcasts/episodes/",
    PROXY_API_ROUTES: {
        PROXY_SEARCH: "api/proxy/search",
        PROXY_EPISODES: "api/proxy/episodes"
    },
    QUERY_PARAMS: {
        QUERY: "query",
        ORDERING: {
            key: "ordering",
            values: {
                NEWEST: "newest",
                OLDEST: "oldest",
                MOST_TRACKS: "mostTracks"
            }
        },
        COLLECTION_ID: "collectionId",
        ATTRIBUTES: {
            key: "attr",
            values: {
                TITLE_TERM: "titleTerm",
                LANGUAGE_TERM: "languageTerm",
                AUTHOR_TERM: "authorTerm",
                GENRE_INDEX: "genreIndex",
                ARTIST_TERM: "artistTerm",
                RATING_INDEX: "ratingIndex"
            }
        }
    }
}

export default API_CONSTANTS