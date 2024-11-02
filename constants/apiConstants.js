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
        ORDERING: "ordering",
        COLLECTION_ID: "collectionId"
    }
}

export default API_CONSTANTS