export type PodcastType = {
    collectionId: number,
    collectionName: string, // name of the entire podcast
    artistName: string,
    trackTimeMillis: number,
    trackCount: number, // number of episodes
    thumbnailSmall: string, // for small devices - artworkUrl100 in the api response
    thumbnailLarge: string, // for larger devices - artworkUrl600 in the api response
    genres: string[],
    primaryGenreName: string, // the genre to show on the podcast card
    collectionViewUrl: string,
    releaseDate: string,
}

export type EpisodeType = {
    trackId: number,
    trackName: string,
    trackTimeMillis: number,
    episodeUrl: string,
    releaseDate: string,
    description: string,
    thumbnail: string,
    kind: string
}

export type PodcastShortType = {
    artistName: string,
    collectionName: string,
    thumbnail: string,
    collectionId: number,
    kind: string,
    trackCount: number
}